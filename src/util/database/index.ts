import { ClientConfiguration, DocumentClient } from 'aws-sdk/clients/dynamodb';
import createConnection from './actions/createConnection';
import createSession from './actions/createSession';
import deleteConnectionById from './actions/deleteConnectionById';
import deleteSessionById from './actions/deleteSessionById';
import getConnectionById from './actions/getConnectionById';
import getSessionById from './actions/getSessionById';
import setSessionForConnection from './actions/setSessionForConnection';
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
    Connection: 'CONNECTION',
    Session: 'SESSION',
  },
};

export {
  createConnection,
  createSession,
  deleteConnectionById,
  deleteSessionById,
  getConnectionById,
  getSessionById,
  setSessionForConnection,
  updateSessionConnections,
};
