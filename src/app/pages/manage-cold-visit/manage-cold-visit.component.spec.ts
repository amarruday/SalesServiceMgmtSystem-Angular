import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageColdVisitComponent } from './manage-cold-visit.component';

describe('ManageColdVisitComponent', () => {
  let component: ManageColdVisitComponent;
  let fixture: ComponentFixture<ManageColdVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageColdVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageColdVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
