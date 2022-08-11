import { Error } from '../common/types';

/**
 * Generates a standard service error along with console log
 * @param [message] Short description of the error
 * @param [details?] Further details about the error
 * @returns {Error} Error with a proper format defined above
 */
export const generateError = (message: string, details?: string): Error => {
  console.error(message);
  details && console.error(details);
  return {
    message,
    details,
  };
};
