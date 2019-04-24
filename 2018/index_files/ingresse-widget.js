'use strict';

var hosts = {
    prod : 'https://web.archive.org/web/20180721221738/https://embedstore.ingresse.com/',
    local: 'https://web.archive.org/web/20180721221738/https://local.ingresse.com:9000/',
    hml  : 'https://web.archive.org/web/20180721221738/https://embedstore-homolog.ingresse.com/',
};

/**
 * Ingresse widget class
 *
 * @class
 */
var Widget = function () {
    // If is not instance of Widget return one
    if (false === (this instanceof Widget)) {
        return new Widget();
    }

    this.btntext      = 'Comprar ingressos';
    this.btntextcolor = '#fff';
    this.btnbgcolor   = '#fca311';
    this.elements     = {};

    return this;
};

/**
 * Show embedstore
 */
Widget.prototype.show = function (event) {
    if (/comprar/.test(window.location.hash) === false) {
        window.history.pushState({
            embedstore: true
        }, null, window.location.href + '#comprar');
    }

    window.onpopstate = this.close;

    this.render(event.target);
};

/**
 * Replaces the hashtag in url
 *
 * @param {string} newHash - The new hash information
 * @param {boolean} start - If true, sets the new hash
 * @param {boolean} clear - If true, clear the url hash
 */
Widget.prototype.hashReplace = function (newHash, start, clear) {
    var url = window.location.href;
    var regex = /#(\S*)/g;

    // If start set the window hash
    if (start) {
        window.location.hash = [newHash];
        return;
    }

    if (clear) {
        url = url.replace(regex, '');
        window.history.pushState(null, newHash, url);
        return;
    }

    // If new hash change it and set the new history
    if (newHash && window.location.href.indexOf(newHash) === -1) {
        url = url.replace(regex, '#' + newHash);
        window.history.pushState(null, newHash, url);
    }
}

/**
 * Parse element data attributes
 *
 * @param {object} attrs - Object with attributes
 */
Widget.prototype.parseDataAttributes = function (attrs) {
    var list  = [].slice.call(attrs);
    var data  = {};
    var regex = /data-/;
    var blackList = ['btntext','btntextcolor','btnbgcolor'];

    for (var i = 0; i < list.length; i++) {
        var attr = list[i];
        var name = attr.name.replace(regex, '');

        if (regex.test(attr.name) && blackList.indexOf(name) === -1) {
            data[name] = attr.value;
        }
    }

    this.data = data;
};

/**
 * Update query string with parameter and value
 *
 * @private
 * @param {string} key - Query parameter name
 * @param {string} value - Query parameter value
 * @param {string} url - The url to add query parameters
 */
Widget.prototype._updateQueryString = function (key, value, url) {
    var separator = (url.indexOf('?') === -1) ? '?' : '&';

    url += (separator + key + '=' + value);

    return url;
};

/**
 * Close the widget frame removing it from the body
 */
Widget.prototype.close = function () {
    window.onbeforeunload = null;

    document.body.className = document.body.className.replace('blockScrolling', '');

    try {
        var toRemove = document.getElementById('cloak');
        document.body.removeChild(toRemove);
    } catch (e) {
        console.error(e);
    }

    return this;
};

/**
 * Generate URL
 *
 * @param {object} data - Button data attributes
 * @return {string}
 */
Widget.prototype.getUrl = function (data) {
    var url = hosts.prod;

    switch (data.host) {
        case 'local':
            url = hosts.local;
            data.host = 'apihml';
            break;

        case 'apihml':
            url = hosts.hml;
            break;

        case 'hml':
            url = hosts.hml;
            break;

        case 'test':
            url = hosts.hml;
            break;

        case 'apipre':
            url = hosts.hml;
            break;

        default:
            url = hosts.prod;
    };

    // Enable cross-domain tracking for iFrames
    try {
        var tracker = window.ga.getByName('ingresse'),
            linker = new window.gaplugins.Linker(tracker);

        url = linker.decorate(src, true);
    } catch (e) {}

    url += '/#/tickets/' + window.location.host + '/event/' + data.eventid;

    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i],
            val = data[key];

        if (val) {
            url = this._updateQueryString(key, val, url);
        }
    }

    return url;
};

/**
 * Create the background element to hold the embedstore
 */
Widget.prototype.createCloakElement = function () {
    this.elements.cloak = document.createElement('div');
    this.elements.cloak.id = 'cloak';

    this.elements.cloak.style.background = 'rgba(0, 0, 0, 0.8)';
    this.elements.cloak.style.height = '100%';
    this.elements.cloak.style.width = '100%';
    this.elements.cloak.style.position = 'fixed';
    this.elements.cloak.style.top = '0';
    this.elements.cloak.style.right = '0';
    this.elements.cloak.style.bottom = '0';
    this.elements.cloak.style.left = '0';
    this.elements.cloak.style.zIndex = '99999999';

    // Don't apply the scroll block on facebook.
    if (window.location.hostname.indexOf('facebook.com') === -1) {
        this.elements.cloak.onwheel = function (event) {
            event.preventDefault();
        };
    }

    return this;
};

