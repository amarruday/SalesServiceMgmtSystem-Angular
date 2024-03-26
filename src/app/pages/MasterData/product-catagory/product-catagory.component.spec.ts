import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatagoryComponent } from './product-catagory.component';

describe('ProductCatagoryComponent', () => {
  let component: ProductCatagoryComponent;
  let fixture: ComponentFixture<ProductCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCatagoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
