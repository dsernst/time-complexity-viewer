onmessage = function(e) {
  var func = JSON.parse(e.data[0])
  console.log(JSON.stringify(func))
  var input = JSON.parse(e.data[1])

  var start = performance.now()
  var results = eval( '(' + func + ')').call(null, input)

  postMessage((performance.now() - start).toFixed(4))
}
