import { SNSEvent } from 'aws-lambda';

import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { executeFundingPayment } from '../clients/ethers';

module.exports.main = async (event: SNSEvent): Promise<Response> => {
  let error: Error;

  for (const record of event.Records) {
    const amm = JSON.parse(record.Sns?.Message)?.ammId;

    if (amm) {
      await executeFundingPayment(amm)
        .then((res) => {
          if (res.status === 1) {
            console.log(`${amm}: funding payment successful - ${res.txHash}`);
          } else {
            error = generateError(`${amm}: funding payment unsuccessful - ${res.txHash}`);
          }
        })
        .catch((e) => {
          error = generateError(`${amm}: failed to execute funding payment`, JSON.stringify(e));
        });
    } else {
      error = generateError('invalid sns message received');
    }
  }

  return error ? failure(JSON.stringify(error)) : success('OK');
};
