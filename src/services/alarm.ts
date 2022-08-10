import { DynamoDBStreamEvent } from 'aws-lambda';

import { success, failure } from '../utils/response';
import { Error, Response } from '../common/types';
import { addRule, addTarget } from '../clients/cloudwatch';

module.exports.main = async (event: DynamoDBStreamEvent): Promise<Response> => {
  let error: Error;

  for (const record of event.Records) {
    if (record.dynamodb?.NewImage) {
      const ammId = record.dynamodb.NewImage.ammId.S;
      const fundingPeriod = +record.dynamodb.NewImage.fundingPeriod.N;
      const ruleName = `rule-${ammId}`;
      const targetName = `target-${ammId}`;

      addRule(ruleName, fundingPeriod);
      addTarget(ruleName, targetName, ammId);
    }
  }

  return error ? failure(JSON.stringify(error)) : success('OK');
};
