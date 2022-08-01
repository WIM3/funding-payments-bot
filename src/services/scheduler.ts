import { Response } from '../common/types';
import { success, failure } from '../utils/response';

module.exports.main = async (): Promise<Response> => {
  const error = '';

  return error ? failure(error) : success('OK');
};
