import fetch from 'node-fetch';
import {
  ClientBuilder,
  // PasswordAuthMiddlewareOptions,

  // Import middlewares
  // type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = <string>process.env.REACT_APP_KEY;
const scopes = [<string>process.env.REACT_APP_SCOPE];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${process.env.REACT_APP_REGION}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: <string>process.env.REACT_APP_CLIENT_ID,
    clientSecret: <string>process.env.REACT_APP_SECRET_KEY,
  },
  scopes,
  fetch,
};

// const options: AnonymousAuthMiddlewareOptions = {
//   host: `https://auth.${process.env.REACT_APP_REGION}.commercetools.com`,
//   projectKey: projectKey,
//   credentials: {
//     clientId: <string>process.env.REACT_APP_CLIENT_ID,
//     clientSecret: <string>process.env.REACT_APP_SECRET_KEY,
//     anonymousId: process.env.CTP_ANONYMOUS_ID, // a unique id
//   },
//   scopes: [`manage_project:${projectKey}`],
//   fetch,
// };

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${process.env.REACT_APP_REGION}.commercetools.com`,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  // .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
