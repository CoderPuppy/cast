var util = require('util');

var Widget = require('./widget');
var SpellEditor = require('./spell-editor');

var UI = (function() {
	function UI(el, game, options) {
		this.el = el;
		this.game = game;

		this.spellEditor = new SpellEditor(el.find('.spell-editor'), game);

		Widget.call(this, el, options);
	}
	util.inherits(UI, Widget);

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(UI);
})();

exports = module.exports = UI;