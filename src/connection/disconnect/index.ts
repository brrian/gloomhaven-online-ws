import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  deleteConnectionById,
  getConnectionById,
  getSessionById,
  updateSessionConnections,
  deleteSessionById,
} from '../../util/database';

const handler: APIGatewayProxyHandler = async event => {
  const { connectionId } = event.requestContext;

  if (connectionId) {
    const connection = await getConnectionById(connectionId);

    if (connection.sessionId) {
      const session = await getSessionById(connection.sessionId);

      const connections = session.connections.filter(connection => connection !== connectionId);

      if (connections.length === 0) {
        deleteSessionById(connection.sessionId);
      } else {
        updateSessionConnections(connection.sessionId, connections);
      }
    }

    deleteConnectionById(connectionId);
  }

  return {
    statusCode: 200,
    body: '',
  };
};

export default handler;
