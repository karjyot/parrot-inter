import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItComponent } from './how-it.component';

describe('HowItComponent', () => {
  let component: HowItComponent;
  let fixture: ComponentFixture<HowItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
