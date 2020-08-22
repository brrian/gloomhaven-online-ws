import updateSession from '../../../../util/database/actions/updateSession';
import { Action, Scenario } from '../../models';
import emitEventToSession from '../../util/emitEventToSession';

interface Payload {
  scenario: Scenario;
  sessionId: string;
}

const updateScenario: Action<Payload> = async ({ sessionId, scenario }, { connectionId }) => {
  try {
    await Promise.all([
      updateSession(sessionId, { scenario }),
      emitEventToSession(
        sessionId,
        {
          action: 'scenarioUpdated',
          payload: scenario,
        },
        [connectionId]
      ),
    ]);
  } catch (error) {
    console.error(`Unable to update scenario "${sessionId}": "${error.message}"`);
  }
};

export default updateScenario;
