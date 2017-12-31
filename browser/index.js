window.$ = require('jquery');

// Make sure everything is included in the bundle
require('buffer-browserify');

var reconnect = require('reconnect');
var reloader  = require('client-reloader');
var domready  = require('domready');

var client = require('../shared/client');
var game   = require('../shared/state');
var UI     = require('./ui');
var ui;

reconnect({ maxDelay: 3e3 }, reloader(function(stream) {
	client(stream);
})).connect('/shoe');

domready(function() {
	ui = exports.ui = new UI($(document.body), game);
});

exports.game = game;
