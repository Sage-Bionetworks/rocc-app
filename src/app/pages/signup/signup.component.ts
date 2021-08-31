import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { PageTitleService } from '@sage-bionetworks/sage-angular';

@Component({
  selector: 'rocc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  signupForm!: FormGroup;
  errors = {
    email: undefined,
    other: undefined,
  };
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Join ROCC • ROCC');

    this.signupForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64),
      ]),
      username: new FormControl('', [
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
    }
    return '';
  }

  createUserAccount(): void {}
}
