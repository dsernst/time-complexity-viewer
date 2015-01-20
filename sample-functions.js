var sampleFunctions = {
  number: function sampleNumberFunc (n) {
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
  },
  string: function sampleStringFunc (str) {
    var uniqs = {}
    for (var i = 0; i < str.length; i++) {
      uniqs[str[i]] = true
    }
    var uniqSortedChars = Object.keys(uniqs).sort()

    var results = []

    var buildPowerSet = function (remainingChars, currentString) {
      if (remainingChars.length === 0) {
        return results.push(currentString);
      }
      var next = remainingChars.slice(1)
      buildPowerSet(next, currentString + remainingChars[0])
      buildPowerSet(next, currentString)
    }
    buildPowerSet(uniqSortedChars, '')

    return results
}
  },
  array: function sampleArrayFunc (arr) {
    var secondArray = []
    var beAwesommmmmmmmmme = 0
    for (var i = 1; i < arr.length; i++) {
      beAwesommmmmmmmmme++
      secondArray.push(Math.pow(beAwesommmmmmmmmme * Math.PI, 2))
      if (secondArray[i] === arr[i]) {
        youGetAPony()
      }
    }
    return secondArray
  },
}
