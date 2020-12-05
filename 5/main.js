var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

function traverse(min, max, f) {
    if (f.length == 1) {
        return f == 'F' || f == 'L' ? min : max
    } else {
        x = f.shift()
        return x == 'F' || x == 'L' ? 
               traverse(min, Math.floor(max - ((max - min) / 2)), f) : 
               traverse(Math.ceil(max - ((max - min) / 2)), max, f)
    }
}

highest = 0;
ids = []
lineReader.on('line', line => {
    id = (traverse(0, 127, line.substr(0, 7).split('')) * 8) + traverse(0, 7, line.substr(7, 3).split(''))
    highest = id > highest ? id : highest 
    ids.push(id)
}).on('close', () => {
    console.log('Part I: ' + highest)
    console.log('Part II: ' + (ids.filter(item => (ids.indexOf(item+1) == -1 && ids.indexOf(item+2) != -1)).pop() + 1))
                // console.log('Part II: ' + item)
        // })
})