import {Component, OnInit} from '@angular/core';
import { ngxLoadingAnimationTypes} from 'ngx-loading';
import {LoadingService} from './shared/services/loading.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alfi-app';
  loading = false;
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor(private loadingService: LoadingService,
              private router: Router) {
    loadingService.loadingChange.subscribe((result: boolean) => {
      setTimeout(() => {
        this.loading = result;
      });
    });
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }
}
