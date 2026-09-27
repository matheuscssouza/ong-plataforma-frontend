# Etapa 2 — Desenvolvimento de projetos sociais

## Blocos informativos de `projetos.html`

Enviados na plataforma (limite de 5): Cabeçalho e menu, Projetos em andamento, Fichas dos projetos, Seja voluntário e Campanhas de doação. A tabela abaixo lista todos os blocos da página.

| Nome do bloco | Tags e estrutura utilizada |
|---|---|
| Cabeçalho e menu | <header> com logo em <a> e <nav> com lista <ul>/<li> de links; aria-current marca a página atual. |
| Introdução | Dentro do <main>: <h1> "Projetos sociais" seguido de <p> apresentando as frentes de atuação. |
| Projetos em andamento | <section> com <h2>, agrupando três <article> (um por projeto). |
| Fichas dos projetos | Cada <article> tem <h3>, <figure> com <img alt> e <figcaption>, <p>, <h4> e lista <dl>/<dt>/<dd> com <time>. |
| Seja voluntário | <section id="voluntariado"> com <h2>, <p>, <h3> + <ul> (áreas) e <h3> + <ol> (passos com link ao cadastro). |
| Campanhas de doação | <section id="doacoes"> com <h2>, <p> e três <article> em cartões, cada um com <h3>, <p> e link ou <time>. |
| Resultados de 2025 | <aside> com <h2> e <p>: conteúdo complementar ao principal. |
| Contato | <footer> com <h2> e <address> contendo endereço, links mailto: e tel:, mais <small> com direitos autorais. |
