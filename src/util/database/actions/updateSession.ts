import { client as db, Schema } from '..';
import { Session } from '../../../connection/event/models';
import createUpdateExpression from '../util/createUpdateExpression';

export default async function updateSession(
  sessionId: string,
  session: Partial<Session>
): Promise<void> {
  await db
    .update({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Session}#${sessionId}`,
        sk: Schema.Entities.Session,
      },
      ...createUpdateExpression(session),
    })
    .promise();
}
