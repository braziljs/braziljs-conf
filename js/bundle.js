(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//import util from './util';
//let x = 'x';
//console.log(util);

//Overlay Menu
'use strict';

(function () {
	var triggerBttn = document.getElementById('trigger-overlay'),
	    overlay = document.querySelector('div.overlay'),
	    closeBttn = overlay.querySelector('button.overlay-close');
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	}, transEndEventName = transEndEventNames[Modernizr.prefixed('transition')], support = { transitions: Modernizr.csstransitions };

	function toggleOverlay() {
		if (classie.has(overlay, 'open')) {
			classie.remove(overlay, 'open');
			classie.add(overlay, 'close');
			var onEndTransitionFn = function onEndTransitionFn(ev) {
				if (support.transitions) {
					if (ev.propertyName !== 'visibility') return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				classie.remove(overlay, 'close');
			};
			if (support.transitions) {
				overlay.addEventListener(transEndEventName, onEndTransitionFn);
			} else {
				onEndTransitionFn();
			}
		} else if (!classie.has(overlay, 'close')) {
			classie.add(overlay, 'open');
		}
	}

	triggerBttn.addEventListener('click', toggleOverlay);
	closeBttn.addEventListener('click', toggleOverlay);
})();

var enableKeyboardControls = false;

$(document).ready(function () {

	//Animations Timing
	setTimeout(function () {
		$('.intro-bg > div').addClass('animated-scale');
	}, 100);
	setTimeout(function () {
		$('.intro-bg > div').addClass('bg-animation');
	}, 2100);
	setTimeout(function () {
		$('header').addClass('animated-top');
	}, 800);
	setTimeout(function () {
		$('.buttons-intro').addClass('animated-bottom');
	}, 800);
	setTimeout(function () {
		$('.info-intro').addClass('animated-opacity');
	}, 100);

	//Hide Gmaps Block Scroll
	$('.hide-scroll').click(function () {
		$(this).addClass('hidden');
	});

	//Close Overlay Menu
	$('.close-overlay').click(function () {
		$('.overlay').removeClass('open');
	});

	//Show Sticky Menu
	jQuery(function ($) {
		var $nav = $('.sticky-menu'),
		    $win = $(window),
		    winH = $win.height();

		$win.on('scroll', function () {
			$nav.toggleClass('show-menu', $(this).scrollTop() > winH - '150');
		}).on('resize', function () {
			winH = $(this).height();
		});
	});

	//Smooth Scroll to Anchor
	$(function () {
		$('a[href*=#]:not([href=#])').click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
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
var tween = new TimelineMax().add([TweenMax.fromTo('.js-cube', 1, { top: 220 }, { top: 0, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.info-intro', duration: 2000 }).setTween(tween).addTo(controller);

//Parallax PC
var tween = new TimelineMax().add([TweenMax.fromTo('.disquete', 1, { top: 220, right: -135 }, { top: 150, right: -100, ease: Linear.easeNone }), TweenMax.fromTo('.mini-game', 1, { top: 60 }, { top: 130, ease: Linear.easeNone }), TweenMax.fromTo('.tijolao', 1, { top: -20 }, { top: -130, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.speaker-selection', duration: 2000 }).setTween(tween).addTo(controller).on('enter', function () {
	enableKeyboardControls = true;
}).on('leave', function () {
	enableKeyboardControls = false;
});

//Parallax Gameboy
var tween = new TimelineMax().add([TweenMax.fromTo('.gameboy', 1, { top: 20 }, { top: -125, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.gameboy-trigger', duration: 1400 }).setTween(tween).addTo(controller);

//Parallax Tickets
var tween = new TimelineMax().add([TweenMax.fromTo('.ticket-1', 1, { bottom: -65 }, { bottom: -110, ease: Linear.easeNone }), TweenMax.fromTo('.ticket-2', 1, { bottom: -225 }, { bottom: -190, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.gameboy-trigger', duration: 1200 }).setTween(tween).addTo(controller);

//Parallax Delorean
var tween = new TimelineMax().add([TweenMax.fromTo('.delorean', 1, { width: '0%' }, { width: '150%', ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.manifesto', duration: 2000 }).setTween(tween).addTo(controller);

//Parallax MK2 / Tamagochi
var tween = new TimelineMax().add([TweenMax.fromTo('.mk2-snes', 1, { top: 100 }, { top: 10, ease: Linear.easeNone }), TweenMax.fromTo('.tamagochi', 1, { top: 520 }, { top: 720, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.sponsors', duration: 1600 }).setTween(tween).addTo(controller);

//Parallax Twitter
var tween = new TimelineMax().add([TweenMax.fromTo('.pager', 1, { top: 75 }, { top: 15, ease: Linear.easeNone }), TweenMax.fromTo('.twitter-bird', 1, { top: 0 }, { top: 90, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.silver', duration: 1600 }).setTween(tween).addTo(controller);

var tween = new TimelineMax().add([TweenMax.fromTo('.explosion', 1, { bottom: -425 }, { bottom: 0, ease: Linear.easeNone })]);

var scene = new ScrollMagic.Scene({ triggerElement: '.gold', duration: 1000 }).setTween(tween).addTo(controller);

// speakers selection
$(document).ready(function () {
	var focusedSpeaker = $('#speakers')[0],
	    soundStr = 'data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=',
	    curIdx = 1;

	function beep() {
		var snd = new Audio(soundStr);
		snd.play();
	}

	function focusSpeakerEvt(event) {
		focusSpeaker(this);
		event.stopPropagation();
		event.preventDefault();
		return false;
	}
	function focusSpeaker(el) {
		var idx = parseInt(el.getAttribute('data-speaker-idx'), 10);
		focusedSpeaker.setAttribute('data-highlighted', idx);
		beep();
		curIdx = idx;
	}

	$('.speakers-list').eq(0).delegate('li', 'mouseover', focusSpeakerEvt).delegate('li', 'click', focusSpeakerEvt);

	function moveLeft() {
		var cur = $('[data-speaker-idx=' + curIdx + ']')[0];
		cur = cur.previousElementSibling;
		if (!cur) {
			if (curIdx >= 9) {
				cur = $('[data-speaker-idx=9]')[0];
			} else {
				cur = $('[data-speaker-idx]:last')[0];
			}
		}
		return cur;
	}
	function moveRight() {
		var _again = true;

		_function: while (_again) {
			cur = undefined;
			_again = false;

			var cur = $('[data-speaker-idx=' + curIdx + ']')[0];

			if (!cur) {
				if (curIdx <= 10) {
					cur = $('[data-speaker-idx=10]')[0];
				} else {
					cur = $('[data-speaker-idx=1]')[0];
				}
			}
			cur = cur.nextElementSibling;
			aler(cur.className);
			if (cur.classList.contains('incognito')) {
				_again = true;
				continue _function;
			}

			return cur;
		}
	}

	document.body.addEventListener('keydown', function (event) {
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
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	});

	$('.arrows .prev').click(function (event) {
		focusSpeaker(moveLeft());
		event.stopPropagation();
		event.preventDefault();
		return false;
	});

	$('.arrows .next').click(function (event) {
		focusSpeaker(moveRight());
		event.stopPropagation();
		event.preventDefault();
		return false;
	});

	// swiping
	document.querySelector('.container-highlight').addEventListener('touchstart', handleTouchStart, false);
	document.querySelector('.container-highlight').addEventListener('touchmove', handleTouchMove, false);

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

/* up swipe */

/* down swipe */

},{}]},{},[1]);
