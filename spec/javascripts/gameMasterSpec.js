describe('Game engine', function() {

  var gm;

  beforeEach(function() {
    gm = new GameMaster();
  });

  it('keeps track of frame results and frame status', function() {
    expect(gm.frameScores).toEqual([]);
    expect(gm.frameStatus).toEqual([]);
  });

  it('adds a new scores', function() {
    gm.roll(5);
    expect(gm.frameScores).toEqual([[5]]);
    gm.roll(4);
    expect(gm.frameScores).toEqual([[5, 4]]);
    gm.roll(3);
    gm.roll(6);
    expect(gm.frameScores).toEqual([[5, 4], [3, 6]]);
    expect(gm.frameStatus).toEqual(['ok', 'ok']);
  });

  it('recognizes spares and adds extra points', function() {
    gm.roll(6);
    gm.roll(4);
    expect(gm.frameScores).toEqual([[6, 4]]);
    expect(gm.frameStatus).toEqual(['spare']);
    gm.roll(7);
    gm.roll(1);
    expect(gm.frameScores).toEqual([[6, 4, 7], [7, 1]]);
    expect(gm.frameStatus).toEqual(['ok', 'ok']);
  });

  it('recognizes strikes and adds extra points', function() {
    gm.roll(10);
    expect(gm.frameScores).toEqual([[10, null]]);
    expect(gm.frameStatus).toEqual(['strike']);
    gm.roll(3);
    gm.roll(5);
    expect(gm.frameScores).toEqual([[10, null, 3, 5], [3, 5]]);
    expect(gm.frameStatus).toEqual(['ok', 'ok']);
  });
});