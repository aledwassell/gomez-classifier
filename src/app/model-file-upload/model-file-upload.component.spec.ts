import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelFileUploadComponent } from './model-file-upload.component';

describe('ModelFileUploadComponent', () => {
  let component: ModelFileUploadComponent;
  let fixture: ComponentFixture<ModelFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
