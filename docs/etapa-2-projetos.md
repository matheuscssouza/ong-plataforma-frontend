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

## Organização textual e orientação para doação e voluntariado

A organização textual foi pensada como um caminho: o usuário deve encontrar rapidamente o que fazer sem ler a página inteira.

Na página inicial, o bloco "Como você pode ajudar" separa as duas intenções em cartões com títulos diretos, "Seja voluntário" e "Faça uma doação". Cada cartão leva direto à seção correspondente em projetos.html (#voluntariado e #doacoes). O botão "Quero ser voluntário", no topo, e o item "Cadastre-se", no menu, oferecem atalhos para quem já está decidido.

Em projetos.html, voluntariado e doação ficam em `<section>` distintas, cada uma com seu `<h2>`, para que os assuntos não se misturem. Em "Seja voluntário", as áreas de atuação estão em lista não ordenada (`<ul>`), porque são opções equivalentes, e o passo a passo está em lista ordenada (`<ol>`), porque a sequência importa: escolher o projeto, preencher o cadastro e participar do acolhimento. Em "Campanhas de doação", cada campanha é um `<article>` com título próprio e informação concreta, como prazo em `<time>` ou local de entrega, o que facilita comparar e escolher.

Os links têm texto descritivo ("Quero ser doador mensal", "Saiba como ser voluntário") em vez de "clique aqui", fazendo sentido mesmo fora do contexto (WCAG 2.4.4). A frase sobre a prestação de contas anual reforça a confiança de quem vai doar. Para quem usa leitor de tela, títulos claros e seções nomeadas por aria-labelledby permitem saltar direto para "Campanhas de doação" ou "Seja voluntário".
