function Interface(game)  {
  this.inp = [];
  this.oldInp = [];

  this.getGrid = function() {
    return game.grid;
  };
  this.gameOver = function()  {
    return game.over;
  };
  this.getScore = function()  {
    return game.score;
  };
  this.getInput = function() {
    for (var a = 0; a < game.size*game.size; ++a)
      this.oldInp[a] = this.inp[a];

    for (var a = 0; a < game.size; ++a) {
      for (var b = 0; b < game.size; ++b) {
        this.inp[a*game.size + b] = !!game.grid.cells[a][b] ? game.grid.cells[a][b].value : 0
      }
    }
    return this.inp;
  }

  this.wasMoved = function()  {
    var a = this.oldInp, b = this.inp;

    if (a == null || b == null) return true;
    if (a.length != b.length) return true;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return true;
    }
      return false;
    }
}

Interface.prototype.simulate_input = function(input)  {
  var e = new KeyboardEvent("keydown", {key: input});

  document.dispatchEvent(e);
}
