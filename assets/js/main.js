(function () {
	window.addEventListener('DOMContentLoaded', function() {
		var bgs = ['bg-teaser-1.jpg','bg-teaser-2.jpg','bg-teaser-3.jpg'],
			path = '/assets/img/',
			props = 'no-repeat center center fixed',
			current = bgs[Math.ceil(Math.random() * bgs.length - 1)];

		document.body.style.background = 'url("'+ path + current +'") ' + props;
	});
}());