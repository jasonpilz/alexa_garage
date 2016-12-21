'use strict';

const https       = require('https');
const AlexaSkill  = require('./AlexaSkill');

// ********** Replace these 3 constants with your actual values ********** //
const APP_ID      = 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';     // Alexa skill application ID
const deviceId    = '/6c00362363450003473433131';                          // Particle device ID
const accessToken = '4837487asdfadsfkasdfq88808adsf098080casegveuoiow748'; // Particle API access token

const hostUrl     = 'api.particle.io';
const deviceUrl   = '/v1/devices';

// Garage is a child of AlexaSkill
let Garage = function() {
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

  const welcomeMessage = `Welcome to Garage.
                          You can tell me to open or close the garage door.`;
  response.ask(welcomeMessage);
};

Garage.prototype.eventHandlers.onSessionEnded = (sessionEndedRequest, session) => {
  console.log(`Garage onSessionEnded requestId: ${sessionEndedRequest.requestId}
                                     sessionId: ${session.sessionId}`);
};

// Handle Intents
Garage.prototype.intentHandlers = {
  ToggleGarageIntent: (intent, session, response) => {
    let openCloseSlot    = intent.slots.OpenClose;
    let ToggleGaragePath = `${deviceUrl}${deviceId}/garage`;

    if (openCloseSlot && openCloseSlot.value) {
      if (openCloseSlot.value == 'open' || openCloseSlot.value == 'close') {

        callParticleApi(ToggleGaragePath, (apiResponse) => {
          let parsedResponse = JSON.parse(apiResponse);
          let speechOutput = '';

          if (parsedResponse.return_value == 1) {
            speechOutput = 'OK, the garage door has obeyed your command';
          } else if (parsedResponse.return_value == -1) {
            speechOutput = 'An error has occurred. Blame the developer';
          }
          response.tellWithCard(speechOutput, 'Garage');
        });
      } else {
        handleNoSlotDialogRequest(intent, session, response);
      }
    }
  },
  ToggleStatusIntent: (intent, session, response) => {
    let sensorReadSlot    = intent.slots.SensorRead;
    let ToggleStatusPath = `${deviceUrl}${deviceId}/status`;

    if (openCloseSlot && openCloseSlot.value) {
      if (SensorReadSlot.value == 'status') {

        callParticleApi(ToggleStatusPath, (apiResponse) => {
          let parsedResponse = JSON.parse(apiResponse);
          let speechOutput = '';

          if (parsedResponse.return_value == 1) {
            speechOutput = 'The Garage is currently open';
          } else if (parsedResponse.return_value == -1) {
            speechOutput = 'The Garage is currently closed';
          }
          response.tellWithCard(speechOutput, 'Garage');
        });
      } else {
        handleNoSlotDialogRequest(intent, session, response);
      }
    }
  },
  "AMAZON.HelpIntent": (intent, session, response) => {
    response.ask('You can tell me to open or close the garage door');
  }
};

function handleNoSlotDialogRequest(intent, session, response) {
  // TODO - no slots were given, remind user how to call function
}

function callParticleApi(path, callback) {
  let options = {
    hostname: hostUrl,
    port: 443,
    path: path,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  makeRequest(options, callback);
}

function makeRequest(options, callback) {
  let req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`headers: ${res.headers}`);

    let body = '';
    res.setEncoding('utf8');
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => { callback(body); });
  });

  // write arguments to request body
  req.write('args=open');
  req.end();
  req.on('error', e => { console.error(e); });
}

// Create the handler that responds to the Alexa Request
exports.handler = (event, context) => {

    // Create an instance of the Particle skill
    const garageSkill = new Garage();
    garageSkill.execute(event, context);
};
