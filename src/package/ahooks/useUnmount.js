import { useEffect } from "react"

const useUnmount = function (fn) {
  useEffect(() => {
    return () => fn()
  }, [])
}

export default useUnmount
