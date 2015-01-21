onmessage = function(e) {
  var func = e.data[0]
  var input = e.data[1]

  var start = performance.now()
  var results = eval( '(' + func + ')').call(null, input)

  postMessage((performance.now() - start).toFixed(4))
}
