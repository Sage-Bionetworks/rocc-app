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
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom
      ]),

      email: ['', [Validators.required, Validators.email]],
      // passwordGroup: formBuilder.group({
      //   password: ['', [Validators.required]],
      //   confirmPassword: ['', [Validators.required]],
      // }), // , { validator: PasswordValidation.matchPassword }
    });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  getUsernameErrorMessage(): string {
    if (
      this.username?.hasError('required') ||
      this.username?.hasError('minlength') ||
      this.username?.hasError('maxlength')
    ) {
      return 'A username between 3 and 64 characters is required.';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required') || this.email?.hasError('email')) {
      return 'You must enter a valid email';
    }
    return '';
  }

  createUserAccount(): void {}
}
