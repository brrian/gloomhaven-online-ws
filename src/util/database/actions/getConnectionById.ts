import { client as db, Schema } from '..';

interface Connection {
  sessionId?: string;
}

export default async function getConnectionById(connectionId: string): Promise<Connection> {
  const { Item } = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Connection}#${connectionId}`,
        sk: Schema.Entities.Connection,
      },
    })
    .promise();

  if (!Item) {
    throw new Error('getConnectionById returned empty data');
  }

  return Item as Connection;
}
