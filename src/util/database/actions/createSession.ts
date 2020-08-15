import { client as db, Schema } from '..';
import { Session } from '../../../connection/event/models';

export default async function createSession(
  sessionId: string,
  connectionId: string
): Promise<Session> {
  const session: Session = {
    connections: [connectionId],
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
