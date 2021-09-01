import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  ChallengeCreateRequest,
  ChallengeService,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';

@Component({
  selector: 'rocc-challenge-new',
  templateUrl: './challenge-new.component.html',
  styleUrls: ['./challenge-new.component.scss'],
})
export class ChallengeNewComponent implements OnInit {
  newChallengeForm!: FormGroup;
  errors = {
    other: undefined,
  } as { other?: string };
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private challengeService: ChallengeService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Create a new challenge • ROCC');

    this.newChallengeForm = this.formBuilder.group({
      name: new FormControl('awesome-challenge', [  // TODO validate against regex
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom
      ]),
      description: new FormControl('This is a great challenge', [
        Validators.required,
        Validators.maxLength(280),
      ]),
    });
  }

  get name() {
    return this.newChallengeForm.get('name');
  }

  get description() {
    return this.newChallengeForm.get('description');
  }

  getNameErrorMessage(): string {
    if (
      this.name?.hasError('required') ||
      this.name?.hasError('minlength') ||
      this.name?.hasError('maxlength')
    ) {
      return 'A name between 3 and 60 characters is required.';
    } else if (this.name?.hasError('alreadyExists')) {
      return `The name ${this.name?.value} is not available.`;
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    if (this.name?.hasError('maxlength')) {
      return 'The description must not be longer than 280 characters.'; // TODO import max length value
    }
    return '';
  }

  createChallenge(): void {
    if (this.newChallengeForm.invalid) {
      return;
    }
    this.submitted = true;
    this.errors.other = undefined;

    const challengeCreateRequest: ChallengeCreateRequest = {
      name: '',
      displayName: '',
      description: '',
      websiteUrl: '',
      status: 'active',
    };

    this.challengeService.createChallenge(challengeCreateRequest).subscribe(
      (res) => {
        console.log('ChallengeCreateResponse:', res);
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
