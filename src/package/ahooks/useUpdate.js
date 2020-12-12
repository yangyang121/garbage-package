import { useState, useCallback } from "react"

const useUpdate = function () {
  const [, setState] = useState({})
  return useCallback(() => setState({}), [])
}

export default useUpdate
