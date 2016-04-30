'use strict';

const https      = require('https');
const AlexaSkill = require('./AlexaSkill');

var APP_ID      = undefined;
var deviceId    = undefined;
var accessToken = undefined;

var hostUrl     = "api.particle.io";
var deviceUrl   = "/v1/devices";

// Garage is a child of AlexaSkill
let Garage = () => {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Garage.prototype = Object.create(AlexaSkill.prototype);
Garage.prototype.constructor = Garage;

// Handle Events
Garage.prototype.eventHandlers.onSessionStarted = (sessionStartedRequest, session) => {
  console.log(`Garage onSessionStarted requestId: ${sessionStartedRequest.requestId}
                                         sessionId: ${session.sessionId}`);
};

Garage.prototype.eventHandlers.onLaunch = (launchRequest, session, response) => {
  console.log(`Garage onLaunch requestId: ${launchRequest.requestId}
                               sessionId: ${session.sessionId}`);

  let welcomeMessage = `Welcome to Garage.
                        You can tell me to open or close the garage door.`;
  response.ask(welcomeMessage);
};

Garage.prototype.eventHandlers.onSessionEnded = (sessionEndedRequest, session) => {
  console.log(`Garage onSessionEnded requestId: ${sessionEndedRequest.requestId}
                                     sessionId: ${session.sessionId}`);
};

// Handle intents
Garage.prototype.intentHandlers = {

};
