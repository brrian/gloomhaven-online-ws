import { ClientConfiguration, DocumentClient } from 'aws-sdk/clients/dynamodb';
import createSession from './actions/createSession';
import deleteSessionById from './actions/deleteSessionById';
import getSessionById from './actions/getSessionById';
import updateSessionConnections from './actions/updateSessionConnections';

const dynamoConfig: ClientConfiguration = {};

if (process.env.IS_OFFLINE) {
  dynamoConfig.region = 'localhost';
  dynamoConfig.endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:3003';
}

export const client = new DocumentClient(dynamoConfig);

export const Schema = {
  TableName: process.env.DYNAMODB_TABLE || 'gloomhaven-online',
  Entities: {
    Session: 'SESSION',
  },
};

export { createSession, deleteSessionById, getSessionById, updateSessionConnections };
