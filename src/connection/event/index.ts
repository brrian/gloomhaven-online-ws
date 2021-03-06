import { APIGatewayProxyHandler } from 'aws-lambda';
import createSession from './actions/createSession';
import joinSession from './actions/joinSession';
import updatePlop from './actions/updatePlop';
import updateScenario from './actions/updateScenario';
import { Actions, EventBody } from './models';

const ACTIONS: Actions = {
  createSession,
  joinSession,
  updatePlop,
  updateScenario,
};

const handler: APIGatewayProxyHandler = async event => {
  const { connectionId } = event.requestContext;

  try {
    if (connectionId && event.body) {
      const { action, payload = {} } = JSON.parse(event.body) as EventBody;

      ACTIONS[action]?.(payload, { connectionId });
    }

    return {
      statusCode: 200,
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.mesage,
    };
  }
};

export default handler;
