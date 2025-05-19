import { readFileSync } from 'fs'
import { execSync } from 'child_process'

const msgPath = process.argv[2] || '.git/COMMIT_EDITMSG'
const commitMsg = readFileSync(msgPath, 'utf8').trim()

// 1. Проверка по Conventional Commits
console.log(msgPath)
try {
  execSync(`npx commitlint --edit ${msgPath}`, { stdio: 'inherit' })
} catch {
  console.error(
    '\n❌ Коммит сообщение не соответствует формату Conventional Commits.\n'
  )
  process.exit(1)
}

// 2. Проверка на кириллицу (не английский язык)
const hasCyrillic = /[а-яА-ЯёЁ]/.test(commitMsg)
if (hasCyrillic) {
  console.error('\n❌ Коммит сообщение должно быть на английском языке.\n')
  process.exit(1)
}

console.log('✅ Коммит сообщение прошло все проверки.')
