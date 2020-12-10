const run = (i, ops, acc, history) => i == ops.length ? [true, acc] : (history.indexOf(i) !== -1 ? [false, acc] : (run(i + (ops[i][0].includes('jmp') ? parseInt(ops[i][1]) : 1), ops, acc + (ops[i][0] == 'acc' ? parseInt(ops[i][1]) : 0), [...history, i])))

const debug = (i) => {
    const tmp = JSON.parse(JSON.stringify(ops)); 
    tmp[i][0] = ops[i][0] == 'jmp' ? 'nop' : (ops[i][0] == 'jmp' ? 'nop' : tmp[i][0])
    const r = run(0, tmp, 0, [])
    return r[0] ? r[1] : debug(i + 1)
}

const ops = require('fs').readFileSync('input.txt', { encoding: 'utf-8' })
                         .split('\n')
                         .map(item => item.split(' '))

console.log('Part I: ' + run(0, ops, 0, [])[1])
console.log('Part II: ' + debug(0))