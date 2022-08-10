import { CloudWatchEvents } from 'aws-sdk';

import { TASK_TOPIC } from '../common/constants';

const cw = new CloudWatchEvents();

/**
 * Creates a scheduled rule
 * @param [rule] Rule name
 * @param [seconds] Number of seconds for schedule
 */
export const addRule = (rule: string, seconds: number): void => {
  const params = {
    Name: rule,
    ScheduleExpression: `rate(${seconds} seconds)`,
    State: 'ENABLED',
  };
  cw.putRule(params);
};

/**
 * Adds lambda function target
 * @param [rule] Rule name
 * @param [target] Target name
 * @param [ammId] Amm id
 */
export const addTarget = (rule: string, target: string, ammId: string): void => {
  const params = {
    Rule: rule,
    Targets: [
      {
        Arn: TASK_TOPIC,
        Id: target,
        Input: ammId,
      },
    ],
  };
  cw.putTargets(params);
};
