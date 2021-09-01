import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  UserService,
  UserCreateRequest,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';

@Component({
  selector: 'rocc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  signupForm!: FormGroup;
  errors = {
    other: undefined,
  } as { other?: string };
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Join ROCC • ROCC');

    this.signupForm = this.formBuilder.group({
      email: new FormControl('awesome-user@example.org', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('awesome-password', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64),
      ]),
      username: new FormControl('awesome-user', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom
      ]),
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get username() {
    return this.signupForm.get('username');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required') || this.email?.hasError('email')) {
      return 'You must enter a valid email.';
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

  getUsernameErrorMessage(): string {
    if (
      this.username?.hasError('required') ||
      this.username?.hasError('minlength') ||
      this.username?.hasError('maxlength')
    ) {
      return 'A username between 3 and 25 characters is required.';
    } else if (this.username?.hasError('alreadyExists')) {
      return `Username ${this.username?.value} is not available.`;
    }
    return '';
  }

  createUserAccount(): void {
    if (this.signupForm.invalid) {
      return;
    }
    this.submitted = true;
    this.errors.other = undefined;

    const userCreateRequest: UserCreateRequest = {
      login: this.username?.value,
      email: this.email?.value,
    };

    this.userService.createUser(userCreateRequest).subscribe(
      (res) => {
        console.log('UserCreateResponse:', res);
      },
      (err) => {
        const error = err.error as RoccClientError;
        if (isRoccClientError(error)) {
          if (error.status == 409) {
            this.username?.setErrors({
              alreadyExists: true,
            });
          } else {
            this.errors.other = `Server error: ${error.title}`;
          }
        }
      }
    );
  }
}
