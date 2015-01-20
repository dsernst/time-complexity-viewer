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
  var start = Date.now()
  var results = eval( '(' + func + ')').call(null, input);
  return Date.now() - start
}

var results = []

var print = function (size, time) {
  var $line = $('<li>')
  $line.append('<span class="size">' + size + '</span>: ')
  $line.append('<span class="time">' + time + '</span>ms')
  $('.results ul').append($line)
  results.push(time)
  chart.load({
    columns: [
      ['sizes'].concat(inputSizes),
      ['one'].concat(results)
    ]
  })
}

var chart

$(function () {
  chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
      ],
      x: 'sizes'
    },
    axis: {
      y: {
        label: {
          text: 'milliseconds (ms)',
          position: 'outer-middle'
        }
      }
    }
  });
})

var inputSizes = [0,1,2,5,10,25,75,250,1000,5000,20000,100000,500000,3000000]
var run = function () {
  $('.results ul').text('')
  results = []
  var func = getInput()
  inputSizes.forEach(function (size) {
    setTimeout(function(){print(size, profile(func, size))}, 100)
  })
}
