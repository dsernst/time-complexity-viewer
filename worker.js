onmessage = function(e) {
  var func = e.data[0]
  var input = e.data[1]
  console.log('Message received from main script')

  var start = performance.now()
  var results = eval( '(' + func + ')').call(null, input)

  console.log('Posting message back to main script')
  postMessage((performance.now() - start).toFixed(4))
}
