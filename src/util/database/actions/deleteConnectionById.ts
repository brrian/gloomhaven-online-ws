import { client as db, Schema } from '..';

export default async function deleteConnectionById(connectionId: string): Promise<void> {
  await db
    .delete({
      TableName: Schema.TableName,
      Key: {
        pk: `${Schema.Entities.Connection}#${connectionId}`,
        sk: Schema.Entities.Connection,
      },
    })
    .promise();
}
