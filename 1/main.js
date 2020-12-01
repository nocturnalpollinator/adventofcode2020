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
    console.log('Part I: ' + part1)

    // Part II
    var part2 = 0;
    numbers.filter(n => {
            rest = 2020 - n
            foo = numbers.filter(n => numbers.indexOf(rest - n) > 0)
            if (foo.length == 2) {
                part2 = n * foo.reduce((a, b) => a * b)
            }
        })
    console.log('Part II: ' + part2)
})
