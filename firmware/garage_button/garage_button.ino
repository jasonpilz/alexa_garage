int garagePin = D0;
int garageSensor = D6;
int sensorStatus;

void setup() {
  Particle.function("garage", garageButtonPush);
  Particle.function("status", garageSensor);

  pinMode(garagePin, OUTPUT);
  pinMode(garageSensor, INPUT);

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
int garageSensor(String command)  {
    if(command == "open") {
      sensorStatus = digitalRead(garageSensor);
      if (sensorStatus == HIGH){
        return 1;
      }
     else return -1;
}
}

