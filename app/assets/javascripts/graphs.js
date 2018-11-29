let dbGenerationIDs = [];
let dbGenerationFitness = [];
let dbGenerationNumbers = [];
let generationIDs = [];
let generationFitness = [];
let generationNumbers = [];
let lineChart;
let barChart;
let generation;
let cy;
let local = false;

const initPage = function() {
  $('#line-chart').remove()
  $lineChart = $('<canvas id="line-chart"><canvas/>')
  $('#line-chart-container').append($lineChart)
  lineChart = newChart('line-chart', 'line', dbGenerationNumbers, dbGenerationFitness, 'DB Generation Fitness')
  $(`#line-chart`).click( function(evt){
    activePoints = lineChart.getElementsAtEvent(evt);
    let index = activePoints[0]._index;
    let id = dbGenerationIDs[index];
    loadGeneration(evt, id)
  });
}

const newChart = function(canvasID, type, labels, data, title) {
  var ctx = document.getElementById(canvasID).getContext('2d');
  var newChart = new Chart(ctx, {
    // The type of chart we want to create
    type: type,

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: title,
            backgroundColor: 'rgba(255, 99, 132, 0)',
            lineTension: 0,
            borderColor: 'rgb(255, 99, 132)',
            data: data,
        }]
    },

    // Configuration options go here
    options: {
      animation: {
          duration: 0, // general animation time
      },
      hover: {
          animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
    }
  });
  return newChart;
}

const loadingChart = function(canvasID, type){
  return newChart(
    canvasID,
    type,
    ['L','O','A','D','I','N','G'],
    [1,2,3,4,5,6,7],
    'Loading Data'
  )
}

const loadGeneration = function( evt, id ){
  $('#bar-chart').remove()
  $('#bar-chart-container').append($('<canvas id="bar-chart"><canvas/>'))
  barChart = loadingChart('bar-chart', 'bar'),
  barChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 1)';
  barChart.update();
  $.get(`generations/${id}`)
  .done(( data ) => {
    createGenerationChart(data)
  })
  .fail(( err ) => {
    console.warn( err );
  })
}

const createGenerationChart = function( data ){
  genomeNumbers = []
  genomeFitness = []
  generation = data.genomes;
  generation.sort(sorter);
  for (var i = 0; i < generation.length; i++) {
    genome = generation[i];
    genomeNumbers.push(i);
    genomeFitness.push(genome.fitness);
  }
  $('#bar-chart').remove()
  $barChart = $('<canvas id="bar-chart"><canvas/>')
  $('#bar-chart-container').append($barChart);
  barChart = newChart('bar-chart', 'bar', genomeNumbers, genomeFitness, 'Genome Fitness')

  console.log($('#bar-chart'));
  $('#bar-chart').click( function(evt){
    activePoints = barChart.getElementsAtEvent(evt);
    let index = activePoints[0]._index;
    let id = generation[index].id;
    console.log(id);
    loadGenome(evt, id);
  })
  barChart.data.datasets[0].backgroundColor='rgba(255, 99, 132, 1)';
  barChart.update();
}

const loadGenome = function( evt , id ){
  $.get(`genomes/${id}`)
  .done(( data ) => {
    createCytoscape(data.strand);
  })
  .fail(( err ) => {
    console.warn( err );
  })
}

const createCytoscape = function( string ){
  let strand = string.split('[');
  let elements = [
    {
      data: { id: 'angle'}
    },
    {
      data: { id: 'angularVelocity'}
    },
    {
      data: { id: 'bias'}
    },
    {
      data: { id: 'control'}
    }
  ]
  for (var i = 0; i < 2; i++) {
    elements.push({
      data: { id: i}
    })
  }
  for (var i = 1; i < strand.length; i++) {
    const info = strand[i].split(',');
    console.log(info[2]);
    elements.push({
      data: {
        id: `${info[0]}-${info[1]}`,
        source: info[0],
        target: info[1],
        weight: parseInt(info[2])
      }
    });
  }
  cy = cytoscape({
    container: $('#node-chart-container'),
    elements: elements,
    style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': 'mapData(weight, -10, 10, red, blue)',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: '.highlighted',
          style: {
            'background-color': '#000',
            'width': 6,
            'line-color': '#000',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
    layout: {
      name: 'grid',
      rows: 1
    }
  });
  cy.getElementById('angle').position({x: 100, y: 100})
  cy.getElementById('angularVelocity').position({x: 100, y: 200})
  cy.getElementById('bias').position({x: 100, y: 300})
  cy.getElementById('0').position({x: 300, y: 150})
  cy.getElementById('1').position({x: 300, y: 250})
  cy.getElementById('control').position({x: 500, y: 200})
  // cy.getElementById('angle').position({x: 10, y: 10})
  // cy.getElementById('angle').position({x: 10, y: 10})
  // cy.getElementById('angle').position({x: 10, y: 10})

}

const sorter = function(a, b){
  let keyA = new Date(a.id),
      keyB = new Date(b.id);
  // Compare the 2 genomes
  if(keyA < keyB) return -1;
  if(keyA > keyB) return 1;
  return 0;
}

const loadLocal = function(){
  generationIDs = [];
  generationFitness = [];
  generationNumbers = [];
  if (localStorage.getItem('generations')) {
    local = true;
    generations = JSON.parse(localStorage.getItem('generations'))
    for (var i = 0; i < generations.length; i++) {
      generationNumbers.push(i);
      generationFitness.push(generations[i].average_fitness);
    }
    localLineChart()
  }
}

const localLineChart = function() {
  $('#line-chart').remove()
  $('#line-chart-container').append($('<canvas id="line-chart"><canvas/>'))
  lineChart = newChart( 'line-chart', 'line', generationNumbers, generationFitness, 'Local Generation Fitness' )
  $(`#line-chart`).click( function(evt){
    activePoints = lineChart.getElementsAtEvent(evt);
    let index = activePoints[0]._index;
    localGeneration(index)
  });
}

const localGeneration = function( id ) {
  $('#bar-chart').remove()
  $('#bar-chart-container').append($('<canvas id="bar-chart"><canvas/>'))
  genomeNumbers = []
  genomeFitness = []
  console.log(id);
  generation = generations[id].genomes;
  for (var i = 0; i < generation.length; i++) {
    genome = generation[i];
    genomeNumbers.push(i);
    genomeFitness.push(genome.fitness);
  }
  $('#bar-chart').remove()
  $barChart = $('<canvas id="bar-chart"><canvas/>')
  $('#bar-chart-container').append($barChart);
  barChart = newChart('bar-chart', 'bar', genomeNumbers, genomeFitness, 'Genome Fitness')

  $('#bar-chart').click( function(evt){
    activePoints = barChart.getElementsAtEvent(evt);
    let index = activePoints[0]._index;
    let genome = generation[index];
    strand = stringifyGenes( genome.genes );
    createCytoscape( strand )
  })
  barChart.data.datasets[0].backgroundColor='rgba(255, 99, 132, 1)';
  barChart.update();
}

const stringifyGenes = function( genes ){
  let strand = '';
  for (var i = 0; i < genes.length; i++) {
    strand = strand + `[${genes[i].inNode},${genes[i].outNode},${genes[i].weight}`
  }
  return strand;
}
