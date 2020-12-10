nums = require('fs').readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(item => parseInt(item)).sort((a, b) => a - b)
ones = threes = 0
nums = [0, ...nums, nums[nums.length - 1] + 3]

for (i = 0; i < nums.length; i++) {
    threes += (nums[i+1] - nums[i] == 3)
    ones += (nums[i+1] - nums[i] == 1)
}

arr = new Array(nums.length - 1).fill(0)
arr[0] = [1]
for (i = 1; i < nums.length - 1; i++) {
    for (j = 0; j < i; j++) {
        arr[i] += nums[i] - nums[j] <= 3 ? parseInt(arr[j]) : 0
    }
}

console.log('Part I: ' + (ones * threes))
console.log('Part II: ' + arr[arr.length - 1])