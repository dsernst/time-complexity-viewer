// Polyfill performance.now
performance.now = function () {return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {return new Date().getTime()}}();

var inputSizes = [0,1,2,5,10,25,75,250,1000,5000,20000,100000,500000,3000000]
var results = []
var round = -1
var chart

function sampleFunc (n) {
  var a
  for (var i = 0; i < n; i++) {
    a = 3 * n
    a += n > 9000
    Infinity;
    a += 12122124 - 12313 % n
    "cat" + "dog" === n
    a += Math.floor(n / 124)
  }
  return 'this is an example'
}
$(function() {
  $('#script').attr({'placeholder': sampleFunc.toString()})
})

var getInput = function () {
  var func = $('#script').val()
  if (!func) {
    func = sampleFunc
    $('#script').val(sampleFunc.toString())
  }
  return func
}

var profile = function (func, input) {
  var start = performance.now()
  var results = eval( '(' + func + ')').call(null, input);
  return (performance.now() - start).toFixed(4)
}

var generateChart = function () {
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
            title: function (d) { return 'n = ' + format(d); },
            value: function (value) {
                return format(value) + " ms";
            }
        }
    }
  });
}

var print = function (size, time, round) {
  // $('.results ul').append('<li><span class="size">'+size+'</span>: <span class="time">'+time+'</span>ms</li>')
  results[round].push(time)

  chart.load({
    columns: [
      ['sizes'].concat(inputSizes),
      [function(){return 'round ' + (round + 1)}()].concat(results[round])
    ]
  })
}

var run = function () {
  $('.results p').hide()
  var format = d3.format(',')
  round++
  if (!chart) {
    generateChart()
  }
  $('.results ul').text('')
  results.push([])
  var func = getInput()
  inputSizes.forEach(function (size) {
    setTimeout(function(){print(size, profile(func, size), round)}, 0)
  })
}
