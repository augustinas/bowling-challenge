describe('Game engine keeps track of', function() {

  var gm;

  beforeEach(function() {
    gm = new GameMaster();
  });

  it('total score is 0 at the beginning', function() {
    expect(gm.totalScore).toEqual(0);
  });

  it('tracks outcome of each roll', function() {
    expect(gm.scores).toEqual([]);
  });
});