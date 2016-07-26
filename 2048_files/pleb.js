function Pleb() {
  this.layersSize = [16, 8, 1, 1];
  this.nLayers = this.layersSize.length - 1;
  this.layers = [];

  this.fitness = 0;

  for (var a = 0; a < this.nLayers; ++a)  {
    this.layers[a] = [];
    for (var b = 0; b < this.layersSize[a+1]; ++b)  {
      this.layers[a][b] = [];
      for (var c = 0; c < this.layersSize[a]; ++c)  {
        this.layers[a][b][c] =  Math.random();
        if (Math.random() > 0.5)  {
          this.layers[a][b][c] = -this.layers[a][b][c];
        }
      }
    }
  }

}

Pleb.prototype.decisao = function(input) {
  var inputLayer = input;

  for (var a = 0; a < this.nLayers; ++a)  {
    var nextInputLayer = [];
    for (var b = 0; b < this.layersSize[a+1]; ++b)  {
      var valor = this.scalar(this.layers[a][b], inputLayer);
      nextInputLayer[b] = this.sigmoide(valor);
    }
    inputLayer = nextInputLayer;
  }
  var res = nextInputLayer[0];
  /*if (res < -0.88137)
    return 0;
  else if (res < 0)
    return 1;
  else if (res < 0.88137)
    return 2;
  else
    return 3;
    */
  console.log(res);
  return Math.floor((res+1)*2);
}

Pleb.prototype.scalar = function(a, b)  {
  var s = 0.0;

  if (a.length != b.length) return;

  for (var i = 0; i < a.length; ++i)
    s += a[i]*b[i];
  return s;

}

Pleb.prototype.sigmoide = function(u)  {
  return Math.tanh(u);
}
