import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingFilterComponent } from './voting-filter.component';

describe('VotingFilterComponent', () => {
  let component: VotingFilterComponent;
  let fixture: ComponentFixture<VotingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
