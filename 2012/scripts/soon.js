(function() {
  var $, $$, baseSpeed, cssAnimation, cssPrefix, imageSizes, imageSpeed, p, parts, prefix, resetAnimation, resizeTimer, setupAnimation, speed, _i, _len;

  $ = function(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  $$ = function(sel) {
    return document.querySelector(sel);
  };

  prefix = (function() {
    var div, p, _i, _len, _ref;
    div = document.createElement('div');
    _ref = ['webkit', 'Moz', 'O', 'ms'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (div.style[p + 'Transform'] != null) return p;
    }
  })();

  cssPrefix = !prefix ? '' : "-" + (prefix.toLowerCase()) + "-";

  parts = [$$('.p0'), $$('.p1'), $$('.p2'), $$('.p3'), $$('.p4')];

  for (_i = 0, _len = parts.length; _i < _len; _i++) {
    p = parts[_i];
    p.style.display = 'block';
  }

  imageSizes = [[980, 400], [980, 440], [625, 60], [625, 80], [625, 105]];

  imageSpeed = [1, 3, 6, 8.5, 13];

  baseSpeed = 600;

  cssAnimation = null;

  (setupAnimation = function() {
    var rules;
    if (!prefix) return;
    cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    $$('head').appendChild(cssAnimation);
    $$('html').style.background = '#324544';
    rules = '';
    parts.forEach(function(p, i) {
      var height, imageWidth, styles, width;
      styles = getComputedStyle(p);
      width = parseInt(styles['width'], 10);
      height = parseInt(styles['height'], 10);
      imageWidth = Math.floor((height / imageSizes[i][1]) * imageSizes[i][0]);
      return rules += "@" + cssPrefix + "keyframes slice" + i + " {\n    0%   { " + cssPrefix + "transform:translateX(0); }\n    100% { " + cssPrefix + "transform:translateX(-" + imageWidth + "px); }\n}\n.p" + i + " {\n    width: " + (width + imageWidth) + "px;\n    " + cssPrefix + "animation: slice" + i + " " + (Math.floor(baseSpeed / imageSpeed[i])) + "s linear infinite;\n}";
    });
    if (cssAnimation.styleSheet) {
      cssAnimation.styleSheet.cssText = rules;
    } else {
      cssAnimation.appendChild(document.createTextNode(rules));
    }
  })();

  resetAnimation = function() {
    if (cssAnimation != null) cssAnimation.parentNode.removeChild(cssAnimation);
    return setupAnimation();
  };

  resizeTimer = 0;

  window.onresize = function() {
    clearTimeout(resizeTimer);
    return resizeTimer = setTimeout(resetAnimation, 300);
  };

  speed = 10;

  document.body.addEventListener('keydown', function(e) {
    var i, p, _len2, _results;
    if (e.which == null) e.which = e.keycode;
    if (e.which === 37) {
      speed = Math.max(speed - 9, 0);
    } else if (e.which === 39) {
      speed = Math.min(speed + 10, 1000);
    } else {
      return;
    }
    _results = [];
    for (i = 0, _len2 = parts.length; i < _len2; i++) {
      p = parts[i];
      _results.push(p.style["" + prefix + "AnimationDuration"] = "" + ((6000 / speed / imageSpeed[i]).toFixed(2)) + "s");
    }
    return _results;
  }, false);

  window.getUserLanguage = function(data) {
    if (data.address.country !== 'Brazil') {
      $$('.line').innerHTML = "The greatest<br/>\njavascript conference<br/>\nin the universe";
      return $$('.where').innerHTML = "August 30th and 31st\nBourbon Country Theater\nPorto Alegre, RS, Brazil";
    }
  };

}).call(this);
