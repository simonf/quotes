var gmail = require('../gmail');

describe('GMail',function(){
	describe('#loadOpts',function(){
		it('should load gmail api keys ', function() {
			return gmail._private.loadOpts().then(function(opts){
				opts.should.have.properties('service','auth');
			});
		});
	});
	describe('#SendMail',function(){
		it('should send a mail successfully', function() {
				// insert a mock here
		});
	});
});
