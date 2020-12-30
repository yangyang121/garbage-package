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
  function getState() {
    return window.history.state || {}
  }
  function getLoacation() {
    const { state } = getState()
    const { pathname, search } = window.location
    return {
      state,
      pathname,
      search,
    }
  }
  let location = getLoacation()

  const handlePop = function () {
    const currentLocation = getLoacation()
    listeners.call(currentLocation)
  }

  window.addEventListener("popstate", handlePop)

  const history = {
    listen(listener) {
      return listeners.push(listener)
    },
    push(path) {
      if (typeof path === "string") {
        // Two-arg form: push(path, state)
        location.pathname = path
        location.state = ""
        location.search = undefined
      } else {
        // One-arg form: push(location)
        location = { ...path }

        if (location.pathname === undefined) location.pathname = ""

        if (location.search) {
          if (location.search.charAt(0) !== "?")
            location.search = "?" + location.search
        } else {
          location.search = ""
        }
      }

      if (!location.pathname) {
        location.pathname = "/"
      }

      // 这里pushState并不会触发popstate
      // 但是我们仍然要这样做，是为了保持state栈的一致性
      window.history.pushState(
        location.state,
        "",
        location.pathname + (location.search || "")
      )
      // 由于push并不触发popstate，我们需要手动调用回调函数
      listeners.call(location)
    },
    get location() {
      return location
    },
  }

  return history
}
