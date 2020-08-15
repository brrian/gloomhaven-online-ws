interface ExpressionAttributes {
  [attribute: string]: unknown;
}

export default function createUpdateExpression<TItem>(item: Partial<TItem>) {
  const updateExpressions = [];
  const expressionAttributes: ExpressionAttributes = {};

  for (const [key, value] of Object.entries(item)) {
    updateExpressions.push(`set ${key} = :${key}`);

    expressionAttributes[`:${key}`] = value;
  }

  return {
    UpdateExpression: updateExpressions.join(' '),
    ExpressionAttributeValues: expressionAttributes,
  };
}
