import isObject from "./isObject"

function defaultDeep(object, other) {
  if (!isObject(object) || !isObject(other)) {
    return object === undefined ? other : object
  }
  return Object.keys({
    ...object,
    ...other,
  }).reduce(
    (prev, key) => {
      prev[key] = defaultDeep(object[key], other[key])
      return prev
    },
    Array.isArray(object) ? [] : {}
  )
}

// const object = {
//   a: [{ b: 2 }, { d: 4 }],
// }
// const other = {
//   a: [{ c: 3 }, { e: 5, d: 7 }],
// }
// defaultDeep(object, other)

export default defaultDeep
