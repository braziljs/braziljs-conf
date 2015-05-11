(function () {
	window.addEventListener('DOMContentLoaded', function() {
		var bgs = [
				'bg-teaser-1.jpg',
				'bg-teaser-2.jpg',
				'bg-teaser-3.jpg',
				"bg-teaser-4.jpg",
				"bg-teaser-5.jpg",
				"bg-teaser-6.jpg",
				"bg-teaser-7.jpg",
				"bg-teaser-8.jpg",
				"bg-teaser-9.jpg",
				"bg-teaser-10.jpg",
				"bg-teaser-11.jpg",
				"bg-teaser-12.jpg"],
			path = '/assets/img/',
			props = 'no-repeat center center / cover  fixed',
			current = bgs[Math.ceil(Math.random() * bgs.length - 1)];

		document.body.style.background = 'url("'+ path + current +'") ' + props;
	});
}());