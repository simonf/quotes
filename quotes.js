//quotes.js
var fs = require('fs');
var Q = require('q');

module.exports = {
	getRandomQuote: getRandomQuote
};

if (process.env.NODE_ENV === 'test') {
  module.exports._private = { 
		loadQuotes: loadQuotes,
		randomIntFromInterval: randomIntFromInterval
	};
}

var quotes = [];

function loadQuotes() {
	if(quotes.length > 0) {
		return Q.fcall(function(){ return quotes;});
	}
	else {
		var deferred = Q.defer();
		fs.readFile('./data/quotes.json',{encoding:'utf-8'},function(err,data){
			if(err) {
				deferred.reject(err);
			} else {
				quotes = JSON.parse(data);
				deferred.resolve(quotes);
			}
		});
		return deferred.promise;
	}
}

function getRandomQuote(){
	return loadQuotes().then(function(qa){
		var n = randomIntFromInterval(0,qa.length-1);
		return qa[n];
	});
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}



