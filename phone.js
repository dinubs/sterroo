var hapi = require('hapi');
var Twilio = require('twilio-js');

Twilio.AccountSid = "AC207091ff604cd8100708f207f2afb95a";
Twilio.AuthToken  = "3ef5004961dbd6de9c24ce38a42df5fd";

var ngrokUrl = 'http://62ce3b2.ngrok.com'

module.exports = {
  callSucceed: function() {
    var response = Twilio.TwiML.build(function(res) {
      res.say('Congratulations, you solved the math problem!!', {voice: 'alice'})
      res.hangup();
    });   

    return response;
  },
  callFail: function(num1, num2) {
    var response = Twilio.TwiML.build(function(res) {
      res.say('That is incorrect!', {voice: 'alice'});
      res.say('What is ' + num1 + ' plus ' + num2 +'?', {voice: 'alice'});

      res.gather(function(res) { 
        res.say('Press pound when finished.', {voice: 'alice'}) 
      }, { 
        action: ngrokUrl + '/call/solveMath/' + num1 + '/' + num2, 
        method: "POST", 
        finishOnKey: "#" 
      })
    });
    return response;
  },
	checkCall: function(num1, num2, digits) {
    var sum = num1 + num2;
		if (sum === digits) {
      var response = this.callSucceed();

      return response;
    }
    var response = this.callFail(num1, num2);
    
    return response;
	},
  createMathResponse: function() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);

    var response = Twilio.TwiML.build(function(res) {
      res.say('Hey, it\'s time to wake up!', {voice: 'alice'});
      res.say('What is ' + num1 + ' plus ' + num2 +'?', {voice: 'alice'});

      res.gather(function(res) { 
        res.say('Press pound when finished.', {voice: 'alice'}) 
      }, { 
        action: ngrokUrl + '/call/solveMath/' + num1 + '/' + num2, 
        method: "POST", 
        finishOnKey: "#" 
      })
    });

    return response;
  },
  createCall: function(number) {
    Twilio.Call.create({to: number, from: "+17752001227", url: ngrokUrl + "/call/math"}, function(err,res) {
      console.log('HOLY MOLY! PHONES ARE RINGING');
    });
  }
}