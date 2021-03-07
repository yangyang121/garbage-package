export default function sumOfkNumber(sum, n) {
  const ans = []
  function helper(remain, path, start) {
    if (remain <= 0) {
      remain === 0 && ans.push(path.slice())
      return
    }
    for (let i = start; i <= n; i++) {
      path.push(i)
      helper(remain - i, path, i + 1)
      path.pop()
    }
  }
  helper(sum, [], 1)
  return ans
}
