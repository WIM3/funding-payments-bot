import { SNSEvent } from 'aws-lambda';

import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';

module.exports.main = async (event: SNSEvent): Promise<Response> => {
  let error: Error;

  // TODO: replace with proper functionality
  console.log(`running: ${JSON.stringify(event.Records)}`);

  return error ? failure(JSON.stringify(error)) : success('OK');
};
