var GameMaster = function() {
  this.rollsGiven = 19;
  this.scores = [];
  this.frameTotals = [];
}

GameMaster.prototype.roll = function(pinsDown) {
  if (this.isTenthFrame()) {
    this.scores.push(pinsDown);
    this.addExtraRoll();
  } else {
    this.scores.push(pinsDown);
    // checking for special case - strike
    if (pinsDown === 10 && this.scores.length % 2 === 1) {
      this.scores.push(null);
    }
  }
  this.calcFrameTotal();
  if (this.isGameFinished()) {
    console.log("Game is finished! Please start again.");
  }
};

GameMaster.prototype.calcFrameTotal = function() {
  var currentFrame = this.frameTotals.length;
  for (i = currentFrame * 2; i < this.scores.length; i = i + 2) {
    // when strike happens
    if (this.scores[i] === 10) {
      if (this.addExtra(currentFrame+1, 2)) {
        this.frameTotals[currentFrame] = this.scores[i] + this.addExtra(currentFrame+1, 2);
      } else {
        return;
      }
    // when spare happens
    } else if (this.scores[i] + this.scores[i+1] === 10) {
      if (this.addExtra(currentFrame+1, 1)) {
        this.frameTotals[currentFrame] = this.scores[i] + this.scores[i+1] + this.addExtra(currentFrame+1, 1);
      } else {
        return;
      }
    // when less exciting frame happens
    } else if (this.scores[i] + this.scores[i+1]) {
      this.frameTotals[currentFrame] = this.scores[i] + this.scores[i+1];
    }
  }
};

GameMaster.prototype.addExtra = function(frame, extras) {
  var sum;
  var followingScores = this.scores.slice(2 * (frame)).filter(function(x) {
    return typeof x === 'number';
  });
  if (followingScores.length >= extras) {
    sum = followingScores.slice(0, extras).reduce(function(a, b) {
      return a + b;
    });
  }
  return sum;
};

GameMaster.prototype.isTenthFrame = function() {
  return this.scores.length > 17 ? true : false;
};

GameMaster.prototype.isGameFinished = function() {
  return this.scores.length >= this.rollsGiven ? true : false;
};

GameMaster.prototype.addExtraRoll = function() {
  if (this.scores[18] === 10 || this.scores[18] + this.scores[19] === 10) {
    this.rollsGiven = 20;
  }
};

GameMaster.prototype.currentTotalScore = function() {
  return this.frameTotals.reduce(function(a, b) {
    return a + b;
  });
};
