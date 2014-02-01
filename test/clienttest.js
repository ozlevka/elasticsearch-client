var elastic = require('../lib/elasticclient');

debugger;
var client = new elastic.ElasticClient();


exports.testConnect = function()
{
	client.status(function(err, result)
	{
		
	});
}