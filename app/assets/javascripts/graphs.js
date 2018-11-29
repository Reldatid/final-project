let dbGenerationIDs = [];
let dbGenerationFitness = [];
let dbGenerationNumbers = [];
let lineChart;
let barChart;
let generation;

const initPage = function() {
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
  $.get(`http://localhost:3000/generations/${id}`)
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
  $.get(`http://localhost:3000/genomes/${id}`)
  .done(( data ) => {
    createCytoShower(data);
  })
  .fail(( err ) => {
    console.warn( err );
  })
}

const createCytoShower = function( data ){

}

const sorter = function(a, b){
  let keyA = new Date(a.id),
      keyB = new Date(b.id);
  // Compare the 2 genomes
  if(keyA < keyB) return -1;
  if(keyA > keyB) return 1;
  return 0;
}
