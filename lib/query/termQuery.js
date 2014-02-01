

var termQuery = function(field, term, boost)
{
	this.term = term;
	this.field = field;
	this.boost = boost;
}


termQuery.prototype.toJson = function(first_argument) {
	var obj = {
		term : {}
	};
	obj.term[this.field] = this.term;
	if (boost) { obj["boost"] = this.boost};
	return obj;
};


exports = module.exports;
exports.termQuery = termQuery;