var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

function traverse(min, max, f) {
    x = f.shift()
    return !f.length ? ('FL'.includes(x) ? min : max) : ('FL'.includes(x) ? traverse(min, Math.floor(max - ((max - min) / 2)), f) : traverse(Math.ceil(max - ((max - min) / 2)), max, f))
}

ids = []
lineReader.on('line', line => {
    ids.push((traverse(0, 127, line.substr(0, 7).split('')) * 8) + traverse(0, 7, line.substr(7, 3).split('')))
}).on('close', () => {
    console.log('Part I: ' + ids.sort((a, b) => a - b)[ids.length - 1])
    console.log('Part II: ' + (ids.filter(item => (ids.indexOf(item+1) == -1 && ids.indexOf(item+2) != -1)).pop() + 1))
})