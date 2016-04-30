int garagePin = D0;

void setup() {
  Particle.function("garage", garageButtonPush);

  pinMode(garagePin, OUTPUT);

  digitalWrite(garagePin, LOW);
}

void loop() {}

int garageButtonPush(String command) {
    if(command == "open") {

      // Push button for 3/4 second (Close contacts) using optocoupler
      digitalWrite(garagePin, HIGH);
      delay(750);

      // Open button contacts
      digitalWrite(garagePin, LOW);
      return 1;
    }
    else return -1;
}
