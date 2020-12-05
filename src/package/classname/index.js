export default function classNames() {
  const ans = []
  for (let i = 0; i < arguments.length; i++) {
    const item = arguments[i]
    if (item) {
      if (typeof item === "string" || typeof item === "number") {
        ans.push(item)
      } else if (Array.isArray(item) && item.length) {
        const inner = classNames.apply(null, item)
        if (inner) {
          ans.push(inner)
        }
      } else if (typeof item === "object") {
        for (let key in item) {
          if (item[key]) {
            ans.push(key)
          }
        }
      }
    }
  }
  return ans.join(" ")
}
