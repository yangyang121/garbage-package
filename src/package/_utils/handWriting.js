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
//   fNOP.prototype = this.prototype

//   var fBound = function () {
//     bindArgs = Array.prototype.slice.call(arguments)
//     return self.apply(
//       this instanceof fNOP ? this : context,
//       args.concat(bindArgs)
//     )
//   }
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
  Parent.prototype.getName = function () {
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

export function curryUnsure(fn, ...presetArgs) {
  function curried(restArgs) {
    const allArgs = [...presetArgs, ...restArgs]
    return curry.call(null, fn, ...allArgs)
  }
  curried.toString = function () {
    return fn.apply(null, presetArgs)
  }
  return curried
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
  if (Number.isNaN(a) && Number.isNaN(b)) return true
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

export function mySymbol(description) {
  if (this instanceof mySymbol) throw Error("error")
  const desc = description === undefined ? "undefined" : String(description)
  const s = Object.create({
    toString() {
      return `Symbol(${this.__desc__})`
    },
  })
  Object.defineProperties(s, {
    __desc__: {
      enumerable: false,
      writabel: false,
      value: desc,
      configurable: false,
    },
  })
  return s
}

export function myReduce(arr, callback, init) {
  let prev = 0
  let i = 0
  let len = arr.length
  if (!init && len === 0) throw new Error("error")
  if (!init && len === 1) return arr[0]
  if (!init) {
    prev = arr[0]
    i = 1
  }
  if (init && len === 0) return init
  while (i < len) {
    prev = callback(prev, arr[i], i, arr)
  }
  return prev
}

export function co(gen) {
  const ctx = this
  const args = Array.prototype.slice.call(arguments, 1)
  return new Promise(function (resolve, reject) {
    gen = gen.apply(ctx, args)

    function onFulfilled(res) {
      const result = gen.next(res)
      next(result)
    }

    function next(result) {
      if (result.done) return resolve(result.value)
      const value = result.value
      value.then(onFulfilled)
    }

    onFulfilled()
  })
}

export function realTimer(fn, wait) {
  let smallWait = wait / 10
  let start = Date.now()
  let counter = 1
  function helper() {
    if (counter === 10) {
      fn()
      console.log(Date.now() - start)
      return
    }
    const time = counter * smallWait
    const realTime = Date.now() - start
    const diff = realTime - time
    counter++
    setTimeout(function () {
      helper()
    }, smallWait - diff)
  }
  setTimeout(function () {
    helper()
  }, smallWait)
}

export function drag(node) {
  let dragging = false
  let position = null

  node.addEventListener("mousedown", function (e) {
    dragging = true
    position = [e.clientX, e.clientY]
  })

  document.addEventListener("mousemove", function (e) {
    if (dragging === false) return null
    const x = e.clientX
    const y = e.clientY
    const deltaX = x - position[0]
    const deltaY = y - position[1]
    const left = parseInt(node.style.left || 0)
    const top = parseInt(node.style.top || 0)
    node.style.left = left + deltaX + "px"
    node.style.top = top + deltaY + "px"
    position = [x, y]
  })
  document.addEventListener("mouseup", function (e) {
    dragging = false
  })
}

export function multiRequest(urls = [], maxNum) {
  const len = urls.length
  const result = new Array(len).fill(false)
  let count = 0

  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next()
    }
    function next() {
      let current = count++
      if (current >= len) {
        !result.includes(false) && resolve(result)
        return
      }
      const url = urls[current]
      fetch(url)
        .then((res) => {
          result[current] = res
          if (current < len) {
            next()
          }
        })
        .catch((err) => {
          result[current] = err
          if (current < len) {
            next()
          }
        })
    }
  })
}

export function expand(obj) {
  const ans = {}
  function helper(data, path) {
    if (typeof data === "object" && data !== null) {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          helper(data[i], `${path}[${i}]`)
        }
      } else {
        for (let key in data) {
          helper(data[key], `${path ? path + "." : path}${key}`)
        }
      }
    } else {
      ans[path] = data
    }
  }
  helper(obj, "")
  return ans
}

export class EventEmitter {
  constructor() {
    this.list = {}
  }

  on(event, fn) {
    if (!this.list[event]) this.list[event] = []
    this.list[event].push(fn)
  }

  emit(event, ...args) {
    const fns = this.list[event]
    const ctx = this
    if (!fns) return false
    fns.forEach((fn) => {
      fn.apply(ctx, args)
    })
    return ctx
  }

  off(event, fn) {
    const fns = this.list[event]
    let cb = null
    if (!fns) return false
    if (!fn) {
      this.list[event] = []
    } else {
      for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
        cb = fns[i]
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1)
          break
        }
      }
    }
    return this
  }

  once(event, fn) {
    const ctx = this
    function on() {
      ctx.off(event, on)
      fn.apply(ctx, arguments)
    }
    on.fn = fn
    this.on(event, on)
    return ctx
  }
}

export function isInViewport(dom) {
  let viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight
  let viewPortWidth = window.innerWidth || document.documentElement.clientWidth
  let { top, left, right, bottom } = dom.getBoundingClientRect()

  return (
    top >= 0 && left >= 0 && bottom <= viewPortHeight && right <= viewPortWidth
  )
}

export function postorderTraversal(root) {
  if (root === null) return []
  const ans = []
  const stack = []
  let prev = null
  while (root !== null || stack.length) {
    while (root !== null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (root.right === null || root.right === prev) {
      ans.push(root.val)
      prev = root
      root = null
    } else {
      stack.push(root.right)
      root = root.right
    }
  }
  return ans
}
