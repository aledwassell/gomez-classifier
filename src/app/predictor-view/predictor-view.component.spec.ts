import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as tmImage from '@teachablemachine/image';
import { PredictorViewComponent } from './predictor-view.component';

describe('PredictorViewComponent', () => {
  let comp: PredictorViewComponent;
  let fixture: ComponentFixture<PredictorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictorViewComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictorViewComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads model from files', () => {
    const model = new Blob([""], { type: 'application/json' }) as File;
    const weights = new Blob([""], { type: 'text/bin' }) as File;
    const metadata = new Blob([""], { type: 'application/json' }) as File;
    comp.loadModelFromFile({model, weights, metadata});
    // spyOn(comp['loop']);

    // expect(comp['loop']).toHaveBeenCalled();
  });
});
