var inputFunc = ''

var getInput = function() {
  inputFunc = $('#script').val()
  console.log(inputFunc)
}

var profile = function (func, input) {
  var start = Date.now()
  func(input)
  return Date.now() - start
}

var sample = function(n){
  for (var i = 0; i < n; i++) {
    3 * 1023
    10 + 2
    12122124 - 12313
    Math.floor(124 / 12534)
  }
}

console.log(profile(sample, 100000000))

// var results = eval( '(' + input + ')').apply(null, xargs);
