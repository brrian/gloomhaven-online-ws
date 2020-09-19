import { Action } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';

const ping: Action = async ({}, { connectionId }) => {
  try {
    await emitEventToConnection(connectionId, {
      action: 'pong',
    });
  } catch (error) {
    console.error(`Unable to send pong to "${connectionId}": "${error.message}"`);
  }
};

export default ping;
