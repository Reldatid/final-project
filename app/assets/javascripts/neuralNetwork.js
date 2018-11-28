const NeuralNetwork = function(){
  this.neurons = {};
  this.inputs = {};
  this.nextInputs = {};
}

NeuralNetwork.prototype.addNeuron = function( neuron ){
  if (!this.neurons[neuron]) {
    this.neurons[neuron] = new Neuron(neuron, this);
    this.inputs[neuron] = 0;
  }
}

NeuralNetwork.prototype.addConnection = function(fromNeuron, toNeuron, weight){
  if (this.neurons[toNeuron]){
    this.neurons[toNeuron].inputs[fromNeuron] = weight;
  }
}

NeuralNetwork.prototype.generateGenome = function(){
  const genome = new Genome;
  for (let neuron in this.neurons){
    let connections = this.neurons[neuron].inputs;
    for (let source in connections){
      let gene = new Gene(source, neuron, connections[source], true);
      genome.genes.push(gene);
    }
  }
  return genome;
}

NeuralNetwork.prototype.contains = function(neuron) {
  return this.neurons[neuron] ? true : false;
}

NeuralNetwork.prototype.stepNeurons = function() {
  for(let n in this.neurons){
    this.neurons[n].calculateOutput();
  }
  for(let i in this.nextInputs){
    this.inputs[i] = this.nextInputs[i];
  }
}


const Neuron = function(name, network){
  this.network = network;
  this.name = name;
  this.inputs = {};
  this.stimulation = 0;
}

Neuron.prototype.calculateOutput = function(){
  this.stimulation = 0;
  for (let source in this.inputs) {
    this.stimulation += this.network.inputs[source] * this.inputs[source];
  }
  this.network.nextInputs[this.name] = 1/(1 + Math.pow(Math.E, -this.stimulation));
}
