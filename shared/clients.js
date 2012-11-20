var events   = require('events');
var MuxDemux = require('mux-demux');

var game = require('./state');

function clients(stream) {
	var mdm = MuxDemux(function(stream) {
		var type = stream.meta;

		switch(type) {
			case 'game':
				stream.pipe(gameStream).pipe(stream);
				break;
		}
	});

	mdm.pipe(stream).pipe(mdm);

	return mdm;
}

clients.emit = events.EventEmitter.prototype.emit;
clients.on = events.EventEmitter.prototype.on;

var gameStream = exports.gameStream = game.createStream();

exports = module.exports = clients;