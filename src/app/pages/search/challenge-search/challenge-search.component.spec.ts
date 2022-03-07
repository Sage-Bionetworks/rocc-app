import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeSearchComponent } from './challenge-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FooterModule, PageTitleService } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { FiltersModule } from '@shared/filters/filters.module';
import { SearchRoutingModule } from '../search-routing.module';
import { SearchComponent } from '../search.component';
import { ChallengeCardModule } from '@app/shared/cards/challenge-card/challenge-card.module';
import { PrimengModule } from '@shared/primeng/primeng.module';

describe('ChallengeSearchComponent', () => {
  let component: ChallengeSearchComponent;
  let fixture: ComponentFixture<ChallengeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallengeSearchComponent, SearchComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FooterModule,
        MaterialModule,
        FiltersModule,
        ChallengeCardModule,
        SearchRoutingModule,
        PrimengModule,
      ],
      providers: [HttpClient, PageTitleService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
