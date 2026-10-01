// Otimiza as imagens de imagens/ (uso: npm run otimizar-imagens).
// - PNG: paleta de cores reduzida e compressão máxima. As ilustrações são
//   chapadas (poucas cores), então a perda não é perceptível.
// - WebP: regerado a partir do PNG com qualidade 80 e esforço máximo.
// Só substitui um arquivo quando a versão nova é menor.

import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const PASTA = join(import.meta.dirname, '..', 'imagens');
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
let antes = 0;
let depois = 0;

for (const nome of (await readdir(PASTA)).filter((arquivo) => arquivo.endsWith('.png'))) {
  const caminhoPng = join(PASTA, nome);
  const caminhoWebp = caminhoPng.replace(/\.png$/, '.webp');
  const original = await readFile(caminhoPng);
  const webpOriginal = await readFile(caminhoWebp);

  const png = await sharp(original).png({ palette: true, colors: 64, compressionLevel: 9, effort: 10 }).toBuffer();
  const webp = await sharp(original).webp({ quality: 80, effort: 6 }).toBuffer();

  const pngFinal = png.length < original.length ? png : original;
  const webpFinal = webp.length < webpOriginal.length ? webp : webpOriginal;
  await writeFile(caminhoPng, pngFinal);
  await writeFile(caminhoWebp, webpFinal);

  antes += original.length + webpOriginal.length;
  depois += pngFinal.length + webpFinal.length;
  console.log(`${nome.padEnd(22)} PNG ${kb(original.length)} → ${kb(pngFinal.length)} | WebP ${kb(webpOriginal.length)} → ${kb(webpFinal.length)}`);
}

console.log(`\nTotal: ${kb(antes)} → ${kb(depois)} (${(100 - (100 * depois) / antes).toFixed(1)}% menor)`);
