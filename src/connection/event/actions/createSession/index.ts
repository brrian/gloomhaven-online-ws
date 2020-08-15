import { v4 as uuid } from 'uuid';
import {
  createSession as createDynamoSession,
  setSessionForConnection,
} from '../../../../util/database';
import { Action } from '../../models';
import emitEventToSession from '../../util/emitEventToSession';

const createSession: Action = async (_payload, { connectionId }) => {
  const sessionId = process.env.IS_OFFLINE ? '1234' : uuid();

  const [session] = await Promise.all([
    createDynamoSession(sessionId, connectionId),
    setSessionForConnection(connectionId, sessionId),
  ]);

  emitEventToSession(sessionId, {
    action: 'sessionCreated',
    payload: session,
  });
};

export default createSession;
