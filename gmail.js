var mail = require('nodemailer'),
		Q = require('q'),
    fs = require('fs'),
 		Log = require('log'),
		log = new Log('info');

module.exports = { SendMail: SendMail};

if(process.env.NODE_ENV=='test') {
	 module.exports._private = {loadOpts: loadOpts};
}

function SendMail(recipient,subject,msg) {
	log.info("Sending "+msg+" to "+recipient);
	loadOpts().then(function(svc){
		var smtpTransport = mail.createTransport(svc);
		var mailOptions = {
			from: 'Cherub <cherub@home.simonf.net>',
			to: recipient,
			subject: subject,
			text: msg,
			html: '<p>'+msg+'</p>'
		};
		smtpTransport.sendMail(mailOptions, function(err,info){
			if(err) {
				return log.error(err);
			} 
			log.info("Sent: "+info.response);
		});		
	});
}

function loadOpts() {
	return Q.nfcall(fs.readFile,'./data/gmail.json','utf-8').
	then(
		function(data) { return JSON.parse(data);}
	);
}
