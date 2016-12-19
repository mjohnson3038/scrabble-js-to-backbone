// player.js

import Backbone from 'backbone';

import Scrabble from 'app/models/scrabble';

const Player = Backbone.Model.extend({
  // To make these things part of the model so we can get and set them.
  defaults: {
    name: 'ada lovelace',
    plays: []
  },

  // in defaults, we are creating attributes that can interact with teh model. Wehere are this.scrabble is saying this is something you have access to.

  // change from name to options which is the model being passed in.
  initialize: function(options) {
    // this.scrabble in the initialize gives it a property
    this.scrabble = new Scrabble();
  },

  hasWon: function() {
    return this.totalScore() > 100;
  },

  totalScore: function() {
    var total = 0;
    for (var i = 0; i < this.get('plays').length; i++){
      total += this.scrabble.score(this.get('plays')[i]);
    }
    return total;
  },

  highestScoringWord: function() {
    return this.scrabble.highestScoreFrom(this.get('plays'));
  },

  highestWordScore: function() {
    return this.scrabble.score(this.scrabble.highestScoreFrom(this.get('plays')));
  },

  play: function(word) {
    if (this.hasWon()){
      return false;
    } else {
      this.get('plays').push(word);
    }
  }

});




export default Player;
