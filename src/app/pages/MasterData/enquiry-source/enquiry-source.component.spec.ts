import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirySourceComponent } from './enquiry-source.component';

describe('EnquirySourceComponent', () => {
  let component: EnquirySourceComponent;
  let fixture: ComponentFixture<EnquirySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirySourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
