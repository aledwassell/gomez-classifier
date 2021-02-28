import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Title} from '@angular/platform-browser';

describe('AppComponent', () => {
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{provide: Title, useClass: Title}],
    }).compileComponents();
  });

  it(`title is 'Machine Learning Webcam'`, () => {
    titleService = TestBed.get(Title);
    TestBed.createComponent(AppComponent);

    expect(titleService.getTitle()).toBe('Machine Learning Webcam');
  });
});
