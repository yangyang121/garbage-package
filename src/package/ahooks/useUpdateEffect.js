import { useEffect, useRef } from "react"

const useUpdateEffect = function (effect, deps) {
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      effect()
    } else {
      isMounted.current = true
    }
  }, deps)
}

export default useUpdateEffect
