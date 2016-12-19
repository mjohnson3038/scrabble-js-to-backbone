// player.js

import Scrabble from 'app/models/scrabble';

const Player = function(name) {
  this.name = name;
  this.plays = [];
  this.scrabble = new Scrabble();
};


Player.prototype.hasWon = function() {
  return this.totalScore() > 100;
};

Player.prototype.totalScore = function() {
  var total = 0;
  for (var i = 0; i < this.plays.length; i++){
    total += this.scrabble.score(this.plays[i]);
  }
  return total;
};

Player.prototype.highestScoringWord = function() {
  return this.scrabble.highestScoreFrom(this.plays);
};

Player.prototype.highestWordScore = function() {
  return this.scrabble.score(this.scrabble.highestScoreFrom(this.plays));
};

Player.prototype.play = function(word) {
  if (this.hasWon()){
    return false;
  } else {
    this.plays.push(word);
  }
};

export default Player;
