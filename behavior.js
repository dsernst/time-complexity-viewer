var inputFunc = ''

var getInput = function () {
  return $('#script').val()
}

var profile = function (func, input) {
  var start = Date.now()
  var results = eval( '(' + func + ')').call(null, input);
  return Date.now() - start
}

var sample = function (n) {
  for (var i = 0; i < n; i++) {
    3 * 1023
    10 + 2
    12122124 - 12313
    Math.floor(124 / 12534)
  }
}

var run = function () {
  var func = getInput()
  var inputSizes = [0,1,2,5,10,25,75,250,1000,5000,20000,100000,500000,3000000]
  inputSizes.forEach(function (size) {
    console.log(profile(func, size))
  })
}
