#!/usr/bin/env node
// Finds correct Wikipedia logo file URLs via API, then downloads them

const https = require('https')
const fs = require('fs')
const path = require('path')

const OUT = '/Users/tectonic/Documents/Samruthi/samruthi-one/public/logos'

const banks = [
  { name: 'Kotak Mahindra',      wiki: 'Kotak_Mahindra_Bank',           out: 'kotak' },
  { name: 'Axis Bank',           wiki: 'Axis_Bank',                      out: 'axis' },
  { name: 'IndusInd Bank',       wiki: 'IndusInd_Bank',                  out: 'indusind' },
  { name: 'Standard Chartered',  wiki: 'Standard_Chartered',             out: 'sc' },
  { name: 'Bank of India',       wiki: 'Bank_of_India',                  out: 'boi' },
  { name: 'City Union Bank',     wiki: 'City_Union_Bank',                out: 'cub' },
  { name: 'Yes Bank',            wiki: 'Yes_Bank',                       out: 'yesbank' },
  { name: 'Indian Bank',         wiki: 'Indian_Bank',                    out: 'indianbank' },
  { name: 'Cholamandalam',       wiki: 'Cholamandalam_Investment_and_Finance_Company', out: 'chola' },
  { name: 'Aditya Birla Finance',wiki: 'Aditya_Birla_Capital',           out: 'abcapital' },
  { name: 'HDB Financial',       wiki: 'HDB_Financial_Services',         out: 'hdb' },
  { name: 'Bajaj Finserv',       wiki: 'Bajaj_Finserv',                  out: 'bajaj' },
  { name: 'Tata Capital',        wiki: 'Tata_Capital',                   out: 'tatacapital' },
  { name: 'Piramal Finance',     wiki: 'Piramal_Finance',                out: 'piramal' },
  { name: 'L&T Finance',         wiki: 'L%26T_Finance',                  out: 'ltfinance' },
]

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; logo-fetcher/1.0)' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

function download(url, outPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath)
    const req = https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlink(outPath, () => {})
        return download(res.headers.location, outPath).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlink(outPath, () => {})
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', err => { fs.unlink(outPath, () => {}); reject(err) })
  })
}

async function fetchLogoUrl(wikiTitle) {
  // Use Wikipedia API to get the page's main image
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&pithumbsize=500&format=json&pilicense=any`
  const data = JSON.parse(await get(apiUrl))
  const pages = data.query?.pages || {}
  const page = Object.values(pages)[0]
  return page?.thumbnail?.source || null
}

async function main() {
  for (const bank of banks) {
    process.stdout.write(`  ${bank.name} ... `)
    try {
      const imgUrl = await fetchLogoUrl(bank.wiki)
      if (!imgUrl) { console.log('✗ no image found'); continue }
      
      // Convert thumbnail URL to full size
      const fullUrl = imgUrl.replace(/\/\d+px-/, '/500px-')
      const ext = path.extname(new URL(fullUrl).pathname).replace('.svg.png', '.svg') || '.png'
      const outFile = path.join(OUT, `${bank.out}${ext}`)
      
      await download(fullUrl, outFile)
      const size = fs.statSync(outFile).size
      console.log(`✓ (${size} bytes) -> ${bank.out}${ext}`)
    } catch (e) {
      console.log(`✗ ${e.message}`)
    }
  }
  
  console.log('\n=== Final logo directory ===')
  fs.readdirSync(OUT).forEach(f => {
    const stat = fs.statSync(path.join(OUT, f))
    console.log(`  ${f} (${stat.size} bytes)`)
  })
}

main()
