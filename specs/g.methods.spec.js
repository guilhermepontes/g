var context = describe;

context('[g Tests]', function(){
  describe('g methods - ', function(){
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

  });
});
