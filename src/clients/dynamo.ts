import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { TASK_TABLE } from '../common/constants';
import { ScheduledTask } from '../common/types';

const db = new DocumentClient();

/**
 * Gets all tasks
 * @returns {Promise.<ScheduledTask[]>} Requested tasks
 */
export const getAllTasks = async (): Promise<ScheduledTask[]> => {
  const params = {
    TableName: TASK_TABLE,
  };
  return <ScheduledTask[]>(await db.scan(params).promise()).Items;
};

/**
 * Gets selected task
 * @param [key] Task key
 * @returns {Promise.<ScheduledTask>} Requested task
 */
export const getTask = async (key: string): Promise<ScheduledTask> => {
  const params = {
    TableName: TASK_TABLE,
    Key: {
      ammId: key,
    },
  };
  return <ScheduledTask>(await db.get(params).promise()).Item;
};

/**
 * Creates new task if it does not exist already
 * @param [task] Task to be created
 */
export const createTask = async (task: ScheduledTask): Promise<void> => {
  const params = {
    TableName: TASK_TABLE,
    Item: task,
  };
  await db.put(params).promise();
};

/**
 * Updates existing task with new payment timestamps
 * @param [key] Key of the task to be updated
 * @param [lastPayment] New last payment timestamp
 * @param [nextPayment] New next payment timestamp
 */
export const updateTask = async (
  key: string,
  lastPayment: number,
  nextPayment: number,
): Promise<void> => {
  const params = {
    TableName: TASK_TABLE,
    Key: {
      ammId: key,
    },
    UpdateExpression: 'set lastPayment = :newLastPayment, nextPayment = :newNextPayment',
    ExpressionAttributeValues: {
      ':newLastPayment': lastPayment,
      ':newNextPayment': nextPayment,
    },
  };
  await db.update(params).promise();
};

/**
 * Removes selected scheduled task
 * @param [key] Task key
 */
export const deleteTask = async (key: string): Promise<void> => {
  const params = {
    TableName: TASK_TABLE,
    Key: {
      ammId: key,
    },
  };
  await db.delete(params).promise();
};
