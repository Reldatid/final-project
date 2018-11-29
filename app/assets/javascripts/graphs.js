let dbGenerations = [];
let dbGenerationFitness = [];
let dbGenerationNumbers = [];
let lineChart;
let barChart;

const initPage = function() {
  $lineChart = $('<canvas id="line-chart"><canvas/>')
  $('#line-chart-container').append($lineChart)
  let lineChart = newChart('line-chart', 'line', dbGenerationNumbers, dbGenerationFitness, 'DB Generation Fitness')
  $(`#line-chart`).click( function(evt){
      activePoints = lineChart.getElementsAtEvent(evt);
      let index = activePoints[0]._index;
      console.log(index);
      let id = generations[index];
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
  $('#bar-chart-container').append($('<canvas id="bar-chart" />'))
  barChart = loadingChart('bar-chart', 'bar'),
  barChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 1)';
  barChart.update();
  $.get(`http://localhost:3000/generations/${id}`)
  .done(( data ) => {
    genomeNumbers = []
    genomeFitness = []
    generation = data.genomes;
    for (var i = 0; i < generation.length; i++) {
      genome = generation[i];
      genomeNumbers.push(i);
      genomeFitness.push(genome.fitness);
    }
    $('#bar-chart').remove()
    $('body').append($('<canvas id="bar-chart" />'))
    barChart = newChart('bar-chart', 'bar', genomeNumbers, genomeFitness, 'Genome Fitness')
    barChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 1)';
    barChart.update();
  })
  .fail(( err ) => {
    console.warn( err );
  })
}
