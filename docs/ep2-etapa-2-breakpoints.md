# EP2 · Etapa 2 — Breakpoints

```text
São cinco breakpoints com @media (min-width):
1) 576px (36rem): cartões e campos em duas colunas.
2) 768px (48rem): cabeçalho em linha e imagem ao lado do texto.
3) 992px (62rem): três cartões e quatro campos por linha; rodapé em duas áreas.
4) 1200px (75rem): texto do destaque limitado a 8 das 12 colunas, para linhas legíveis.
5) 1440px (90rem): container mais largo (80rem) e texto-base de 17px.

Estratégia: mobile first. O CSS base atende o celular, com cada item nas 12 colunas, e cada breakpoint só acrescenta ajustes para telas maiores; assim o dispositivo mais limitado carrega o layout mais simples. Os valores seguem faixas consolidadas no mercado (as do Bootstrap, mais 1440px para monitores largos), mas cada mudança foi decidida pelo conteúdo. As medidas em rem acompanham o zoom do navegador, o que ajuda pessoas com baixa visão.
```
