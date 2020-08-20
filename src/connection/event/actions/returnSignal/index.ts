import { Action } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';

interface Payload {
  targetConnection: string;
  signal: string;
}

const returnSignal: Action<Payload> = async ({ targetConnection, signal }, { connectionId }) => {
  try {
    emitEventToConnection(targetConnection, {
      action: 'returnSignalReceived',
      payload: {
        connectionId,
        signal,
      },
    });
  } catch (error) {
    console.error(`Unable to send signal to "${targetConnection}": "${error.message}"`);
  }
};

export default returnSignal;
