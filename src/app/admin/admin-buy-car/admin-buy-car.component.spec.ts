import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyCarComponent } from './admin-buy-car.component';

describe('AdminBuyCarComponent', () => {
  let component: AdminBuyCarComponent;
  let fixture: ComponentFixture<AdminBuyCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
