import { useEffect } from "react"

const useMount = function (fn) {
  useEffect(() => {
    fn()
  }, [])
}

export default useMount
