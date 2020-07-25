import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCheckComponent } from './vehicle-check.component';

describe('VehicleCheckComponent', () => {
  let component: VehicleCheckComponent;
  let fixture: ComponentFixture<VehicleCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
