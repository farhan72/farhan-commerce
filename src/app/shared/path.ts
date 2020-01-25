import {environment} from '../../environments/environment';

export class Path {
  static API_V3 = environment.API_URL;
  static KEY = environment.apiKey;

  // EndPoint
  static GET_YT_ACTIVITY = Path.API_V3 + `playlists?key=${Path.KEY}`;
}
