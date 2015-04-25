var GameMaster = function() {
  this.totalScore = 0;
  this.currentFrame = 1;
  this.scores = [];
}

GameMaster.prototype.roll = function(pinsDown) {
  if (!this.scores[this.currentFrame - 1]) {
    this.scores.push([pinsDown]);
  } else {
    this.scores[this.currentFrame - 1].push(pinsDown);
    this.currentFrame += 1;
  }
};