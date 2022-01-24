import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  OrganizationCreateRequest,
  OrganizationService,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';
import { Router } from '@angular/router';

@Component({
  selector: 'rocc-org-new',
  templateUrl: './org-new.component.html',
  styleUrls: ['./org-new.component.scss'],
})
export class OrgNewComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  newOrgForm!: FormGroup;
  errors = {
    other: undefined,
  } as { other?: string };

  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private orgService: OrganizationService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Set up your organization • ROCC');

    this.newOrgForm = this.formBuilder.group({
      name: new FormControl('Awesome Org', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom
      ]),
      email: new FormControl('awesome-user@example.org', [
        Validators.required,
        Validators.email,
      ]),
    });

    // this.name?.valueChanges.subscribe(name => console.log(`New name ${name}`));
  }

  get name() {
    return this.newOrgForm.get('name');
  }

  get email() {
    return this.newOrgForm.get('email');
  }

  getNameHint(): string {
    const login = this.generateLogin(this.name?.value);
    return (
      'This will be the name of your account on ROCC.<br>' +
      `Your URL will be: https://challenge-registry.org/${login}`
    );
  }

  getNameErrorMessage(): string {
    if (
      this.name?.hasError('required') ||
      this.name?.hasError('minlength') ||
      this.name?.hasError('maxlength')
    ) {
      return 'A name between 3 and 25 characters is required.';
    } else if (this.name?.hasError('alreadyExists')) {
      return `The name ${this.name?.value} is not available.`;
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required') || this.email?.hasError('email')) {
      return 'You must enter a valid email.';
    }
    return '';
  }

  private generateLogin(name: string): string {
    return name.split(' ').join('-').toLowerCase();
  }

  createOrgAccount(): void {
    if (this.newOrgForm.invalid) {
      return;
    }
    this.submitted = true;
    this.errors.other = undefined;

    const orgCreateRequest: OrganizationCreateRequest = {
      login: this.generateLogin(this.name?.value),
      email: this.email?.value,
    };

    this.orgService.createOrganization(orgCreateRequest).subscribe(
      (res) => {
        console.log('OrgCreateResponse:', res);
        this.router.navigate([orgCreateRequest.login]);
      },
      (err) => {
        const error = err.error as RoccClientError;
        if (isRoccClientError(error)) {
          if (error.status === 409) {
            this.name?.setErrors({
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
