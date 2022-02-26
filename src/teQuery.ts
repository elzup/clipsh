const evalQueryBuild = (embed: string, query: string) => {
  return query.replace('@', `'${embed.replace(/'/g, "\\'")}'`)
}

const runEval = (embed: string, query: string) => {
  try {
    const x = evalQueryBuild(embed, query)

    console.log(x)
    return eval(x).toString()
  } catch (_e) {
    return 'error'
  }
}

export function teQuery(text: string, query: string): string {
  if (query.includes('$')) {
    return text
      .split('\n')
      .map((line) => teQuery(line, query.replace('$', '@')))
      .join('\n')
  }
  return runEval(text, query)
}
