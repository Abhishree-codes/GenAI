import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentsComponent } from './add-comments.component';

describe('AddCommentsComponent', () => {
  let component: AddCommentsComponent;
  let fixture: ComponentFixture<AddCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommentsComponent]
    });
    fixture = TestBed.createComponent(AddCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
