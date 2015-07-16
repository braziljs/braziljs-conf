(function($) {

  Sammy = Sammy || {};

  Sammy.XTemplate = function(app, method_alias) {

    var srender_cache = {};
    var srender = function(name, template, data, options) {
      var fn;
      if (srender_cache[name]) {
        fn = srender_cache[name];
      } else {
        if (typeof template == 'undefined') {
          // was a cache check, return false
          return false;
        }
        
      }
  
      if (typeof data != 'undefined') {
        return fn(data);
      } else {
        return fn;
      }
    };
  	
  	
    var template = function(template, data, name, options) {

      if (typeof name == 'undefined') { name = template; }
      if (typeof options == 'undefined' && typeof name == 'object') {
        options = name; name = template;
      }
      
      //console.log(name);
      //console.log(options);

      return new Ext.XTemplate( template ).compile().applyTemplate(data);
      
    };

    if (!method_alias) { method_alias = 'ejs'; }
    app.helper(method_alias, template);

  };

})(jQuery);