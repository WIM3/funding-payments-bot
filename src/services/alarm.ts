import { DynamoDBStreamEvent } from 'aws-lambda';

import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { addRule, addTarget } from '../clients/cloudwatch';

module.exports.main = async (event: DynamoDBStreamEvent): Promise<Response> => {
  let error: Error;

  for (const record of event.Records) {
    if (record.dynamodb?.NewImage) {
      const ammId = record.dynamodb.NewImage.ammId.S;
      const fundingPeriod = +record.dynamodb.NewImage.fundingPeriod.N;

      // TODO: we should have a better way of handling these errors
      await addRule(ammId, fundingPeriod)
        .then(async () => {
          await addTarget(ammId).catch((e) => {
            error = generateError(
              `failed to programatically add target for ${ammId}`,
              JSON.stringify(e),
            );
          });
        })
        .catch((e) => {
          error = generateError(
            `failed to programatically add rule for ${ammId}`,
            JSON.stringify(e),
          );
        });
    }
  }

  return error ? failure(JSON.stringify(error)) : success('OK');
};
