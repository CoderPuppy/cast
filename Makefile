server:
	nodemon node/index.js --watch shared --watch node --watch browser --watch browser/ui

build-script-dev:
	forever -e browserify.log node_modules/browserify/bin/cmd.js browser/index.js -o public/application.js \
	                             --debug --watch --exports require,process

build-style-dev:
	forever -e stylus.log node_modules/stylus/bin/stylus style/index.styl --watch -o public/style