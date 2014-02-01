var request = require('request');

var ElasticClient = function(options)
{
	if(!options) { options = {}; }
	var host = options.host? options.host : "localhost";
	var port = options.port? options.port : 9200;
	this.url = 'http://' + host + ':' + port,
	this.index = options.index? options.index : 'main';
	this.type = options.type? options.type : 'main';
};

ElasticClient.prototype.status = function(callback) {
	 var requestObj = {
	 	url : this.url + '/_status',
	 	method : 'GET'
	 }

	 request(requestObj, function(err, response, body)
	 {	 	 
	 	 if(!err && response.statusCode == 200)
	 	 {
	 	 	callback(null, JSON.parse(body));
	 	 }
	 	 else
	 	 {
	 	 	callback(err, response.statusCode);
	 	 }
	 });
};


ElasticClient.prototype.createIndex = function(name, indexDef, callback) {
	if (!callback && typeof indexDef === 'function') {
		callback = indexDef;
	}

	if(name && typeof name === 'string')
	{
		var requestObj = {
			url : this.url + '/' + name,
			method : 'PUT'
		};

		if(indexDef)
		{
			requestObj.json = indexDef;
		}

		request(requestObj, function(err, response, body)
		{
			debugger;
			if (err) { callback(err, null); }
			else {
				if (response.statusCode == 200) {
					callback(null, body);
				}
				else
				{
					callback(new Error('Http error:' + response.statusCode), body);
				}
			}
		})
	}
	else
		throw new Error('name must be not empty string')
};


ElasticClient.prototype.deleteIndex = function(name, callback) {
	
	if(name && typeof name === 'string')
	{
		var requestObj = {
				url : this.url + '/' + name,
				method : 'DELETE'
			};
		request(requestObj, function(err, response, body){
			if (err) { callback(err, null); }
			else {
				if (response.statusCode == 200) {
					callback(null, body);
				}
				else {
					callback(new Error("HTTP error code:" + response.statusCode), body);
				}
			}
		});
	}
	else
		throw new Error('name must be not empty string');

};

ElasticClient.prototype.indexStatus = function(name, callback) {
	if(name && typeof name === 'string')
	{
		debugger;
		var url = this.url + '/' + name + '/_status';
		request(url,function(err, response, body){
			if (err) {callback(err, null);}
			else {
				if (response.statusCode == 200) {
					callback(null, body);
				}
				else {
					callback(new Error('HTTP error code:' + response.statusCode ), body);
				}
			}
		});
	}
	else 
		throw new Error('name must be not empty string');	
};


exports = module.exports;
exports.ElasticClient = ElasticClient;