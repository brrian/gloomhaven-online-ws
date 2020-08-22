import apiGatewayManagementApi from '../apiGatewayManagementApi';

export default async function emitEventToConnection(connectionId: string, event: any) {
  try {
    await apiGatewayManagementApi
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(event),
      })
      .promise()
      .catch(async error => {
        if (error.statusCode === 410) {
          console.log(`Found stale connection "${connectionId}"`);
        } else {
          throw new Error(error);
        }
      });
  } catch (error) {
    console.log(`Unable to emit event to connection: "${error.message}"`);
  }
}
