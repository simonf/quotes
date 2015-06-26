//tweet.js
var Q = require('q'),
    fs = require('fs'),
 		Log = require('log'),
    log = new Log('info'),
    Twitter = require('twitter');

module.exports = {SendDM: SendDM};

if(process.env.NODE_ENV=='test') {
	 module.exports._private = {loadOpts: loadOpts};
}

function SendDM(recipient,msg) {
	loadOpts().then(function(opts){
		var client = new Twitter(opts);
		client.post(
			'direct_messages/new',
			{text: msg, screen_name: recipient},
			function(error,data,response){
				if(error) {
					log.error(error);
				} else {
					log.info("DM sent to "+recipient+": "+msg);
				}
		});
	});
}

function loadOpts() {
  return Q.nfcall(fs.readFile,'./data/twitter.json','utf-8').then(
      function(data) { return JSON.parse(data);});
}
