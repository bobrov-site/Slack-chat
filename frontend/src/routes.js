const apiPath = 'api/v1';

export default {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
};
