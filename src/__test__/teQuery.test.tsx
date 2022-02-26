import { teQuery as tq } from '../teQuery'

const multilineText = `line1
line2
line3`

test('text query', () => {
  expect(tq('base text', `@.split("\n").join(",")`)).toBe('base,text')
  expect(tq('base text', `@.replace("base", "changed")`)).toBe('changed text')
})

test('text query', () => {
  expect(tq('base text', `.split(" ").join(",")`)).toBe('base,text')
})

test('array end glue', () => {
  expect(tq('base text', '.split(" ")')).toBe('base\ntext')
})

test('line sign query', () => {
  expect(tq(multilineText, '$.substr(-1)')).toBe('1\n2\n3\n')
  expect(
    tq(
      ` hoge
    fuga`,
      '$.trim()'
    )
  ).toBe('hoge\nfuga')
})
