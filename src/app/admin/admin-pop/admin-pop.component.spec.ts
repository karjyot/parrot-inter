import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPopComponent } from './admin-pop.component';

describe('AdminPopComponent', () => {
  let component: AdminPopComponent;
  let fixture: ComponentFixture<AdminPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
