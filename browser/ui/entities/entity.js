var util = require('util');

var Widget = require('./widget');

var Entity = (function() {
	function Entity(el, entity, options) {
		this.entity = entity;

		Widget.call(this, el, options);
	}
	util.inherits(Entity, Widget);

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(Entity);
})();

exports = module.exports = Entity;