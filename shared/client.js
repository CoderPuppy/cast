var MuxDemux   = require('mux-demux');
var emitStream = require('emit-stream');

var state = require('./state');
var game  = state.game;

function client(stream) {
	var mdm = MuxDemux();

	mdms.push(mdm);

	stream.pipe(mdm).pipe(stream);

	var thisGameStream = mdm.createStream('game');
	thisGameStream.pipe(gameStream).pipe(thisGameStream);

	gameStream.active();

	return mdm;
}

exports = module.exports = client;

var mdms = exports.mdms = [];

var gameStream = exports.gameStream = game.createStream();
exports.game = game;