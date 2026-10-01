# EP4 · Etapa 4 — Bundler e minificação

```text
Usei o Vite (v8) como bundler, instalado como dependência de desenvolvimento. A configuração fica em vite.config.js:
- Várias páginas de entrada (index.html, projetos, cadastro e componentes) em rollupOptions.input, porque o site não é uma página só.
- base: './' para gerar caminhos relativos, que funcionam no GitHub Pages dentro de uma subpasta.
- O Vite junta os 13 módulos ES em um único arquivo JavaScript e minifica JS e CSS, com nomes com hash para cache.
- Um plugin próprio minifica o HTML com html-minifier-terser (remove comentários e espaços), e outro copia a pasta imagens/ usada pelos templates.
Os comandos são npm run dev (servidor de desenvolvimento), npm run build (gera a pasta dist/) e npm run preview. O JavaScript caiu de 43,6 para 21,7 KB, o CSS de 36,9 para 26,3 KB e o total de 120 para 81 KB (32% menor). Os 20 testes automatizados passam também contra a build (npm run test:build).
```

## Percentual de redução

```text
Cerca de 32% no total: os arquivos base caíram de 120,1 KB para 81,4 KB após a build com o Vite. Por tipo: JavaScript de 43,6 para 21,7 KB (cerca de 50%, e de 13 arquivos para 1), CSS de 36,9 para 26,3 KB (cerca de 29%) e HTML de 39,5 para 33,4 KB (cerca de 15%). Com a compressão gzip aplicada pelo servidor, o total transferido vai de 38,3 para 25,1 KB (cerca de 34% menor).
```
