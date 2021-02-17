import { Component, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import { Subject, from } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-webcam',
  template: '<video autoplay muted width="265" height="265" #video></video>',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {
  private destroy$ = new Subject();
  @ViewChild('video') videoElement?: ElementRef;
  @Input() width?: number = 224;
  @Input() height?: number = 224;
  @Output() video = new EventEmitter<HTMLVideoElement>()

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      from(navigator.mediaDevices.getUserMedia({video:{width: 224, height: 224}}))
      .pipe(takeUntil(this.destroy$))
      .subscribe(mediaStream => {
        if(this.nativeVideoElement) {
          this.nativeVideoElement.srcObject = mediaStream;
          this.nativeVideoElement.play();
        }
      });
    }
    this.nativeVideoElement.onloadeddata = () => this.video.emit(this.nativeVideoElement);
  }

  get nativeVideoElement(): HTMLVideoElement|null {
    if(this.videoElement) return this.videoElement.nativeElement;
    return null;
  }
}
