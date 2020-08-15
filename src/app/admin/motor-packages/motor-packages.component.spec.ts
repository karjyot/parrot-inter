import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPackagesComponent } from './motor-packages.component';

describe('MotorPackagesComponent', () => {
  let component: MotorPackagesComponent;
  let fixture: ComponentFixture<MotorPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
