function after(n, func) {
  n = n || 0
  return function (...args) {
    if (--n >= 1) {
      func.apply(this, args)
    }
  }
}

// const saves = ["profile", "settings"]
// const done = after(saves.length, function () {
//   console.log("done saving!")
// })
// ;[1, 2, 3, 4, 5].forEach((n) => {
//   console.log(n)
//   done()
// })

export default after
