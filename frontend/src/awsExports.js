const amplifyAuth = {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_t2k3bBj7B',
      userPoolWebClientId: '11rhsugidc5dspcofo86ec77ed',
      mandatorySignIn: true,
      oauth: {
        domain: 'drifter-coms6998.auth.us-east-1.amazoncognito.com',
        scope: ['openid'],
        redirectSignIn: 'https://d1k6d57tbwe8ks.cloudfront.net/',
        redirectSignOut: 'https://d1k6d57tbwe8ks.cloudfront.net/',
        responseType: 'code',
      }
    }
};

export default amplifyAuth;
// if we need to expand this, reference this: https://stackoverflow.com/a/65427415