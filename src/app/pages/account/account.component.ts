import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import { Account, AccountService, ModelError as RoccClientError } from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';

@Component({
  selector: 'rocc-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  account$!: Observable<Account>;
  account!: Account;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.account$ = this.route.params.pipe(
      switchMap((params) => this.accountService.getAccount(params.login))
    );

    this.account$.subscribe((account) => {
      console.log('account', account);
      this.account = account;
      this.pageTitleService.setTitle(`${account.login}`);
    }, (err) => {
      const error = err.error as RoccClientError;
      if (isRoccClientError(error)) {
        if (error.status == 404) {

        }
      }
    });
  }
}
