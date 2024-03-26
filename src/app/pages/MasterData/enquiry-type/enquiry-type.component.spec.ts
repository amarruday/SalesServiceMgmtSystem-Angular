import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryTypeComponent } from './enquiry-type.component';

describe('EnquiryTypeComponent', () => {
  let component: EnquiryTypeComponent;
  let fixture: ComponentFixture<EnquiryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
