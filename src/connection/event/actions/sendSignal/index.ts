import { Action } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';

interface Payload {
  signal: string;
  targetConnection: string;
}

const sendSignal: Action<Payload> = async ({ signal, targetConnection }, { connectionId }) => {
  try {
    emitEventToConnection(targetConnection, {
      action: 'signalReceived',
      payload: {
        connectionId,
        signal,
      },
    });
  } catch (error) {
    console.error(`Unable to send signal to "${targetConnection}": "${error.message}"`);
  }
};

export default sendSignal;
