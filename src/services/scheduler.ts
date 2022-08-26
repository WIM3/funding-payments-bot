import { Error, Response, ScheduledTask } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { getAmms } from '../clients/subgraph';
import { getAllTasks, createTask, deleteTask } from '../clients/dynamo';
import { removeRule } from '../clients/cloudwatch';

module.exports.main = async (): Promise<Response> => {
  let error: Error;

  await getAmms()
    .then(async (amms) => {
      await getAllTasks()
        .then(async (tasks) => {
          // amms with tasks that do not need to be removed from DB
          const confirmedAmms = [];

          for (const amm of amms) {
            const task = tasks.find((obj) => obj.ammId === amm.id);

            // if this amm does not have a task in DB yet, it needs to be added
            if (!task) {
              // TODO: we need to double-check if this really is in seconds
              const fundingPeriod = amm.fundingPeriod;
              const newTask: ScheduledTask = {
                ammId: amm.id,
                fundingPeriod,
                lastPayment: 0,
              };
              await createTask(newTask).catch((e) => {
                error = generateError(
                  `failed to add new task for ${amm.id} to DB`,
                  JSON.stringify(e),
                );
              });
            }
            confirmedAmms.push(amm.id);
          }

          for (const task of tasks) {
            if (confirmedAmms.indexOf(task.ammId) === -1) {
              await deleteTask(task.ammId).catch((e) => {
                error = generateError(
                  `failed to remove old task ${task.ammId} from DB`,
                  JSON.stringify(e),
                );
              });
              await removeRule(task.ammId).catch((e) => {
                error = generateError(
                  `failed to remove rule ${task.ammId} from event bus`,
                  JSON.stringify(e),
                );
              });
            }
          }
        })
        .catch((e) => {
          error = generateError('failed to load tasks from DB', JSON.stringify(e));
        });
    })
    .catch((e) => {
      error = generateError('failed to load data from subgraph', JSON.stringify(e));
    });

  return error ? failure(JSON.stringify(error)) : success('OK');
};
