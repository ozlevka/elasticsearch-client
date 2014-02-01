

var matchQuery = function(field, text, options)
{
	this.field = field;
	this.text = text;
	if (!options) { options = {}; }
	this.operator = options.operator? options.operator : 'or'
}


matchQuery.prototype.toJson = function() {
	var innerQuery = {
		query : this.text,
		operator : this.operator
	}

	var obj = { match : {} };
	obj.match[this.field] = innerQuery;

	return obj;
};