function Layer(size) {
  this.size = size;

  this.neurons = [];
  this.output = [];

}

Layer.prototype.receive = function(input)  {
  for (var a = 0; a < neurons.length; ++a) {
    this.output[a] = this.neurons[a].receive(input);
  }
}
