const amplifyAuth = {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_t2k3bBj7B',
      userPoolWebClientId: '11rhsugidc5dspcofo86ec77ed',
      mandatorySignIn: true,
      oauth: {
        domain: 'drifter-coms6998.auth.us-east-1.amazoncognito.com',
        scope: ['openid'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'code',
      }
    }
};

export default amplifyAuth;
// if we need to expand this, reference this: https://stackoverflow.com/a/65427415