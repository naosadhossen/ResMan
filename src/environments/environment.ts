import { CognitoUserPool } from "amazon-cognito-identity-js";

export const environment = {
    production: false,
    cognitoUserPoolId: 'eu-north-1_r6DjJjwNO',
    cognitoAppClientId:'s1s8glfgo9luo5p9t30eg6kqt',
    apiGatewayUrl: 'https://l8ty3pjj97.execute-api.eu-north-1.amazonaws.com/prd'
}

// src/environments/environment.ts
export const apiGet = {
    production: false,
    apiGatewayUrl: 'https://l8ty3pjj97.execute-api.eu-north-1.amazonaws.com/prd'
  };
  