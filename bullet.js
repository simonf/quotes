//bullet.js

var PushBullet = require('pushbullet'),
		Q = require('q'),
    fs = require('fs'),
 		Log = require('log'),
		log = new Log('info');

module.exports = {sendBullet: sendBullet};

if(process.env.NODE_ENV=='test') {
	 module.exports._private = {loadOpts: loadOpts};
}


function sendBullet(recipient,title,msg) {
	loadOpts(recipient).then(function(cfg){
		var pusher = new PushBullet(cfg.token);
		pusher.note(cfg.target, title, msg, function(error, response) {
			if(error) {
				log.error(error);
			} else {
				log.info("Sent a pushbullet message to "+recipient+": "+title+" / "+msg);
			}
		});		
	});
}

function loadOpts(dest) {
  return Q.nfcall(fs.readFile,'./data/pushbullet.json','utf-8').
	then(
    function(data) { 
				var config = JSON.parse(data);
				if(config.idens[dest]) {
					return {token: config.access_token, target: config.idens[dest]}
				} else {
					return {token: config.access_token, target: dest}
				}
		}
	);
}
