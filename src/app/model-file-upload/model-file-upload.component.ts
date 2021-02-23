import {Component, Output, OnInit, EventEmitter, OnDestroy} from '@angular/core';
import {FormControl, AbstractControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import {map, takeUntil, debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

const URL_REGEX = /\b(http|https)[^\s()<>]/;
const MODEL_REGEX = /model/;
const WEIGHTS_REGEX = /weights/;
const METADATA_REGEX = /metadata/;

export interface ModelFiles {
  model: File|null,
  weights: File|null,
  metadata: File|null,
}

export interface ModelUrls {
  model: string|null,
  metadata: string|null,
}

@Component({
  selector: 'app-model-file-upload',
  templateUrl: './model-file-upload.component.html',
  styleUrls: ['./model-file-upload.component.scss']
})
export class ModelFileUploadComponent implements OnInit, OnDestroy {
  @Output() files = new EventEmitter<ModelFiles>();
  @Output() urls = new EventEmitter<ModelUrls>();
  modelUrl: FormControl;
  modelFiles: ModelFiles;
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.modelFiles = {model: null, weights: null, metadata: null};
    this.modelUrl = new FormControl('', this.urlValidator);
    this.modelUrl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        map(url => ({model: `${url}model.json`, metadata: `${url}metadata.json`}))
      ).subscribe(value => {
        if(this.modelUrl.valid){
          this.urls.emit(value);
          this.modelUrl.reset();
        }
      });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions.
    this.destroy$.next();
    this.destroy$.complete();
  }

  addFile(event: Event){
    if(event.target) {
      const target = event.target as HTMLInputElement;
      for(const file of Array.from(target.files)){
        if(MODEL_REGEX.test(file.name)) this.modelFiles.model = file;
        if(WEIGHTS_REGEX.test(file.name)) this.modelFiles.weights = file;
        if(METADATA_REGEX.test(file.name)) this.modelFiles.metadata = file;
      }
      this.files.emit(this.modelFiles);
    };
  }

  private urlValidator(control: AbstractControl): ValidationErrors {
    if(control.value && !URL_REGEX.test(control.value)){
      return {'invalidURL': true};
    }
    return null;
  }

  allFilesAdded(){
    return Object.values(this.modelFiles).every(f => f);
  }
}
