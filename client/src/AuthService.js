import auth0 from 'auth0-js'

class Auth {
  constructor () {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'bk-tmp.auth0.com',
      audience: 'https://micro-blog-app',
      clientID: 'ZComiPhZoVB02xOsBF81LVbpsvkjL93S',
      redirectUri: 'http://localhost:8080/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    })

    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfile = this.getProfile.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  getAccessToken () {
    return this.accessToken
  }

  getProfile () {
    return this.profile
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err)
        if (!authResult || !authResult.accessToken || !authResult.idToken) {
          return reject(err)
        }
        this.accessToken = authResult.accessToken
        this.idToken = authResult.idToken
        this.profile = authResult.idTokenPayload
        // set the time that the id token will expire at
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        resolve()
      })
    })
  }

  isAuthenticated () {
    return new Date().getTime() < this.expiresAt
  }

  signIn () {
    this.auth0.authorize()
  }

  signOut () {
    // clear id token, profile, and expiration
    this.auth0.logout({
      clientID: 'ZComiPhZoVB02xOsBF81LVbpsvkjL93S',
      returnTo: 'http://localhost:8080/'
    })
  }
}

const auth0Client = new Auth()

export default auth0Client
