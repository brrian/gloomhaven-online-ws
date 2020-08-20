import { getSessionById, updateSessionConnections } from '../../../../util/database';
import { Action } from '../../models';
import emitEventToSession from '../../util/emitEventToSession';

interface Payload {
  sessionId: string;
}

const leaveSession: Action<Payload> = async ({ sessionId }, { connectionId }) => {
  try {
    const session = await getSessionById(sessionId);

    session.connections = session.connections.filter(connection => connection !== connectionId);

    await updateSessionConnections(sessionId, session.connections);

    emitEventToSession(sessionId, {
      action: 'userLeft',
      payload: connectionId,
    });
  } catch (error) {
    console.error(`Unable to leave session "${sessionId}": "${error.message}"`);
  }
};

export default leaveSession;
