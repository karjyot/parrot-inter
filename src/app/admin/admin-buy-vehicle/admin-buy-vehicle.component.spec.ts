import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyVehicleComponent } from './admin-buy-vehicle.component';

describe('AdminBuyVehicleComponent', () => {
  let component: AdminBuyVehicleComponent;
  let fixture: ComponentFixture<AdminBuyVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
