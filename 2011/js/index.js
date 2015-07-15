_uacct = "UA-20244589-2"; 

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _uacct]);
_gaq.push(['_trackPageview']);

try {
  var pageTracker = _gat._getTracker(_uacct); 
  pageTracker._initData(); 
  pageTracker._trackPageview();  
} catch(e) {
  if (console) console.log(e);
}


var ativarMenu = function(route) {
  $('#menu li').removeClass('active');
  $('#menu li a[href*="'+route+'"]').parent().addClass("active");
};
var mostrarDestaque = function(toggle) {
  if(toggle) {
    $("#destaque").show();
    $('body').addClass('inicial');
  } else {
    $("#destaque").hide();
    $('body').removeClass('inicial');
  }
};

var twitterWidget;

var twitter = function() {

  twitterWidget = new TWTR.Widget({
    id: "twtr-widget",
    width: 'auto',
    height: 415,
    version: 2,
    type: 'search',
    search: 'braziljs',
    interval: 6000,
    title: 'BrazilJS',
    subject: 'The Brazilian JS Conference',
    theme: {
      shell: {
        background: '#450d0b',
        color: '#ffffff'
      },
      tweets: {
        background: '#ffffff',
        color: '#444444',
        links: '#1985b5'
      }
    },
    features: {
      scrollbar: true,
      loop: true,
      live: true,
      hashtags: true,
      timestamp: true,
      avatars: true,
      toptweets: true,
      behavior: 'default'
    }
  });
  twitterWidget.render();

};

var renderPage = function(destaque, route, callback) {
  mostrarDestaque(destaque);
  ativarMenu(route);
  callback.call(this);
};

var iniciarTwitter = function(){
  pararTwitter();
  if(twitterWidget) { twitterWidget.start(); }
};

var pararTwitter = function() { if(twitterWidget)  twitterWidget.stop(); };

var rota = function(template, route, sammy) {
  sammy.partial(template).then(function() {
    renderPage(false, route, pararTwitter);
  });
};

var milosa = true;

;(function($) {

  var app = $.sammy('#corpo .container', function() {
    this.use('GoogleAnalytics');
    this.use(Sammy.Mustache, "html");

    this.get('#!/home', function() {
      this.partial('views/home.html').then(function() {
        twitter();
        renderPage(true, "#!/home", iniciarTwitter);
        if(milosa) {
          $('#destaque').divSlideShow( { width:960, height:350, loop:999999, delay:10000 } );
          milosa = false;
        }
      });
    });

    this.get('#!/agenda', function() {
      rota('views/agenda.html', '#!/agenda', this);
    });

    this.get('#!/local', function() {
      rota('views/local.html', '#!/local', this);
    });

    this.get('#!/inscricoes', function() {
      rota('views/inscricoes.html', '#!/inscricoes', this);
    });

    this.get('#!/quemsomos', function() {
      rota('views/quemsomos.html', '#!/quemsomos', this);
    });

    this.get('#!/contato', function() {
      rota('views/contato.html', '#!/contato', this);
    });

    this.get('#!/pressrelease', function() {
      rota('views/pressrelease.html', '#!/pressrelease', this);
    });

  });

  $(function() { app.run('#!/home'); });
})(jQuery);
