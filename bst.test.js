import { empty, singleton, insert } from './bst'

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

})
