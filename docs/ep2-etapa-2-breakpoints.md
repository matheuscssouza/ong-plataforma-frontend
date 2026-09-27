# EP2 · Etapa 2 — Breakpoints

```text
A folha de estilos define cinco pontos de quebra, todos com @media (min-width):

1) 576px (36rem), celulares grandes: cartões e campos do formulário passam de uma para duas colunas (span 6 de 12).
2) 768px (48rem), tablets: o cabeçalho deixa de ser empilhado e vira grid, com a logo à esquerda e o menu à direita, e imagem e texto ficam lado a lado (5 + 7 colunas).
3) 992px (62rem), notebooks: três cartões por linha (span 4), quatro números de impacto e quatro campos por linha (span 3), projetos em 4 + 8 e rodapé dividido em duas áreas.
4) 1200px (75rem), desktops: o texto do bloco de destaque fica limitado a 8 das 12 colunas, para as linhas não ficarem longas demais.
5) 1440px (90rem), desktops panorâmicos: o container passa de 68rem para 80rem e o texto-base, de 16px para 17px.

Estratégia: adotei o mobile first. O CSS base atende o celular, com cada item ocupando as 12 colunas, e cada breakpoint só acrescenta ajustes para telas maiores. Assim, o dispositivo mais limitado carrega o layout mais simples, e o código cresce de forma progressiva e previsível. Os valores seguem faixas consolidadas no mercado (as mesmas do Bootstrap: 576, 768, 992 e 1200px, mais 1440px para monitores largos), mas a mudança em cada ponto foi decidida pelo conteúdo: um breakpoint só altera o layout quando os elementos começam a ficar apertados ou largos demais. As medidas estão em rem (base de 16px), então acompanham o zoom do navegador, o que é importante para pessoas com baixa visão. Como variáveis CSS não funcionam dentro de @media, os cinco valores ficam documentados em comentário no :root, junto do Design System.
```
