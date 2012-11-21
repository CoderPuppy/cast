var util   = require('util');
var events = require('events');

var Widget = (function() {
	function Widget(el, options) {
		this.el = el;

		this.options || (this.options = {});

		this.set(options);

		el.show();

		events.EventEmitter.call(this);
	}
	util.inherits(Widget, events.EventEmitter);

	return (function() {
		(function() {
			this.set = function set(key, val) {
				if(typeof(key) == 'string') {
					var property;

					this.options[key] = val;

					if(property = this.properties[key]) {
						if(typeof(property.set) == 'function') {
							property.set.call(this, key, val);
						}
					}
				} else if(typeof(key) == 'object') {
					var self = this;
					var options = key;
					Object.keys(options).forEach(function(name) {
						self.set(name, options[name]);
					});
				}

				return this
			};

			this.get = function get(key) {
				if(typeof(key) == 'string') {
					var property;

					if((property = this.properties[key]) && typeof(property.get) == 'function') {
						return property.get.call(this, key);
					} else {
						return this.options[key];
					}
				} else {
					return this.options;
				}

				return this
			};

			this.destroy = function destroy() {
				this.el.hide();

				return this;
			};

			this.properties = {};
		}).call(this.prototype);

		return this;
	}).call(Widget);
})();

exports = module.exports = Widget;