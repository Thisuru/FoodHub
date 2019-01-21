// src/Auth/Auth.js

import auth0 from 'auth0-js';
import history from '../../history.js';

export default class Auth {

  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: 'food-hub.auth0.com',
    clientID: 'S1hWSRpfdveDzSKe3-2WujzhUyMBuOY_',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.loginAsShopOwner = this.loginAsShopOwner.bind(this);
    this.loginAsUser = this.loginAsUser.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);

  }

  handleAuthentication() {
  
    this.auth0.parseHash((err, authResult) => {
      console.log("authResult red")
      console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }

  

    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    console.log("authResult")
    console.log(authResult)
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('accessToken', authResult.accessToken);
    

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem('expiresAt', expiresAt);
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

  
    if(authResult.state){
        if(authResult.state=="USER"){
          history.replace('/CustomerProfile')
        }else {
          history.replace('/StarRating')
        }
        
      }
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  getProfile(cb) {
    if(!this.accessToken && localStorage.getItem('accessToken')){
      this.accessToken = localStorage.getItem('accessToken');
    }
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        console.log(profile)
      }
      cb(err, profile);
    });
  }
  

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.userProfile = null;

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // navigate to the home route
    history.replace('/');
  }

  isLoggedIn() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn;
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    if(!this.expiresAt && localStorage.getItem('expiresAt')){
       this.expiresAt = localStorage.getItem('expiresAt');
    }
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  login() {      
    this.auth0.authorize();
  }

  loginAsUser() {      
    this.auth0.authorize({
      'state' : "USER" 
    });
    
  }

  loginAsShopOwner() {      
    this.auth0.authorize({
      'state' : "SHOP_OWNER" 
    });
    
  }



  
}

  
