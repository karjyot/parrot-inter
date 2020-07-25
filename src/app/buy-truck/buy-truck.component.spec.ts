import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTruckComponent } from './buy-truck.component';

describe('BuyTruckComponent', () => {
  let component: BuyTruckComponent;
  let fixture: ComponentFixture<BuyTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
