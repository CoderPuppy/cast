var events = require('events');
var util   = require('util');
var point  = require('screen/point');

var Entity = (function() {
	function Entity(game, row) {
		var self = this;

		this.game = game;
		this.row = row;

		if(row.point)
			this.abs = row.point;

		if(row.relative)
			this.rel = row.relative;

		if(!(row.point && this.abs)) {
			this.abs = point(row.get());

			row.point = this.abs;
		}

		if(!(row.relative && this.rel)) {
			this.rel = game.screen.add(this.abs);
			row.relative = this.rel;
		}

		this.row.on('update', function(changes) {
			this.abs(changes);
			self.emit('update', changes);
		});
	}
	util.inherits(Entity, events.EventEmitter);

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
	}).call(Entity);
})();

module.exports = Entity;