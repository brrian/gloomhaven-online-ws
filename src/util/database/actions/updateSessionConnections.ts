import { client as db, Schema } from '..';
import { Connection } from '../../../connection/event/models';

export default async function updateSessionConnections(
  sessionId: string,
  connections: Connection[]
): Promise<void> {
  await db
    .update({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Session}#${sessionId}`,
        sk: Schema.Entities.Session,
      },
      UpdateExpression: 'set connections = :c',
      ExpressionAttributeValues: {
        ':c': connections,
      },
    })
    .promise();
}
