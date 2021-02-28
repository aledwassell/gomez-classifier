import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import {Subject} from 'rxjs';
import {ModelFiles, ModelUrls} from '../model-file-upload/model-file-upload.component';

type Drawable = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;

interface Prediction {
  className: string;
  probability: any|number|bigint;
}

@Component({
  selector: 'app-predictor-view',
  templateUrl: './predictor-view.component.html',
  styleUrls: ['./predictor-view.component.scss']
})
export class PredictorViewComponent implements OnDestroy {
  private model: tmImage.CustomMobileNet = null;
  private destroy$ = new Subject();
  @Input('image') image: Drawable;
  @Output('predictionEvent') predictionEvent = new EventEmitter();
  predictions: Prediction[]|null = null;
  selectedPredictionIndex: number;
  barGraphColors: string[] = [];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Loads the model from provided file.
  async loadModelFromFile({model, weights, metadata}: ModelFiles): Promise<void> {
    this.model = await tmImage.loadFromFiles(model, weights, metadata);
    this.loop();
  }

  // Loads the model from provided URL.
  async loadModelFromUrl({model, metadata}: ModelUrls): Promise<void> {
    this.model = await tmImage.load(model, metadata);
    this.loop();
  }

  private async loop(): Promise<void> {
    this.predict(this.image);
    window.requestAnimationFrame(() => this.loop());
  }

  private async predict(image: Drawable): Promise<void> {
    this.predictions = await this.model.predict(image);
    if(!this.barGraphColors.length){
      this.barGraphColors = await this.predictions.map(() => this.colorGenerator());
    }
    const selectedPrediction = this.predictions[this.selectedPredictionIndex];
    if(selectedPrediction && selectedPrediction.probability.toFixed(2) >= 1){
      console.log('emit');
      await this.predictionEvent.emit();
    }
  }

  colorGenerator(): string {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
  }
}
