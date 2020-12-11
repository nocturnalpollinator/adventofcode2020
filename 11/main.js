const board = require('fs').readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(item => item.split(''))

const farView = (board, i, j, iInc, jInc) => (
    board[i] == undefined || board[i][j] == undefined ? '.' : 
    ('L#'.includes(board[i][j]) ? board[i][j] : farView(board, i + iInc, j + jInc, iInc, jInc))
)

const checkNear = (board, i, j, fw) => (
    [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].map(inc => (
        i + inc[0] >= 0 && j + inc[1] < board[i].length && 
        j + inc[1] >= 0 && i + inc[0] < board.length &&
        (fw ? farView(board, i + inc[0], j + inc[1], inc[0], inc[1]) == '#' : board[i + inc[0]][j + inc[1]] == '#')
    )).filter(x => x).length
)

const next = (board, i, j, tolerance, fw) => board[i][j] == '#' && checkNear(board, i, j, fw) >= tolerance ? 'L' : (board[i][j] == 'L' && checkNear(board, i, j, fw) == 0 ? '#' : board[i][j])

const nextGeneration = (board, fw = false) => {
    const nextGen = board.map((row, i) => row.map((_, j) => fw ? next(board, i, j, 5, 1) : next(board, i, j, 4)))
    return JSON.stringify(nextGen) !== JSON.stringify(board) ? nextGeneration(nextGen, fw) : board
}

console.log('Part I: ' + nextGeneration(board).map(item => item.filter(item => item == '#').join('')).join('').length)
console.log('Part II: ' + nextGeneration(board, true).map(item => item.filter(item => item == '#').join('')).join('').length)