import { Component } from '@angular/core';

@Component({
  selector: 'app-serial-connector',
  templateUrl: './serial-connector.component.html',
  styleUrls: ['./serial-connector.component.scss']
})
export class SerialConnectorComponent {
  port: any;

  async connect() {
    this.port = await navigator['serial'].requestPort();
    await this.port.open({baudRate: 9600});
    await navigator['usb'].getDevices().then(d => console.log(d));
  }

  write(){
    const encoder = new TextEncoderStream();
    const outputDone = encoder.readable.pipeTo(this.port.writable);
    const outputStream = encoder.writable;
    const writer = outputStream.getWriter();
    writer.write('1');
    writer.releaseLock();
  }
}
