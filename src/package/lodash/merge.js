function isObject(target) {
  const type = typeof target
  return target !== null && (type === "object" || type === "function")
}

function merge(object, other) {
  if (!isObject(object) || !isObject(other)) {
    return other === undefined ? object : other
  }

  return Object.keys({
    ...object,
    ...other,
  }).reduce(
    (prev, key) => {
      prev[key] = merge(object[key], other[key])
      return prev
    },
    Array.isArray(object) ? [] : {}
  )
}

// const object = {
//   a: [{ b: 2 }, { d: 4 }],
// }
// const other = {
//   a: [{ c: 3 }, { e: 5 }],
// }
// merge(object, other)

export default merge
