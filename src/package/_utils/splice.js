const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
  for (let i = 0; i < deleteCount; i++) {
    let index = startIndex + i
    if (index in array) {
      let current = array[index]
      deleteArr[i] = current
    }
  }
}

const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
  // 如果添加的元素和删除的元素个数相等，相当于元素的替换，数组长度不变，被删除元素后面的元素不需要挪动
  if (deleteCount > addElements.length) {
    // 删除的元素比新增的元素多，那么后面的元素整体向前挪动
    // 一共需要挪动 len - startIndex - deleteCount 个元素
    for (let i = startIndex + deleteCount; i < len; i++) {
      let fromIndex = i
      // 将要挪动到的目标位置
      let toIndex = i - (deleteCount - addElements.length)
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex]
      } else {
        delete array[toIndex]
      }
    }
    // 注意注意！这里我们把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
    // 目前长度为 len + addElements - deleteCount
    for (let i = len - 1; i >= len + addElements.length - deleteCount; i--) {
      delete array[i]
    }
  } else if (deleteCount < addElements.length) {
    // 删除的元素比新增的元素少，那么后面的元素整体向后挪动
    for (let i = len - 1; i >= startIndex + deleteCount; i--) {
      let fromIndex = i
      // 将要挪动到的目标位置
      let toIndex = i + (addElements.length - deleteCount)
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex]
      } else {
        delete array[toIndex]
      }
    }
  }
}

const computeStartIndex = (startIndex, len) => {
  // 处理索引负数的情况
  if (startIndex < 0) {
    return startIndex + len > 0 ? startIndex + len : 0
  }
  return startIndex >= len ? len : startIndex
}

const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
  // 删除数目没有传，默认删除startIndex及后面所有的
  if (argumentsLen === 2) return len - startIndex
  // 删除数目过小
  if (deleteCount < 0) return 0
  // 删除数目过大
  if (deleteCount > len - startIndex) return len - startIndex
  return deleteCount
}

export default function splice(array, startIndex, deleteCount, ...addElements) {
  let argumentsLen = arguments.length
  let len = array.length

  startIndex = computeStartIndex(startIndex, len)
  deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen)
  let deleteArr = new Array(deleteCount)

  // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
  if (Object.isSealed(array) && deleteCount !== addElements.length) {
    throw new TypeError("the object is a sealed object!")
  } else if (
    Object.isFrozen(array) &&
    (deleteCount > 0 || addElements.length > 0)
  ) {
    throw new TypeError("the object is a frozen object!")
  }

  // 拷贝删除的元素
  sliceDeleteElements(array, startIndex, deleteCount, deleteArr)
  // 移动删除元素后面的元素
  movePostElements(array, startIndex, len, deleteCount, addElements)

  // 插入新元素
  for (let i = 0; i < addElements.length; i++) {
    array[startIndex + i] = addElements[i]
  }

  array.length = len - deleteCount + addElements.length

  return deleteArr
}
