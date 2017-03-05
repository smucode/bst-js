export const empty = () => ({
  height: 0,
})

export const singleton = head => ({
  head,
  height: 1,
  left: empty(),
  right: empty()
})

export const tree = (head, left, right) => {
  return {
    head, left, right,
    height: Math.max(left.height, right.height) + 1
  }
}

export const rotl = set => {
  return tree(
    set.right.head,
    tree(set.head, set.left, set.right.left),
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
  const setDiff = diff(set)
  if (setDiff === -2 && diff(set.left) === 1) return rotr(tree(set.head, rotl(set.left), set.right))
  if (setDiff < -1) return rotr(set)
  if (setDiff === 2 && diff(set.right) === -1) return rotl(tree(set.head, set.left, rotr(set.right)))
  if (setDiff > 1) return rotl(set)
  return set
}

export const insert = (item, set) => {
  if (!set || !set.head) {
    return singleton(item)
  }
  if (item < set.head) {
    return balance(tree(set.head, insert(item, set.left), set.right))
  }
  if (item > set.head) {
    return balance(tree(set.head, set.left, insert(item, set.right)))
  }
  return set
}
