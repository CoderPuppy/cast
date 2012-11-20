var util = require('util');

var Widget = require('./widget');

var Editor = (function() {
	function Editor(el, options) {
		this.editor = ace.edit(el[0]);
		
		Widget.call(this, el, options);
	}
	util.inherits(Editor, Widget);

	return (function() {
		(function() {
			this.properties = {
				theme: {
					set: function(key, theme) {
						this.editor.setTheme('ace/theme/' + theme);
					}
				},
				mode: {
					set: function(key, mode) {
						this.editor.session.setMode('ace/mode/' + mode);
					}
				}
			};
		}).call(this.prototype);

		return this;
	}).call(Editor);
})();

exports = module.exports = Editor;