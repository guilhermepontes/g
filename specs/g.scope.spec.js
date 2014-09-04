var context = describe;

context('[g Scope Tests]', function() {
  describe('g optional names', function() {
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

  describe('g optional names', function() {
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

});
