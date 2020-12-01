const PENDING = "PENDING"
const FULFILED = "FULFILED"
const REJECTED = "REJECTED"
class MyPromise {
  constructor(executor) {
    const self = this
    self.status = PENDING
    self.value = null
    self.reason = null
    self.onFulfiled = []
    self.onRejected = []
    function resolve(value) {
      self.value = value
      self.status = FULFILED
      self.onFulfiled.forEach((f) => f())
    }

    function reject(value) {
      self.reason = value
      self.status = REJECTED
      self.onRejected.forEach((f) => f())
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfiled, onRejected) {
    onFulfiled =
      typeof onFulfiled === "function" ? onFulfiled : (value) => value
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason
          }

    const self = this
    const promise2 = new MyPromise((resolve, reject) => {
      if (self.status === FULFILED) {
        setTimeout(() => {
          try {
            const x = onFulfiled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (self.status === PENDING) {
        self.onFulfiled.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfiled(self.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        self.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(self.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }

  static resolve(param) {
    if (param instanceof MyPromise) return param
    return new MyPromise((resolve, reject) => {
      if (param && typeof param.then === "function") {
        setTimeout(() => {
          param.then(resolve, reject)
        })
      } else {
        resolve(param)
      }
    })
  }

  static reject(param) {
    return new MyPromise((resolve, reject) => {
      reject(param)
    })
  }

  static catch(onRejected) {
    return this.then(null, onRejected)
  }

  static finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value)
      },
      (err) => {
        return MyPromise.resolve(callback()).then(() => {
          throw err
        })
      }
    )
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let index = 0
      const ans = new Array(promises.length)
      if (promises.length === 0) {
        resolve(ans)
      } else {
        function processValue(i, data) {
          ans[i] = data
          if (++index === promises.length) {
            resolve(ans)
          }
        }
        for (let i = 0; i < promises.length; i++) {
          MyPromise.resolve(promises[i]).then(
            (data) => processValue(i, data),
            (err) => {
              reject(err)
              return
            }
          )
        }
      }
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        return
      } else {
        for (let i = 0; i < promises.length; i++) {
          MyPromise.resolve(promises[i]).then(
            (data) => {
              resolve(data)
              return
            },
            (err) => {
              reject(err)
              return
            }
          )
        }
      }
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) reject(new TypeError("Chaining cycle"))
  if (x && (typeof x === "object" || typeof x === "function")) {
    let used = false
    try {
      const then = x.then
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (used) return
            used = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (used) return
            used = true
            reject(r)
          }
        )
      } else {
        if (used) return
        used = true
        resolve(x)
      }
    } catch (e) {
      if (used) return
      used = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

export default MyPromise
