// Build de produção com Vite: empacota os ES Modules, minifica CSS, JavaScript
// e HTML e gera a pasta dist/, que é a versão publicada.

import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';
import { minify } from 'html-minifier-terser';

const raiz = import.meta.dirname;

// Minifica o HTML final de cada página (o Vite, por padrão, não minifica HTML).
function minificarHtml() {
  return {
    name: 'minificar-html',
    enforce: 'post',
    transformIndexHtml: (html) => minify(html, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      removeRedundantAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    }),
  };
}

// Copia a pasta imagens/ inteira: os templates em JavaScript montam caminhos
// para ela em tempo de execução, então o Vite não as encontra sozinho.
function copiarImagens() {
  return {
    name: 'copiar-imagens',
    closeBundle() {
      cpSync(resolve(raiz, 'imagens'), resolve(raiz, 'dist/imagens'), { recursive: true });
    },
  };
}

export default defineConfig({
  base: './', // caminhos relativos: funciona em qualquer subpasta (ex.: GitHub Pages)
  plugins: [minificarHtml(), copiarImagens()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    cssMinify: true,
    assetsInlineLimit: 0, // imagens continuam como arquivos separados (cache do navegador)
    rollupOptions: {
      // Projeto com várias páginas: cada HTML é um ponto de entrada.
      input: {
        index: resolve(raiz, 'index.html'),
        projetos: resolve(raiz, 'html/projetos.html'),
        cadastro: resolve(raiz, 'html/cadastro.html'),
        componentes: resolve(raiz, 'html/componentes.html'),
      },
    },
  },
  server: { port: 8000 },
  preview: { port: 8080 },
});
