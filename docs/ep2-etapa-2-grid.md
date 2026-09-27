# EP2 · Etapa 2 — Grid de 12 colunas e breakpoints

```text
A arquitetura segue a abordagem mobile first. No :root, a variável --colunas: 12 define o grid, e a mesma regra é aplicada ao main e aos blocos internos (cartões, números, bloco institucional, projetos e fieldsets do formulário):

main, .grade, .numeros, .institucional, .projeto, .formulario fieldset {
  display: grid;
  grid-template-columns: repeat(var(--colunas), minmax(0, 1fr));
  column-gap: var(--espaco-4);
}

O minmax(0, 1fr) divide a largura em 12 frações iguais e impede que um conteúdo longo estoure a coluna. Na base, que atende celulares, cada item ocupa as 12 colunas (grid-column: span 12), e os números de impacto ocupam 6 (dois por linha). A partir daí, cinco @media com min-width redistribuem os spans:

1) 36rem (576px), celulares grandes: cartões e campos do formulário passam a span 6, duas colunas; com número ímpar de cartões, o último ocupa a linha inteira.
2) 48rem (768px), tablets: o cabeçalho vira grid (logo em 5 colunas, menu em 7), e imagem e texto ficam lado a lado (5 + 7) em "Quem somos" e nos projetos.
3) 62rem (992px), notebooks: três cartões por linha (span 4), ou dois quando o grupo tem só dois (seletor :has); quatro números (span 3); quatro campos por linha (span 3); projetos em 4 + 8; e o rodapé em grid, com contato à esquerda e direitos autorais à direita.
4) 75rem (1200px), desktops: o bloco de destaque também vira grid, e o texto fica limitado a 8 das 12 colunas para manter linhas com comprimento confortável de leitura.
5) 90rem (1440px), desktops panorâmicos: o container cresce de 68rem para 80rem e o texto-base sobe para 17px, redefinindo as variáveis do Design System dentro da própria media query.

Os breakpoints usam rem, então acompanham o zoom do navegador. Como variáveis CSS não funcionam dentro de @media, os valores ficam documentados em comentário no :root. Validei o CSS no W3C (0 erros) e testei as três páginas em larguras de 375px a 1500px: as 12 colunas se mantêm e não há rolagem horizontal em nenhum cenário.
```
