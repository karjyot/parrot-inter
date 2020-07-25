import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHowItComponent } from './admin-how-it.component';

describe('AdminHowItComponent', () => {
  let component: AdminHowItComponent;
  let fixture: ComponentFixture<AdminHowItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHowItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHowItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
