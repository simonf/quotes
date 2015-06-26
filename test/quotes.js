var quotes = require('../quotes');

describe('Quotes',function(){
	describe('#randomIntFromInterval',function(){
		it('should return a number between 1 and 3', function() {
			var i = quotes._private.randomIntFromInterval(1,3);
			i.should.be.lessThan(4);
			i.should.be.greaterThan(0);
		})
	});
	describe('#loadQuotes',function(){
		it('should load an array of quotes',function(){
			 return quotes._private.loadQuotes().then(function(qa){
				qa.length.should.be.greaterThan(0);
			});
		});
	});
	describe('#getRandomQuote',function(){
		it('should return a random quote',function(){
			return quotes.getRandomQuote().then(function(q){
				q.should.have.properties('title','author','quote');
			});
		})
	});
})