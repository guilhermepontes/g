var context = describe;

context('[g Scope Tests]', function() {
  describe('g optional names - ', function() {
    it('g version checking', function() {
     expect(g).toBeDefined();
    });

    it('gRender version checking', function() {
      expect(gRender).toBeDefined();
    });

    it('__ version checking', function() {
      expect(__).toBeDefined();
    });

  });

  describe('g optional names - ', function() {
    it('g version checking', function() {
     expect(g.version).toBe('0.1.0');
    });

    it('gRender version checking', function() {
      expect(gRender.version).toBe('0.1.0');
    });

    it('__ version checking', function() {
      expect(__.version).toBe('0.1.0');
    });
  });

  describe('should be a public method -', function() {
    var _g;

    beforeEach(function(){
     _g = g({ url: "" });
    });

    afterEach(function(){
      _g = null;
    });

    it('should g.using be public', function(){
      expect(_g.using).toBeDefined();
    });

    it('should g.templating be public', function(){
      expect(_g.templating).toBeDefined();
    });

    it('should g.how() be public', function(){
      expect(_g.how).toBeDefined();
    });

    it('should g.settings() be public', function(){
      expect(_g.settings).toBeDefined();
    });

    it('should g.fill() be public', function(){
      expect(_g.fill).toBeDefined();
    });

    it('should g.append() be public', function(){
      expect(_g.append).toBeDefined();
    });

    it('should g.prepend() public', function(){
      expect(_g.prepend).toBeDefined();
    });

    it('should .after() be public', function(){
      expect(_g.after).toBeDefined();
    });

    it('should g.before() be public', function(){
      expect(_g.before).toBeDefined();
    });

    it('should g.now() be public', function(){
      expect(_g.now).toBeDefined();
    });

  });
});
