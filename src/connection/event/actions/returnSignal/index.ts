import { getSessionById } from '../../../../util/database';
import { Action, Connection } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';

interface Payload {
  sessionId: string;
  signal: string;
  targetConnection: Connection;
}

const returnSignal: Action<Payload> = async (
  { sessionId, targetConnection, signal },
  { connectionId }
) => {
  try {
    const { connections } = await getSessionById(sessionId);

    const connection = connections.find(({ id }) => id === connectionId);

    await emitEventToConnection(targetConnection.id, {
      action: 'returnSignalReceived',
      payload: {
        connection,
        signal,
      },
    });
  } catch (error) {
    console.error(`Unable to send signal to "${targetConnection}": "${error.message}"`);
  }
};

export default returnSignal;
