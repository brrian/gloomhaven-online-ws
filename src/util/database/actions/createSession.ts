import { client as db, Schema } from '..';
import { Connection, Session } from '../../../connection/event/models';

export default async function createSession(
  sessionId: string,
  connection: Connection
): Promise<Session> {
  const session: Session = {
    connections: [connection],
    id: sessionId,
    scenario: {
      assets: {},
    },
  };

  await db
    .put({
      TableName: Schema.TableName,
      Item: {
        pk: `${Schema.Entities.Session}#${sessionId}`,
        sk: Schema.Entities.Session,
        ...session,
      },
    })
    .promise();

  return session;
}
