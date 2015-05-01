// Polyfill performance.now
performance.now = function () {return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {return new Date().getTime()}}()

var results = []
var workers = []
var round = -1
var chart
var userInputs
var mode

function setMode () {
  mode = $('.inputArea select').val()
  $('#script').attr({'placeholder': sampleFunctions[mode].toString()})
  userInputs = JSON.parse($('.results textarea').val())
  if (_.find(sampleInputs, function (input) {return "" + input === "" + userInputs})) {
    userInputs = sampleInputs[mode]
    $('.results textarea').val(JSON.stringify(userInputs))
  }
}
$(function () {
  $('.results textarea').val(JSON.stringify(sampleInputs['number']))
  setMode()
})

function getInput () {
  userInputs = JSON.parse($('.results textarea').val())
  var func = $('#script').val()
  if (!func) {
    func = sampleFunctions[mode]
    $('#script').val(func.toString())
  }
  // Convert function expressions to function declarations
  func = func.toString().replace(/^var\s\w+\s?=\s?/, '')
  // Remove trailing semicolon, which screws up eval
  func = func.toString().replace(/;\s*$/, '')
  $('#script').val(func)
  return func
}

function run () {
  $('.results p').hide()
  // $('.results ul').text('')
  round++
  results.push([])
  workers.push([])
  var func = getInput();
  (function (round) {
      userInputs.forEach(function (input) {
        if (!!window.Worker) {
          // setTimeout(function () {
            workers[round].push(new Worker("worker.js"))
            var message = []
            message.push(JSON.stringify(func))
            message.push(JSON.stringify(input))
            workers[round][workers[round].length - 1].postMessage(message)
            workers[round][workers[round].length - 1].onmessage = function(e) {
              if (!chart) {
                generateChart()
              }
              print(input, e.data, round)
            }
          // }, 50)
        } else {
          setTimeout(print.bind(null, input, profile(func, input), round), 0)
        }
      })
  })(round)
}

function print (size, time, round) {
  var inputSizes = userInputs.map(function (input) {
    if (mode !== 'number') {
      return input.length
    }
    return input
  })
  // $('.results ul').append('<li><span class="size">'+size+'</span>: <span class="time">'+time+'</span>ms</li>')
  results[round].push(time)

  var xes = {}
  xes['round ' + (round + 1)] = 'size ' + (round + 1)

  chart.load({
    columns: [
      [function(){return 'size ' + (round + 1)}()].concat(inputSizes),
      [function(){return 'round ' + (round + 1)}()].concat(results[round])
    ],
    xs: xes,
  })
}

function generateChart () {
  var format = d3.format(',')
  chart = c3.generate({
    bindto: '#chart',
    legend: {show: false},
    data: {columns: []},
    axis: {
      y: {label: {text: 'milliseconds (ms)', position: 'outer-middle'}},
      x: {label: {text: 'input size (n)', position: 'outer-center'}}
    },
    tooltip: {
      format: {
        title: function (d) { return 'n = ' + format(d) },
        value: function (value) {return format(value) + " ms"}
      }
    }
  })
}

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
    return query_string;
} ();

function checkURLparams() {
  if (QueryString.inputType) {
    // should already be a string
    // check if its an acceptable type ['number', 'array', 'string']
      // if so, overwrite the input dropdown to match that type
  }
  if (QueryString.inputFunction) {
    // probably a string? with new lines? and spaces? does it need to be JSON parsed?
    // lets stick it in the input function textarea.
  }
  if (QueryString.inputArgs) {
    // hopefully a string
    // stick it in the input arguments textarea
  }
}

function generateURLparams () {
  // like checkURLparams, but in reverse!
  // save the inputType, inputFunction, and inputArgs as strings
  // construct a url parameter for these three values
  // stick it onto the current url, with a `?`
    // we might need to clear the current window.location.search
  // and then set window.location? so it can just be copied and pasted? simplest solution for now
}
