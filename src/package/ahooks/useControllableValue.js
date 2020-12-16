import { useCallback, useState } from "react"
import useUpdateEffect from "./useUpdateEffect"

export default function useControllableValue(props = {}, options = {}) {
  const {
    defaultValue,
    defaultValuePropName = "defaultValue",
    valuePropName = "value",
    trigger = "onChange",
  } = options

  const value = props[valuePropName]

  const [state, setState] = useState(() => {
    if (valuePropName in props) {
      return value
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName]
    }
    return defaultValue
  })

  useUpdateEffect(() => {
    if (valuePropName in props) {
      setState(value)
    }
  }, [value, valuePropName])

  const handleSetState = useCallback((v) => {
    if (!(valuePropName in props)) {
      setState(v)
    }
    if (trigger in props) {
      props[trigger](v)
    }
  }, [props, trigger, valuePropName])

  return [state, handleSetState]
}
