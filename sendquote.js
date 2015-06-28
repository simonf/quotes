//sendquote.js

var quote = require('./quotes'),
		tweet = require('./tweet'),
		gmail = require('./gmail'),
		bullet = require('./bullet');

function quoteToEmail(q) {
	return q.author + ': ' + q.title + '\n' + q.quote;
}

function quoteToDM(q,limit) {
	if(q.quote.length <= limit) {
		if(q.quote.length + q.author.length < limit-1) {
			if(q.quote.length + q.author.length + q.title.length < limit-2) {
				return q.author + ' ' + q.title + ' ' + q.quote;
			} 
			return q.author + ' ' + q.quote;
		}
		return q.quote;
	}
	return q.quote.substring(0,limit-1);
}

function quoteToBullet(q) {
	return { title: q.author + " "+q.title, body: q.quote};
}

function main() {
	var argv = require('minimist')(process.argv.slice(2));
	quote.getRandomQuote().then(function(q) {
		if(argv.m) {
				gmail.SendMail(argv.m,q.author,q.quote+'\n'+q.title);
		}
		if(argv.t) {
				tweet.SendDM(argv.t,quoteToDM(q,140));
		}
		if(argv.p) {
				bullet.sendBullet(argv.p,bb.title,bb.body);
		}
	});
}

main();
