import {
  deleteConnectionById,
  getConnectionById,
  getSessionById,
  updateSessionConnections,
} from '../../../../util/database';
import apiGatewayManagementApi from '../apiGatewayManagementApi';

export default async function emitEventToConnection(connectionId: string, event: any) {
  try {
    apiGatewayManagementApi
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(event),
      })
      .promise()
      .catch(async error => {
        if (error.statusCode === 410) {
          console.log(`Removing stale connection "${connectionId}"`);

          const { sessionId } = await getConnectionById(connectionId);

          if (sessionId) {
            const session = await getSessionById(sessionId);

            const updatedConnections = session.connections.filter(
              connection => connection !== connectionId
            );

            updateSessionConnections(sessionId, updatedConnections);
          }

          deleteConnectionById(connectionId);
        } else {
          throw new Error(error);
        }
      });
  } catch (error) {
    console.log(`Unable to emit event to connection: "${error.message}"`);
  }
}
