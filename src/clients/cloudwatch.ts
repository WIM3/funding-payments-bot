import { CloudWatchEvents } from 'aws-sdk';

import { TASK_TOPIC } from '../common/constants';

const cw = new CloudWatchEvents();

/**
 * Adds scheduled rule
 * @param [ammId] Amm id used for name
 */
export const addRule = async (ammId: string, seconds: number): Promise<void> => {
  // TODO: we need to double-check if this accurracy is enough
  const minutes = Math.floor(seconds / 60);
  const params = {
    Name: `rule-${ammId}`,
    ScheduleExpression: `rate(${minutes} minutes)`,
    State: 'ENABLED',
  };
  await cw.putRule(params).promise();
};

/**
 * Adds lambda function target
 * @param [ammId] Amm id used for name
 */
export const addTarget = async (ammId: string): Promise<void> => {
  const params = {
    Rule: `rule-${ammId}`,
    Targets: [
      {
        Arn: TASK_TOPIC,
        Id: `target-${ammId}`,
        Input: JSON.stringify({ ammId }),
      },
    ],
  };
  await cw.putTargets(params).promise();
};

/**
 * Removes scheduled rule
 * @param [ammId] Amm id
 */
export const removeRule = async (ammId: string): Promise<void> => {
  const params = {
    Name: `rule-${ammId}`,
  };
  await cw.deleteRule(params).promise();
};
