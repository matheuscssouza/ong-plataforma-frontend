# EP2 · Etapa 3 — Navegação responsiva (hambúrguer e dropdown)

```text
1) Estrutura HTML: dentro do <nav class="navegacao"> ficam um <button class="menu-botao"> (ícone + texto "Menu") e a lista <ul class="menu" id="menu-principal">. O item Projetos tem uma seta <button class="submenu-botao"> e uma <ul class="submenu"> com links para Projetos em andamento, Seja voluntário e Campanhas de doação. Os dois botões usam aria-expanded="false" e aria-controls, que o leitor de tela anuncia.

2) Mobile first (sem media query, até 767px): uma linha de script coloca a classe .js no <html>, e todo o recolhimento depende dela. Assim, sem JavaScript, o menu continua visível e usável. Com .js, o .menu-botao aparece (display: inline-flex) e o .menu vira um painel absoluto sob o cabeçalho, oculto com visibility: hidden, opacity: 0 e transform: translateY(-8px). O seletor de irmão adjacente abre o painel: .menu-botao[aria-expanded="true"] + .menu recebe visibility: visible, opacity: 1 e transform: none, com transition de 0.2s. O ícone hambúrguer são três traços (o span e seus ::before e ::after) que viram um X com rotate(45deg) quando aria-expanded é true. No celular, o submenu fica em display: none até a seta abrir (.submenu-botao[aria-expanded="true"] + .submenu).

3) @media (min-width: 48rem), a partir de 768px: o .menu-botao recebe display: none e o .menu volta a ser uma linha horizontal (position: static, flex-direction: row, visível). O .menu-item-submenu ganha position: relative, e o .submenu vira um dropdown absoluto, oculto por padrão (visibility: hidden e opacity: 0). Ele aparece com a pseudo-classe :hover no item, para quem usa mouse, ou quando a seta tem aria-expanded="true", para teclado e toque. Sem JavaScript, :focus-within também abre o submenu. A seta gira 180° pela transição do transform.

4) Lógica em js/menu.js: o clique nos botões só alterna aria-expanded, e o CSS decide o que mostrar. A tecla Esc fecha o submenu ou o menu e devolve o foco ao botão que o abriu; clicar fora ou escolher um link também fecha.

5) Acessibilidade: itens ocultos com visibility: hidden saem da ordem de tabulação, e @media (prefers-reduced-motion: reduce) remove as animações para quem pede menos movimento no sistema. Testei a abertura, o submenu e o Esc em 375px e em 1280px, e o HTML e o CSS passaram no W3C sem erros.
```
