import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBikeComponent } from './buy-bike.component';

describe('BuyBikeComponent', () => {
  let component: BuyBikeComponent;
  let fixture: ComponentFixture<BuyBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
