// player.js

import Backbone from 'backbone';

import Scrabble from 'app/models/scrabble';

const Player = Backbone.Model.extend({
  initialize: function(name) {
    this.name = name;
    this.plays = [];
    this.scrabble = new Scrabble();
  },

  hasWon: function() {
    return this.totalScore() > 100;
  },

  totalScore: function() {
    var total = 0;
    for (var i = 0; i < this.plays.length; i++){
      total += this.scrabble.score(this.plays[i]);
    }
    return total;
  },

  highestScoringWord: function() {
    return this.scrabble.highestScoreFrom(this.plays);
  },

  highestWordScore: function() {
    return this.scrabble.score(this.scrabble.highestScoreFrom(this.plays));
  },

  play: function(word) {
    if (this.hasWon()){
      return false;
    } else {
      this.plays.push(word);
    }
  }

});




export default Player;
