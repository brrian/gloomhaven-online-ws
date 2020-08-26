import { getSessionById, updateSessionConnections } from '../../../../util/database';
import { Action } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';
import emitEventToSession from '../../util/emitEventToSession';

interface Payload {
  name: string;
  sessionId: string;
}

const joinSession: Action<Payload> = async ({ name, sessionId }, { connectionId }) => {
  try {
    const session = await getSessionById(sessionId);

    const connection = {
      id: connectionId,
      name,
    };

    await Promise.all([
      session.connections.some(({ id }) => id === connectionId) === false
        ? updateSessionConnections(sessionId, [...session.connections, connection])
        : null,
      emitEventToConnection(connectionId, {
        action: 'sessionJoined',
        payload: {
          connections: session.connections,
          session,
        },
      }),
      emitEventToSession(
        sessionId,
        {
          action: 'userJoined',
          payload: connection,
        },
        [connectionId]
      ),
    ]);
  } catch (error) {
    console.error(`Unable to join session "${sessionId}": "${error.message}"`);
  }
};

export default joinSession;
