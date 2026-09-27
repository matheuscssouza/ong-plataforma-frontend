# Etapa 2 — Estrutura semântica e hierarquia

Tags semânticas usadas para estruturar as áreas de leitura e navegação de `index.html`, `projetos.html` e `cadastro.html`.

| Tag | Propósito ou conteúdo abrigado |
|---|---|
| `<header>` | Topo das três páginas: agrupa a logo (link para o Início) e o menu de navegação principal. |
| `<nav>` | Menu principal com links para Início, Projetos e Cadastre-se; o atributo aria-current destaca a página atual. |
| `<main>` | Área de conteúdo principal, única em cada página; é o destino do link "Pular para o conteúdo". |
| `<section>` | Divide o main em blocos temáticos com título próprio: Quem somos, Nosso impacto, Como ajudar e Projetos em andamento. |
| `<article>` | Conteúdo independente: cada projeto social em projetos.html e os cartões de Missão, Visão e Valores no index.html. |
| `<aside>` | Conteúdo complementar ao principal: Transparência (index), Resultados de 2025 (projetos) e Por que se cadastrar. |
| `<footer>` | Rodapé das três páginas com endereço, e-mail, telefone e aviso de direitos autorais. |
| `<h1> a <h4>` | Hierarquia de títulos: um h1 por página, h2 nas seções, h3 nos artigos e h4 nos detalhes de cada projeto. |
| `<figure> e <figcaption>` | Agrupam a ilustração de cada projeto social com sua legenda descritiva. |
| `<address>` | Dentro do footer, identifica os dados de contato da ONG: endereço, e-mail e telefone. |

Validação: as três páginas foram aprovadas no W3C Markup Validation Service sem erros nem avisos.

## Justificativa da hierarquia de títulos (`<h1>` a `<h6>`)

Planejei os títulos como um sumário do conteúdo, antes de pensar na aparência. Cada página tem um único `<h1>`, que diz do que ela trata: "Instituto Raízes do Amanhã" no início, "Projetos sociais" e "Cadastre-se". Cada `<section>` e `<aside>` recebe um `<h2>` (Quem somos, Nosso impacto, Como ajudar, Transparência). Dentro deles, os `<article>` usam `<h3>`, como Missão, Visão e Valores ou cada projeto social, e os detalhes de cada projeto ficam em `<h4>` ("Informações").

Nenhum nível é pulado: um `<h3>` sempre está dentro de um `<h2>`. Não usei `<h5>` e `<h6>` porque o conteúdo não exige essa profundidade, e criar níveis só para preencher a escala tornaria a leitura confusa. O nível do título indica importância e relação entre os conteúdos, e não o tamanho da fonte, que é controlado pelo CSS.

Isso favorece a acessibilidade porque leitores de tela, como NVDA e VoiceOver, permitem listar e pular de título em título, e a pessoa entende a estrutura da página sem ler tudo. Cada seção também é ligada ao seu título por `aria-labelledby`, então as regiões são anunciadas pelo nome ("região Nosso impacto"). Somado ao link "Pular para o conteúdo", isso atende às diretrizes WCAG 1.3.1 (informação e relações) e 2.4.6 (cabeçalhos descritivos), além de ajudar os mecanismos de busca a entender o conteúdo (SEO).
