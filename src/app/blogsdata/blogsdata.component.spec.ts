import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsdataComponent } from './blogsdata.component';

describe('BlogsdataComponent', () => {
  let component: BlogsdataComponent;
  let fixture: ComponentFixture<BlogsdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
