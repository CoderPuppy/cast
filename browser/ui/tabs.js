var util = require('util');

var Widget = require('./widget');

var Tabs = (function() {
	function Tabs(el, options) {
		var self = this;

		el.addClass('tabs');

		el.on('click', 'ul li', function(e) {
			var $this = $(this);

			el.find('ul li.active').removeClass('active');
			$this.addClass('active');

			el.find('.tab.active').removeClass('active');
			el.find('.tab.' + $this.data('tab')).addClass('active');

			e.preventDefault();
		});

		Widget.call(this, el, options);
	}
	util.inherits(Tabs, Widget);

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(Tabs);
})();

exports = module.exports = Tabs;