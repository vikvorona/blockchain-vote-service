import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingAnswerComponent } from './voting-answer.component';

describe('VotingAnswerComponent', () => {
  let component: VotingAnswerComponent;
  let fixture: ComponentFixture<VotingAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
