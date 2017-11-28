import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  @ViewChild('rememberUser') rememberUser: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {
          this.router.navigate(['/advertiser/dashboard']);
        }
      );
  }
}
