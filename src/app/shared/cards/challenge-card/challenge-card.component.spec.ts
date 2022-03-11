import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCardComponent } from './challenge-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CardPreviewComponent', () => {
  let component: ChallengeCardComponent;
  let fixture: ComponentFixture<ChallengeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallengeCardComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
