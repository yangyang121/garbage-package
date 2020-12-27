class LazyMan {
  constructor(name) {
    this.tasks = []
    this.next = function () {
      const fn = this.tasks.shift()
      fn && fn()
    }
    this.sayHi(name)
    setTimeout(() => {
      this.next()
    })
  }

  sayHi(name) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(name)
        this.next()
      })
    })
    return this
  }

  sleep(time) {
    this.tasks.push(() => {
      console.log("sleep")
      setTimeout(() => {
        console.log("Wake up")
        this.next()
      }, time * 1000)
    })
    return this
  }

  sleepFirst(time) {
    this.tasks.unshift(() => {
      console.log("sleep first")
      setTimeout(() => {
        console.log("Wake up")
        this.next()
      }, time * 1000)
    })
    return this
  }

  eat() {
    this.tasks.push(() => {
      setTimeout(() => {
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
