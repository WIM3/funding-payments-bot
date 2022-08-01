import { Response } from '../common/types';

/**
 * Generates a proper response of the lambda function
 * @param [statusCode] Number representing status of the response
 * @param [body] Response data or message depending on context
 * @returns {Response} Response with a proper format defined above
 */
const generateResponse = (statusCode: number, body: string): Response => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: body,
  };
};

/* Generates success response */
export const success = (body: string): Response => {
  return generateResponse(200, body);
};

/* Generates failure response */
export const failure = (body: string): Response => {
  return generateResponse(500, body);
};
