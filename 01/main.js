fs = require('fs')
fs.readFile('input.txt', 'utf8', function(error, data) { 
    if (error) return console.log(error)
    
    var numbers = data.split('\n')
                      .map(n => parseInt(n))
                      .filter(n => !isNaN(n))
                      .sort((a, b) => a - b) 

    // Part I
    var part1 = numbers.filter(n => numbers.indexOf(2020 - n) > 0)
                       .reduce((a, b) => a * b)

    // Part II
    var part2 = numbers.filter(n => {
                            foo = numbers.filter(m => numbers.indexOf(2020 - n - m) > 0)
                            return foo.length == 2 ? foo.push(n) : null
                        }).reduce((a, b) => a * b)

    console.log('Part I: ' + part1)
    console.log('Part II: ' + part2)
})
