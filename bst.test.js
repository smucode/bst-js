import { empty, singleton, insert, rotl, rotr, diff, balance, tree } from './bst'

describe('bst', () => {

  it('should be able to create an empty set', () => {
    const set = empty()
    expect(set).toBeDefined()
  })

  it('should be able to create set with single value', () => {
    const set = singleton(1)
    expect(set.head).toBe(1)
  })

  it('should be able to create empty set and insert a single value', () => {
    expect(insert(1, empty()).head).toBe(1)
  })

  it('create set with left and right values', () => {
    const s1 = insert(2, empty())
    const s2 = insert(1, s1)
    const s3 = insert(3, s2)

    expect(s3.head).toBe(2)
    expect(s3.left.head).toBe(1)
    expect(s3.right.head).toBe(3)
  })

  it('insert should self balance', () => {
    const set = insert(1, insert(2, singleton(3)))
    expect(set.head).toBe(2)
    expect(set.left.head).toBe(1)
    expect(set.right.head).toBe(3)
  })

  it('should calculate the height', () => {
    expect(empty().height).toBe(0)
    expect(singleton(1).height).toBe(1)
    expect(insert(2, singleton(1)).height).toBe(2)
  })

  it('should rotate left', () => {
    const set = tree(1,
      empty(),
      tree(2,
        empty(),
        singleton(3)))
    const rot = rotl(set)
    expect(rot.head).toBe(2)
    expect(rot.left.head).toBe(1)
    expect(rot.left.left.height).toBe(0)
    expect(rot.left.right.height).toBe(0)
    expect(rot.right.head).toBe(3)
    expect(rot.right.left.height).toBe(0)
    expect(rot.right.right.height).toBe(0)
  })

  it('should rotate right', () => {
    const set = tree(3, tree(2, singleton(1), empty()), empty())
    const rot = rotr(set)
    expect(rot.head).toBe(2)
    expect(rot.left.head).toBe(1)
    expect(rot.left.left.height).toBe(0)
    expect(rot.left.right.height).toBe(0)
    expect(rot.right.head).toBe(3)
    expect(rot.right.left.height).toBe(0)
    expect(rot.right.right.height).toBe(0)
  })

  it('should calculate the diff of a left leaning tree', () => {
    const set = tree(3, tree(2, singleton(1), empty()), empty())
    expect(diff(set)).toBe(-2)
  })

  it('should calculate the diff of a right leaning tree', () => {
    const set = tree(1, empty(), tree(2, empty(), singleton(3)))
    expect(diff(set)).toBe(2)
  })

  it('should calculate the diff of a right/left leaning tree', () => {
    const set = tree(1, empty(), tree(3, singleton(2), empty()))
    expect(diff(set)).toBe(2)
  })

  it('should calculate the diff of a left/right leaning tree', () => {
    const set = tree(3, tree(1, empty(), singleton(2)), empty())
    expect(diff(set)).toBe(-2)
  })

  it('should calculate the diff of a balanced tree', () => {
    const set = tree(2, singleton(1), singleton(3))
    expect(diff(set)).toBe(0)
  })

  it('should balance a right leaning tree', () => {
    const set = tree(1, empty(), tree(2, empty(), singleton(3)))
    const bal = balance(set)
    expect(bal.head).toBe(2)
    expect(bal.left.head).toBe(1)
    expect(bal.right.head).toBe(3)
  })

  it('should balance a left leaning tree', () => {
    const set = tree(3, tree(2, singleton(1), empty()), empty())
    const bal = balance(set)
    expect(bal.head).toBe(2)
    expect(bal.left.head).toBe(1)
    expect(bal.right.head).toBe(3)
  })

  it('should balance a right/left leaning tree', () => {
    const set = tree(1,
      empty(),
      tree(3,
        singleton(2),
        empty()))
    const bal = balance(set)
    expect(diff(bal)).toBe(0)
    expect(bal.head).toBe(2)
    expect(bal.left.head).toBe(1)
    expect(bal.right.head).toBe(3)
  })

  it('should balance a left/right leaning tree', () => {
    const set = tree(3,
      tree(1,
        empty(),
        singleton(2)),
      empty())
    const bal = balance(set)
    expect(diff(bal)).toBe(0)
    expect(bal.head).toBe(2)
    expect(bal.left.head).toBe(1)
    expect(bal.right.head).toBe(3)
  })

})
