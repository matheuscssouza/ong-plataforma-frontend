# EP3 · Etapa 2 — Estrutura de diretórios

```text
Organizei o projeto pela separação de responsabilidades: cada tipo de arquivo tem sua pasta, e a raiz guarda só o ponto de entrada e a documentação.

ong-plataforma-frontend/
├── index.html
├── html/ → projetos.html, cadastro.html, componentes.html
├── css/ → style.css
├── js/ → menu.js, feedback.js, script.js
├── imagens/ → logo, voluntarios e projetos (PNG e WebP) + logo.svg
└── docs/ → registro das etapas e capturas de tela

index.html (raiz): é o ponto de entrada. Fica fora de html/ porque servidores e o GitHub Pages abrem automaticamente o index.html da raiz, e ele será a base da navegação em página única (SPA) nas próximas etapas.

html/: reúne a marcação das demais páginas: projetos sociais, cadastro de voluntários e doadores e o guia de componentes. Elas acessam os outros recursos por caminhos relativos (../css, ../js e ../imagens).

css/: concentra a apresentação em style.css, organizado em blocos: variáveis do design system, base, grid de 12 colunas, cabeçalho e navegação, conteúdo, formulário, componentes de feedback e breakpoints.

js/: guarda o comportamento, com um arquivo por área de funcionalidade: menu.js (menu hambúrguer e dropdown), feedback.js (toasts e modais reutilizáveis) e script.js (máscaras, validações e envio do cadastro). Essa divisão prepara a modularização exigida mais adiante.

imagens/: contém só mídia. Cada ilustração existe em WebP (mais leve) e PNG (alternativa), e a logo também em SVG, usada como ícone da aba.

docs/: documentação do projeto, fora do código que o navegador carrega.

Assim, o HTML não tem estilos embutidos (o único script inline é uma linha que marca o JavaScript como ativo antes de a página aparecer), o CSS não depende da estrutura de pastas das páginas, e é possível alterar uma área sem afetar as outras. Depois da reorganização, verifiquei os 71 links e caminhos relativos, sem nenhum quebrado, e validei as quatro páginas no W3C sem erros.
```
