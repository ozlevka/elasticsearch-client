var elastic = require('./lib/elasticclient');
var qs = require('querystring');
var request = require('request');



var client = new elastic.ElasticClient({

    index : 'jobmails',
	type : 'cvmail'
});

var columns = ['attachment'];
var values = ['רווקה'];

client.urlSearch(columns, values, function(err, results) {
    if(err) {
        console.error(err);
    }
    else {
        console.log(results);
    }
});


