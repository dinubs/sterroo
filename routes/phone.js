var hapi = require('hapi');
var Twilio = require('twilio-js');

var phone = require('../phone.js');
var formatPhone = require('phone');

Twilio.AccountSid = "AC207091ff604cd8100708f207f2afb95a";
Twilio.AuthToken  = "3ef5004961dbd6de9c24ce38a42df5fd";

var ngrokUrl = 'http://62ce3b2.ngrok.com'

module.exports = function(server) {
	var cont = {
    mathResponseController: function (req, res) {
      var num1 = parseInt(req.params.num1), num2 = parseInt(req.params.num2);
      var digits = parseInt(req.payload.Digits);
      var response = phone.checkCall(num1, num2, digits);

      res(response);
    },
		createMathController: function(req, res) {			
      var response = phone.createMathResponse();

      res(response);
		},
		callController: function(req, res) {
      phone.createCall(req.params.number);

			res('Calling: ' + req.params.number);
		},
    createCallController: function(req, res) {
      var number = formatPhone(req.payload.number, 'USA')[0];

      phone.createCall(number);
      res(number);
    }
	}

  server.route({method: 'GET', path: '/call/{number}', handler: cont.callController});
  server.route({method: 'POST', path: '/call', handler: cont.createCallController});
  server.route({method: 'POST', path: '/call/math',handler: cont.createMathController});
  server.route({method: 'POST', path: '/call/solveMath/{num1}/{num2}', handler: cont.mathResponseController})

}