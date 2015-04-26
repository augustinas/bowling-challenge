var GameMaster = function() {
  this.currentFrame = 1;
  this.currentRoll = 1;
  this.frameScores = [];
  this.frameStatus = [];
}

GameMaster.prototype.roll = function(pinsDown) {
  if (this.currentRoll === 1) {
    if (pinsDown === 10) {
      this.frameScores.push([pinsDown, null]);
      this.checkStatus(this.currentFrame);
      this.currentFrame += 1;
    } else {
      this.frameScores.push([pinsDown]);
      this.currentRoll += 1;
    }
  } else {
    this.currentRoll = 1;
    this.frameScores[this.currentFrame - 1].push(pinsDown);
    this.checkStatus(this.currentFrame);
    this.extraPointsCleaner();
    this.currentFrame += 1;
  }
};

GameMaster.prototype.frameScore = function(frameNum) {
  return this.frameScores[frameNum - 1].reduce(function(a, b) {
    return a + b;
  });
};

GameMaster.prototype.checkStatus = function(frameNum) {
  if (this.frameScores[frameNum - 1][0] === 10) {
    this.frameStatus[frameNum - 1] = 'strike'
  } else if (this.frameScore(frameNum) === 10) {
    this.frameStatus[frameNum - 1] = 'spare';
  } else {
    this.frameStatus[frameNum - 1] = 'ok';
  }
};

GameMaster.prototype.extraPointsCleaner = function() {
  for (i = 0; i < this.frameScores.length; i++) {
    if (this.frameStatus[i] === 'spare' && this.frameScores[i + 1]) {
      this.frameScores[i].push(this.frameScores[i + 1][0]);
      this.frameStatus[i] = 'ok';
    } else if (this.frameStatus[i] === 'strike' && this.frameScores[i + 1]) {
      this.frameScores[i].push(this.frameScores[i + 1][0], this.frameScores[i + 1][1]);
      this.frameStatus[i] = 'ok';
    }
  }
};
