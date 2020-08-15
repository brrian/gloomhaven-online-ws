import { client as db, Schema } from '..';

export default async function setSessionForConnection(
  connectionId: string,
  sessionId: string
): Promise<void> {
  await db
    .update({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Connection}#${connectionId}`,
        sk: Schema.Entities.Connection,
      },
      UpdateExpression: 'set sessionId = :s',
      ExpressionAttributeValues: {
        ':s': sessionId,
      },
    })
    .promise();
}
