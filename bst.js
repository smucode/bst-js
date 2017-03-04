export const empty = () => ({
  height: 0,
})

export const singleton = head => ({
  head,
  height: 1,
  left: empty(),
  right: empty()
})

const tree = (head, left, right) => {
  return {
    head, left, right,
    height: Math.max(left.height, right.height) + 1
  }
}

export const insert = (item, set) => {
  if (!set || !set.head) {
    return singleton(item)
  }
  if (item < set.head) {
    return tree(set.head, insert(item, set.left), set.right)
  }
  if (item > set.head) {
    return tree(set.head, set.left, insert(item, set.right))
  }
  return set
}

export const rotl = set => {
  return tree(
    set.right.head,
    tree(set.head, set.right, set.right.left),
    set.right.right
  )
}

export const rotr = set => {
  return tree(
    set.left.head,
    set.left.left,
    tree(set.head, set.left.right, set.right)
  )
}

export const diff = set => set.right.height - set.left.height

export const balance = set => {
  const d = diff(set)
  if (d > 1) return rotl(set)
  if (d < -1) return rotr(set)
  return set
}
