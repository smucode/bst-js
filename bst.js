export const empty = () => ({
})

export const singleton = head => ({
  head
})

export const insert = (item, set) => {
  if (!set || !set.head) {
    return singleton(item)
  }
  if (item < set.head) {
    return Object.assign({}, set, { left: insert(item, set.left) })
  }
  if (item > set.head) {
    return Object.assign({}, set, { right: insert(item, set.right) })
  }
  return set
}
