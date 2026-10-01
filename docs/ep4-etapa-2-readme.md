# EP4 · Etapa 2 — Seções do README

| Nome da seção | Descrição e tecnologias mencionadas |
|---|---|
| Apresentação e sumário | Nome do projeto, resumo da plataforma, link do site publicado no GitHub Pages, captura da página inicial e sumário com links para cada seção. Tecnologias citadas: HTML5, CSS3, JavaScript e GitHub Pages. |
| Contexto | Problema que o projeto resolve: só 30% das ONGs brasileiras têm presença digital adequada. Explica a disciplina, as três experiências práticas e avisa que a ONG é fictícia. |
| Páginas | Tabela com as quatro páginas (index, projetos, cadastro e guia de componentes) e o que cada uma oferece, com links para os arquivos em html/. |
| Destaques técnicos | Organizados por experiência prática: HTML5 semântico e ARIA; design system com variáveis CSS, Grid de 12 colunas e Flexbox; SPA com roteamento por hash, templates <template>, localStorage, Chart.js e ES Modules. Inclui capturas de tela. |
| Tecnologias | Lista do que o projeto usa: HTML5, CSS3 (variáveis, Grid, Flexbox, media queries), JavaScript em ES Modules, localStorage, Chart.js, Git com GitFlow e Conventional Commits, GitHub Pages e Node.js com Chrome DevTools Protocol nos testes. |
| Estrutura de pastas | Árvore comentada do repositório: index.html, html/, css/, js/ (componentes, formulario, servicos, dados), imagens/, tests/, docs/, package.json e CONTRIBUTING.md. |
| Pré-requisitos | Tabela com ferramentas e versões: navegador moderno com ES Modules, Git, Python 3.8+ ou Node 22+ para o servidor local e Node 22+ com Google Chrome para os testes. Informa que não há dependências de terceiros para instalar. |
| Instalação e execução | Comandos git clone e npm start (python3 -m http.server 8000) e o endereço local. Explica que abrir o arquivo direto do disco não funciona, porque navegadores só carregam ES Modules por HTTP. |
| Testes | Comando npm test, que roda 20 testes de ponta a ponta num Chrome headless via Chrome DevTools Protocol, sem dependências. Lista o que é coberto (SPA, componentes, formulário, localStorage, Chart.js) e a variável CHROME_PATH. |
| Build e deploy | Deploy automático pelo GitHub Pages a partir da branch main. Informa que ainda não há build e que a minificação de CSS e JavaScript e a compressão de imagens estão planejadas na issue #5. |
| Manutenção | Tabela de onde editar cada parte: cores e breakpoints em css/style.css, projetos em js/dados/conteudo.js, regras de validação, rotas da SPA, versão do Chart.js e como criar novas páginas. Remete ao CONTRIBUTING.md. |
| Versionamento e contribuição | Resumo do GitFlow (main, develop, feature/, release/, hotfix/) e do padrão Conventional Commits, com link para o CONTRIBUTING.md, que traz o passo a passo e o checklist de revisão. |
| Etapas do desenvolvimento, aprendizados e autor | Tabelas por experiência prática com o que foi entregue e o link da tag de cada etapa, lições aprendidas (acessibilidade, concorrência, segurança de dados) e contato do autor. |
