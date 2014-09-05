var context = describe;

context('[g Tests]', function(){
  describe('g methods, should be called - ', function(){
    var _g;

    beforeEach(function(){
      _g = g({ url: "" });

      $('body').append('<div id="teste"></div>');
      $('#test').html('<script type="text/template" id="template"><li></li></script><ul></ul>');
    });

    afterEach(function(){
      $("#test").remove();
      _g = null;
    });

    it('g.using() must been called', function(){
      spyOn(_g, 'using');
      _g.using("#template");

      expect(_g.using).toHaveBeenCalled();
    });

    it('g.after() must been called', function(){
      spyOn(_g, 'after');
      _g.using("#template").after('ul');

      expect(_g.after).toHaveBeenCalled();
    });

    it('g.fill() must been called', function(){
      spyOn(_g, 'fill');
      _g.using("#template").fill('ul');

      expect(_g.fill).toHaveBeenCalled();
    });

    it('g.append() must been called', function(){
      spyOn(_g, 'append');
      _g.using("#template").append('ul');

      expect(_g.append).toHaveBeenCalled();
    });

    it('g.prepend() must been called', function(){
      spyOn(_g, 'prepend');
      _g.using("#template").prepend('ul');

      expect(_g.prepend).toHaveBeenCalled();
    });

    it('g.before() must been called', function(){
      spyOn(_g, 'before');
      _g.using("#template").before('ul');

      expect(_g.before).toHaveBeenCalled();
    });



  });

  describe('g should fail when jquery and underscore are not included', function(){
    var $$ = $;
    var __ = _;

    afterEach(function(){
      $ = $$;
      _ = __;
    });

   it('should fail when jquery is not defined', function(){
     $ = undefined;
     expect(function(){ g() }).toThrow('g(): You need jQuery, sorry man.');
   });

   it('should fail when underscore jquery is not defined', function(){
     _ = undefined;
     expect(function(){ g() }).toThrow('g(): You need Underscore, sorry man.');
   });

  });
});
