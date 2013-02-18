"use strict";

function mod(a, m) {
  var k = a % m;
  return k >= 0 ? k : k + m;
}

var Board = function(width, height, initial) {
  var i;
  
  this.width = width;
  this.height = height;
  this.counter = 0;
  this.state = [];

  if (typeof initial === 'undefined') {
    for (i = 0; i < width * height; i++) {
      this.state.push(0);
    }
  }
  else {
    if (width * height !== initial.length) {
      throw 'initial state must have length = width * height';
    }
    for (i = 0; i < initial.length; i++) {
      this.state.push(initial.charAt(i) == '0' ? 0 : 1);
    }    
  }
};

Board.prototype.get = function(x, y) {
  var normalizedX = mod(x, this.width),
      normalizedY = mod(y, this.height);

  return this.state[normalizedX + normalizedY * this.width];
}

Board.prototype.set = function(x, y, val) {
  var normalizedX = mod(x, this.width),
      normalizedY = mod(y, this.height),
      piece;

  this.state[normalizedX + normalizedY * this.width] = val ? 1 : 0;
}

Board.prototype.reset = function(){
  for (var i = this.state.length - 1; i >= 0; i--) {
    if( this.state[i] === 1 ) var a = i;
    console.log(a);
    this.state[a] = 0;
  };
}

Board.prototype.neighbours = function(x, y) {
  var count = 0;
  for (var i = x-1; i <= x+1; i++) {
    for (var j = y-1; j <= y+1; j++) {
      count += this.get(i,j);
    }
  }
  count -= this.get(x,y);
  return count;
};

Board.prototype.increment = function(){
  return ++this.counter;
};