// Renders the page to static HTML after the client build so the content,
// headings and FAQ are in the first response (faster FCP/LCP, crawlable
// without JS). The client bundle then hydrates it.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const file = resolve(root, 'dist/index.html')
const template = readFileSync(file, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Missing <!--app-html--> placeholder in dist/index.html')
writeFileSync(file, template.replace('<!--app-html-->', render()))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Prerendered dist/index.html')
