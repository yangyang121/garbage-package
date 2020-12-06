function createEvents() {
  let handlers = []
  return {
    push(fn) {
      handlers.push(fn)
      return () => {
        handlers = handlers.filter((f) => f !== fn)
      }
    },
    call(args) {
      handlers.forEach((fn) => fn(args))
    },
  }
}

export function createBrowserHistory() {
  const listeners = createEvents()
  let location = {
    pathname: "/",
  }

  const handlePop = function () {
    const currentLocation = {
      pathname: window.location.pathname,
    }
    listeners.call(currentLocation)
  }

  window.addEventListener("popstate", handlePop)

  const history = {
    listen(listener) {
      return listeners.push(listener)
    },
    push(url) {
      const history = window.history
      // 这里pushState并不会触发popstate
      // 但是我们仍然要这样做，是为了保持state栈的一致性
      history.pushState(null, "", url)
      // 由于push并不触发popstate，我们需要手动调用回调函数
      location = { pathname: url }
      listeners.call(location)
      console.log(location)
    },
    get location() {
      return location
    },
  }

  return history
}
