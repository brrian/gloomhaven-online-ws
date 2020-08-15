import { client as db, Schema } from '..';

interface Session {
  connections: string[];
}

export default async function getSessionById(sessionId: string): Promise<Session> {
  const { Item } = await db
    .get({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Session}#${sessionId}`,
        sk: Schema.Entities.Session,
      },
    })
    .promise();

  if (!Item) {
    throw new Error('getSessionById returned empty data');
  }

  return Item as Session;
}
