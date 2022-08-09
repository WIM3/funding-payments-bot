import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { getAmms } from '../clients/subgraph';
import { getAllTasks } from '../clients/dynamo';

module.exports.main = async (): Promise<Response> => {
  let error: Error;

  await getAmms()
    .then(async () => {
      // TODO: replace with proper functionality
      // we need to add new ones and remove old ones
      const tasks = await getAllTasks();
      console.log(tasks);
    })
    .catch((e) => {
      console.log(e);
      error = generateError('scheduler', 'failed to load data from subgraph', JSON.stringify(e));
    });

  return error ? failure(JSON.stringify(error)) : success('OK');
};
