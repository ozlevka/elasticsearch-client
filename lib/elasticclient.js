var request = require('request');


var ElasticClient = function(options)
{
	this.host = options.host? options.host : "localhost";
	this.port = options.port? options.port : 9200;
	this.index = options.index? options.index : 'main';
	this.type = options.type? options.type : 'main';
};

ElasticClient.prototype.search = function(first_argument) {
		
};

ElasticClient.prototype.status = function(callback) {
	 var url = 'http://' + this.host + ':' + this.port + '/_status';
	 request(url, function(err, response, body)
	 {	 	 
	 	 if(!err && response.statusCode == 200)
	 	 {
	 	 	callback(null, JSON.parse(body));
	 	 }
	 	 else
	 	 {
	 	 	callback(err, response.statusCode);
	 	 }
	 })
};


exports = module.exports = function()
{
	 this.ElasticClient = ElasticClient;
};