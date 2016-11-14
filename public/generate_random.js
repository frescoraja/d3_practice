const d3 = require('./d3.min.js');
const fs = require('fs');

function shuffle_bad(_arr) {
  return _arr.sort(function() {
    return Math.random() - 0.5;
  });
}

function shuffle_good(_arr) {
  let _result = _arr.slice();
  let _size = _arr.length;
  while (_size) {
    let idx = Math.random() * _size-- | 0;
    let tmp = _result[_size];
    _result[_size] = _result[idx];
    _result[idx] = tmp;
  }
  return _result;
}

function Result(size) {
  this._store = [];

  for (let i = 0; i < size; i++) {
    this._store[i] = [];
  }

  return this._store;
}

function Score({ size = 60, reps = 10000, auto = false, filename = "results.json", bad = true }) {
  this.result = new Result(size);
  this.bad    = bad;
  this.reps   = reps;
  this.filename = filename;

  if (auto) {
    Score.prototype.calculate.call(this);
    Score.prototype.save.call(this);
  }
}

Score.prototype = {
  constructor: Score,

  calculate: function() {
    for (let i = 0; i < this.reps; i++) {
      let array = d3.range(this.result.length);
      let shuffled = this.bad ? shuffle_bad(array) : shuffle_good(array);
      for (let j = 0; j < shuffled.length; j++) {
        let item = parseInt(shuffled[j]);
        this.result[item][j] = this.result[item][j] ? this.result[item][j] + 1 : 1;
      }
    }
  },

  save: function(filename) {
    let _name = filename || this.filename;
    fs.writeFileSync(_name, JSON.stringify(this.result), 'utf-8', function(err) {
      if (err) throw new Error(err);
      console.log("saved to ", _name);
    });
  }
}

module.exports = { Score, shuffle_bad, shuffle_good };

