var util   = require('util');
var events = require('events');

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

			// compile(args, body) => Function(args.length...)
			this.compile = function compile(compile) {
				return compile([], 'var self = this;' + this.get('contents'));
			};
		}).call(this.prototype);

		return this;
	}).call(Spell);
})();

module.exports = Spell;