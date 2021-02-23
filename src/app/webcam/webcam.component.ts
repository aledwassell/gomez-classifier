import { Component, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input, Output, OnDestroy } from '@angular/core';
import { Subject, from } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-webcam',
  template: '<video autoplay muted width="265" height="265" #video></video>',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject();
  @ViewChild('video') videoElement?: ElementRef;
  @Input() width? = 224;
  @Input() height? = 224;
  @Output() video = new EventEmitter<HTMLVideoElement>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ngAfterViewInit(): Promise<void> {
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
