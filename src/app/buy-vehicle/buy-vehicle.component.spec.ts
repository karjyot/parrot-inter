import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVehicleComponent } from './buy-vehicle.component';

describe('BuyVehicleComponent', () => {
  let component: BuyVehicleComponent;
  let fixture: ComponentFixture<BuyVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
