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
            "default_field": this.default_field,
            "query": this.query
        }
    };

    var keys = Object.key(this.options);
    for(var k in keys) {
        query.query_string[k] = options[k];
    }

    return query;
};