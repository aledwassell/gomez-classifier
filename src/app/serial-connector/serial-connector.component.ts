import { Component, OnDestroy } from '@angular/core';

/* Component used to connect to local serial devices connected via USB. */
@Component({
  selector: 'app-serial-connector',
  templateUrl: './serial-connector.component.html',
  styleUrls: ['./serial-connector.component.scss']
})
export class SerialConnectorComponent implements OnDestroy {
  port: any|null = null;
  duration = 2;
  private outputDone: any|null;
  private outputStream: any|null;

  ngOnDestroy(){
    this.disconnect();
  }

  write(): void{
    if(!this.port) return;
    const writer = this.outputStream.getWriter();
    writer.write(this.duration);
    writer.releaseLock();
  }

  async toggleConnected(){
    this.port ? await this.disconnect() : await this.connect();
  }

  /* Prompt connection to the USB device. */
  async connect(): Promise<void> {
    try{
      this.port = await navigator['serial'].requestPort();
      await this.port.open({baudRate: 9600});
      const {readable, writable} = new TextEncoderStream();
      this.outputDone = readable.pipeTo(this.port.writable);
      this.outputStream = writable;
    } catch (error) {
      this.port = null;
      console.error(error);
    }
  }

  /* Close the writable stream. */
  private async disconnect(): Promise<void> {
    if(this.outputStream){
      await this.outputStream.getWriter().close();
      await this.outputDone;
      this.outputStream = null;
      this.outputDone = null;
    }
    await this.port.close();
    this.port = null;
  }

  /* Checks if the the web serial API is supported. */
  get isSerialSupported(): boolean {
    return 'serial' in navigator;
  }
}
