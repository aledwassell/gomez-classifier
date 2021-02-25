# Machine Learning Webcam

An application built using Angular and TensorFlow.

## Why Build a Machine Learning Webcam App?

I wanted a way to distract my cat Gomez from jumping up on my kitchen counter.

I thought about using an arduino and connecting an infrared motion detector and a loud buzzer, but I quickly realized the noise would become really annoying whenever someone entered the kitchen.

So I decided to use tensorflow and train a machine learning model to recognise Gomez.

### Train the model
You can train a teachable machine model on the teachable machine website https://teachablemachine.withgoogle.com/train/image

## Web Serial API - Not Implemented Yet

In order to use the Web Serial API you will need to enable the Experimental Web Platform features in your Chrome Browser Flags.

E.g. chrome://flags/#enable-experimental-web-platform-features

## Arduino Setup

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

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
