import { useLayoutEffect, useRef } from "react"

const useUpdateLayoutEffect = function (effect, deps) {
  const isMounted = useRef(false)
  useLayoutEffect(() => {
    if (isMounted.current) {
      effect()
    } else {
      isMounted.current = true
    }
  }, deps)
}

export default useUpdateLayoutEffect
