import { v4 as uuid } from 'uuid';
import { createSession as createSessionInDb } from '../../../../util/database';
import { Action } from '../../models';
import emitEventToSession from '../../util/emitEventToSession';

const createSession: Action = async (_payload, { connectionId }) => {
  const sessionId = process.env.IS_OFFLINE ? '1234' : uuid();

  const session = await createSessionInDb(sessionId, connectionId);

  await emitEventToSession(sessionId, {
    action: 'sessionCreated',
    payload: session,
  });
};

export default createSession;
