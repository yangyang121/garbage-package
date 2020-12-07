const mapTag = "[object Map]"
const setTag = "[object Set]"
const arrayTag = "[object Array]"
const objectTag = "[object Object]"
const argsTag = "[object Arguments]"

const boolTag = "[object Boolean]"
const dateTag = "[object Date]"
const numberTag = "[object Number]"
const stringTag = "[object String]"
const symbolTag = "[object Symbol]"
const errorTag = "[object Error]"
const regexpTag = "[object RegExp]"
const funcTag = "[object Function]"

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

function isObject(target) {
  const type = typeof target
  return target !== null && (type === "object" || type === "function")
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg(targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(",")
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    case funcTag:
      return cloneFunction(targe)
    default:
      return null
  }
}

function getSymbols(object) {
  const propertyIsEnumerable = Object.prototype.propertyIsEnumerable
  const nativeGetSymbols = Object.getOwnPropertySymbols
  if (object == null) {
    return []
  }
  object = Object(object)
  return nativeGetSymbols(object).filter((symbol) =>
    propertyIsEnumerable.call(object, symbol)
  )
}

function cloneDeep(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(cloneDeep(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, cloneDeep(value, map))
    })
    return cloneTarget
  }

  // 克隆数组和对象（包括 key 为 symbol 时的处理）
  const keys =
    type === arrayTag
      ? undefined
      : Object.keys(target).concat(...getSymbols(target))
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = cloneDeep(target[key], map)
  })

  return cloneTarget
}

export default cloneDeep
