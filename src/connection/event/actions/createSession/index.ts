import { v4 as uuid } from 'uuid';
import { createSession as createSessionInDb } from '../../../../util/database';
import { Action } from '../../models';
import emitEventToSession from '../../util/emitEventToSession';

interface Payload {
  name: string;
}

const createSession: Action<Payload> = async ({ name }, { connectionId }) => {
  const sessionId = process.env.IS_OFFLINE ? '1234' : uuid();

  const connection = {
    id: connectionId,
    name,
  };

  const session = await createSessionInDb(sessionId, connection);

  await emitEventToSession(sessionId, {
    action: 'sessionCreated',
    payload: session,
  });
};

export default createSession;
