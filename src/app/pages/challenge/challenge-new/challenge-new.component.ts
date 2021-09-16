import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  ChallengeCreateRequest,
  ChallengePlatformService,
  ChallengeService,
  ModelError as RoccClientError,
  Organization,
  UserService,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rocc-challenge-new',
  templateUrl: './challenge-new.component.html',
  styleUrls: ['./challenge-new.component.scss'],
})
export class ChallengeNewComponent implements OnInit, OnDestroy {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  newChallengeForm!: FormGroup;
  errors = {
    other: undefined,
  } as { other?: string };
  submitted = false;
  orgs: Organization[] = [];
  private subscriptions: Subscription[] = [];

  platformId!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private challengeService: ChallengeService,
    private challengePlatformService: ChallengePlatformService,
    private pageTitleService: PageTitleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Create a new challenge • ROCC');

    const orgsSub = this.userService
      .listAuthenticatedUserOrganizations()
      .pipe(map((page) => page.organizations))
      .subscribe((orgs) => (this.orgs = orgs));
    this.subscriptions.push(orgsSub);

    this.newChallengeForm = this.formBuilder.group({
      accountName: new FormControl('awesome-org', [Validators.required]),
      name: new FormControl('awesome-challenge', [
        // TODO validate against regex
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

    this.challengePlatformService
      .listChallengePlatforms()
      .subscribe((platforms) => {
        this.platformId = platforms.challengePlatforms[0].id;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get accountName(): AbstractControl | null {
    return this.newChallengeForm.get('accountName');
  }

  get name(): AbstractControl | null {
    return this.newChallengeForm.get('name');
  }

  get description(): AbstractControl | null {
    return this.newChallengeForm.get('description');
  }

  getAccountNameErrorMessage(): string {
    if (this.accountName?.hasError('required')) {
      return 'An account name is required.';
    }
    return '';
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

    const accountName = this.accountName?.value;
    const challengeCreateRequest: ChallengeCreateRequest = {
      name: this.name?.value,
      description: this.description?.value,
      platformId: this.platformId, // TODO allow the user to pick
      status: 'active', // TODO no longer required
    };

    this.challengeService
      .createChallenge(accountName, challengeCreateRequest)
      .subscribe(
        (res) => {
          console.log('ChallengeCreateResponse:', res);
          this.router.navigate([
            `${accountName}/${challengeCreateRequest.name}`,
          ]);
        },
        (err) => {
          const error = err.error as RoccClientError;
          if (isRoccClientError(error)) {
            if (error.status == 409) {
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
