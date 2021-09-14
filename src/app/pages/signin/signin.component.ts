import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  AuthService,
  LocalAuthRequest,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';

@Component({
  selector: 'rocc-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  signinForm!: FormGroup;
  errors = {
    other: undefined,
  } as { other?: string };
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pageTitleService: PageTitleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Sign in to ROCC • ROCC');

    this.signinForm = this.formBuilder.group({
      username: new FormControl('awesome-user', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      password: new FormControl('yourpassword', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64),
      ]),
    });
  }

  get username() {
    return this.signinForm.get('username');
  }

  get password() {
    return this.signinForm.get('password');
  }

  getUsernameErrorMessage(): string {
    if (
      this.username?.hasError('required') ||
      this.username?.hasError('minlength') ||
      this.username?.hasError('maxlength')
    ) {
      return 'A username between 3 and 25 characters is required.';
    } else if (this.username?.hasError('alreadyExists')) {
      return `The username ${this.username?.value} is not available.`;
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (
      this.password?.hasError('required') ||
      this.password?.hasError('minlength') ||
      this.password?.hasError('maxlength')
    ) {
      return 'A password between 6 and 64 characters is required.';
    }
    return '';
  }

  signin(): void {
    if (this.signinForm.invalid) {
      return;
    }
    this.submitted = true;
    this.errors.other = undefined;

    const localAuthRequest: LocalAuthRequest = {
      login: this.username?.value,
      password: this.password?.value,
    };

    this.authService.authLocal(localAuthRequest).subscribe(
      (res) => {
        console.log('localAuthRequest:', res);
        // this.router.navigate([userCreateRequest.login]);
      },
      (err) => {
        const error = err.error as RoccClientError;
        if (isRoccClientError(error)) {
          if (error.status == 409) {
            // this.username?.setErrors({
            //   alreadyExists: true,
            // });
          } else {
            this.errors.other = `Server error: ${error.title}`;
          }
        }
      }
    );
  }
}
