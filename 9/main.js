function countPreamble(n, i, pre) {
    pool = n.slice(0 + i, pre + i)
    for (p in pool) {
        inc = pool.indexOf((n[pre + i] - pool[p]))
        if (inc !== -1 && inc !== p) {
            return countPreamble(n, i + 1, pre)
        } 
    }
    return n[pre+i]
}

function sum(n, i, search) {
    if (i == n.length - 1) return -1
    s = 0
    tmp = []
    for (x = i; x >= 0; --x) {
        s += n[x]
        if (s > search) break
        tmp.push(n[x])
        if (s == search) {
            return tmp.sort((a, b) => a - b)
                       .filter(item => tmp.indexOf(item) == 0 || tmp.indexOf(item) == tmp.length - 1)
                       .reduce((a, b) => a + b)
        }
    }
    return sum(n, i+1, search)
}

const nums = require('fs').readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(item => parseInt(item)) 
console.log('Part I: ' + countPreamble(nums, 0, 25));
console.log('Part II: ' + sum(nums, 1, countPreamble(nums, 0, 25)));