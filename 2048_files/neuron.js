function Neuron(a, weights, bias) {
  this.inputs = a;
  this.weights = [];
  this.bias = new Number();

  this.output = new Number();
}

Neuron.prototype.receive = function(input) {
  if (input.length != weights.length + 1)   {
    this.createRandomWeights(input.length - 1);
    console.log("Input.length = " + input.length + ", Weights.length = " + weights.length);
    console.log("Criando novo neuronio");
  }

  var s = 0.0;
  for (var a = 0; a < input.length; ++a)
    s += input[a]*weight[a];

  this.output = s;
  return s;
}

Neuron.prototype.createRandomWeights = function(l) {
  for (var a = 0; a < l; ++a)
    weights[a] = Math.random()*2 - 1;
  this.bias = Math.random();
}

Neuron.prototype.activation = function(u)  {
  return Math.tanh(u);
}

Neuron.prototype.toString() {
  var s = "";

  for (var a = 0; a < weights.length; ++a)
    s += weights[a] + " ";

  return (s += bias);
}
