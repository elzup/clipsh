import * as funcs from './teQueryFuncs'

const { _count, _lcount } = funcs

const runEval = (embed: string, query: string) => {
  if (!query.includes('@')) throw Error('Invalid query: @ sign not find')

  const _$text = embed
  const x = query.replace('@', '_$text')

  try {
    return eval(x)
  } catch (_e) {
    return `error ${x}`
  }
}

const isSingleFuncQuery = (query: string) =>
  !query.includes('@') && !query.includes('.') && !query.includes('.')
const isStartOptional = (query: string) => query.startsWith('.')

export function teQuery(text: string, query: string, glue = '\n'): string {
  if (query.includes('$')) {
    return text
      .split('\n')
      .map((line) => teQuery(line, query.replace('$', '@')))
      .join(glue)
  }
  if (isSingleFuncQuery(query)) return teQuery(text, query + '(@)')
  if (isStartOptional(query)) return teQuery(text, `@` + query)

  const result = runEval(text, query)

  if (Array.isArray(result)) return result.join(glue)

  return String(result)
}
