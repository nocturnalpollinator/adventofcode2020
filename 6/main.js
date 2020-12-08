fs = require('fs')
groups = fs.readFileSync('input.txt', { encoding: 'utf-8' })
           .split('\n\n')

count1 = 0;
count2 = 0;

groups.map(item => {
    uniques = new Set([...item.replace(/\n/g, '')]);
    count1 += uniques.size;
    count2 += [...uniques].filter(x => 
            item.split('\n')
                .filter(x => x)
                .every(ans => ans.includes(x))
            ).length
})

console.log('Part I: ' + count1);
console.log('Part II: ' + count2);