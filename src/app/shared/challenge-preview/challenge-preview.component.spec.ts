import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengePreviewComponent } from './challenge-preview.component';

describe('ChallengePreviewComponent', () => {
  let component: ChallengePreviewComponent;
  let fixture: ComponentFixture<ChallengePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
