import { client as db, Schema } from '..';

export default async function deleteSessionById(sessionId: string): Promise<void> {
  db.delete({
    TableName: Schema.TableName,
    Key: {
      pk: `${Schema.Entities.Session}#${sessionId}`,
      sk: Schema.Entities.Session,
    },
  }).promise();
}
