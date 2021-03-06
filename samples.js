var sampleFunctions = {
  number: function sampleNumberFunc (n) {
    var a
    for (var i = 0; i < n; i++) {
      a = 3 * n
      a += n > 9000
      a += 12122124 - 12313 % n
      "cat" + "dog" === n
      a += Math.floor(n / 124)
    }
    return "This is just an example. Use this box to input a function to profile. The return value won't be used."
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
  },
  array: function sampleArrayFunc (arr) {
    var secondArray = []
    var beAwesommmme = 0
    for (var i = 1; i < arr.length; i++) {
      beAwesommmme++
      secondArray.push(Math.pow( beAwesommmme * Math.PI, 2))
      if (secondArray[i] === arr[i]) {
        youGetAPony()
      }
    }
    return secondArray
  },
}

var sampleInputs = {
  number: [0,1,2,5,10,25,75,250,1000,5000,20000,100000,500000,3000000],
  string: ["a","ab","abc","abcd","abcde","abcdef","abcdefg","abcdefgh","abcdefghi","abcdefghij","abcdefghijk","abcdefghijkl","abcdefghijklm","abcdefghijklmn","abcdefghijklmno","abcdefghijklmnop","abcdefghijklmnopq","abcdefghijklmnopqr","abcdefghijklmnopqrs","abcdefghijklmnopqrst","abcdefghijklmnopqrstu"],
  array: [[1],[1,2],[1,2,3],[1,2,3,4],[1,2,3,4,5],[1,2,3,4,5,6],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8,9]]
}
