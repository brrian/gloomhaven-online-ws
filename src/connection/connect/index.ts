import { APIGatewayProxyHandler } from 'aws-lambda';
import { createConnection } from '../../util/database';

const handler: APIGatewayProxyHandler = async event => {
  const { connectionId } = event.requestContext;

  if (connectionId) {
    createConnection(connectionId);
  }

  return {
    statusCode: 200,
    body: '',
  };
};

export default handler;
