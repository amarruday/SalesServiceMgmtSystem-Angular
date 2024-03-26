import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonReplyComponent } from './common-reply.component';

describe('CommonReplyComponent', () => {
  let component: CommonReplyComponent;
  let fixture: ComponentFixture<CommonReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
