import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Path} from '../path';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  get(part: string, channelId: string, maxResults: number) {
    console.log(Path.GET_YT_ACTIVITY)
    return this.http.get(Path.GET_YT_ACTIVITY + `&part=${part}&channelId=${channelId}&maxResults=${maxResults}`, {}).pipe(map(res => {
      return res;
    }));
  }
}
