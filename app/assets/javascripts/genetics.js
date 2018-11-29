let alltimeInnovations = [];
let generationalInnovations = 0;

const crossoverRate = 0.2;
const mutationRate = 0.7;
const absMutationVal = 1; //user to create ranges from Val to -Val;

let generations = [];
let population = [];
let nextGen = [];

const Genome = function(){
  this.fitness;
  this.generation = generations.length + 1;
  this.genes = [];
}

Genome.prototype.generateStrand = function(){
  let strand = '';
  for (var i = 0; i < this.genes.length; i++) {
    strand = strand + `[${this.genes[i].inNode},${this.genes[i].outNode},${this.genes[i].weight}`
  }
  return strand;
}

Genome.prototype.generateNetwork = function(){
  const network = new NeuralNetwork;
  for (var i = 0; i < this.genes.length; i++) {
    const gene = this.genes[i];
    network.addNeuron(gene.inNode);
    network.addNeuron(gene.outNode);
    network.addConnection(gene.inNode , gene.outNode , gene.weight);
  }
  return network;
}

Genome.prototype.crossoverWith = function( mother ){
  let father = this;
  let son = new Genome
  let daughter = new Genome
  for (var i = 0; i < father.genes.length; i++) {
    let fatherGene = father.genes[i]
    let motherGene = father.genes[i]
    let sonGene = new Gene(
      fatherGene.inNode,
      fatherGene.outNode,
      fatherGene.weight,
     )
    let daugherGene = new Gene(
      motherGene.inNode,
      motherGene.outNode,
      motherGene.weight,
     )
    if (Math.random() < mutationRate) {
      son.genes.push(father.genes[i]);
      daughter.genes.push(mother.genes[i]);
    }else{
      daughter.genes.push(father.genes[i]);
      son.genes.push(mother.genes[i]);
    }
  }
  return {son, daughter}
}

Genome.prototype.mutate = function() {
  for (var i = 0; i < this.genes.length; i++) {
    if (Math.random < mutationRate) {
      this.genes[i].mutate();
    }
  }
}

const Gene = function(inNode, outNode, weight){
  this.inNode = inNode;
  this.outNode = outNode;
  this.weight = weight;
};

Gene.prototype.mutate = function(){
  let mutation = (Math.random()*absMutationVal*2)-absMutationVal; //creates a random number from -absMutVal to +absMutVal
  this.weight += mutation;
}

//will sort highest to lowest.
const compareGenomes = function(a,b){
  if (a.fitness < b.fitness)
    return 1;
  if (b.fitness < a.fitness)
    return -1;
  return 0;
}

const newGeneration = function(){
  genomes = [...population];
  nextGen = [];
  let totalFitness = 0;
  for (var i = 0; i < population.length; i++) {
    totalFitness += population[i].fitness;
  }
  generations.push({ average_fitness: totalFitness/200, genomes})

  for (var i = 0; i < 10; i++) {

    let genome = new Genome;
    genome.genes = JSON.parse(JSON.stringify(population[i].genes));

    let mutantGenome = new Genome;
    mutantGenome.genes = JSON.parse(JSON.stringify(population[i].genes));
    mutantGenome.mutate();
    nextGen.push(genome);
    nextGen.push(mutantGenome);
  }

  for (var i = 0; i < 20; i++) {
    const seedGenome = new Genome;
    for (var j = 0; j < 2; j++) {
      seedGenome.genes.push(new Gene('angle', i, (Math.random()*20)-10, true));
      seedGenome.genes.push(new Gene('angularVelocity', i, (Math.random()*20)-10, true));
      seedGenome.genes.push(new Gene('bias', i, (Math.random()*20)-10, true));
      seedGenome.genes.push(new Gene(i, 'control', (Math.random()*20)-10, true));
    }
    nextGen.push(seedGenome)
  }

  for (var i = 0; i < 80; i++) {
    random1 = Math.floor(Math.random()*population.length/4);
    random2 = Math.floor(Math.random()*population.length/4);

    let father = population[random1];
    let mother = population[random2];
    offspring = father.crossoverWith(mother);
    nextGen.push(offspring.son);
    nextGen.push(offspring.daughter);
  }
  population = nextGen;
}

// let test = new Genome;
// test.genes.push(new Gene('angle', 0, 1));
// test.genes.push(new Gene('bias', 0, 0));
// test.genes.push(new Gene( 0, 'control', 10));
// test.genes.push(new Gene('angle', 1, -1));
// test.genes.push(new Gene('bias', 1, 0));
// test.genes.push(new Gene( 1, 'control', -10));
// test.genes.push(new Gene('angle', 2, 0));
// test.genes.push(new Gene('bias', 2, 0));
// test.genes.push(new Gene( 2, 'control', 0));
// test.genes.push(new Gene('angle', 3, 0));
// test.genes.push(new Gene('bias', 3, 0));
// test.genes.push(new Gene( 3, 'control', 0));
// test.genes.push(new Gene('angle', 4, 0));
// test.genes.push(new Gene('bias', 4, 0));
// test.genes.push(new Gene( 4, 'control', 0));
// population.push(test);



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
