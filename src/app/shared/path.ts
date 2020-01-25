import {environment} from '../../environments/environment';

export class Path {
  static API_V1 = environment.API_BACKEND + 'v1/';
  static API_YT = environment.API_YOUTUBE;
  static KEY = environment.apiKey;

  // EndPoint
  static GET_YT_ACTIVITY = Path.API_YT + `playlists?key=${Path.KEY}`;
  static AUTH_LOGIN = Path.API_V1 + 'auth/login';
}
