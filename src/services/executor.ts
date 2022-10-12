import { SNSEvent } from 'aws-lambda';

import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { getTimestampInSeconds } from '../utils/numbers';
import { executeFundingPayment } from '../clients/ethers';
import { updateTask } from '../clients/dynamo';

module.exports.main = async (event: SNSEvent): Promise<Response> => {
  let error: Error;
  let tries = 3;

  for (const record of event.Records) {
    const amm = JSON.parse(record.Sns?.Message)?.ammId;

    if (amm) {
      while (tries > 0) {
        await executeFundingPayment(amm)
          .then(async (res) => {
            if (res.status === 1) {
              console.log(`${amm}: funding payment successful - ${res.txHash}`);

              await updateTask(amm, getTimestampInSeconds()).catch((e) => {
                error = generateError(`failed to update task ${amm} in DB`, JSON.stringify(e));
              });
            } else {
              error = generateError(`${amm}: funding payment unsuccessful - ${res.txHash}`);
            }
            tries = 0;
          })
          .catch((e) => {
            error = generateError(`${amm}: failed to execute funding payment`, JSON.stringify(e));
            tries--;
          });
      }
    } else {
      error = generateError('invalid sns message received');
    }
  }

  return error ? failure(JSON.stringify(error)) : success('OK');
};
