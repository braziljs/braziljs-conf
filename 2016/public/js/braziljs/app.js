(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weeklyVideo = require('./weekly-video');

var _weeklyVideo2 = _interopRequireDefault(_weeklyVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeeklyVideoList = function (_React$Component) {
	_inherits(WeeklyVideoList, _React$Component);

	function WeeklyVideoList() {
		_classCallCheck(this, WeeklyVideoList);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WeeklyVideoList).call(this));

		_this.state = { videos: [] };
		return _this;
	}

	_createClass(WeeklyVideoList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			gapi.client.setApiKey('AIzaSyBAMjium9LkTEzSran2XMa4JcWPlb8Ureo');
			gapi.client.load('youtube', 'v3', function () {
				var request = gapi.client.youtube.playlistItems.list({
					part: 'snippet',
					playlistId: 'PLg2lQYZDBwOQDXKxy9yeqXG5njHbSHFFD',
					maxResults: 4
				});

				request.execute(function (response) {
					var newList = [];
					response.items.forEach(function (cur) {
						if (cur.snippet.thumbnails) {
							newList.push(cur);
						}
					});
					// Chunck the array to split the original array in chuncks of 2. Layout needs.
					_this2.setState({ videos: _.chunk(newList, 2) });
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.state.videos.map(function (video) {
					return React.createElement(_weeklyVideo2.default, { title_1: video[0].snippet.title,
						link_1: video[0].snippet.resourceId.videoId,
						image_1: video[0].snippet.thumbnails.medium.url,
						date_1: video[0].snippet.publishedAt,
						title_2: video[1] ? video[1].snippet.title : '',
						link_2: video[1] ? video[1].snippet.resourceId.videoId : '',
						image_2: video[1] ? video[1].snippet.thumbnails.medium.url : '',
						date_2: video[1] ? video[1].snippet.publishedAt : '' });
				})
			);
		}
	}]);

	return WeeklyVideoList;
}(React.Component);

exports.default = WeeklyVideoList;
;

},{"./weekly-video":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeeklyVideo = function (_React$Component) {
	_inherits(WeeklyVideo, _React$Component);

	function WeeklyVideo() {
		_classCallCheck(this, WeeklyVideo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(WeeklyVideo).apply(this, arguments));
	}

	_createClass(WeeklyVideo, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"section",
					{ className: "6u 12u(narrower)" },
					React.createElement(
						"div",
						{ className: "box post" },
						React.createElement(
							"a",
							{ href: "https://www.youtube.com/watch?v=" + this.props.link_1, className: "image left" },
							React.createElement("img", { src: this.props.image_1, alt: this.props.title_1 })
						),
						React.createElement(
							"div",
							{ className: "inner" },
							React.createElement(
								"h3",
								null,
								this.props.title_1
							)
						)
					)
				),
				React.createElement(
					"section",
					{ className: "6u 12u(narrower)" },
					React.createElement(
						"div",
						{ className: "box post" },
						React.createElement(
							"a",
							{ href: "https://www.youtube.com/watch?v=" + this.props.link_2, className: "image left" },
							React.createElement("img", { src: this.props.image_2, alt: this.props.title_2 })
						),
						React.createElement(
							"div",
							{ className: "inner" },
							React.createElement(
								"h3",
								null,
								this.props.title_2
							)
						)
					)
				)
			);
		}
	}]);

	return WeeklyVideo;
}(React.Component);

exports.default = WeeklyVideo;
;

},{}],3:[function(require,module,exports){
'use strict';

var _weeklyVideoList = require('./components/weekly-video-list');

var _weeklyVideoList2 = _interopRequireDefault(_weeklyVideoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Render the WeeklyVideoList component when the Youtube API is ready
window.onGoogleLoad = function () {
  return ReactDOM.render(React.createElement(_weeklyVideoList2.default, null), document.querySelector('#weekly_videos'));
};

},{"./components/weekly-video-list":1}]},{},[3]);
