var request = require('request');

var ElasticClient = function(options)
{
	options = options || {};
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

	 this.processRequest(requestObj, callback);
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

		this.processRequest(requestObj, callback);
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
		this.processRequest(requestObj,callback);
	}
	else
		throw new Error('name must be not empty string');

};

ElasticClient.prototype.indexStatus = function(name, callback) {
	if(name && typeof name === 'string')
	{
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

ElasticClient.prototype.indexObject = function(object, id, callback) {
	if (typeof id === 'function') {
		callback = id;
		id = null;
	}

	var requestObject =  {
		url : this.url + '/' + this.index + '/' + this.type + (id ? '/' + id : ''),
		method : 'POST',
		json : object
	};

	this.processRequest(requestObject, callback);
};

ElasticClient.prototype.searchExactTerm = function(field, term, boost, callback) {
	if (typeof boost === 'function') {
		callback = boost;
		boost = undefined;
	}

	var termQuery = require('./query/termQuery');
	var query = new termQuery(field, term, boost);
	this.query(query,callback);
};

ElasticClient.prototype.searchText = function(field, text, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	var mQuery = require('./query/matchQuery');
	var query = new mQuery(field, text, options);
	this.query(query, callback);
};

ElasticClient.prototype.query = function(query, callback) {
	var requestObject = {
		url : this.url + '/' + this.index + '/_search',
		method : 'POST',
		json : query.toJson()
	}

	this.processRequest(requestObject, callback);
};

ElasticClient.prototype.processRequest = function(requestObject, callback) {
	request(requestObject, function(err, response, body)
		{
			if (err) { callback(err, null); }
			else {
				if (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204) {
					callback(null, body);
				}
				else
				{
					callback(new Error('Http error:' + response.statusCode), body);
				}
			}
		});
};

ElasticClient.prototype.analyze = function(text, options, callback) {

	if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	var query = '';
	if(options)
	{
		if (options.analyzer) { query += 'analyzer=' + options.analyzer}
		if (options.tokenizer) {
			if (query) { query += '&'}
			query += 'tokenizer=' + options.tokenizer;
		}

		if (options.filter) { 
			if(query) { query += '&' }

			query += 'filter=' + options.filter;
		}
	}


	var requestObject = {
		url : this.url + '/_analyze' + (query? '?' + query : ''),
		method : 'GET',
		body : text
	};

	this.processRequest(requestObject, callback);
};

ElasticClient.prototype.indexBulk = function(objects, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }

    if(!objects || objects.length == 0)
        throw new Error('objects parameter must be not empty array');

    var requestData = '';
    var indexTemplate = '';
    if(options){
        var keys = Object.keys(options)
        var index = {"index" : {}};
        for(k in keys) {
            index.index[k] = options[k];
        }
        indexTemplate = JSON.stringify(index);
    }
    else
        indexTemplate = '{ "index" : { "_index" : "' + this.index + '", "_type" : "' + this.type + '"} }';
    for(var o in objects) {
        requestData += indexTemplate + '\n';
        requestData += JSON.stringify(objects[o]) + '\n';
    }

    var requestObject = {
        url : this.url + '/_bulk',
        method : 'POST',
        body : requestData
    };

    this.processRequest(requestObject, callback);
};

exports = module.exports;
exports.ElasticClient = ElasticClient;
