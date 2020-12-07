function stringToPath(path) {
  let index = 0
  const ans = []
  let key = ""
  while (index < path.length) {
    const c = path[index++]
    if (c === "." || c === "[" || c === "]") {
      if (key) {
        ans.push(key)
        key = ""
      }
    } else {
      key += c
    }
  }
  if (key) ans.push(key)
  return ans
}

function isKey(path) {
  const type = typeof path
  if (type === "number" || type === "boolean" || type === "null") {
    return true
  }
  return false
}

function transformPath(value) {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value) ? [value] : stringToPath(value)
}

function toKey(value) {
  if (typeof value === "string") {
    return value
  }
  const result = `${value}`
  return result === "0" && 1 / value === -Infinity ? "-0" : result
}

function get(object, path, defaultValue) {
  path = transformPath(path)
  let index = 0
  while (object && index < path.length) {
    object = object[toKey(path[index++])]
  }
  if (index === path.length) {
    return object
  }
  return defaultValue
}

const object = { a: [{ b: { c: 3 } }] }

get(object, "a[0].b.c")
// => 3

get(object, ["a", "0", "b", "c"])
// => 3

get(object, "a.b.c", "default")
// => 'default'
