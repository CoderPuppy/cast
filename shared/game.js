var crdt       = require('crdt');
var events     = require('events');
var util       = require('util');
var MuxDemux   = require('mux-demux');
var emitStream = require('emit-stream');
var screen     = require('screen');
var point      = require('screen/point');
var store      = require('local-store');
var uuid       = require('node-uuid');

var Entity = require('./entity');
var Player = require('./player');
var Spell  = require('./spell');

var Game = (function() {
	function Game() {
		if(!(this instanceof Game)) return new Game();

		var self = this;

		this.store = store('cast');

		this.entitiesDoc = new crdt.Doc().on('create', function(row) {
			self.entities[row.id] = new Entity(self, row);
		});
		this.wizardRows = this.entitiesDoc.createSet('type', 'wizard');
		this.entities = {};

		this.spellsDoc = new crdt.Doc();
		this.spells = {};

		this.playerId = 'player:' + (this.store.get('id') || this.store.set('id', uuid().substring(0, 4)));
		this.playerPoint = point({ x: 0, y: 0 });
		this.screen = screen(this.playerPoint, 640, 480);
		this.playerRow = this.entitiesDoc.add({
			id: this.playerId,
			type: 'wizard',
			energy: 500,
			x: 0,
			y: 0
		});
		this.playerRow.point = this.playerPoint;
		this.playerEntity = new Entity(this, this.playerRow);
		this.player = new Player(this.playerEntity);
		this.entities[this.playerId] = this.playerEntity;

		events.EventEmitter.call(this);
	}
	util.inherits(Game, events.EventEmitter);

	return (function() {
		(function() {
			this.entity = function entity(id) {
				return this.entities[id] || (this.entities[id] = new Entity(this, this.entitiesDoc.rows[id]));
			};

			this.spell = function spell(id) {
				return this.spells[id] || (this.spells[id] = new Spell(this, this.spellsDoc.rows[id]));
			};

			// Use mux-demux to send the spells, entities and events
			this.createStream = function createStream() {
				var mStreams = {};
				var streams = {
					entities: this.entitiesDoc.createStream(),
					spells: this.spellsDoc.createStream(),
					events: emitStream(this)
				};

				var mdm = MuxDemux(function(s) {
					var type = s.meta;

					mStreams[type] || (mStreams[type] = s);

					if(streams[type])
						s.pipe(streams[type]).pipe(s);
				});

				mdm.pause();

				function activeStream(name) {
					if(!mStreams[name])
						streams[name].pipe(mStreams[name] = mdm.createStream(name)).pipe(streams[name]);
				}

				mdm.active = function active() {
					activeStream('entities');
					activeStream('spells');
					activeStream('events');

					mdm.resume();
				};

				return mdm;
			};
		}).call(this.prototype);

		return this;
	}).call(Game);
})();

module.exports = Game;