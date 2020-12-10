var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

x1 = x2 = x3 = x4 = 0
oddLine = true
count = [0,0,0,0,0]

lineReader.on('line', line => {
    len = line.length
    count = [
        count[0] + (line.charAt(Math.ceil(x1/2) % len) == '#' && oddLine),
        count[1] + (line.charAt((x1++) % len) == '#'),
        count[2] + (line.charAt(((x2 += 3) - 3) % len) == '#'),
        count[3] + (line.charAt(((x3 += 5) - 5) % len) == '#'),
        count[4] + (line.charAt(((x4 += 7) - 7) % len) == '#')
    ]
    oddLine = !oddLine
}).on('close', () => {
    console.log('Part I: ' + count[2])
    console.log('Part II: ' + count.reduce((a, b) => a * b))
})