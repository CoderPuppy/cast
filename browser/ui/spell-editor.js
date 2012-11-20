var util = require('util');

var Widget    = require('./widget');
var Tabs      = require('./tabs');
var Editor    = require('./editor');
var Resizable = require('./resizable');

var editorOptions = {
	theme: 'twilight',
	mode: 'javascript'
};

var SpellEditor = (function() {
	function SpellEditor(el, game, options) {
		this.game = game;

		this.code = new Editor(el.find('.code'), editorOptions);
		this.help = new Editor(el.find('.help'), editorOptions);

		this.resizable = new Resizable(el);

		this.tabs = new Tabs(el);

		Widget.call(this, el, options);
	}
	util.inherits(SpellEditor, Widget);

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(SpellEditor);
})();

exports = module.exports = SpellEditor;