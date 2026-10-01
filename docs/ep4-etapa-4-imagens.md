# EP4 · Etapa 4 — Otimização de imagens

```text
Usei três formatos, cada um pelo seu papel:
- WebP: formato principal das ilustrações, servido pelo elemento <picture>. Tem compressão melhor que PNG e JPEG; nas imagens do projeto, ficou de 30% a 75% menor que o PNG equivalente.
- PNG: alternativa no <img> do <picture> para navegadores sem suporte a WebP. É adequado a ilustrações de cores chapadas (melhor que JPEG, que borra as bordas). Comprimi com paleta de 64 cores: voluntarios.png caiu de 33,9 KB para 10,2 KB sem diferença visível.
- SVG: logo e ícone da aba. É vetorial, pesa 0,5 KB e fica nítido em qualquer tamanho e densidade de tela.
A otimização é feita pelo script npm run otimizar-imagens (biblioteca sharp), que só troca um arquivo quando a versão nova é menor. No total, as imagens foram de 95 KB para 39,6 KB (58% menor). As imagens abaixo da primeira tela usam loading="lazy", e todas têm width e height para não deslocar o layout.
```

## Resolução das imagens e viewport

```text
Cada imagem foi exportada com o dobro do tamanho em que aparece na tela, para ficar nítida em telas de alta densidade (Retina e a maioria dos celulares): a ilustração de "Quem somos" é exibida com até 480x300 px e o arquivo tem 960x600; as dos projetos, exibidas com até 320x200, têm 640x400; a logo, exibida com 48x48, tem 192x192 (e há também a versão SVG, vetorial).
No HTML, width e height informam a proporção, e o navegador reserva o espaço antes de baixar a imagem, sem deslocar o layout. No CSS, max-width: 100% e height: auto deixam a imagem acompanhar a coluna do grid: no celular ela ocupa a largura da tela, e a partir de 768 px divide a linha com o texto (5 ou 4 das 12 colunas).
Não criei várias larguras com srcset porque as imagens, já otimizadas, pesam de 2 a 10 KB: uma versão menor economizaria pouco e aumentaria o número de arquivos.
```
