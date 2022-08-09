import { getAmms } from '../clients/subgraph';
import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';

module.exports.main = async (): Promise<Response> => {
  let error: Error;

  await getAmms()
    .then((amms) => {
      // TODO: replace with proper processing
      console.log(amms);
    })
    .catch((e) => {
      console.log(e);
      error = generateError('scheduler', 'failed to load data from subgraph', JSON.stringify(e));
    });

  return error ? failure(JSON.stringify(error)) : success('OK');
};
