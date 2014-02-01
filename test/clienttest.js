var elastic = require('../lib/elasticclient');

debugger;
var client = new elastic.ElasticClient();


exports.testConnect = function(test)
{
	client.status(function(err, result)
	{
		test.ok(result, 'result returned')
		test.done();
	});
}

exports.group = {
	 createIndex : function(test) {
	 	client.createIndex('hello', function(err, res){
	 		test.ok(!err, 'Create index');
	 		test.done();
	 	});
	 },

	 deleteIndex : function(test) {
	 	client.deleteIndex('hello', function(err, res){
	 		test.ok(!err, 'delete index');
	 		test.done();
	 	});
	 }

};


