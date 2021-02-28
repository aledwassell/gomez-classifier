import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModelFileUploadComponent, ModelFiles } from './model-file-upload.component';

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

  it('validates url input', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;

    el.value = 'not url';
    el.dispatchEvent(new Event('input'));

    const urlInput = fixture.debugElement.query(By.css('mat-error')).nativeElement
    expect(urlInput.textContent).toBe('Must be a URL, e.g. http:// or https://');
  });
});
