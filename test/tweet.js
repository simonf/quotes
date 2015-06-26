var tweet = require('../tweet');

describe('Tweet',function(){
	describe('#loadOpts',function(){
		it('should load twitter api keys and secrets', function() {
			return tweet._private.loadOpts().then(function(opts){
				opts.should.have.properties('consumer_key','consumer_secret','access_token_key','access_token_secret');
			});
		});
	});
	describe('#SendDM',function(){
		it('should send a tweet successfully', function() {
			// insert a mock here
		});
	});
});
