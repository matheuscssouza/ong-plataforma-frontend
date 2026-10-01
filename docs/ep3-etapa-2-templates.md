# EP3 · Etapa 2 — Templates dinâmicos

```text
MÉTODO
Usei a clonagem do elemento <template> do HTML5. Escolhi esse método, e não Template Literals com innerHTML, por segurança: os dados entram sempre por textContent e atributos, nunca como HTML. Assim, quando houver dados digitados por usuários (como os do localStorage nas próximas etapas), nenhum conteúdo poderá injetar código na página (XSS).

ORGANIZAÇÃO
- js/dados.js: arrays de objetos PROJETOS e CAMPANHAS, com título, imagem, texto alternativo, badges, descrição, público, frequência e data de início.
- html/projetos.html: a marcação fica em <template id="tpl-projeto">, <template id="tpl-campanha"> e <template id="tpl-badge">, que o navegador não exibe. Os pontos de inserção são contêineres vazios como <div data-componente="projetos">.
- js/templates.js: as funções criarProjeto(), criarCampanha() e criarBadges() geram os componentes.

FLUXO NO DOM
1) renderizarComponentes(raiz) procura os elementos [data-componente] e consulta um mapa que liga cada nome aos seus dados e à função que cria o item.
2) Para cada objeto do array, clonarTemplate() faz template.content.firstElementChild.cloneNode(true), criando uma cópia independente da estrutura.
3) A cópia é preenchida: textContent nos títulos e textos, src/srcset/alt na imagem, id no <h3> e aria-labelledby no <article> para manter a acessibilidade, um <li class="badge"> por categoria (com a classe de cor da variante) e um <time datetime> criado com createElement.
4) Os itens vão para um DocumentFragment e entram na página de uma só vez com replaceChildren(), evitando um redesenho a cada item.
5) Os caminhos de imagens e links são calculados a partir do próprio script (document.currentScript), então funcionam tanto em html/projetos.html quanto dentro da SPA. O roteador chama renderizarComponentes(principal) sempre que injeta uma página.

Resultado: as três fichas de projeto e os três cartões de campanha, que antes ocupavam cerca de 100 linhas de HTML repetido, passaram a vir de um template e de uma lista de dados. Incluir um projeto novo é só acrescentar um objeto ao array. Comparei automaticamente o resultado com a marcação antiga, e textos, imagens, badges, datas e ids ficaram idênticos.
```
