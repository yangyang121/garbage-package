function curry(func) {
  const curried = function (...args1) {
    if (args1.length < func.length) {
      return function (...args2) {
        return curried(...args1, ...args2)
      }
    }
    return func.apply(this, args1)
  }
  return curried
}

// const abc = function (a, b, c) {
//   console.log(a, b, c)
//   return [a, b, c]
// }
// const curried = curry(abc)
// curried(1)(2)(3)
// // => [1, 2, 3]
// curried(1, 2)(3)
// // => [1, 2, 3]
// curried(1, 2, 3)

export default curry
