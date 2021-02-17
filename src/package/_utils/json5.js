export const parse = (jsonStr) => {
  let i = 0
  function parseObject() {
    i++
    const ans = {}
    while (jsonStr[i] !== "}") {
      const key = parseString()
      i++
      const value = parseValue()
      ans[key] = value
      if (jsonStr[i] === ",") i++
    }
    i++
    return ans
  }
  function parseArray() {
    const ans = []
    i++
    while (jsonStr[i] !== "]") {
      ans.push(parseValue())
      if (jsonStr[i] === ",") i++
    }
    i++
    return ans
  }
  function parseFalse() {
    const ans = jsonStr.substring(i, i + 5)
    console.log(ans)
    if (ans === "false") {
      i += 5
      return false
    } else {
      throw new Error("不是false")
    }
  }
  function parseTrue() {
    const ans = jsonStr.substring(i, i + 4)
    if (ans === "true") {
      i += 4
      return true
    } else {
      throw new Error("不是true")
    }
  }
  function parseNull() {
    const ans = jsonStr.substring(i, i + 4)
    if (ans === "null") {
      i += 4
      return null
    } else {
      throw new Error("不是null")
    }
  }
  function parseString() {
    i++
    let ans = ""
    while (jsonStr[i] !== '"') {
      ans += jsonStr[i++]
    }
    i++
    return ans
  }
  function parseNumber() {
    let ans = ""
    while (isNumber(jsonStr[i])) {
      ans += jsonStr[i++]
    }
    return parseFloat(ans)
  }
  function isNumber(c) {
    const chars = {
      "-": true,
      "+": true,
      e: true,
      E: true,
      ".": true,
    }
    if (chars[c]) {
      return true
    }
    if (c >= "0" && c <= "9") {
      return true
    }
    return false
  }
  function parseValue() {
    if (jsonStr[i] === "{") {
      return parseObject()
    } else if (jsonStr[i] === "[") {
      return parseArray()
    } else if (jsonStr[i] === "f") {
      return parseFalse()
    } else if (jsonStr[i] === "t") {
      return parseTrue()
    } else if (jsonStr[i] === "n") {
      return parseNull()
    } else if (jsonStr[i] === '"') {
      return parseString()
    } else {
      return parseNumber()
    }
  }

  return parseValue()
}

export const stringify = (obj) => {
  function stringifyValue(value) {
    if (typeof value !== "object" || value === null) {
      return stringifyNormal(value)
    }
    console.log(value)
    let ans = ""
    if (Array.isArray(value)) {
      ans += "["
      for (let i = 0; i < value.length; i++) {
        ans += stringifyValue(value[i])
        if (i !== value.length - 1) ans += ","
      }
      ans += "]"
    } else {
      ans += "{"
      for (let k in value) {
        const key = stringifyNormal(k)
        const v = value[k]
        if (v !== undefined) {
          const value = stringifyValue(v)
          ans += `${key}:${value},`
        }
      }
      ans = ans.substring(0, ans.length - 1)
      ans += "}"
    }
    return ans
  }
  function stringifyNormal(obj) {
    if (typeof obj === "string") {
      return '"' + obj + '"'
    }
    return "" + obj
  }

  return stringifyValue(obj)
}
