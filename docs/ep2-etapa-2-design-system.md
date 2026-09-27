# EP2 · Etapa 2 — Design system

```text
O Design System está no :root do css/style.css. Todas as cores, tamanhos de texto e espaçamentos do site vêm dessas variáveis; nenhum valor visual aparece solto no restante do código.

CORES (13 variáveis)
Primárias, verde que remete a natureza e cuidado: --cor-primaria #1f6f4a, --cor-primaria-escura #154d33 e --cor-primaria-clara #e8f5e1.
Secundárias, amarelo que remete a sol e esperança: --cor-secundaria #f4b942 e --cor-secundaria-clara #fff8e6.
Neutras: --cor-texto #1d2521, --cor-texto-suave #4a564f, --cor-borda #d7e0da, --cor-borda-campo #7a8a81, --cor-fundo #fdfdfb e --cor-superficie #ffffff.
Feedback: --cor-erro #b3261e e --cor-erro-clara #fdf1f0.

TIPOGRAFIA
Três famílias: --fonte-titulos (Fraunces), --fonte-texto (Lora) e --fonte-interface (sem serifa do sistema, para menus, botões e campos). A escala é modular, de razão 1,25 (terça maior) sobre a base de 16px, em seis patamares: --tamanho-legenda 0.875rem (14px), --tamanho-corpo 1rem (16px), --tamanho-h4 1.25rem (20px), --tamanho-h3 1.5625rem (25px), --tamanho-h2 1.953rem (31px) e --tamanho-h1 clamp(2rem, 1.5rem + 2.5vw, 2.441rem), que varia de 32px a 39px conforme a largura da tela. As alturas de linha também são variáveis: 1.6 no texto e 1.25 nos títulos.

ESPAÇAMENTOS
A escala tem base de 8px, com um meio passo de 4px: --espaco-1 0.25rem (4px), --espaco-2 0.5rem (8px), --espaco-3 1rem (16px), --espaco-4 1.5rem (24px), --espaco-5 2rem (32px) e --espaco-6 3rem (48px). Margens, paddings e gaps usam só esses valores, o que mantém um ritmo vertical regular entre as páginas.

JUSTIFICATIVAS
Contraste: o texto principal tem 15,4:1 sobre o fundo e o texto suave 7,5:1, acima do mínimo de 4,5:1 da WCAG (nível AA). Botões com texto branco sobre o verde primário chegam a 6,1:1, e o vermelho de erro tem 6,5:1. Ao montar o sistema, corrigi a borda dos campos, que tinha 2,5:1, para #7a8a81 (3,6:1), atendendo ao mínimo de 3:1 para componentes (WCAG 1.4.11). O contorno de foco passou a usar o verde escuro, e no rodapé escuro usa o amarelo.
Público: o público das ONGs é amplo, incluindo idosos e pessoas com baixa visão ou pouca familiaridade digital. Por isso usei texto-base de 16px em rem, que respeita o zoom do navegador, altura de linha generosa e botões com 16px de padding vertical, que formam uma área de toque confortável no celular.
Identidade: o verde transmite confiança e causa social, e o amarelo aparece só como destaque, sem competir com o texto. O resultado é uma interface acolhedora, séria o bastante para inspirar credibilidade em quem vai doar.
Manutenção: com as cores e medidas centralizadas, uma mudança de identidade visual exige editar só as variáveis, e todas as páginas herdam o ajuste.
```