/**
 * Create the iframe element
 *
 * @param {string} url - Url or the iframe
 */
Widget.prototype.createIframeElement = function (url) {
    this.elements.iframe = document.createElement('iframe');
    this.elements.iframe.id = 'ingresse-widget-frame';
    this.elements.iframe.src = url;

    this.elements.iframe.style.width = '100%';
    this.elements.iframe.style.height = '100%';
    this.elements.iframe.style.border = '0';
    this.elements.iframe.style.position = 'fixed';
    this.elements.iframe.style.top = '0';
    this.elements.iframe.style.right = '0';
    this.elements.iframe.style.bottom = '0';
    this.elements.iframe.style.left = '0';
    this.elements.iframe.style.zIndex = '999999 !important';

    return this;
};

/**
 * Create widget button element
 *
 * @param {HTMLElement} element - HTML DOM element
 */
Widget.prototype.createButton = function (element) {
    var button;
    var buyText = document.createTextNode(
        element.getAttribute('data-btntext') || this.btntext
    );
    var custom = {
        color     : element.getAttribute('data-btntextcolor') || this.btntextcolor,
        background: element.getAttribute('data-btnbgcolor') || this.btnbgcolor
    };

    // If element content is not empty
    if (element.children.length > 0) {
        button = element.children[0];
        button.onclick = this.show.bind(this);

        return;
    }

    button = document.createElement('button');
    button.id = 'embedstore-btn';
    button.type = 'button';

    button.setAttribute('class', 'embedstore-btn');

    button.style.color      = custom.color;
    button.style.background = custom.background;

    button.onclick = this.show.bind(this);

    button.appendChild(buyText);

    element.appendChild(button);

    if (window.location.hostname.indexOf('ingresse') === -1) {
        var powered     = document.createElement('div');
        var poweredLink = document.createElement('a');

        powered.setAttribute('class', 'embedstore-powered');
        powered.innerText = 'Powered by ';

        poweredLink.setAttribute('class', 'embedstore-powered__link');
        poweredLink.innerText = 'ingresse.com';
        poweredLink.href      = 'https://web.archive.org/web/20180721221738/https://www.ingresse.com/';
        poweredLink.target    = '_blank';
        poweredLink.title     = 'Conheça a Ingresse';

        powered.appendChild(poweredLink);

        element.appendChild(powered);
    }
};

/**
 * Render the widget
 *
 * @param {HTMLElement} element - Element to get data attributes
 */
Widget.prototype.render = function (element) {
    this.parseDataAttributes(element.parentElement.attributes);

    var url = this.getUrl(this.data);

    // If GA present enable cross-domain tracking for iFrames
    try {
        var tracker = window.ga.getByName('ingresse');
        var linker = new window.gaplugins.Linker(tracker);

        url = linker.decorate(url, true);

    } catch (e) {}

    // If should redirect and not open iframe
    if (this.data.redirect) {
        window.location.href = url;
        return;
    }

    this.createCloakElement();
    this.createIframeElement(url);

    this.elements.cloak.appendChild(this.elements.iframe);

    if (!document.body.className.includes('blockScrolling')) {
        document.body.className += ' blockScrolling';
    }

    document.body.insertBefore(this.elements.cloak, document.body.childNodes[0]);
};

/**
 * Init embedstore widget
 */
Widget.prototype.init = function () {
    var elements = document.getElementsByClassName('ingresse-widget');

    for (var i = elements.length - 1; i >= 0; i--) {
        this.createButton(elements[i]);
    }
};


var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";


var ingresseWidget = Widget();

// Bind event to content loaded
eventer('DOMContentLoaded', function () {
    ingresseWidget.init();

    // Listen to message from child window
    eventer(messageEvent, function(e) {
        var data = e.data.message || e.data;

        switch (e.data.message) {
            case 'purchase':
                ingresseWidget.hashReplace(e.data.extra);
                break;

            case 'startOver':
                ingresseWidget.hashReplace('comprar');
                break;

            case 'close':
                ingresseWidget.hashReplace(null, null, true);
                ingresseWidget.close();
                break;
        }
    }, false);
});


/*
     FILE ARCHIVED ON 22:17:38 Jul 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:12:24 Apr 24, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 56.449 (3)
  esindex: 0.007
  captures_list: 74.099
  CDXLines.iter: 12.552 (3)
  PetaboxLoader3.datanode: 106.702 (5)
  exclusion.robots: 0.158
  exclusion.robots.policy: 0.146
  RedisCDXSource: 1.641
  PetaboxLoader3.resolve: 154.135 (4)
  load_resource: 369.084
*/