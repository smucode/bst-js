const EMPTY = { height: 0 }

export const empty = () => EMPTY

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
  if (set === EMPTY) {
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

export const member = (item, set) => {
  if (set === EMPTY) return false
  if (item > set.head) return member(item, set.right)
  if (item < set.head) return member(item, set.left)
  return true
}

export const size = set => {
  if (set === EMPTY) return 0
  return 1 + size(set.left) + size(set.right)
}

export const fromList = list => {
  if (!list.length) return EMPTY
  const head = list[0]
  const tail = list.slice(1)
  return insert(head, fromList(tail))
}

export const foldl = (fn, acc, set) => {
  if (set === EMPTY) return acc
  const accL = foldl(fn, acc, set.left)
  const accH = fn(accL, set.head)
  return foldl(fn, accH, set.right)
}

export const foldr = (fn, acc, set) => {
  if (set === EMPTY) return acc
  const accR = foldr(fn, acc, set.right)
  const accH = fn(accR, set.head)
  return foldr(fn, accH, set.left)
}
