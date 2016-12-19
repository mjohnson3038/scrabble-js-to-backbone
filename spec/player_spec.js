// spec/player_spec.js

import Player from 'app/models/player';

describe('Player', function() {
  var player;
  beforeEach(function() {
    player = new Player("bob");
  });
  describe('Constructor', function() {
    it('Constructor Exists', function() {
      expect(Player).toBeFunction();
    });
    it('Constructor Initializes attributes', function() {
      expect(player.name).toEqual("bob");
      expect(player.plays).toEqual([]);
    });
  });

  describe('totalScore', function() {
    it('totalScore starts at 0', function() {
      expect(player.totalScore()).toEqual(0);
    });
    it('Calculates Total Score Correctly', function() {
      player.plays = ['aaa', 'eee', 'iii'];
      expect(player.totalScore()).toEqual(9);
    });
    it('Calculates Total Score Correctly with 7-letter word bonus', function() {
      player.plays = ['aaa', 'eee', 'iii', 'aaaaaaa'];
      expect(player.totalScore()).toEqual(9 + 57);
    });
  });


  describe('hasWon', function() {
    it('Starts off being false', function() {
      expect(player.hasWon()).toBeFalsy();
    });
    it("hasn't won until score over 100", function() {
        // each 'word' is 1 pt.
      player.plays = ['aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa',
      'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa',
      'aaaa'];  // last entry is 4 letters 1 pt each.

        /*  for clarity  */
      expect(player.totalScore()).toEqual(99);
      expect(player.hasWon()).toBeFalsy();
      player.plays.push('a'); // add 1 pt
        // Check equals to 100 score
      expect(player.hasWon()).toBeFalsy();
      player.plays.push('a'); // add 1 pt
      expect(player.hasWon()).not.toBeFalsy(); // <-- notice the .not
    });
  });

  describe('highestScoringWord', function() {
    it('If no words played it returns null', function() {
      // no word played yet
      player.plays = [];
      expect(player.highestScoringWord()).toBeNull();
    });
    it('Returns a word if only one played', function() {
      // no word played yet
      player.plays = ['bob'];
      expect(player.highestScoringWord()).toEqual('bob');
    });
    it('If no words played it returns the highest scoring word', function() {
      // no word played yet
      player.plays = ['aaa', 'bbb', 'zzz'];
      expect(player.highestScoringWord()).toEqual('zzz');

      player.plays = ['aaa', 'zzz', 'bbb'];
      expect(player.highestScoringWord()).toEqual('zzz');

      player.plays = ['zzz', 'aaa', 'bbb'];
      expect(player.highestScoringWord()).toEqual('zzz');
    });
    it('Testing Considers 7-letter word score', function() {
      // no word played yet
      player.plays = ['aaa', 'bbb', 'zzz', 'aaaaaaa'];
      expect(player.highestScoringWord()).toEqual('aaaaaaa');

      player.plays = ['aaaaaaa', 'aaa', 'zzz', 'bbb'];
      expect(player.highestScoringWord()).toEqual('aaaaaaa');

      player.plays = ['zzz', 'aaaaaaa', 'aaa', 'bbb'];
      expect(player.highestScoringWord()).toEqual('aaaaaaa');
    });
  });

  describe('highestWordScore', function() {

    it('highestWordScore exists', function() {
      expect(player.highestWordScore).toBeFunction();
    });
    it('highestWordScore calculates the highest scoring word number', function() {
      player.plays = ['zzz', 'aaaaaaa', 'aaa', 'bbb'];
      expect(player.highestWordScore()).toEqual(57);
      player.plays = ['fff'];
      expect(player.highestWordScore()).toEqual(12);
    });

  });

  describe('play', function() {
    it('play exists', function() {
      expect(player.play).toBeFunction();
    });
    it('play adds a word to plays', function() {
      player.play('Bananna');
      expect(player.plays).toContain('Bananna');
    });
    it("After you've won you can't add more words", function() {
      player.plays = ['aaaaaaa', 'aaaaaaa'];
      player.play('Bananna');
      expect(player.plays).not.toContain('Bananna');
    });
    it("After you've won play returns false", function() {
      player.plays = ['aaaaaaa', 'aaaaaaa'];
      expect(player.play('Bananna')).toBeFalsy();
    });
  });
});
