exports.parsePx = function parsePx(str) {
	var match = str.match(/^(\d+)/);

	if(match)
		return parseInt(match[1]);
	else
		return 0;
};