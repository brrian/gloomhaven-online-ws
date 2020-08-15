import { Action, Plop } from '../../models';
import emitEventToSession from '../../util/emitEventToSession';

interface Payload {
  plop: Plop;
  sessionId: string;
}

const updatePlop: Action<Payload> = async ({ plop, sessionId }, { connectionId }) => {
  emitEventToSession(
    sessionId,
    {
      action: 'plopUpdated',
      payload: plop,
    },
    [connectionId]
  );
};

export default updatePlop;
