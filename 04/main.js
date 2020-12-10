var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

buffer = ''
required = [ 'byr:', 'ecl:', 'eyr:', 'hcl:', 'hgt:', 'iyr:', 'pid:' ]
eye = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
count = 0
count2 = 0

function validDetail(i, x) {
    switch(i) {
        case 'byr': return !isNaN(x) && x.length == 4 && x >= 1920 && x <= 2002
        case 'ecl': return x.length == 3 && eye.indexOf(x) != -1
        case 'eyr': return !isNaN(x) && x.length == 4 && x >= 2020 && x <= 2030
        case 'hcl': return x.length == 7 && x.match(/\#[a-fA-F0-9]{6}/g) != ''
        case 'hgt': return (x.substr(x.length - 2, x.length) == 'in' && x.match(/\d/g).join('') >= 59 && x.match(/\d/g).join('') <= 76) ||
                           (x.substr(x.length - 2, x.length) == 'cm' && x.match(/\d/g).join('') >= 150 && x.match(/\d/g).join('') <= 193)
        case 'iyr': return !isNaN(x) && x.length == 4 && x >= 2010 && x <= 2020
        case 'pid': return !isNaN(x) && x.length == 9
    }
}

function bufferValid(buffer) {
    return required.map(item => buffer.indexOf(item) != -1).filter(item => item).length == 7
}

function bufferExtraValid(buffer) {
    return buffer.split(' ')
                  .map(item => {
                      s = item.split(':')
                      return validDetail(s[0], s[1])
                  })
                  .filter(item => item).length == 7
}

lineReader.on('line', line => {
    if (line != '') {
        buffer += line + ' '
    } else {
        buffer = buffer.substr(0, buffer.length - 1)
        count += bufferValid(buffer)
        count2 += bufferExtraValid(buffer)
        buffer = ''
    }
}).on('close', () => {
    console.log('Part I: ' + (count + bufferValid(buffer)))
    console.log('Part II: ' + (count2 + bufferExtraValid(buffer)))
})