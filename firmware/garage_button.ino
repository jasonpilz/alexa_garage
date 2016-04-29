int garagePin = D0;

void setup()
{
  pinMode(garagePin, OUTPUT);

  Particle.function("garage", garageButtonPush);

  digitalWrite(garagePin, LOW);
}

int garageButtonPush() {
  // Push button for half second (Close contacts) using optocoupler
  digitalWrite(garagePin, HIGH)
  delay(500)

  // Open button contacts
  digitalWrite(garagePin, LOW)
}
