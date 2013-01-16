(function() {

	var parts = document.location.search.slice(1).split('&'),
		current,
		version = '1.9.0',
		file = 'http://code.jquery.com/jquery-git.js';

	for (var i = 0; i < parts.length; i++) {
		current = parts[i].split('=');

		if (current[0] === 'jquery') {
			version = current[1];
			break;
		}
	}

	if (version !== 'git') {
		file = '../libs/jquery/jquery-' + version + '.js';
	}

	document.write('<script src="' + file + '"></script>');

}());