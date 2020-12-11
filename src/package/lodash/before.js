function before(n, func) {
  n = n || 0
  let result
  return function (...args) {
    if (--n > 0) {
      result = func.apply(this, args)
    }
    if (n <= 1) {
      func = undefined
    }
    return result
  }
}

// const saves = ["profile", "settings"]
// const done = before(saves.length, function () {
//   console.log("done saving!")
//   return 123
// })
// ;[1, 2, 3, 4, 5].forEach(() => {
//   console.log(done())
// })

export default before
