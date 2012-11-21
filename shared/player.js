var util   = require('util');
var events = require('events');

var Player = (function() {
	function Player(entity) {
		this.entity = entity;
		this.row = this.entity.row;
		this.point = this.entity.abs;
		this.game = this.entity.game;

		this.row.on('update', function(changes) {
			self.emit('update', changes);
		});
	}
	util.inherits(Player, events.EventEmitter);

	return (function() {
		(function() {
			this.get = function get() {
				return this.row.get.apply(this.row, arguments);
			};

			this.set = function set() {
				return this.row.set.apply(this.row, arguments);
			};
		}).call(this.prototype);

		return this;
	}).call(Player);
})();

module.exports = Player;