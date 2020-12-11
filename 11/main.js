board = require('fs').readFileSync('input.txt', { encoding: 'utf-8' })
        .split('\n')
        .map(item => item.split(''))

const checkNear = (board, i, j, fw) => (
    [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].map(item => (
        i + item[0] >= 0 && j + item[1] < board[i].length && 
        j + item[1] >= 0 && i + item[0] < board.length &&
        (fw ? farView(board, i + item[0], j + item[1], item[0], item[1])  == '#' : board[i + item[0]][j + item[1]] == '#')
    )).filter(x => x).length
)

const farView = (board, i, j, iChange, jChange) => (
    board[i] == undefined || board[i][j] == undefined ? '.' : (
    board[i][j] == 'L' || board[i][j] == '#' ? board[i][j] :
    farView(board, i + iChange, j + jChange, iChange, jChange))
)

const next = (board, i, j, t, fw) => (
    board[i][j] == '#' && checkNear(board, i, j, fw) >= t ? 'L' : (board[i][j] == 'L' && checkNear(board, i, j, fw) == 0 ? '#' : board[i][j])
)

function nextGeneration(board, fw = false) {
    nextGen = board.map((item, i) => item.map((val, j) => fw ? next(board, i, j, 5, 1) : next(board, i, j, 4)))
    return JSON.stringify(nextGen) !== JSON.stringify(board) ? nextGeneration(nextGen, fw) : board
}

console.log(nextGeneration(board).map(item => item.filter(item => item == '#').join('')).join('').length)
console.log(nextGeneration(board, true).map(item => item.filter(item => item == '#').join('')).join('').length)