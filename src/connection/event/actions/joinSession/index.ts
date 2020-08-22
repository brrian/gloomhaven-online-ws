import { getSessionById, updateSessionConnections } from '../../../../util/database';
import { Action } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';
import emitEventToSession from '../../util/emitEventToSession';

interface Payload {
  sessionId: string;
}

const joinSession: Action<Payload> = async ({ sessionId }, { connectionId }) => {
  try {
    const session = await getSessionById(sessionId);

    await Promise.all([
      session.connections.includes(connectionId) === false
        ? updateSessionConnections(sessionId, [...session.connections, connectionId])
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
          payload: connectionId,
        },
        [connectionId]
      ),
    ]);
  } catch (error) {
    console.error(`Unable to join session "${sessionId}": "${error.message}"`);
  }
};

export default joinSession;
