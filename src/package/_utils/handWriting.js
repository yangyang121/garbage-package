export function newInstanceOf(l, r) {
  const rightPrototype = r.prototype
  let left = Object.getPrototypeOf(l)
  while (true) {
    if (left === null) return false
    if (left === rightPrototype) return true
    left = Object.getPrototypeOf(left)
  }
}

export function newCall(context, fn, ...args) {
  context = context || window
  context.fn = fn
  const res = context.fn(...args)
  delete context.fn
  return res
}

export function newApply(context, fn, args) {
  context = context || window
  context.fn = fn
  const res = context.fn(...args)
  delete context.fn
  return res
}

// Function.prototype.bind2 = function (context) {
//   if (typeof this !== "function") {
//     throw new Error(
//       "Function.prototype.bind - what is trying to be bound is not callable"
//     )
//   }

//   var self = this
//   var args = Array.prototype.slice.call(arguments, 1)
//   var bindArgs = []
//   var fNOP = function () {}

//   var fBound = function () {
//     bindArgs = Array.prototype.slice.call(arguments)
//     return self.apply(
//       this instanceof fNOP ? this : context,
//       args.concat(bindArgs)
//     )
//   }
//   fNOP.prototype = this.prototype
//   fBound.prototype = new fNOP()
//   return fBound
// }

export function newNew(Con, ...args) {
  const obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  const res = Con.apply(obj, args)
  return typeof res == "object" ? res : obj
}

export function curry(fn, args) {
  var length = fn.length
  args = args || []
  return function () {
    var _args = args.slice(0)
    for (var i = 0; i < arguments.length; i++) {
      _args.push(arguments[i])
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(this, _args)
    }
  }
}
