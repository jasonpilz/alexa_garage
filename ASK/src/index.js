'use strict';

const https      = require('https');
const AlexaSkill = require('./AlexaSkill');

var APP_ID      = undefined;
var deviceId    = undefined;
var accessToken = undefined;

var hostUrl     = "api.particle.io";
var deviceUrl   = "/v1/devices";

// Particle is a child of AlexaSkill
let Particle = () => {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Particle.prototype = Object.create(AlexaSkill.prototype);
Particle.prototype.constructor = Particle;

// Handle Events
Particle.prototype.eventHandlers.onSessionStarted = (sessionStartedRequest, session) => {
  console.log(`Particle onSessionStarted requestId: ${sessionStartedRequest.requestId}
                                         sessionId: ${session.sessionId}`);
};

Particle.prototype.eventHandlers.onLaunch = (launchRequest, session, response) => {
  console.log(`Particle onLaunch requestId: ${launchRequest.requestId}
                                 sessionId: ${session.sessionId}`);

  let welcomeMessage = `Welcome to Garage.
                        You can tell me to open or close the garage door.`;
  response.ask(welcomeMessage);
};

Particle.prototype.eventHandlers.onSessionEnded = (sessionEndedRequest, session) => {
  console.log(`Particle onSessionEnded requestId: ${sessionEndedRequest.requestId}
                                       sessionId: ${session.sessionId}`);
};
