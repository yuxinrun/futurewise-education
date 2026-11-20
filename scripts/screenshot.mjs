import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.env.SHOT_BASE || 'http://localhost:5199/'
const OUT = join(process.cwd(), 'docs/screenshots')
const PORT = 9222

const shots = [
  { name: 'home-desktop.png', path: '#/', width: 1440, height: 900, mobile: false },
  { name: 'home-mobile.png', path: '#/', width: 390, height: 844, mobile: true },
  { name: 'article-detail.png', path: '#/articles/creativity-is-not-a-talent', width: 1440, height: 1000, mobile: false },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getJson(url) {
  const res = await fetch(url)
  return res.json()
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && pending.has(msg.id)) {
        const { resolve: res, reject: rej } = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result)
      }
    }
    ws.onerror = (e) => reject(e)
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((res, rej) => {
            const mid = ++id
            pending.set(mid, { resolve: res, reject: rej })
            ws.send(JSON.stringify({ id: mid, method, params }))
          }),
        close: () => ws.close(),
      })
  })
}

let chrome = null
let attached = false
mkdirSync(OUT, { recursive: true })

try {
  let version
  try { version = await getJson(`http://127.0.0.1:${PORT}/json/version`); attached = true } catch { version = null }
  if (!version) {
    chrome = spawn(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=/tmp/fw-shot-${Date.now()}`,
      'about:blank',
    ], { stdio: 'ignore' })
    for (let i = 0; i < 40; i++) {
      try { version = await getJson(`http://127.0.0.1:${PORT}/json/version`); break } catch { await sleep(250) }
    }
  }
  if (!version) throw new Error('Chrome DevTools not reachable')
  const browser = await connect(version.webSocketDebuggerUrl)
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
  await sleep(300)
  const list = await getJson(`http://127.0.0.1:${PORT}/json/list`)
  const page = list.find((t) => t.id === targetId)
  const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  for (const s of shots) {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: s.width, height: s.height, deviceScaleFactor: 1, mobile: s.mobile,
    })
    await cdp.send('Page.navigate', { url: BASE + s.path })
    await sleep(3500)
    const { result } = await cdp.send('Runtime.evaluate', {
      expression: 'JSON.stringify({iw:innerWidth,sw:document.documentElement.scrollWidth})',
      returnByValue: true,
    })
    const metrics = JSON.parse(result.value)
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(join(OUT, s.name), Buffer.from(data, 'base64'))
    console.log(`${s.name}: viewport=${metrics.iw} scrollWidth=${metrics.sw} ${metrics.sw > metrics.iw ? 'OVERFLOW!' : 'ok'}`)
  }
  cdp.close()
  browser.close()
} finally {
  if (chrome) chrome.kill()
}
