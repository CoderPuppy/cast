var util   = require('util');
var events = require('events');

// A spell has args and contents
// Each arg has a type (Just for setting can use just json)
var Spell = (function() {
	function Spell(game, row) {
		this.game = game;
		this.row = row;
	}
	util.inherits(Spell, events.EventEmitter);

	return (function() {
		(function() {
			this.get = function get() {
				return this.row.get.apply(this.row, arguments);
			};

			this.set = function set() {
				return this.row.set.apply(this.row, arguments);
			};

			this.compiled = function compiled() {
				return this._compiled || this.compile();
			}

			this.compile = function compile() {
				return this._compiled = vm.runInNewContext(Function.apply(undefined, this.get('args').concat(['var self = this;' + this.get('contents')])).toString());
			};
		}).call(this.prototype);

		return this;
	}).call(Spell);
})();

module.exports = Spell;