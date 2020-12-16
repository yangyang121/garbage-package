import { useMemo, useState } from "react"

export default function useCounter(initialValue = 0, options = {}) {
  const { min, max } = options

  const init = useMemo(() => {
    let ans = initialValue
    if (typeof max === "number") {
      ans = Math.min(ans, max)
    }
    if (typeof min === "number") {
      ans = Math.max(ans, min)
    }
    return ans
  }, [initialValue, max, min])

  const [current, setCurrent] = useState(init)

  const actions = useMemo(() => {
    const setValue = (value) => {
      setCurrent((c) => {
        let target = typeof value === "number" ? value : value(c)
        if (typeof max === "number") {
          target = Math.min(max, target)
        }
        if (typeof min === "number") {
          target = Math.max(min, target)
        }
        return target
      })
    }
    const inc = (delta = 1) => {
      setValue((c) => c + delta)
    }
    const dec = (delta = 1) => {
      setValue((c) => c - delta)
    }
    const set = (value) => {
      setValue(value)
    }
    const reset = () => {
      setValue(init)
    }
    return { inc, dec, set, reset }
  }, [init, max, min])

  return [current, actions]
}
