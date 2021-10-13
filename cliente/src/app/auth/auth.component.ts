import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the last piece of the URL (it's either 'login' or 'register')
    this.authType = this.router.url;
    // Set a title for the page accordingly
    this.title = (this.authType === '/login') ? 'Sign in' : 'Sign up';
    // add form control for username if this is the register page
    if (this.authType === '/register') {
      this.authForm.addControl('username', new FormControl());
    }
    this.cd.markForCheck();
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }
}
