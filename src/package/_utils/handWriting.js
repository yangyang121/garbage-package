export function newInstanceOf(l, r) {
  if (l === null || typeof l !== "object") return false
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

export function objectCreate(proto) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object: " + proto)
  } else if (proto === null) {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
    )
  }
  //实现一个隐藏函数
  function F() {}
  //函数的原型设置为参数传进来的原型
  F.prototype = proto
  // 返回一个F函数的实例，即此实例的__proto__指向为参数proto
  return new F()
}

export function myExtends() {
  function Parent(name) {
    this.name = name
  }
  Parent.prototype.getNAme = function () {
    return this.name
  }
  function Child(name, age) {
    Parent.call(this, name)
    this.age = age
  }
  function F() {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
}

export function curry(fn, ...args) {
  var length = fn.length
  args = args || []
  return function () {
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    if (args.length < length) {
      return curry.call(this, fn, args)
    } else {
      return fn.apply(this, args)
    }
  }
}

export function debounce(fn, wait, immediate) {
  let timer = null
  let result = null
  function debounced(...args) {
    const context = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) result = fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        result = fn.apply(context, wait)
      }, wait)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

export function throttle(fn, wait, options = {}) {
  let timer = null
  let previous = 0
  function throttled(...args) {
    let now = Date.now()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      previous = Date.now()
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now()
        fn.apply(this, args)
        timer = null
      }, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timer)
    previous = 0
    timer = null
  }

  return throttled
}

export function transformToTree(data) {
  const ans = []
  const m = new Map()
  for (let c of data) {
    m.set(c.id, c)
  }
  for (let c of data) {
    if (c.pId) {
      const parent = m.get(c.pId)
      delete c.pId
      if (!Array.isArray(parent.children)) parent.children = []
      parent.children.push(c)
    } else {
      ans.push(c)
    }
  }
  return ans
}

export function transformToFlat(data) {
  const queue = Array.isArray(data) ? data : [data]
  const ans = []
  while (queue.length) {
    const item = queue.shift()
    const pId = item.id
    const children = item.children || []
    delete item.children
    console.log(item)
    ans.push(item)
    for (let c of children) {
      c.pId = pId
      queue.push(c)
    }
  }
  return ans
}

export function isEqual(a, b, map = new WeakMap()) {
  if (a === b) return true
  if (map.has(a) || map.has(b)) return true
  map.set(a, b)
  if (typeof a === "object" && typeof b === "object") {
    const a_keys = Object.keys(a)
    const b_keys = Object.keys(b)
    if (a_keys.length !== b_keys.length) return false
    for (let i = 0; i < a_keys.length; i++) {
      if (!isEqual(a[a_keys[i]], b[b_keys[i]], map)) return false
    }
    return true
  }
  return false
}
