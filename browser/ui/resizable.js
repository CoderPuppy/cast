var util = require('util');

var utils = require('./utils');
var Widget = require('./widget');

var Resizable = (function() {
	function Resizable(el, options) {
		var self = this;

		this.options = {
			'orientation': 'horizontal',
			'position': 'left'
		};

		this.handle = el.find('.resize-handle');

		this.handle.on('mousedown', function(e) {
			self.down = true;
		});

		$(document).on('mouseup', function() {
			self.down = false;
		}).on('mousemove', function(e) {
			if(self.down) {
				switch(self.get('orientation')) {
					case 'vertical':
						el.css('height', 'auto');
						switch(self.get('position')) {
							case 'top':
								el.css('top', e.clientX);
								break;
							case 'bottom':
								el.css('bottom', window.innerHeight - e.clientY);
								break;
						}
						break;
					case 'horizontal':
						el.css('width', 'auto');
						switch(self.get('position')) {
							case 'left':
								el.css('left', e.clientX);
								break;
							case 'right':
								el.css('right', window.innerHeight - e.clientX);
								break;
						}
						break;
				}
			}
		});

		Widget.call(this, el, options);
	}
	util.inherits(Resizable, Widget);

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(Resizable);
})();

exports = module.exports = Resizable;