import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleValuationComponent } from './vehicle-valuation.component';

describe('VehicleValuationComponent', () => {
  let component: VehicleValuationComponent;
  let fixture: ComponentFixture<VehicleValuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleValuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
