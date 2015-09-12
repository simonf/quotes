var quotes = require('./quotes');
quotes.getRandomQuote().then(function(q){
console.log(q.quote+"\n"+q.author);
});
