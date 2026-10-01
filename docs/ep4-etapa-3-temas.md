# EP4 · Etapa 3 — Contraste visual e modos de tela

```text
Como todas as cores já vinham de variáveis CSS (design system), os temas só redefinem essas variáveis: :root[data-tema="escuro"] e :root[data-tema="alto-contraste"]. O restante do CSS não muda.
- Escuro: fundo #111815 e textos claros, com cores de destaque mais suaves.
- Alto contraste: preto, branco e amarelo (#ffe14d), sem sombras, links sublinhados e bordas reforçadas, pensado para baixa visão.
- Um seletor "Tema" no menu (Do sistema, Claro, Escuro, Alto contraste) salva a escolha no localStorage; um script no <head> a aplica antes da página aparecer, sem "piscar".
- "Do sistema" segue prefers-color-scheme e prefers-contrast do sistema operacional, e o modo de cores forçadas do Windows (forced-colors) reforça bordas.
Calculei o contraste de cada par de texto e fundo nos três temas (mínimo 4,5:1) e o axe-core apontou 0 violações em todos. Erros nunca dependem só de cor: há ícone e texto, o que ajuda pessoas com daltonismo.
```
