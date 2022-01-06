import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Organization } from '@sage-bionetworks/rocc-client-angular';

@Injectable({
  providedIn: 'root',
})
export class OrgDataService {
  private org: BehaviorSubject<Organization | undefined> = new BehaviorSubject<
    Organization | undefined
  >(undefined);

  setOrg(org: Organization | undefined): void {
    this.org.next(org);
  }

  getOrg(): Observable<Organization | undefined> {
    return this.org.asObservable();
    // .pipe(filter((challenge) => challenge !== undefined));
  }
}
