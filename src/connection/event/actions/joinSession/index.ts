import {
  getSessionById,
  setSessionForConnection,
  updateSessionConnections,
} from '../../../../util/database';
import { Action } from '../../models';
import emitEventToConnection from '../../util/emitEventToConnection';

interface Payload {
  sessionId: string;
}

const joinSession: Action<Payload> = async ({ sessionId }, { connectionId }) => {
  try {
    setSessionForConnection(connectionId, sessionId);

    const session = await getSessionById(sessionId);

    if (session.connections.includes(connectionId) === false) {
      await updateSessionConnections(sessionId, [...session.connections, connectionId]);
    }

    emitEventToConnection(connectionId, {
      action: 'sessionJoined',
      payload: session,
    });
  } catch (error) {
    console.error(`Unable to join session "${sessionId}": "${error.message}"`);
  }
};

export default joinSession;
