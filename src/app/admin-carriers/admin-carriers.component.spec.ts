import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarriersComponent } from './admin-carriers.component';

describe('AdminCarriersComponent', () => {
  let component: AdminCarriersComponent;
  let fixture: ComponentFixture<AdminCarriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
