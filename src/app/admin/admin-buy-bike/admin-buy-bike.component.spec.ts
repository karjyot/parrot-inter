import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyBikeComponent } from './admin-buy-bike.component';

describe('AdminBuyBikeComponent', () => {
  let component: AdminBuyBikeComponent;
  let fixture: ComponentFixture<AdminBuyBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
