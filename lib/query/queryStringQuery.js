/**
 * Created by ozlevka on 3/10/14.
 */


var queryStringQuery = function(default_field, text, options)
{
    this.default_field = default_field || '';
    this.query = text || '';
    this.options = options || {};
};



queryStringQuery().prototype.toJson = function() {
    var query = {
        "query_string": {
            "default_field": "attachment",
            "query": "C# AND ASP AND NET AND JavaScript"
        }
    };

    var keys = Object.key(this.options);
    
};