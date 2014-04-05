var elastic = require('./lib/elasticclient');
var qs = require('querystring');
var request = require('request');
var util = require('util');



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


function runQueryTest() {
    client.runQuery(function(err, results){
        if(err) console.error(err);
        else console.log(results);
    });
}



function runAggregateQuery() {
    var query = {
        "aggs": {
            "range": {
                "date_range": {
                    "field": "created",
                    "format": "dd-MM-yyyy H:mm",
                    "ranges": [
                        { "from" : "now-24H", "to": "now-20H" },
                        { "from" : "now-20H", "to": "now-16H" },
                        { "from" : "now-16H", "to": "now-12H" },
                        { "from" : "now-12H", "to": "now-10H" },
                        { "from" : "now-10H", "to": "now-8H" }
                    ]
                }
            }
        }
    };

    client.runQuery(query,function(err, results){
        if(err) console.error(err);
        else console.log(util.inspect(results));
    });
}

runAggregateQuery();
//runQueryTest();
//indexStatusTest();


