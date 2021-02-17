import {Component, Output, OnInit, EventEmitter} from '@angular/core';
import {FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
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
  urlControl = new FormControl('', this.urlValidator);
  modelFiles: ModelFiles;

  ngOnInit() {
    this.modelFiles = {model: null, weights: null, metadata: null};
    this.urlControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.url.emit(value);
      });
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
    return Object.values(this.modelFiles).every(f => f);
  }
}
