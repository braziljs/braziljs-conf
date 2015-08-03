(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * BlockRain.js 0.1.0
 * jQuery plugin that lets you put a playable (and configurable) game of Tetris in your site or just leave it in auto in the background.
 * http://aerolab.github.io/blockrain.js/
 *
 * Copyright (c) 2015 Aerolab <hey@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/blockrain.js/LICENSE.txt
 */
"use strict";

!(function (t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (t) {
	var e = 0,
	    i = Array.prototype.slice;t.cleanData = (function (e) {
		return function (i) {
			var n, o, s;for (s = 0; null != (o = i[s]); s++) try {
				n = t._data(o, "events"), n && n.remove && t(o).triggerHandler("remove");
			} catch (r) {}e(i);
		};
	})(t.cleanData), t.widget = function (e, i, n) {
		var o,
		    s,
		    r,
		    a,
		    h = {},
		    c = e.split(".")[0];return (e = e.split(".")[1], o = c + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][o.toLowerCase()] = function (e) {
			return !!t.data(e, o);
		}, t[c] = t[c] || {}, s = t[c][e], r = t[c][e] = function (t, e) {
			return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new r(t, e);
		}, t.extend(r, s, { version: n.version, _proto: t.extend({}, n), _childConstructors: [] }), a = new i(), a.options = t.widget.extend({}, a.options), t.each(n, function (e, n) {
			return t.isFunction(n) ? void (h[e] = (function () {
				var t = function t() {
					return i.prototype[e].apply(this, arguments);
				},
				    o = function o(t) {
					return i.prototype[e].apply(this, t);
				};return function () {
					var e,
					    i = this._super,
					    s = this._superApply;return (this._super = t, this._superApply = o, e = n.apply(this, arguments), this._super = i, this._superApply = s, e);
				};
			})()) : void (h[e] = n);
		}), r.prototype = t.widget.extend(a, { widgetEventPrefix: s ? a.widgetEventPrefix || e : e }, h, { constructor: r, namespace: c, widgetName: e, widgetFullName: o }), s ? (t.each(s._childConstructors, function (e, i) {
			var n = i.prototype;t.widget(n.namespace + "." + n.widgetName, r, i._proto);
		}), delete s._childConstructors) : i._childConstructors.push(r), t.widget.bridge(e, r), r);
	}, t.widget.extend = function (e) {
		for (var n, o, s = i.call(arguments, 1), r = 0, a = s.length; a > r; r++) for (n in s[r]) o = s[r][n], s[r].hasOwnProperty(n) && void 0 !== o && (e[n] = t.isPlainObject(o) ? t.isPlainObject(e[n]) ? t.widget.extend({}, e[n], o) : t.widget.extend({}, o) : o);return e;
	}, t.widget.bridge = function (e, n) {
		var o = n.prototype.widgetFullName || e;t.fn[e] = function (s) {
			var r = "string" == typeof s,
			    a = i.call(arguments, 1),
			    h = this;return (s = !r && a.length ? t.widget.extend.apply(null, [s].concat(a)) : s, this.each(r ? function () {
				var i,
				    n = t.data(this, o);return "instance" === s ? (h = n, !1) : n ? t.isFunction(n[s]) && "_" !== s.charAt(0) ? (i = n[s].apply(n, a), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + s + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'");
			} : function () {
				var e = t.data(this, o);e ? (e.option(s || {}), e._init && e._init()) : t.data(this, o, new n(s, this));
			}), h);
		};
	}, t.Widget = function () {}, t.Widget._childConstructors = [], t.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { disabled: !1, create: null }, _createWidget: function _createWidget(i, n) {
			n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = e++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, { remove: function remove(t) {
					t.target === n && this.destroy();
				} }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
		}, _getCreateOptions: t.noop, _getCreateEventData: t.noop, _create: t.noop, _init: t.noop, destroy: function destroy() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");
		}, _destroy: t.noop, widget: function widget() {
			return this.element;
		}, option: function option(e, i) {
			var n,
			    o,
			    s,
			    r = e;if (0 === arguments.length) return t.widget.extend({}, this.options);if ("string" == typeof e) if ((r = {}, n = e.split("."), e = n.shift(), n.length)) {
				for (o = r[e] = t.widget.extend({}, this.options[e]), s = 0; n.length - 1 > s; s++) o[n[s]] = o[n[s]] || {}, o = o[n[s]];if ((e = n.pop(), 1 === arguments.length)) return void 0 === o[e] ? null : o[e];o[e] = i;
			} else {
				if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];r[e] = i;
			}return (this._setOptions(r), this);
		}, _setOptions: function _setOptions(t) {
			var e;for (e in t) this._setOption(e, t[e]);return this;
		}, _setOption: function _setOption(t, e) {
			return (this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this);
		}, enable: function enable() {
			return this._setOptions({ disabled: !1 });
		}, disable: function disable() {
			return this._setOptions({ disabled: !0 });
		}, _on: function _on(e, i, n) {
			var o,
			    s = this;"boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = o = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, o = this.widget()), t.each(n, function (n, r) {
				function a() {
					return e || s.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? s[r] : r).apply(s, arguments) : void 0;
				}"string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);var h = n.match(/^([\w:-]*)\s*(.*)$/),
				    c = h[1] + s.eventNamespace,
				    l = h[2];l ? o.delegate(l, c, a) : i.bind(c, a);
			});
		}, _off: function _off(e, i) {
			i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(i).undelegate(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get());
		}, _delay: function _delay(t, e) {
			function i() {
				return ("string" == typeof t ? n[t] : t).apply(n, arguments);
			}var n = this;return setTimeout(i, e || 0);
		}, _hoverable: function _hoverable(e) {
			this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter: function mouseenter(e) {
					t(e.currentTarget).addClass("ui-state-hover");
				}, mouseleave: function mouseleave(e) {
					t(e.currentTarget).removeClass("ui-state-hover");
				} });
		}, _focusable: function _focusable(e) {
			this.focusable = this.focusable.add(e), this._on(e, { focusin: function focusin(e) {
					t(e.currentTarget).addClass("ui-state-focus");
				}, focusout: function focusout(e) {
					t(e.currentTarget).removeClass("ui-state-focus");
				} });
		}, _trigger: function _trigger(e, i, n) {
			var o,
			    s,
			    r = this.options[e];if ((n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], s = i.originalEvent)) for (o in s) o in i || (i[o] = s[o]);return (this.element.trigger(i, n), !(t.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented()));
		} }, t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
		t.Widget.prototype["_" + e] = function (n, o, s) {
			"string" == typeof o && (o = { effect: o });var r,
			    a = o ? o === !0 || "number" == typeof o ? i : o.effect || i : e;o = o || {}, "number" == typeof o && (o = { duration: o }), r = !t.isEmptyObject(o), o.complete = s, o.delay && n.delay(o.delay), r && t.effects && t.effects.effect[a] ? n[e](o) : a !== e && n[a] ? n[a](o.duration, o.easing, s) : n.queue(function (i) {
				t(this)[e](), s && s.call(n[0]), i();
			});
		};
	}), t.widget;
}), (function (t) {
	"use strict";t.widget("aerolab.blockrain", { options: { autoplay: !1, autoplayRestart: !0, showFieldOnStart: !0, theme: null, blockWidth: 10, autoBlockWidth: !1, autoBlockSize: 24, difficulty: "normal", speed: 20, asdwKeys: !0, playText: "Let's play some Tetris", playButtonText: "Play", gameOverText: "Game Over", restartButtonText: "Play Again", scoreText: "Score", onStart: function onStart() {}, onRestart: function onRestart() {}, onGameOver: function onGameOver() {}, onLine: function onLine() {} }, start: function start() {
			this._doStart(), this.options.onStart.call(this.element);
		}, restart: function restart() {
			this._doStart(), this.options.onRestart.call(this.element);
		}, gameover: function gameover() {
			this.showGameOverMessage(), this._board.gameover = !0, this.options.onGameOver.call(this.element, this._filled.score);
		}, _doStart: function _doStart() {
			this._filled.clearAll(), this._filled._resetScore(), this._board.cur = this._board.nextShape(), this._board.started = !0, this._board.gameover = !1, this._board.animate(), this._$start.fadeOut(150), this._$gameover.fadeOut(150), this._$score.fadeIn(150);
		}, pause: function pause() {
			this._board.paused = !0;
		}, resume: function resume() {
			this._board.paused = !1;
		}, autoplay: function autoplay(t) {
			"boolean" != typeof t && (t = !0), this.options.autoplay = t, t && !this._board.started && this._doStart(), this._setupControls(!t);
		}, controls: function controls(t) {
			"boolean" != typeof t && (t = !0), this._setupControls(t);
		}, score: function score(t) {
			return ("undefined" != typeof t && parseInt(t) >= 0 && (this._filled.score = parseInt(t), this._$scoreText.text(this._filled_score)), this._filled.score);
		}, showStartMessage: function showStartMessage() {
			this._$start.show();
		}, showGameOverMessage: function showGameOverMessage() {
			this._$gameover.show();
		}, updateSizes: function updateSizes() {
			this._PIXEL_WIDTH = this.element.innerWidth(), this._PIXEL_HEIGHT = this.element.innerHeight(), this._BLOCK_WIDTH = this.options.blockWidth, this._BLOCK_HEIGHT = Math.floor(this.element.innerHeight() / this.element.innerWidth() * this._BLOCK_WIDTH), this._block_size = Math.floor(this._PIXEL_WIDTH / this._BLOCK_WIDTH), this._border_width = 2, this._PIXEL_WIDTH = this._block_size * this._BLOCK_WIDTH, this._PIXEL_HEIGHT = this._block_size * this._BLOCK_HEIGHT, this._$canvas.attr("width", this._PIXEL_WIDTH).attr("height", this._PIXEL_HEIGHT);
		}, theme: function theme(t) {
			return "undefined" == typeof t ? this.options.theme || this._theme : ("string" == typeof t ? (this.options.theme = t, this._theme = BlockrainThemes[t]) : (this.options.theme = null, this._theme = t), ("undefined" == typeof this._theme || null === this._theme) && (this._theme = BlockrainThemes.retro, this.options.theme = "retro"), (isNaN(parseInt(this._theme.strokeWidth)) || "number" != typeof parseInt(this._theme.strokeWidth)) && (this._theme.strokeWidth = 2), this._preloadThemeAssets(), void (null !== this._board && ("string" == typeof this._theme.background && this._$canvas.css("background-color", this._theme.background), this._board.render())));
		}, _theme: {}, _$game: null, _$canvas: null, _$gameholder: null, _$start: null, _$gameover: null, _$score: null, _$scoreText: null, _canvas: null, _ctx: null, _create: function _create() {
			this.theme(this.options.theme), this._createHolder(), this._createUI(), this._refreshBlockSizes(), this.updateSizes(), t(window).resize(function () {}), this._SetupShapeFactory(), this._SetupFilled(), this._SetupInfo(), this._SetupBoard(), this._info.init(), this._board.init(), this.options.autoplay ? this.autoplay(!0) : this._setupControls(!0);
		}, _checkCollisions: function _checkCollisions(t, e, i, n) {
			for (var o, s, r = 0, a = i.length; a > r; r += 2) {
				if ((o = t + i[r], s = e + i[r + 1], s >= this._BLOCK_HEIGHT || this._filled.check(o, s))) return !0;if (!n && 0 > o || o >= this._BLOCK_WIDTH) return !0;
			}return !1;
		}, _board: null, _info: null, _filled: null, _drawBackground: function _drawBackground() {
			if ("string" == typeof this._theme.background) {
				if (this._theme.backgroundGrid instanceof Image) {
					if (0 === this._theme.backgroundGrid.width || 0 === this._theme.backgroundGrid.height) return;this._ctx.globalAlpha = 1;for (var t = 0; t < this._BLOCK_WIDTH; t++) for (var e = 0; e < this._BLOCK_HEIGHT; e++) {
						var i = t * this._block_size,
						    n = e * this._block_size;this._ctx.drawImage(this._theme.backgroundGrid, 0, 0, this._theme.backgroundGrid.width, this._theme.backgroundGrid.height, i, n, this._block_size, this._block_size);
					}
				} else if ("string" == typeof this._theme.backgroundGrid) {
					{
						var o = this._theme.strokeWidth;Math.round(.23 * this._block_size), Math.round(.3 * this._block_size);
					}this._ctx.globalAlpha = 1, this._ctx.fillStyle = this._theme.backgroundGrid;for (var t = 0; t < this._BLOCK_WIDTH; t++) for (var e = 0; e < this._BLOCK_HEIGHT; e++) {
						var i = t * this._block_size,
						    n = e * this._block_size;this._ctx.fillRect(i + o, n + o, this._block_size - 2 * o, this._block_size - 2 * o);
					}
				}this._ctx.globalAlpha = 1;
			}
		}, _drawBlock: function _drawBlock(t, e, i, n) {
			t *= this._block_size, e *= this._block_size, n = "boolean" == typeof n ? n : !1;var o = this._theme.strokeWidth,
			    s = Math.round(.23 * this._block_size),
			    r = Math.round(.3 * this._block_size),
			    a = this._getBlockColor(i, n);if ((this._ctx.globalAlpha = 1, a instanceof Image)) {
				if ((this._ctx.globalAlpha = 1, 0 === a.width || 0 === a.height)) return;this._ctx.drawImage(a, 0, 0, a.width, a.height, t, e, this._block_size, this._block_size);
			} else "string" == typeof a && (this._ctx.fillStyle = a, this._ctx.fillRect(t, e, this._block_size, this._block_size), "string" == typeof this._theme.innerShadow && (this._ctx.globalAlpha = 1, this._ctx.strokeStyle = this._theme.innerShadow, this._ctx.lineWidth = 1, this._ctx.strokeRect(t + 1, e + 1, this._block_size - 2, this._block_size - 2)), "string" == typeof this._theme.stroke && (this._ctx.globalAlpha = 1, this._ctx.fillStyle = this._theme.stroke, this._ctx.strokeStyle = this._theme.stroke, this._ctx.lineWidth = o, this._ctx.strokeRect(t, e, this._block_size, this._block_size)), "string" == typeof this._theme.innerStroke && (this._ctx.fillStyle = this._theme.innerStroke, this._ctx.fillRect(t + s, e + s, this._block_size - 2 * s, o), this._ctx.fillRect(t + s, e + s + o, o, this._block_size - 2 * s - o)), "string" == typeof this._theme.innerSquare && (this._ctx.fillStyle = this._theme.innerSquare, this._ctx.globalAlpha = .2, this._ctx.fillRect(t + r, e + r, this._block_size - 2 * r, this._block_size - 2 * r)));this._ctx.globalAlpha = 1;
		}, _getBlockColor: function _getBlockColor(t, e) {
			return ("boolean" != typeof e && (e = !0), e ? "string" == typeof this._theme.primary && "" !== this._theme.primary ? this._theme.primary : this._theme.blocks[t] : "string" == typeof this._theme.secondary && "" !== this._theme.secondary ? this._theme.secondary : this._theme.blocks[t]);
		}, _shapeFactory: null, _SetupShapeFactory: function _SetupShapeFactory() {
			function e(e, i, n, o) {
				return (t.extend(this, { x: 0, y: 0, symmetrical: n, init: function init() {
						return (t.extend(this, { orientation: 0, x: Math.floor(e._BLOCK_WIDTH / 2) - 1, y: -1 }), this);
					}, blockType: o, blocksLen: i[0].length, orientations: i, orientation: 0, rotate: function rotate(t) {
						var i = (this.orientation + (t ? 1 : -1) + 4) % 4;e._checkCollisions(this.x, this.y, this.getBlocks(i)) || (this.orientation = i);
					}, moveRight: function moveRight() {
						e._checkCollisions(this.x + 1, this.y, this.getBlocks()) || this.x++;
					}, moveLeft: function moveLeft() {
						e._checkCollisions(this.x - 1, this.y, this.getBlocks()) || this.x--;
					}, getBlocks: function getBlocks(t) {
						return this.orientations[void 0 !== t ? t : this.orientation];
					}, draw: function draw(t, i, n, o) {
						t && this.y++;for (var s = this.getBlocks(o), r = void 0 === i ? this.x : i, a = void 0 === n ? this.y : n, h = 0; h < this.blocksLen; h += 2) e._drawBlock(r + s[h], a + s[h + 1], this.blockType, !0);
					}, getBounds: function getBounds(e) {
						for (var i = t.isArray(e) ? e : this.getBlocks(e), n = 0, o = i.length, s = 999, r = -999, a = 999, h = -999; o > n; n += 2) i[n] < s && (s = i[n]), i[n] > r && (r = i[n]), i[n + 1] < a && (a = i[n + 1]), i[n + 1] > h && (h = i[n + 1]);return { left: s, right: r, top: a, bottom: h, width: r - s, height: h - a };
					} }), this.init());
			}var i = this;null === this._shapeFactory && (this._shapeFactory = { line: function line() {
					var t = [0, -1, 0, -2, 0, -3, 0, -4],
					    n = [-1, -2, 0, -2, 1, -2, 2, -2];return new e(i, [t, n, t, n], !0, "line");
				}, square: function square() {
					var t = [0, 0, 1, 0, 0, -1, 1, -1];return new e(i, [t, t, t, t], !0, "square");
				}, arrow: function arrow() {
					return new e(i, [[0, -1, 1, -1, 2, -1, 1, -2], [1, -2, 1, -1, 1, 0, 2, -1], [0, -1, 1, -1, 2, -1, 1, 0], [0, -1, 1, -1, 1, -2, 1, 0]], !1, "arrow");
				}, rightHook: function rightHook() {
					return new e(i, [[0, 0, 0, -1, 1, -1, 2, -1], [0, -2, 1, 0, 1, -1, 1, -2], [0, -1, 1, -1, 2, -1, 2, -2], [0, -2, 0, -1, 0, 0, 1, 0]], !1, "rightHook");
				}, leftHook: function leftHook() {
					return new e(i, [[2, 0, 0, -1, 1, -1, 2, -1], [0, 0, 1, 0, 1, -1, 1, -2], [0, -2, 0, -1, 1, -1, 2, -1], [0, 0, 0, -1, 0, -2, 1, -2]], !1, "leftHook");
				}, leftZag: function leftZag() {
					var t = [0, 0, 0, -1, 1, -1, 1, -2],
					    n = [0, -1, 1, -1, 1, 0, 2, 0];return new e(i, [n, t, n, t], !0, "leftZag");
				}, rightZag: function rightZag() {
					var t = [0, -2, 0, -1, 1, -1, 1, 0],
					    n = [0, 0, 1, 0, 1, -1, 2, -1];return new e(i, [n, t, n, t], !0, "rightZag");
				} });
		}, _SetupFilled: function _SetupFilled() {
			var t = this;null === this._filled && (this._filled = { data: new Array(t._BLOCK_WIDTH * t._BLOCK_HEIGHT), score: 0, toClear: {}, check: function check(t, e) {
					return this.data[this.asIndex(t, e)];
				}, add: function add(e, i, n) {
					e >= 0 && e < t._BLOCK_WIDTH && i >= 0 && i < t._BLOCK_HEIGHT && (this.data[this.asIndex(e, i)] = n);
				}, asIndex: function asIndex(e, i) {
					return e + i * t._BLOCK_WIDTH;
				}, asX: function asX(e) {
					return e % t._BLOCK_WIDTH;
				}, asY: function asY(e) {
					return Math.floor(e / t._BLOCK_WIDTH);
				}, clearAll: function clearAll() {
					delete this.data, this.data = new Array(t._BLOCK_WIDTH * t._BLOCK_HEIGHT);
				}, _popRow: function _popRow(e) {
					for (var i = t._BLOCK_WIDTH * (e + 1) - 1; i >= 0; i--) this.data[i] = i >= t._BLOCK_WIDTH ? this.data[i - t._BLOCK_WIDTH] : void 0;
				}, checkForClears: function checkForClears() {
					var e,
					    i,
					    n,
					    o,
					    s = t._board.lines,
					    r = [];for (e = 0, i = this.data.length; i > e; e++) o = this.asX(e), 0 == o && (n = 0), this.data[e] && "string" == typeof this.data[e] && (n += 1), o == t._BLOCK_WIDTH - 1 && n == t._BLOCK_WIDTH && r.push(this.asY(e));for (e = 0, i = r.length; i > e; e++) this._popRow(r[e]), t._board.lines++, t._board.lines % 10 == 0 && t._board.dropDelay > 1;var a = t._board.lines - s;this._updateScore(a);
				}, _updateScore: function _updateScore(e) {
					if (!(0 >= e)) {
						var i = [0, 400, 1e3, 3e3, 12e3];e >= i.length && (e = i.length - 1), this.score += i[e], t._$scoreText.text(this.score), t.options.onLine.call(t.element, e, i[e], this.score);
					}
				}, _resetScore: function _resetScore() {
					this.score = 0, t._$scoreText.text(this.score);
				}, draw: function draw() {
					for (var e, i = 0, n = this.data.length; n > i; i++) if (void 0 !== this.data[i]) {
						e = this.asY(i);var o = this.data[i];t._drawBlock(this.asX(i), e, o);
					}
				} });
		}, _SetupInfo: function _SetupInfo() {
			var t = this;this._info = { mode: t.options.difficulty, modes: ["normal", "nice", "evil"], modesY: 170, autopilotY: null, init: function init() {
					this.mode = t.options.difficulty;
				}, setMode: function setMode(e) {
					this.mode = e, t._board.nextShape(!0);
				} };
		}, _SetupBoard: function _SetupBoard() {
			var t = this,
			    e = this._info;this._board = { animateDelay: 1e3 / t.options.speed, cur: null, lines: 0, dropCount: 0, dropDelay: 5, started: !1, gameover: !1, init: function init() {
					this.cur = this.nextShape(), t.options.showFieldOnStart && (t._drawBackground(), t._board.createRandomBoard(), t._board.render()), this.showStartMessage();
				}, showStartMessage: function showStartMessage() {
					t._$start.show();
				}, showGameOverMessage: function showGameOverMessage() {
					t._$gameover.show();
				}, nextShape: function nextShape(i) {
					var n,
					    o,
					    s,
					    r = this.next;if ((n = "nice" == e.mode || "evil" == e.mode ? t._niceShapes : t._randomShapes(), t.options.no_preview)) {
						if ((this.next = null, i)) return null;if ((o = n(t._filled, t._checkCollisions, t._BLOCK_WIDTH, t._BLOCK_HEIGHT, e.mode), !o)) throw new Error("No shape returned from shape function!", n);o.init(), s = o;
					} else {
						if ((o = n(t._filled, t._checkCollisions, t._BLOCK_WIDTH, t._BLOCK_HEIGHT, e.mode), !o)) throw new Error("No shape returned from shape function!", n);if ((o.init(), this.next = o, i)) return null;s = r || this.nextShape();
					}return (t.options.autoplay && (t._niceShapes(t._filled, t._checkCollisions, t._BLOCK_WIDTH, t._BLOCK_HEIGHT, "normal", s), s.orientation = s.best_orientation, s.x = s.best_x), s);
				}, animate: function animate() {
					var e = !1,
					    i = !1;if (!this.paused && !this.gameover) {
						if ((this.dropCount++, (this.dropCount >= this.dropDelay || t.options.autoplay) && (e = !0, this.dropCount = 0), e)) {
							var n = this.cur,
							    o = n.x,
							    s = n.y,
							    r = n.getBlocks();if (t._checkCollisions(o, s + 1, r, !0)) {
								e = !1;for (var a = 0; a < n.blocksLen; a += 2) t._filled.add(o + r[a], s + r[a + 1], n.blockType), s + r[a] < 0 && (i = !0);t._filled.checkForClears(), this.cur = this.nextShape();
							}
						}t._ctx.clearRect(0, 0, t._PIXEL_WIDTH, t._PIXEL_HEIGHT), t._drawBackground(), t._filled.draw(), this.cur.draw(e);
					}i ? (this.gameover = !0, t.gameover(), t.options.autoplay && t.options.autoplayRestart && t.restart()) : (this.animateDelay = 1e3 / t.options.speed, window.setTimeout(function () {
						t._board.animate();
					}, this.animateDelay));
				}, createRandomBoard: function createRandomBoard() {
					var e,
					    i,
					    n,
					    o,
					    s,
					    r = [];for (r = Object.keys(t._shapeFactory), e = 0, i = t._BLOCK_WIDTH; i > e; e++) for (n = 0, o = t._randChoice([t._randInt(0, 8), t._randInt(5, 9)]); o > n; n++) s && t._randInt(0, 3) || (s = t._randChoice(r)), t._filled.add(e, t._BLOCK_HEIGHT - n, s);
				}, render: function render() {
					t._ctx.clearRect(0, 0, t._PIXEL_WIDTH, t._PIXEL_HEIGHT), t._drawBackground(), t._filled.draw(), this.cur.draw(!1);
				} }, t._niceShapes = t._getNiceShapes();
		}, _randInt: function _randInt(t, e) {
			return t + Math.floor(Math.random() * (1 + e - t));
		}, _randSign: function _randSign() {
			return 2 * this._randInt(0, 1) - 1;
		}, _randChoice: function _randChoice(t) {
			return t[this._randInt(0, t.length - 1)];
		}, _preloadThemeAssets: function _preloadThemeAssets() {
			var t = new RegExp("^data:image/(png|gif|jpg);base64,", "i");if ("undefined" != typeof this._theme.blocks) for (var e = Object.keys(this._theme.blocks), i = 0; i < e.length; i++) if ((this._theme.blocks[e[i]], "string" == typeof this._theme.blocks[e[i]] && t.test(this._theme.blocks[e[i]]))) {
				var n = this._theme.blocks[e[i]];this._theme.blocks[e[i]] = new Image(), this._theme.blocks[e[i]].src = n;
			}if ("undefined" != typeof this._theme.backgroundGrid && "string" == typeof this._theme.backgroundGrid && t.test(this._theme.backgroundGrid)) {
				var n = this._theme.backgroundGrid;this._theme.backgroundGrid = new Image(), this._theme.backgroundGrid.src = n;
			}
		}, _createHolder: function _createHolder() {
			this._$gameholder = t("<div class=\"blockrain-game-holder\"></div>"), this._$gameholder.css("position", "relative").css("width", "100%").css("height", "100%"), this.element.html("").append(this._$gameholder), this._$canvas = t("<canvas style=\"display:block; width:100%; height:100%; padding:0; margin:0; border:none;\" />"), "string" == typeof this._theme.background && this._$canvas.css("background-color", this._theme.background), this._$gameholder.append(this._$canvas), this._canvas = this._$canvas.get(0), this._ctx = this._canvas.getContext("2d");
		}, _createUI: function _createUI() {
			var e = this;e._$score = t("<div class=\"blockrain-score-holder\" style=\"position:absolute;\"><div class=\"blockrain-score\"><div class=\"blockrain-score-msg\">" + this.options.scoreText + "</div><div class=\"blockrain-score-num\">0</div></div></div>").hide(), e._$scoreText = e._$score.find(".blockrain-score-num"), e._$gameholder.append(e._$score), e._$start = t("<div class=\"blockrain-start-holder\" style=\"position:absolute;\"><div class=\"blockrain-start\"><div class=\"blockrain-start-msg\">" + this.options.playText + "</div><a class=\"blockrain-btn blockrain-start-btn\">" + this.options.playButtonText + "</a></div></div>").hide(), e._$gameholder.append(e._$start), e._$start.find(".blockrain-start-btn").click(function (t) {
				t.preventDefault(), e.start();
			}), e._$gameover = t("<div class=\"blockrain-game-over-holder\" style=\"position:absolute;\"><div class=\"blockrain-game-over\"><div class=\"blockrain-game-over-msg\">" + this.options.gameOverText + "</div><a class=\"blockrain-btn blockrain-game-over-btn\">" + this.options.restartButtonText + "</a></div></div>").hide(), e._$gameover.find(".blockrain-game-over-btn").click(function (t) {
				t.preventDefault(), e.restart();
			}), e._$gameholder.append(e._$gameover);
		}, _refreshBlockSizes: function _refreshBlockSizes() {
			this.options.autoBlockWidth && (this.options.blockWidth = Math.ceil(this.element.width() / this.options.autoBlockSize));
		}, _getNiceShapes: function _getNiceShapes() {
			function t(t, e, i, o, s, r, a) {
				var h,
				    c,
				    l,
				    d,
				    u = e.length,
				    A = 0,
				    g = {};for (h = 0; u > h; h += 2) A += t[n._filled.asIndex(i + e[h], o + e[h + 1])] || 0;for (h = 0; u > h; h += 2) c = e[h], l = e[h + 1], (void 0 === g[c] || g[c] < l) && (g[c] = l);d = 0;for (c in g) for (c = parseInt(c), l = g[c] + 1, h = 0; a > o + l; l++, h++) if (!n._filled.check(i + c, o + l)) {
					d += 0 == h ? 2 : 1;break;
				}return A -= d;
			}function e() {
				for (var t in o) o[t].x = 0, o[t].y = -1;
			}var i,
			    n = this,
			    o = {};for (var i in this._shapeFactory) o[i] = this._shapeFactory[i]();var s = function s(i, _s, r, a, h, c) {
				c || e();var l,
				    d,
				    u,
				    A,
				    g,
				    f,
				    m,
				    p,
				    b,
				    _,
				    k,
				    I,
				    v,
				    y,
				    C,
				    w = new Array(r * a),
				    G = "evil" == h,
				    B = 999 * (G ? 1 : -1);for (l = 0; r > l; l++) for (d = 0; a >= d; d++) if (d == a || i.check(l, d)) {
					for (u = d - 4; d > u; u++) w[i.asIndex(l, u)] = u;break;
				}var E = void 0 === c ? o : { cur: c };for (A in E) {
					for (g = E[A], v = -999, f = 0; f < (g.symmetrical ? 2 : 4); f++) for (m = g.getBlocks(f), p = g.getBounds(m), l = -p.left; l < r - p.width; l++) for (d = -1; d < a - p.bottom; d++) if (n._checkCollisions(l, d + 1, m, !0)) {
						b = t(w, m, l, d, i, r, a), b > v && (v = b, y = f, C = l);break;
					}(G && B > v || !G && v > B) && (_ = g, B = v, k = y, I = C);
				}return (_.best_orientation = k, _.best_x = I, _);
			};return (s.no_preview = !0, s);
		}, _randomShapes: function _randomShapes() {
			var e = [];return (t.each(this._shapeFactory, function (t, i) {
				e.push(i);
			}), this._randChoice(e));
		}, _setupControls: function _setupControls(e) {
			function i(t) {
				var e = { stopKeys: { 37: 1, 38: 1, 39: 1, 40: 1 } },
				    i = e.stopKeys[t.keyCode] || e.moreStopKeys && e.moreStopKeys[t.keyCode];return (i && t.preventDefault(), i);
			}function n(t) {
				return "safekeypress." + t.keyCode;
			}function o(e) {
				var o = n(e),
				    s = (t.data(this, o) || 0) + 1;return (t.data(this, o, s), s > 0 ? h.call(this, e) : i(e));
			}function s(e) {
				var i = n(e);return (t.data(this, i, (t.data(this, i) || 0) - 1), h.call(this, e));
			}function r(e) {
				return (t.data(this, n(e), 0), i(e));
			}var a = this,
			    h = function h(t) {
				var e = !1;if (a._board.cur) {
					if ((e = !0, a.options.asdwKeys)) switch (t.keyCode) {case 65:
							a._board.cur.moveLeft();break;case 87:
							a._board.cur.rotate(!0);break;case 68:
							a._board.cur.moveRight();break;case 83:
							a._board.dropCount = a._board.dropDelay;}switch (t.keyCode) {case 37:
							a._board.cur.moveLeft();break;case 38:
							a._board.cur.rotate(!0);break;case 39:
							a._board.cur.moveRight();break;case 40:
							a._board.dropCount = a._board.dropDelay;break;case 88:
							a._board.cur.rotate(!0);break;case 90:
							a._board.cur.rotate(!1);break;default:
							e = !1;}
				}return (e && t.preventDefault(), !e);
			};t(document).unbind("keypress.blockrain").unbind("keydown.blockrain").unbind("keyup.blockrain"), a.options.autoplay || e && t(document).bind("keypress.blockrain", o).bind("keydown.blockrain", s).bind("keyup.blockrain", r);
		} });
})(jQuery), window.BlockrainThemes = { candy: { background: "#040304", backgroundGrid: "data:image/png;base64,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", blocks: { line: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACuklEQVR4Xi2MzW4cRRSFz/2p6p4eT2zjjE2MHBQWvAALNjwDS8SOFc/FIyCxQgh2LFHkBQgJyQo/wXKCEZ7x9E9VV93LBPNJ516dxXfo/U8+HTZ9uzrZympTjLo4DbtDiBpXSBGMocI5lkaMhKv0fz+LVX9P6ZuvvxqBby+3L3eJu6Zt27DL4qgIWW0KsxPC3Kjxz5fPT3z48csvtHSHd0C/1374RddPX/9xK6JdcjEutNfqFJMBsQat3By+i/7VxqJ6c/zd5avvn1+N7dl2V9Ad92M2ViI2ksyWSJ2QXQXc5/H25jYcHHKl1YYebcJqw/rW03OOzfr89NHbR8vH3Wq9Olofrddni+XhycXJhBSkKFLxWeHBZFFDVyD343Rzc/0XeYSXeXZIJaam2V9pLsBOtRIKYAorXqvAg8giaKsCKw1zJAGFbKhwtxrdG9E3BQxAIW1xyYUKUIwNxMAwDEwuSgA5iAw2l5ITOeE/GLRMihIOsnQZnKqOlWXRUWidyYkFpCxtCF1s8D+seBggYVYRhChkqqjmld3NKhhu1XKuKUf4g6egEitkvqc5ewo+3ZOVZJO4Q4OSEDGRRyAQkYH8QfMUCR07KS8DIsO8xhjcnUXnSv4GMRYShSUG2MFCeby/awOJFyvF3TU22ckk3E3FQjci+mJVggwz12rKVEvWOk3dwWpIr7ezrU4XZ+9ciBAxWCVlhDb2o5cZTgBR17R3w45hgg8/fu+Dj643adZVXzCmebsbp5T6fhr2L9W8z5xLNsyDpl2btrsXPynS9NvVVc28xzMLPDCUYbVUMy+TMgdinupCEapdvPv0lqGwjW9fHsXjF39eIzRpnFbLdiy918qCWmclnq3mcWhVnzw5v+83XYz0+LPP/8lL704NB3BBdbCDKlChAq8QgRvmGSFouyo3vz7Lr/8FMHqie3VCpNQAAAAASUVORK5CYII=", square: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACfUlEQVR4Xh3LvY5cRRBA4VNV3ffe+fEaZARgWfBExEhEZEg8A69AgkC8AzEiICMgJCdAxggsGRuW3Z3dmenbXVWskT6d7MiXnz3qclu87esm1qW3NteRuqaCIAmQABwPvPU2NyeaUa6P159/9QV3l/HqlWqN41El0PaadEJAoZBKqS9+eybL/tvvvi8PrHA4ku33pz9v5rafKmc0I7QhbiGaJSikyeCh1T7OG6fMluOvP/5+8csb+/RxhUtlEXA5KUMpiEpWwZKU3D799Zl1CtpEjsoh++HRxUMBVhgry4yUXLvstnE8qWi/HZndTEwpppj5XLIg7fZ4+fJlb91jzSlGhjc2O7RMj995nApRIRW0BHRl9UXLona6PYiGGKpaa50qPtQ96/5BCgkpBKghpI7VJZK5bmYju5IxQkZONqtbu+txd5ZEQFI0KaRRJxEZY0wjh/dqKqbZ/z9tqmJIqpQSnaD8T9sYkGqWmuTIZHgoWYupKh4SqSQimqrJfeV1gTECF4NKmUHwDFRqNSuJjMTxFQANNKGUyTBxYqSX6J6USdc1BquYFhEMFEQCUvSeC5rheL/Y74kAvX/OPXRZojIkqHkaLpMwWdYJm1fHlZIJotdXN7tFtczvvfuB5MIyRZwQ11pora2BTKOvva3zPKtStpsKLNNmmcr53xtFMtLaGLSR61IKKaPHenO1L2+qThqrn5FvPuGjjz8s4x+NI6Ptdvtxckywo0cjstZZZfZhNhSWNuoPP/5Udhebc8+tbp4//zPd6dcaGtJtWtUiVkhTWSJkTn3y5P15M19ervL1p9UZFzX9zHYmO1Ph3KFQK+rkIBMScbY7DicOzn+QRoW5iamqhgAAAABJRU5ErkJggg==", arrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACsklEQVR4XhWPu25bVxREZz/OuQ9RVKhXjBSu8gX5h+QD0udD8ilByjRpUqZxa6RxY8DuYlhwHhAc2qRIieK9vOfsvUMNBoPVrGLoh6+++7y7mbFfTNIVdShCxCGuAgE8tSilhOVWU6lrtPjPK33ffvvb6xd4KG9/+f1kenIYoAgOIc+AF9u5Rdteuvubty9LU168fqW9z7AFanr36uPZSOIgWHB1IJABKE0keSr3QdLolXitjw1n717++sfPP/7Ula6pfbYmeU7eaBybnzg6ewwpT8DW/vth2acFkzf9Pi0OOU1+/eVlM2/m14vZ+Rfz88t+Np+fnZ8tns1OL66vLss0FIughgppDumLzIpmYBrHz+uVsZVSsraorJoMQU5dOs3K3jaiSXGciNYoG3cQcbJjwiKC3Ny9ljhEEUlGBnh4IJwR+qQ6q7FbuMPBLEQCVjaYA0mYwcyIY6p5qYFQQqOexRMhHOqg6sV8mtiqQki51gSHV6YAMYMMxgIC2IOcBcIsQipBBCIjNqEQBWARjjAOHAtSh1eqk9bqLpBKQUSZE4ccIqpJFnWQiRSKypjUA1DgEDw5janNkgA4zKmGQtpgsNqhMoRCmRni4AgKJh6DB842TffENWWqU+m448eYje186GZT31nXo5EqPhUGIqoGwd1gtWFtRBeLxcXF1TydYh+td1E5lMdpOOxGr9bPOzdrtFGWk2lAg84e9/fYbGmsync0xD7mfkITgUMbJaKc26GOVn2sB61Gf958OE992wsoQjSSjBHUwEmlISTsxjEsOIsxP3v+/M3tey3wrRVh29wuA2Vo3Xoe3KP6Endhzh3v92NjKefcXZzETKxR+Sa+vt2s3/3z127YrYfN+mGz2m4+rT+tNuu77d3yfvn3+vbh8eH4bb3dLrer97c3q7L6H15gvODKB5u4AAAAAElFTkSuQmCC", rightHook: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACqElEQVR4Xh3PO2tlZRSH8f9a73XvPTkTExl1dLAIKFpNY2Fl4UcT7G3FwmIaO3sbEfQjWAxDAkIORDHJyXFf3stayzC/9qke+ubrF0u7zqwfsJNFXEKtCAJriBGBoB0gNAZ5WIekcC0f+br8++3Pr1AP5Y/f6Xgfx4RqoB2kI27QgkYQw5BA2L95M+vTn379y0c2HI+Y5Ob6z3B/M/ZmlTieV7ISj9rXZ2n338NciEMedGshJacbZ9X16vK3H76vh/1paCOWiWvos5M1U9llLIebKeqz0zG4PmZ/dfl6XWc/9p4Ox/fMwnIcXrwL6ohPg54OZhYTUUc+w1YQ83z3kMadEKdp8EmE54cnKifTBLOr17cqtwIf4gAuKhUd8Lh4+TKPowjyOK1l8cxAm9nK2nWnsQeAyNtgldnClCLntkrRrTBcFyPjYRg8AEAY4JDhkhp7uOBIRbyqrmK+KcBm1qU30UbSxHcGnIGpKYk63dQxnC2sPcWo2slZUCCGYXPkkBnUqjcCSAGFsaOUQk5koqUqPFV5G2sDai+tG3vv6ZF3BojBzFrvpeij4KtDZTjPXTWGBA91uWJTo1WkqTAZoAbpT3ejd0YOBW1zoAHE/tG8FThm52KOLnDv1dA8DACTwbRU6TxSaX1WZII/1qBgwLvWtgN6ieQc2hC9hwLGTFS35eTJ7uOL5xxTkZI44l7BDGpwBke8FFCA9Pj2EAipHbd8Qre3fxOMDWykGryyM2Vv67JwmCJ7cQRRM6JXX+CrLz97/uHJ4bgHFUdKBi8B5gECLLAys4grAkr5Vt758ZdLTwhuPNvfHP7ZPzjrBAHYLBlChwPQ+jrtpq2UJv3i0/clni/Y03efYzxPvZdBkAzeAKATukENAoTA86ynZ3GrVQl3Eu/yJ/8D33mmeKR3Cz8AAAAASUVORK5CYII=", leftHook: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACq0lEQVR4Xg3HO24mVRBH8X/Vrfv4ut02BjS8GSBAQuyCmE0gwSLICFgCBLASAhLiiQjQICFBMAMSFn63v+77qCp89EsO5U+/rus/0zQPPW8thXRQABLAjtHAAZ2gzGk2HRCG1YMPwgdf/fnXj1fX+O7732s/A0kzbwEUCW5Fgh8HGVdFTOn5H79NiZ/98rPATBVS8OzX5xTehYsxd3KFwXcGEljVOGVJ8a7W4Q4YT8sb33z70xdf/oB8HufzhjI0m2a3JLykuAyV4RGxrLVN5+f/3dxSKXJc59qfUk77djhdXhGx0/mMAg/rpm30bXq97Fp3su1mrMe19e46BLLw9Nb1w0WaZoO+fPmCNbTW3D1Fcjci77Cnn3wMhCBpWU7vuwqo3evgaar6QHRqfRXKhQiELFG1O6H3MZUyLpTIx24UMkNASbqZwZiN3AQsgKhZ6/VYR9OcDw/blg5xmKqPnIRBLQUZw4iIWQKydRcEcvLOOZ2A80Nv8SRv1iiHQWPXewbztm3MbObMYgpGCMwiwgwAIhJCAGBmjMD+KDJJThJzTI8TKZm5E9S7U3c0s6PrkVujvYbm0Qr1iceJ+GZ9772OMawNDNAgVm8cADcAQSgzCSiChZj8MRLwXCTPufQEC8SlVKPWNTJJ4BTDcds58tCaMsVoIQ8Nq2AgS97uVg2h7v29Dz86W86MGqB922F+djjsdbWE0eu233fbwF0opd57KYU43l5ewQ43N7d17CwUHJnlsl4QmUwkJJKZ5uXaLdBrnzl6EGbTbV2nVIiMuMU44EMwMjn76GMHeWAKhKuLvyXoC+F3IvXrfy9zmO/WKyUM6c1riWUY7btKiA+9UkyvPnk7KFMPtLz/uS9vrjVFLNqTUSEJNLN5hQL7gIXpsGytO0ekCduR/fg/hV+olVqSm3YAAAAASUVORK5CYII=", rightZag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACt0lEQVR4Xg3LOW6eVRQG4PcM937DP9hYlkgUQ6RQsAiEWAC7YCWUtGyAFqhpEHRI0CCBIjpHJBSxEhzkxP6H+93pHPz0D3358IsbuyY/XlCs7/YU5zjFZgdGp07BEDq4KXwA0PvuqIfDGbT0u69/+hZvr/DrH1gc1WENwUAGM3RDcXQGRbA9/e3nJPX3F5dqdY/ja8ztx++/+YhX5S6P47REODW2Pra+qsbOR5VFWwjHVPKJJF1FevPn019++O7jeYo3h5VG8Ua5OLnCh25T7+RwYfZavVz993q5OehccfImnV3nqdLjD54gTiDAF3cnEJrBAbZNSS//vTKP1FcTk0ppsfYzkpEt58Pls8vb29vTabDWYZJzjsqnJ+vHjx9tVvf3qG3QVpXJ0Y5L2xWmYbPt7W5WeK7RKUqICic7poQY6q4Fw2AUDSykUGUlQ0cUy3XUqCxm8Obe4SypVoRwOC7kLE5szIoBHsmlO6NJO3Qv5GEozI3IiE25K2EeLAiYADiBOwi51NLdCRrGcQ5xTLVUcg1BVeFszXtaWinkIAcALigQDwISby0Vq3dpR8IA2r1cKNfZRTq9F2c1iLuYqQcHg2Dmvbam08QUG1V07zASqDCLouSSE0tojCbGablFoMgkpMxht9QukvICASIXtNLy7rDDakVDeGepzpIUup1mlIZs5Dbo9OknnwEELGgZJgBhHHDYIx/v8/r98+d/P2cVVSOkitRPN9uXfz0j2rRSh1CZDKRmFomgnns62Wyvrq+ncTy2JJ/rRXv76vx04ymr83pci9gYRYISS4N3cgRKvYb15EHOHzy8fPaPgtMe8zHG5y8uH6y3wa7LPbNOIIkQRpCOZt7KzatHFx+Ww0Ki9NX8ZHWy7Sltchtz2aj32nicjZkpLr1m760vp5tN2e8jtHX0Yf4f3da+1L4oEEQAAAAASUVORK5CYII=", leftZag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACtElEQVR4Xg2Lu25cZRhF93f5L3OOPeOQmJuDhEIHDa/CC/B4SHSICqS0CERDE2MJAYKEmITEcewZz/nvH7O0taq16eTL++P66nhCDegOAEhghFYhDDM0hSgowQkKkDIwJi0pP/72G9j24vIi8S7nN34lYG1VyOKg0uVKFFIiY/XL+R8s977+6nvttBMkovTDz9/Np3G3fTlvYkoFJswzaxtya2haQ0nUdGa2PLY6GD/9+vjJ+Y+bD+K2vFxtrLS3cQq9t1rLwUZ7IpuOAmQQ8u9/PgFDWbG5708/jK/Ti9OzExErhYVU1TMrCZqV7fY2Or2+uQ5H7zgPMNQF5HL7+upZeFeHLU//etrraM2YedQBAXsnoPXHn8yrcHVzE0LICWoECTQf+SG19dRqK3tMUxSRZtkIZtqbsblW+vF8/Pzy1XoNvdthjDas7He7swdno+JkM21v997r6A1MIKNBwiCiXssqhNsbcAwQosPTeek1MzBa947NmnewYcGR8Oh1sZG8s5LvQoACaK0Yegi+965MNWXnxIAx0AdyWnqDMjuh1KoIkYGNUPqh0zHaYcpwoin1ZiBFjFBVEWLm1ppzTkQAsAQYQdwhTap+dBCRXzkW6g2lIpdqRkYE1v1+AZgEuiRo8G2YaCBo75ZylSCdiMnoYPVefO1k8AYm7rlAjUDi7/ZN18HIffbp5zFO22Vf0bzXfsBQUu4DIJ6P1/t/XowB9RGl4Xj94M62zy+vou2sDUySyhJjTDXpAeL9YFKXaxYnuoL2BRfnzxghj7YKm4liHkszGkOUjtxIYjKM9ncpTnPr4+HDj8j+U5/B5R5k/vfv344m6rfXHb3NSqKvdrs5xKUWeN95nUd69Oi9vpQI0PtfTAn7eE/eLF0Y92eUjrcDISBmrBjbgkrIDPFYCfoCLPgflXOjuIEFgMYAAAAASUVORK5CYII=" } }, modern: { background: "#000000", backgroundGrid: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZTg0NzU4MC00ODk3LTRkNjAtOWNhYi1mZTk1NzQ5NzhiNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTEzOEQwMDc5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTEzOEQwMDY5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplNDRjOWZiNC0yNzE5LTQ3NDYtYmRmMi0wMmY2ZTA4ZjAxMmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzMwNTNEOTk5MDM1MTFFNDlBMzlFNzY4RjBCNkNENzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Y01+zAAAAMklEQVR42mJgGAWjYBSMgkEJGIlUd+j/WjjbjjGYGC1MtHP10DR6FIyCUTAKBikACDAA0NoDCLGGjH8AAAAASUVORK5CYII=", primary: null, secondary: null, stroke: null, blocks: { line: "#fa1e1e", square: "#f1fa1e", arrow: "#d838cb", rightHook: "#f5821f", leftHook: "#42c6f0", rightZag: "#4bd838", leftZag: "#fa1e1e" } }, retro: { background: "#000000", backgroundGrid: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZTg0NzU4MC00ODk3LTRkNjAtOWNhYi1mZTk1NzQ5NzhiNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTEzOEQwMDc5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTEzOEQwMDY5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplNDRjOWZiNC0yNzE5LTQ3NDYtYmRmMi0wMmY2ZTA4ZjAxMmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzMwNTNEOTk5MDM1MTFFNDlBMzlFNzY4RjBCNkNENzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Y01+zAAAAMklEQVR42mJgGAWjYBSMgkEJGIlUd+j/WjjbjjGYGC1MtHP10DR6FIyCUTAKBikACDAA0NoDCLGGjH8AAAAASUVORK5CYII=", primary: null, secondary: null, stroke: "#000000", innerStroke: "#000000", blocks: { line: "#fa1e1e", square: "#f1fa1e", arrow: "#d838cb", rightHook: "#f5821f", leftHook: "#42c6f0", rightZag: "#4bd838", leftZag: "#fa1e1e" } }, monochrome: { background: "#000000", backgroundGrid: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZTg0NzU4MC00ODk3LTRkNjAtOWNhYi1mZTk1NzQ5NzhiNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTEzOEQwMDc5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTEzOEQwMDY5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplNDRjOWZiNC0yNzE5LTQ3NDYtYmRmMi0wMmY2ZTA4ZjAxMmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzMwNTNEOTk5MDM1MTFFNDlBMzlFNzY4RjBCNkNENzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Y01+zAAAAMklEQVR42mJgGAWjYBSMgkEJGIlUd+j/WjjbjjGYGC1MtHP10DR6FIyCUTAKBikACDAA0NoDCLGGjH8AAAAASUVORK5CYII=", primary: "#ffffff", secondary: "#ffffff", stroke: "#000000", innerStroke: "#000000" }, aerolab: { background: "#ffffff", primary: "#ff7b00", secondary: "#000000" }, gameboy: { background: "#C4CFA1", primary: null, secondary: null, stroke: "#414141", innerStroke: "#414141", innerSquare: "#000000", blocks: { line: "#88926A", square: "#585E44", arrow: "#A4AC8C", rightHook: "#6B7353", leftHook: "#6B7353", rightZag: "#595F45", leftZag: "#595F45" } }, vim: { background: "#000000", backgroundGrid: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZTg0NzU4MC00ODk3LTRkNjAtOWNhYi1mZTk1NzQ5NzhiNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTEzOEQwMDc5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTEzOEQwMDY5MDQyMTFFNDlBMzlFNzY4RjBCNkNENzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplNDRjOWZiNC0yNzE5LTQ3NDYtYmRmMi0wMmY2ZTA4ZjAxMmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzMwNTNEOTk5MDM1MTFFNDlBMzlFNzY4RjBCNkNENzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Y01+zAAAAMklEQVR42mJgGAWjYBSMgkEJGIlUd+j/WjjbjjGYGC1MtHP10DR6FIyCUTAKBikACDAA0NoDCLGGjH8AAAAASUVORK5CYII=", primary: "#C2FFAE", secondary: "#C2FFAE", stroke: "#000000", strokeWidth: 3, innerStroke: null } };

//import util from './util';
//let x = 'x';
//console.log(util);

var enableKeyboardControls = false;

$(document).ready(function () {

	//Animations Timing
	setTimeout(function () {
		$(".intro-bg > div").addClass("animated-scale");
	}, 100);
	setTimeout(function () {
		$(".intro-bg > div").addClass("bg-animation");
	}, 2100);
	setTimeout(function () {
		$("header").addClass("animated-top");
	}, 800);
	setTimeout(function () {
		$(".buttons-intro").addClass("animated-bottom");
	}, 800);
	setTimeout(function () {
		$(".info-intro").addClass("animated-opacity");
	}, 100);

	//Hide Gmaps Block Scroll
	$(".hide-scroll").click(function () {
		$(this).addClass("hidden");
	});

	//Close Overlay Menu
	$(".close-overlay").click(function () {
		$(".overlay").removeClass("open");
	});

	//Show Sticky Menu
	jQuery(function ($) {
		var $nav = $(".sticky-menu"),
		    $win = $(window),
		    winH = $win.height();

		$win.on("scroll", function () {
			$nav.toggleClass("show-menu", $(this).scrollTop() > winH - "150");
		}).on("resize", function () {
			winH = $(this).height();
		});
	});

	//Smooth Scroll to Anchor
	$(function () {
		$("a[href*=#]:not([href=#])").click(function () {
			if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
				if (target.length) {
					$("html,body").animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});
});

//Parallax Js-cube
var controller = new ScrollMagic.Controller();
var tween = new TimelineMax().add([TweenMax.fromTo(".js-cube", 1, { top: 220 }, { top: 0, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".info-intro", duration: 2000 }).setTween(tween).addTo(controller);

//Parallax PC
var tween = new TimelineMax().add([TweenMax.fromTo(".disquete", 1, { top: 220, right: -135 }, { top: 150, right: -100, ease: Linear.easeNone }), TweenMax.fromTo(".mini-game", 1, { top: 60 }, { top: 130, ease: Linear.easeNone }), TweenMax.fromTo(".tijolao", 1, { top: -20 }, { top: -130, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".speaker-selection", duration: 2000 }).setTween(tween).addTo(controller).on("enter", function () {
	enableKeyboardControls = true;
}).on("leave", function () {
	enableKeyboardControls = false;
});

//Parallax Gameboy
var tween = new TimelineMax().add([TweenMax.fromTo(".gameboy", 1, { top: 20 }, { top: -125, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".gameboy-trigger", duration: 1400 }).setTween(tween).addTo(controller);

//Parallax Tickets
var tween = new TimelineMax().add([TweenMax.fromTo(".ticket-1", 1, { bottom: -65 }, { bottom: -110, ease: Linear.easeNone }), TweenMax.fromTo(".ticket-2", 1, { bottom: -225 }, { bottom: -190, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".gameboy-trigger", duration: 1200 }).setTween(tween).addTo(controller);

//Parallax Delorean
var tween = new TimelineMax().add([TweenMax.fromTo(".delorean", 1, { width: "0%" }, { width: "150%", ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".manifesto", duration: 2000 }).setTween(tween).addTo(controller);

//Parallax MK2 / Tamagochi
var tween = new TimelineMax().add([TweenMax.fromTo(".mk2-snes", 1, { top: 100 }, { top: 10, ease: Linear.easeNone }), TweenMax.fromTo(".tamagochi", 1, { top: 520 }, { top: 720, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".sponsors", duration: 1600 }).setTween(tween).addTo(controller);

//Parallax Twitter
var tween = new TimelineMax().add([TweenMax.fromTo(".pager", 1, { top: 75 }, { top: 15, ease: Linear.easeNone }), TweenMax.fromTo(".twitter-bird", 1, { top: 0 }, { top: 90, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: ".silver", duration: 1600 }).setTween(tween).addTo(controller);

// speakers selection
$(document).ready(function () {
	var focusedSpeaker = $("#speakers")[0],
	    soundStr = "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=",
	    curIdx = 1;

	function beep() {
		var snd = new Audio(soundStr);
		snd.play();
	}

	function focusSpeakerEvt(event) {
		event.preventDefault();
		focusSpeaker(this);
		//event.stopPropagation();
		//event.preventDefault();
		//return false;
	}
	function focusSpeaker(el) {
		if (!el) {
			return;
		}
		var idx = parseInt(el.getAttribute("data-speaker-idx"), 10);
		focusedSpeaker.setAttribute("data-highlighted", idx);
		beep();
		curIdx = idx;
	}

	$(".speakers-list").eq(0).delegate("li", "mouseover", focusSpeakerEvt).delegate("li", "click", focusSpeakerEvt);

	function moveLeft() {
		var cur = $("[data-speaker-idx=" + curIdx + "]")[0];
		cur = cur.previousElementSibling;
		if (!cur) {
			if (curIdx >= 11) {
				cur = $("[data-speaker-idx=11]")[0];
			} else {
				cur = $("[data-speaker-idx]:last")[0];
			}
		}
		return cur;
	}
	function moveRight() {
		var _again = true;

		_function: while (_again) {
			cur = undefined;
			_again = false;

			var cur = $("[data-speaker-idx=" + curIdx + "]")[0];
			console.warn(curIdx);

			cur = cur.nextElementSibling;
			if (!cur) {
				if (curIdx <= 11) {
					cur = $("[data-speaker-idx=12]")[0];
				} else {
					cur = $("[data-speaker-idx=1]")[0];
				}
			}

			console.warn(cur);

			if (cur && cur.classList && cur.classList.contains("incognito")) {
				_again = true;
				continue _function;
			}

			return cur;
		}
	}

	document.body.addEventListener("keydown", function (event) {
		var should = false,
		    cur;

		// if(!enableKeyboardControls){
		// 	return false;
		// }

		//console.log(event.keyCode);
		switch (event.keyCode) {
			case 38:
				{
					// up
					// if(curIdx < 9){
					// 	break;
					// }
					// cur = $('[data-speaker-idx='+(curIdx - 9)+']')[0];
					// should= true;
					// if(!cur){
					// 	return false;
					// }
					break;
				}
			case 39:
				{
					// right
					cur = moveRight();
					should = true;
					break;
				}
			case 40:
				{
					// down
					// if(curIdx > 8){
					// 	break;
					// }
					// cur = $('[data-speaker-idx='+(9 + curIdx)+']')[0];
					// should= true;
					// if(!cur){
					// 	return false;
					// }
					break;
				}
			case 37:
				{
					// left
					cur = moveLeft();
					should = true;
					break;
				}
		}

		if (should) {
			focusSpeaker(cur);
			//event.stopPropagation();
			//event.preventDefault();
			//return false;
		}
	});

	$(".arrows .prev").click(function (event) {
		focusSpeaker(moveLeft());
		event.stopPropagation();
		event.preventDefault();
		return false;
	});

	$(".arrows .next").click(function (event) {
		focusSpeaker(moveRight());
		event.stopPropagation();
		event.preventDefault();
		return false;
	});

	// swiping
	document.querySelector(".container-highlight").addEventListener("touchstart", handleTouchStart, false);
	document.querySelector(".container-highlight").addEventListener("touchmove", handleTouchMove, false);

	var xDown = null;
	var yDown = null;

	function handleTouchStart(evt) {
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	};

	function handleTouchMove(evt) {
		if (!xDown || !yDown) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			/*most significant*/
			if (xDiff > 0) {
				/* left swipe */
				focusSpeaker(moveRight());
			} else {
				/* right swipe */
				focusSpeaker(moveLeft());
			}
		} else {
			if (yDiff > 0) {} else {}
		}
		/* reset values */
		xDown = null;
		yDown = null;
	};

	// window.konamiCode = function(){
	// 	document.body.classList.add('gameEnabled');
	// 	$('.gameEnabled .pc img').attr('src', '/images/pc-location-game.png');
	// };
});

(function () {
	var clickedList = [];
	var arrows = {
		"up": "↑",
		"left": "←",
		"down": "↓",
		"right": "→",
		"A": "A",
		"B": "B",
		"start": "strt",
		"select": "slct"
	};
	var screenEl = $("#konami-code-container .screen")[0];
	var screenKeysEl = $("#konami-code-container .screen .keys")[0];

	$(".gameboy")[0].onselectstart = "return false";

	function showCodeOnScreen(list) {
		var str = "";
		list.forEach(function (cur) {
			str += arrows[cur] || "";
		});

		screenKeysEl.value = str;
	}

	function verifyCode() {
		var lastClicked = clickedList.slice(-11);

		showCodeOnScreen(lastClicked);

		if (lastClicked.join(" ") == "up up down down left right left right B A start") {

			screenEl.classList.add("playing");
			screenEl.innerHTML = "";

			$(screenEl).blockrain({
				//showFieldOnStart: false,
				blockWidth: 12,
				//difficulty: 'evil',
				theme: "retro",
				speed: 10,
				onGameOver: function onGameOver(score) {
					screenKeysEl.value = "Pts. " + score;
					clickedList = [];
				}
			});
			clickedList = false;
		}
	}

	$("#konami-code-container").click(function (event) {
		var tgtClassList = event.target.classList;

		if (clickedList !== false && tgtClassList.contains("btn")) {
			clickedList.push(event.target.getAttribute("data-btn-name"));
			verifyCode();
		}
	});
})();

/* up swipe */

/* down swipe */

},{}]},{},[1]);
