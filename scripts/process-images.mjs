#!/usr/bin/env node
import fs from 'node:fs/promises'
import fssync from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const srcDir = path.join(root, 'src', 'assets', 'images')
const outDir = path.join(srcDir, 'optimized')

const widths = [800, 1200, 1600]
const exts = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'])

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function processFile(filePath) {
  const file = path.basename(filePath)
  const ext = path.extname(file)
  const base = file.replace(ext, '')

  const manifestEntry = { sizes: {} }
  const img = sharp(filePath, { failOn: 'none' }).rotate()
  const meta = await img.metadata()

  for (const w of widths) {
    // Avoid enlarging smaller images
    const targetW = Math.min(w, meta.width || w)
    const outFile = path.join(outDir, `${base}-${targetW}.webp`)
    const pipeline = sharp(filePath, { failOn: 'none' }).rotate().resize({ width: targetW, withoutEnlargement: true })
    const info = await pipeline.webp({ quality: 75 }).toFile(outFile)
    manifestEntry.sizes[targetW] = {
      width: info.width,
      height: info.height,
      src: path.relative(path.join(root, 'src'), outFile).replace(/\\/g, '/'),
      bytes: info.size,
    }
    const kb = (info.size / 1024).toFixed(1)
    console.log(`✔ ${base} → ${targetW}px (${kb} kB) → ${path.relative(root, outFile)}`)
  }

  return [base, manifestEntry]
}

async function main() {
  await ensureDir(outDir)
  const entries = await fs.readdir(srcDir)
  const files = entries
    .filter((f) => exts.has(path.extname(f)))
    .map((f) => path.join(srcDir, f))

  if (files.length === 0) {
    console.log('No source images found in', srcDir)
    return
  }

  const manifest = {}
  for (const fp of files) {
    const [base, entry] = await processFile(fp)
    manifest[base] = entry
  }

  const manifestPath = path.join(outDir, 'manifest.json')
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  console.log('\nManifest written to', path.relative(root, manifestPath))
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

