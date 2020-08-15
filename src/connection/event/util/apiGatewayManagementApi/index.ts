import { ApiGatewayManagementApi } from 'aws-sdk';

const apiGatewayManagementApi = new ApiGatewayManagementApi({
  apiVersion: '2029',
  endpoint: process.env.API_GW_ENDPOINT ?? 'http://localhost:3001',
});

export default apiGatewayManagementApi;
