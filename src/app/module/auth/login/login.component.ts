import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Result} from '../../../shared/model/responses/result';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  checkSubmit = false;
  message = 'This field is required';

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
  }

  get username_() {
    return this.loginForm.get('username');
  }
  get password_() {
    return this.loginForm.get('password');
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.checkSubmit = true;
    const value = this.loginForm.value;
    const request = {
      username: value.username,
      password: value.password
    };
    if (this.loginForm.invalid) {
      this.toastr.warning('This field is required');
      return;
    }
    this.authService.login(request).subscribe((result: Result<any>) => {
      if (result.status === true) {
        localStorage.setItem('token', result.data);
        this.router.navigate(['/dashboard']);
      }
    });
  }
  loginGoogle() {
    return this.authService.loginWithGoogle();
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
