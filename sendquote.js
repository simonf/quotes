//sendquote.js

var quote = require('./quotes'),
		tweet = require('./tweet'),
		gmail = require('./gmail');

function main() {
	var q = quote.getRandomQuote();
	var argv = require('minimist')(process.argv.slice(2));
	if(argv.m) {
			gmail.SendMail(argv.m,q);
		}
	if(argv.t) {
			tweet.SendDM(argv.t,q);
		}
}

main();