import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictorViewComponent } from './predictor-view.component';

describe('PredictorViewComponent', () => {
  let component: PredictorViewComponent;
  let fixture: ComponentFixture<PredictorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
