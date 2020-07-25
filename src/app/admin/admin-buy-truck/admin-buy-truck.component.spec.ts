import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyTruckComponent } from './admin-buy-truck.component';

describe('AdminBuyTruckComponent', () => {
  let component: AdminBuyTruckComponent;
  let fixture: ComponentFixture<AdminBuyTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
