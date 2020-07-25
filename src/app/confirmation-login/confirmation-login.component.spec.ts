import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationLoginComponent } from './confirmation-login.component';

describe('ConfirmationLoginComponent', () => {
  let component: ConfirmationLoginComponent;
  let fixture: ComponentFixture<ConfirmationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
