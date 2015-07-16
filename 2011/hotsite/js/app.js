;(function($) {
  var app = $.sammy("#middle .container", function() {
    this.use('Title');

    this.setTitle('BrazilJS -');

    this.helpers({
      menuActive: function(menu) {
        $("#menu li").removeClass("active");
        $("#menu-"+menu).addClass("active");
      }
    });

    this.get('#/', function(ctx) {
      ctx.menuActive('home');
      ctx.title('Home');

      ctx.partial('templates/home.html');
    });

    this.get('#/fotos', function(ctx) {
      ctx.menuActive('fotos');
      ctx.title('Fotos');

      ctx.partial('templates/fotos.html');
    });

    this.get('#/slides', function(ctx) {
      ctx.menuActive('slides');
      ctx.title('Slides');

      ctx.partial('templates/slides.html');
    });

    this.get('#/videos', function(ctx) {
      ctx.menuActive('videos');
      ctx.title('Vídeos');

      ctx.partial('templates/videos.html');
    });

    this.get('#/blogs', function(ctx) {
      ctx.menuActive('blogs');
      ctx.title('Blogs');

      ctx.partial('templates/blogs.html');
    });
  });

  $(function() {
    app.run("#/");
  });
})(jQuery);
