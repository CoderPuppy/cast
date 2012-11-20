var connect  = require('connect');
var ecstatic = require('ecstatic');
var http     = require('http');
var shoe     = require('shoe');
var reloader = require('client-reloader');

var clients = require('../shared/clients');

var app = connect();

app.use(ecstatic('public', { handleError: false }));

var server = http.createServer(app);

var sock = shoe(reloader(function(stream) {
	var gameId, entitiesId;
	stream.on('data', function(data) {
		data = JSON.parse(data);
		// console.dir({ gameId: gameId, entitiesId: entitiesId, data: data });

		if(data[0] == gameId && data[1] == 'data') {
			data = JSON.parse(data[2]);

			if(/*data[0] == entitiesId &&*/ data[1] == 'data') {
				console.dir(data);
				debugger;
			}

			if(data[1] == 'new' && data[2].meta == 'entities')
				entitiesId = data[0];
		}

		if(data[1] == 'new' && data[2].meta == 'game')
			gameId = data[0];
	});
	clients(stream);
}));

sock.install(server, '/shoe');

server.listen(process.env.VMC_APP_PORT || process.env.PORT || 3000, function(err) {
	if(err) throw err;

	var address = server.address();
	console.log('listening on localhost:%d', address.port);
});