import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAdComponent } from './admin-edit-ad.component';

describe('AdminEditAdComponent', () => {
  let component: AdminEditAdComponent;
  let fixture: ComponentFixture<AdminEditAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
