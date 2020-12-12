import { useRef } from "react"

const usePrevious = function (state) {
  const curRef = useRef()
  const prevRef = useRef()

  prevRef.current = curRef.current
  curRef.current = state
  return prevRef.current
}

export default usePrevious
