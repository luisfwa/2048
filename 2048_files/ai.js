function AI(interface) {
  this.populationSize = 100;
  this.mutateRatio = 0.06;
  this.gameSpeed = 100;

  this.nJogos = 0;

  this.curPlebRounds = 0;
  this.curPlebChangeDirs = 0;
  this.prevDir = -1;

  this.grid = interface.getGrid();
  this.interface = interface;
  this.curPleb = null;
  this.plebidx = 0;

  this.plebs = [];
  for (var i = 0; i < this.populationSize; ++i)
    this.plebs.push(new Pleb());

  this.outputs = ["w", "d", "s", "a"];

  this.nextPleb();
};

AI.prototype.decisao = function() {
  var decidido = this.curPleb ?
      this.curPleb.decisao(this.interface.getInput()) : 0;

  if (decidido != this.prevDir) {
    this.curPlebChangeDirs++;
  }
  this.prevDir = decidido;

  this.interface.simulate_input(this.outputs[decidido]);

  if (this.interface.wasMoved())
    this.curPlebRounds++;
  else {
    this.nextPleb();
  }

  this.getFitness();
  this.curPleb.fitness = this.curPlebRounds + 10*this.curPlebChangeDirs;
  console.log("moves: " + this.curPlebRounds);
  console.log("turns: " + this.curPlebChangeDirs);
  console.log("fitness:" + this.plebs[this.plebidx - 1].fitness);
}


AI.prototype.getFitness = function() {
  if (this.interface.gameOver())  {
    window.clearInterval(this.action);
    window.setTimeout(this.nextPleb.bind(this), 1000/this.gameSpeed);
  } else {
    //this.decisao();
  }
  this.curPleb.fitness = this.curPlebRounds + 100*this.curPlebChangeDirs;
}

AI.prototype.nextPleb = function()  {
  if (this.plebidx == this.populationSize - 1)  {
    this.plebs.sort(function(a, b)  {
      if (a.fitness > b.fitness)
        return -1;
      if (a.fitness < b.fitness)
        return 1;
      return 0;
    });

    console.log("Best: " + this.plebs[0].fitness);
    window.clearInterval(this.action);
    this.plebidx = 0;
    this.gameSpeed = 1;
    this.nextPleb();

    return;
  }
  this.curPleb = this.plebs[this.plebidx++];
  this.interface.simulate_input("r");

  window.clearInterval(this.action);
  this.action = window.setInterval(this.decisao.bind(this), 1000/this.gameSpeed);

  this.nJogos++;

  this.curPlebRounds = 0;
  this.curPlebChangeDirs = 0;
  this.prevDir = -1;

  console.log(this.plebs[this.plebidx - 1].layers);
  console.log(this.nJogos);
}
