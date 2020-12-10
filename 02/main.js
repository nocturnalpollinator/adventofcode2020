var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

var setup = []
lineReader.on('line', line => {
    setup.push(line.replace(/:|-/g, ' ')
                   .split(/\s+/)
                   .map(item => isNaN(item) ? item : parseInt(item)))
}).on('close', () => {
    console.log('Part I: ' +
        setup.filter(item => {
            match = item[3].match((new RegExp(item[2], 'g')))
            return match !== null && match.length >= item[0] && match.length <= item[1]
        }).length
    )

    console.log('Part II: ' +
        setup.filter(item => item[3].charAt(item[0] - 1) == item[2] ^ item[3].charAt(item[1] - 1) == item[2]).length
    )
})