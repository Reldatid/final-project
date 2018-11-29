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
    balancer.inputs['xPos'] = pole.angularVelocity;
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
    network.inputs['xPos'] = pole.angularVelocity;
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
