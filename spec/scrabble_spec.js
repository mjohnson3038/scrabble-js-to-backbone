// spec/scrabble_spec.js

import Scrabble from 'app/models/scrabble';


describe('Scrabble', function() {
  var scrabble;
  beforeEach(function() {
    scrabble = new Scrabble();
  });

  // Constructor Testing
  describe('Constructor Testing', function() {
    it('Constructor exists', function() {
      expect(Scrabble).toBeFunction();
    });
  });

  // Testing Score word
  describe('Testing Score for a word', function() {
    it('Function exists', function() {
      expect(scrabble.score).toBeFunction();
    });

    it('Scores an empty word correctly', function() {
      expect(scrabble.score('')).toEqual(0);
    });
    it('scores "bob" correctly', function() {
      expect(scrabble.score('bob')).toEqual(7);
    });
    it('scores 7-letter words', function() {
      expect(scrabble.score('aaaaaaa')).toEqual(50 + 7);
    });

    //Todo
      // Add testing for invalid words punctuation etc.
  });

  describe('testing highestScoreFrom', function() {
    it('highestScoreFrom exists', function() {
      expect(scrabble.highestScoreFrom).toBeFunction();
    });
    it('highestScoreFrom picks the highest score from a list of words', function() {
      expect(scrabble.highestScoreFrom(['aaa', 'bbb', 'abc', 'ppp', 'zzz'])).toEqual('zzz');
      expect(scrabble.highestScoreFrom(['zzz', 'bbb', 'abc', 'ppp', 'aaa'])).toEqual('zzz');
      expect(scrabble.highestScoreFrom(['bbb', 'abc', 'zzz', 'ppp', 'aaa'])).toEqual('zzz');
    });
    it('highestScoreFrom considers the 7-letter word score', function() {
      expect(scrabble.highestScoreFrom(['aaa', 'bbb', 'abc', 'ppp', 'zzz', 'aaaaaaa'])).toEqual('aaaaaaa');
    });
    it('highestScoreFrom if two words have the same score it picks the first', function() {
      expect(scrabble.highestScoreFrom(['aaa', 'eee'])).toEqual('aaa');
    });
  });

});
