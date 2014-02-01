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

exports.createadelete = {
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


exports.createstatusdelete = {
	createIndex : function(test) {
	 	client.createIndex('hello', function(err, res){
	 		test.ok(!err, 'Create index');
	 		test.done();
	 	});
	 },

	 statusIndex : function(test) {
	 	client.indexStatus('hello', function(err, res){
	 		test.ok(!err, 'status reseived' + res);
	 		test.done();
	 	})
	 },

	 deleteIndex : function(test) {
	 	client.deleteIndex('hello', function(err, res){
	 		test.ok(!err, 'delete index');
	 		test.done();
	 	});
	 }
}


