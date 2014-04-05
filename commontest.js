var elastic = require('./lib/elasticclient');
var qs = require('querystring');
var request = require('request');



var client = new elastic.ElasticClient({
    host : "10.90.11.157",
    index : 'ankortwitter',
	type : 'twit'
});

function indexStatusTest() {
    client.indexStatus(function(err, results) {
        if(err) console.error(err);
        else console.log(results);
    });
}

indexStatusTest();


