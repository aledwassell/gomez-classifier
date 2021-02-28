# Machine Learning Webcam

An application built using Angular and TensorFlow.

## Why Build a Machine Learning Webcam App?

I wanted a way to distract my cat Gomez from jumping up on my kitchen counter.

I thought about using an Arduino micro controller connected to an infrared motion detector with a few lines of code to activate a piezoelectric buzzer, but I quickly realized the noise would become really annoying whenever someone entered the kitchen.

So I decided to use tensorflow and train a machine learning model to recognise Gomez on the kitchen counter.

### Train the model

You can train a teachable machine model on the teachable machine website https://teachablemachine.withgoogle.com/train/image and save the model to the cloud or download the model files and input them into the app.

## Web Serial API

In order to use the Web Serial API you will need to enable the Experimental Web Platform features in your Chrome Browser Flags.

E.g. chrome://flags/#enable-experimental-web-platform-features

This feature will allow the app to connect to the Arduino via the the serial port and send data to it.

## Arduino Setup

A duration in seconds can be sent over the serial buffer, this will serve as the time delay for how long you want the distraction to be active for.

```
int duration = 0;
int delayDuration = 500;
int pin = 2;
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(pin, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    duration = Serial.parseInt(); // Get the integer from the serial connection.
    if (duration >= 1) delayDuration = duration * 1000;
    digitalWrite(LED_BUILTIN, HIGH);
    digitalWrite(pin, HIGH);
    delay(delayDuration);
    digitalWrite(pin, LOW);
  }
  else {
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(pin, LOW);
  }
}
```

## Development server

Clone this repo and run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
