import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  youtubeData: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    return this.authService.login();
    // const req = {
    //   part: 'snippet,contentDetails',
    //   channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    //   maxResults: 5
    // }
    // this.authService.get(req.part, req.channelId, req.maxResults).subscribe((result) => {
    //   this.youtubeData = result;
    //   console.log(this.youtubeData);
    // });
    // this.router.navigateByUrl('dashboard');
  }
}
