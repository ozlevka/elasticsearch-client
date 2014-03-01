var elastic = require('./lib/elasticclient');
var request = require('request');

var client = new elastic.ElasticClient({
	index : 'quantity',
	type : 'currency'
});

request('http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json', function(err, result){
    if(err)
    {
        console.error(err);
    }
    else
    {
        var results = JSON.parse(result.body);
        var indexArray = [];
        for(var i in results.list.resources)
        {
            var res = results.list.resources[i];
            indexArray.push(res.resource.fields);
        }

        client.indexBulk(indexArray, function(err, result){
            console.log('Indexed');
        });
    }
});

/**/




