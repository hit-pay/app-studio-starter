/** Split SQL on `;` outside quotes and comments. */
export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = []
  let buffer = ''
  let quote: "'" | '"' | '`' | null = null
  let i = 0

  while (i < sql.length) {
    const char = sql[i]
    const next = sql[i + 1]

    if (quote) {
      buffer += char
      if (char === quote) {
        if (quote === "'" && next === "'") {
          buffer += next
          i += 2
          continue
        }
        quote = null
      }
      i += 1
      continue
    }

    if (char === '-' && next === '-') {
      i += 2
      while (i < sql.length && sql[i] !== '\n') i += 1
      continue
    }

    if (char === '/' && next === '*') {
      i += 2
      while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) i += 1
      i += 2
      continue
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char
      buffer += char
      i += 1
      continue
    }

    if (char === ';') {
      const statement = buffer.trim()
      if (statement) statements.push(statement)
      buffer = ''
      i += 1
      continue
    }

    buffer += char
    i += 1
  }

  const tail = buffer.trim()
  if (tail) statements.push(tail)
  return statements
}

export function isTransactionControl(sql: string): boolean {
  return /^(BEGIN|COMMIT|ROLLBACK|END)(\s+|$)/i.test(sql.trim())
}
