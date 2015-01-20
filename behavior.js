// Polyfill performance.now
performance.now = function () {return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {return new Date().getTime()}}()

var results = []
var round = -1
var chart
var userInput
var mode

function setMode () {
  mode = $('.inputArea select').val()
  $('#script').attr({'placeholder': sampleFunctions[mode].toString()})
  userInput = JSON.parse($('.results textarea').val())
  if (_.find(sampleInputs, function (input) {return "" + input === "" + userInput})) {
    userInput = sampleInputs[mode]
    $('.results textarea').val(JSON.stringify(userInput))
  }
}
$(function () {
  $('.results textarea').val(JSON.stringify(sampleInputs['number']))
  setMode()
})

function getInput () {
  var func = $('#script').val()
  if (!func) {
    func = sampleFunctions[mode]
    $('#script').val(sampleFunctions[mode].toString())
  }
  return func
}

function run () {
  $('.results p').hide()
  // $('.results ul').text('')
  if (!chart) {
    generateChart()
  }
  round++
  results.push([])
  var func = getInput();
  (function (round) {
    inputs[mode].forEach(function (size) {
      setTimeout(print.bind(null, size, profile(func, size), round), 0)
    })
  })(round)
}

function profile (func, size) {
  var start = performance.now()
  var results = eval( '(' + func + ')').call(null, size)
  return (performance.now() - start).toFixed(4)
}

function print (size, time, round) {
  var inputSizes = inputs[mode].map(function (input) {
    if (mode !== 'number') {
      return input.length
    }
    return input
  })
  // $('.results ul').append('<li><span class="size">'+size+'</span>: <span class="time">'+time+'</span>ms</li>')
  results[round].push(time)

  chart.load({
    columns: [
      ['sizes'].concat(inputSizes),
      [function(){return 'round ' + (round + 1)}()].concat(results[round])
    ]
  })
}

function generateChart () {
  var format = d3.format(',')
  chart = c3.generate({
    bindto: '#chart',
    legend: {show: false},
    data: {
      columns: [],
      x: 'sizes'
    },
    axis: {
      y: {
        label: {
          text: 'milliseconds (ms)',
          position: 'outer-middle'
        }
      },
      x: {
        label: {
          text: 'input size (n)',
          position: 'outer-center'
        }
      }
    },
    tooltip: {
      format: {
        title: function (d) { return 'n = ' + format(d) },
        value: function (value) {
          return format(value) + " ms"
        }
      }
    }
  })
}
