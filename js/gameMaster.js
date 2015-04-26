var GameMaster = function() {
  this.totalScores = [];
  this.currentFrame = 1;
  this.scores = [];
}

GameMaster.prototype.roll = function(pinsDown) {
  if (!this.scores[this.currentFrame - 1]) {
    this.scores.push([pinsDown]);
  } else {
    this.scores[this.currentFrame - 1].push(pinsDown);
    this.addFrameScore();
    this.currentFrame += 1;
  }
};

GameMaster.prototype.addFrameScore = function() {
  var frameScore = this.scores[this.currentFrame - 1].reduce(function(a, b) {
    return a + b;
  });
  this.totalScores.push(frameScore);
};