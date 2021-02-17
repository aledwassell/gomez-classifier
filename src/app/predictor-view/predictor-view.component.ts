import {Component, Input} from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import {Subject} from 'rxjs';
import {ModelFiles} from '../model-file-upload/model-file-upload.component';

type Drawable = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;

@Component({
  selector: 'app-predictor-view',
  templateUrl: './predictor-view.component.html',
  styleUrls: ['./predictor-view.component.scss']
})
export class PredictorViewComponent {
  private model: tmImage.CustomMobileNet = null;
  private destroy$ = new Subject();
  @Input('image') image: Drawable;
  predictions = null;

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Loads the model from provided file.
  async loadModelFromFile(files: ModelFiles){
    this.model = await tmImage.loadFromFiles(files.model, files.weights, files.metadata);
    this.loop();
  }

  // Loads the model from provided URL.
  async loadModelFromUrl(url: string){
    this.model = await tmImage.load(url);
    this.loop();
  }

  private async loop() {
    this.predict(this.image);
    window.requestAnimationFrame(() => this.loop());
  }

  private async predict(image: Drawable){
    this.predictions = await this.model.predict(image);
  }
}
