export enum AuthActionTypes {
  // Signup
  SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST',
  SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS',
  SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE',

  // Login
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = 'auth/LOGIN_FAILURE',

  // Logout - tmp
  LOGOUT = 'auth/LOGOUT',

  // Refresh
  REFRESH_REQUEST = 'auth/REFRESH_REQUEST',
  REFRESH_SUCCESS = 'auth/REFRESH_SUCCESS',
  REFRESH_FAILURE = 'auth/REFRESH_FAILURE',

  // Authenticated
  SET_AUTHENTICATED = 'auth/SET_AUTHENTICATED',
}