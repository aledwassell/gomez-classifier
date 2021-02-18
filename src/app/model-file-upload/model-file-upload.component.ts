import {Component, Output, OnInit, EventEmitter} from '@angular/core';
import {FormControl, AbstractControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

const URL_REGEX = /\b(http|https)[^\s()<>]/;
const MODEL_REGEX = /model/;
const WEIGHTS_REGEX = /weights/;
const METADATA_REGEX = /metadata/;

export interface ModelFiles {
  model: File|null,
  weights: File|null,
  metadata: File|null,
}

@Component({
  selector: 'app-model-file-upload',
  templateUrl: './model-file-upload.component.html',
  styleUrls: ['./model-file-upload.component.scss']
})
export class ModelFileUploadComponent implements OnInit {
  @Output() files = new EventEmitter<ModelFiles>();
  @Output() url = new EventEmitter<string>();
  urlControls: FormGroup;
  modelFiles: ModelFiles;

  ngOnInit() {
    this.modelFiles = {model: null, weights: null, metadata: null};
    this.urlControls = new FormGroup({
      'modelUrl': new FormControl('', [Validators.required, this.urlValidator]),
      'metadataUrl': new FormControl('', [Validators.required, this.urlValidator]),
    })
    this.urlControls.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        console.log(value);
        // this.url.emit(value);
      });
  }

  get getModelUrl(): AbstractControl {
    return this.urlControls.get('modelUrl');
  }

  get getMetadataUrl(): AbstractControl {
    return this.urlControls.get('metadataUrl');
  }

  addFile(event: Event){
    if(!event.target) return;
    const target = event.target as HTMLInputElement;
    for(const file of Array.from(target.files)){
      if(MODEL_REGEX.test(file.name)) this.modelFiles.model = file;
      if(WEIGHTS_REGEX.test(file.name)) this.modelFiles.weights = file;
      if(METADATA_REGEX.test(file.name)) this.modelFiles.metadata = file;
    }
  }

  submitFiles(){
    this.files.emit(this.modelFiles);
  }

  private urlValidator(control: AbstractControl): ValidationErrors {
    if(control.value && !URL_REGEX.test(control.value)){
      return {'invalidURL': true};
    }
    return null;
  }

  allFilesAdded(){
    console.log(this.getMetadataUrl);
    return Object.values(this.modelFiles).every(f => f);
  }
}
