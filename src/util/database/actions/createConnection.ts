import { client as db, Schema } from '..';

export default async function createConnection(connectionId: string): Promise<void> {
  db.put({
    TableName: Schema.TableName,
    Item: {
      pk: `${Schema.Entities.Connection}#${connectionId}`,
      sk: Schema.Entities.Connection,
    },
  }).promise();
}
