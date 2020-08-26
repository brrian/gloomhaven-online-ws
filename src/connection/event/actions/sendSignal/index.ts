import { getSessionById } from '../../../../util/database';
import { Action, Connection } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';

interface Payload {
  sessionId: string;
  signal: string;
  targetConnection: Connection;
}

const sendSignal: Action<Payload> = async (
  { sessionId, signal, targetConnection },
  { connectionId }
) => {
  const { connections } = await getSessionById(sessionId);

  const connection = connections.find(({ id }) => id === connectionId);

  try {
    await emitEventToConnection(targetConnection.id, {
      action: 'signalReceived',
      payload: {
        connection,
        signal,
      },
    });
  } catch (error) {
    console.error(`Unable to send signal to "${targetConnection}": "${error.message}"`);
  }
};

export default sendSignal;
