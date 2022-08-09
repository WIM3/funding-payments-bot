import { Error } from '../common/types';

/**
 * Generates a standard service error
 * @param [service] Name of the service where it is coming from
 * @param [message] Short description of the error
 * @param [details?] Further details about the error
 * @returns {Error} Error with a proper format defined above
 */
export const generateError = (service: string, message: string, details?: string): Error => {
  return {
    service,
    message,
    details,
  };
};
