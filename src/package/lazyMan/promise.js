class LazyMan {
  constructor(name) {
    this.tasks = []
    this.next = function () {
      const fn = this.tasks.shift()
      fn && fn()
    }
    this.sayHi(name)
    Promise.resolve().then(() => {
      this.next()
    })
  }

  sayHi(name) {
    this.tasks.push(() => {
      Promise.resolve().then(() => {
        console.log(name)
        this.next()
      })
    })
    return this
  }

  sleep(time) {
    this.tasks.push(() => {
      new Promise((resolve) => {
        console.log("sleep")
        setTimeout(() => {
          resolve()
        }, time * 1000)
      }).then(() => {
        console.log("Wake up")
        this.next()
      })
    })
    return this
  }

  sleepFirst(time) {
    this.tasks.unshift(() => {
      new Promise((resolve) => {
        console.log("sleep first")
        setTimeout(() => {
          resolve()
        }, time * 1000)
      }).then(() => {
        console.log("Wake up")
        this.next()
      })
    })
    return this
  }

  eat() {
    this.tasks.push(() => {
      Promise.resolve().then(() => {
        console.log("eat")
        this.next()
      })
    })
    return this
  }
}

export default function (name) {
  return new LazyMan(name)
}
