import {
  deleteConnectionById,
  getSessionById,
  updateSessionConnections,
} from '../../../../util/database';
import apiGatewayManagementApi from '../apiGatewayManagementApi';

export default async function emitEventToSession(
  sessionId: string,
  event: any,
  excludes?: string[]
) {
  try {
    const session = await getSessionById(sessionId);

    const staleConnections: string[] = [];

    await Promise.all(
      session.connections.map(connection => {
        if (excludes?.includes(connection)) {
          return;
        }

        return apiGatewayManagementApi
          .postToConnection({
            ConnectionId: connection,
            Data: JSON.stringify(event),
          })
          .promise()
          .catch(error => {
            if (error.statusCode === 410) {
              console.log(`Removing stale connection "${connection}"`);

              staleConnections.push(connection);

              deleteConnectionById(connection);
            } else {
              throw new Error(error);
            }
          });
      })
    );

    if (staleConnections.length) {
      const updatedConnections = session.connections.filter(
        connection => !staleConnections.includes(connection)
      );

      updateSessionConnections(sessionId, updatedConnections);
    }
  } catch (error) {
    console.log(`Unable to emit event to session: "${error.message}"`);
  }
}
