let cart;
let pole;
let balancer;
const gravity = 1;
let avFitness = 0;

//controls
let simulating = true;


const toggleSimulation = function() {
  simulating = simulating ? false : true;
}

const resetCart = function() {
  cart = new Cart;
  pole = new Pole;
}

function windowResized() {
  $p5 = $('#simulation-container')
  let width = $p5[0].clientWidth;
  let height = $p5[0].clientHeight
  resizeCanvas(width, height);
}

const update = () => {
  let angle = Math.abs(pole.rotation);
  if (angle < Math.PI/3 && balancer) {
    balancer.inputs['angle'] = pole.rotation;
    balancer.inputs['angularVelocity'] = pole.angularVelocity;
    balancer.stepNeurons();
    let force = balancer.neurons.control.stimulation;
    cart.accelerate(force)
    cart.update()
    pole.update()
  }
}

//Render all changes to objects in the scene.
const render = () => {
  cart.render();
  pole.render();
}

const runNetwork = function( network ){
  let steps = 0;
  let angle = Math.abs(pole.rotation);
  while (angle < Math.PI/3){
    angle = Math.abs(pole.rotation);
    network.inputs['angle'] = pole.rotation;
    network.inputs['angularVelocity'] = pole.angularVelocity;
    network.stepNeurons();
    let force = network.neurons.control.stimulation
    cart.accelerate(force)
    cart.update()
    pole.update()
    steps ++;
  }
  return steps
}

const simTester = function(){
  cart = new Cart;
  pole = new Pole;
  balancer = new NeuralNetwork;
  balancer.addNeuron( 0 );
  balancer.addNeuron( 1 );
  balancer.addNeuron( 'control' );
  balancer.addNeuron( 'angle' );
  balancer.addConnection( 'angle',0,1 );
  balancer.addConnection( 'angle',1,-1 );
  balancer.addConnection( 0,'control',10 );
  balancer.addConnection( 1,'control',-10 );
}

const evaluatePopulation = function(){
  for (var i = 0; i < population.length; i++) {
    cart = new Cart;
    pole = new Pole;
    brain = population[i].generateNetwork();
    population[i].fitness = runNetwork(brain);
  }
  population.sort(compareGenomes);
}

const stepEvolution = function(){
  evaluatePopulation();
  let totalFitness = 0;
  for (var i = 0; i < population.length; i++) {
    totalFitness += population[i].fitness;
  }
  avFitness = totalFitness/population.length;
  localStorage.setItem('generations', JSON.stringify(generations));
  newGeneration();
  simTopDawg();
}

const simTopDawg = function(){
  cart = new Cart;
  pole = new Pole;
  balancer = generations[generations.length-1].genomes[0].generateNetwork()
}

const resetEvolution = function(){
  generations = [];
  population = [];
  while (population.length < 200){
    const seedGenome = new Genome;
    for (var i = 0; i < 2; i++) {
      seedGenome.genes.push(new Gene('angle', i, (Math.random()*20)-10, true));
      seedGenome.genes.push(new Gene('angularVelocity', i, (Math.random()*20)-10, true));
      seedGenome.genes.push(new Gene('bias', i, (Math.random()*20)-10, true));
      seedGenome.genes.push(new Gene(i, 'control', (Math.random()*20)-10, true));
    }
    population.push(seedGenome)
  }
}
