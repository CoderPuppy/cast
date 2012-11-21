var util = require('util');

var Widget    = require('./widget');
var Tabs      = require('./tabs');
var Editor    = require('./editor');
var Resizable = require('./resizable');

var theme = 'textmate';

var SpellEditor = (function() {
	function SpellEditor(el, spell, options) {
		var self = this;

		this.spell = spell;

		this.code = new Editor(el.find('.code'), {
			theme: theme,
			mode: 'javascript'
		});
		this.help = new Editor(el.find('.help'), {
			theme: theme,
			mode: 'javascript',
			readOnly: true
		});

		this.resizable = new Resizable(el).on('resize', function() {
			self.code.resize();
			self.help.resize();
		}).on('resize', function() {
			self.emit('resize');
		});

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