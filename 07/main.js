function countContent(key) {
    if (!rules[key]) return 0
    c = 0
    for (k of rules[key]) {
        c += k[0] * (countContent(k[1]) + 1)
    }
    return c
}

rules = []
fs = require('fs')
fs.readFileSync('input.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter(item => item != '')
    .map(item => {
        a = item.split(' contain ')
        if (!a[1].includes('no other bags')) {
            b = a[1].split(', ')
            b = b.map(item => [parseInt(item.substr(0,1)), item.substr(2, item.length).replace('.', '')])
            b = b.map(item => [item[0], item[1].slice(-1) != 's' ? item[1] + 's' : item[1]])
            rules[a[0]] = b
        } else {
            rules[a[0]] = false
        }
    })

// TODO: Add output for Part I

console.log('Part II: ' + countContent('shiny gold bags'))

