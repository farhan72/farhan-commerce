import {Injectable, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  @Output()
  loadingChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private count = 0;

  show() {
    this.count = this.count++;
    // isShow
    this.loadingChange.next(this.count > 0);
  }

  hide() {
    this.count = this.count > 1 ? this.count-- : 0;
    this.loadingChange.next(this.count > 0);
  }

  setCount(e) {
    this.count = e;
  }
}
