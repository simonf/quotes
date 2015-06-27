var express = require('express');
var router = express.Router();
var quotes = require('../quotes');

/* GET home page. */
router.get('/', function(req, res) {
	quotes.getRandomQuote().then(function(q){
    res.render('index', { 
			title: 'Quotes', 
			quote: q.quote, 
			author: q.author, 
			book: q.title
		});		
	});
});

module.exports = router;