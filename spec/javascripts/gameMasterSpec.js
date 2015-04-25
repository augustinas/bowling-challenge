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

  it('adds a new score', function() {
    gm.roll(5);
    expect(gm.scores).toEqual([[5]]);
    gm.roll(4);
    expect(gm.scores).toEqual([[5, 4]]);
  });
});