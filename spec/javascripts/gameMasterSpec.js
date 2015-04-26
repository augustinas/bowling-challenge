describe('Game engine keeps track of', function() {

  var gm;

  beforeEach(function() {
    gm = new GameMaster();
  });

  it('tracks outcome of each roll', function() {
    expect(gm.scores).toEqual([]);
  });

  it('adds a new score', function() {
    gm.roll(5);
    expect(gm.scores).toEqual([[5]]);
    gm.roll(4);
    expect(gm.scores).toEqual([[5, 4]]);
    gm.roll(3);
    gm.roll(6);
    expect(gm.scores).toEqual([[5,4], [3, 6]]);
  });

  it('adds total scores for each frame', function() {
    expect(gm.totalScores).toEqual([]);
    gm.roll(5);
    gm.roll(4);
    gm.roll(3);
    gm.roll(6);
    expect(gm.totalScores).toEqual([9, 9]);
  });
});