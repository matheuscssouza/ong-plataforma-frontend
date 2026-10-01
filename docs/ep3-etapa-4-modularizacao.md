# EP3 · Etapa 4 — Separação de código por funcionalidade (ES Modules)

```text
Converti os scripts em ES Modules (import/export). Cada página carrega um único <script type="module" src="js/main.js">, e o navegador resolve as dependências.

CRITÉRIOS
1) Responsabilidade única: cada arquivo tem um papel só.
2) Separação por camada: interface, formulário, rede/armazenamento e dados ficam em pastas diferentes.
3) Importar não executa nada: cada módulo exporta funções (iniciar..., renderizar...), e só o main.js decide quando chamá-las.
4) Dependência em uma direção: as camadas de cima importam as de baixo, nunca o contrário, e não há importação circular.

MÓDULOS
- servicos/armazenamento.js: localStorage com JSON e tratamento de erros.
- servicos/chartjs.js: download do Chart.js pelo CDN, com SRI.
- dados/conteudo.js: dados de projetos e campanhas.
- formulario/mascaras.js: funções puras de máscara e validação do CPF, sem DOM.
- formulario/validacao.js: regras de consistência e mensagens de erro.
- formulario/cadastro.js: rascunho, envio e lista de cadastros.
- componentes/: menu.js, feedback.js (toasts e modal), templates.js e grafico.js.
- roteador.js: navegação SPA.
- main.js: ponto de entrada que liga tudo.
Assim, quem gera o formulário (cadastro.js) não grava dados: usa a função exportada por armazenamento.js. E o gráfico não sabe baixar a biblioteca: pede para chartjs.js.

COMUNICAÇÃO SEM ACOPLAMENTO
- Importações explícitas: cada arquivo declara no topo o que usa, sem variáveis globais compartilhadas. Exemplo: import { CHAVES, lerJSON } from '../servicos/armazenamento.js'.
- Inversão no roteador: ele não conhece as páginas. O main.js passa um callback (iniciarRoteador(iniciarConteudo)), chamado após cada troca para renderizar templates, gráfico e formulário. Sem o roteador, as páginas de html/ usam o mesmo main.js.
- Eventos do DOM como contrato: o feedback usa delegação e atributos data-toast e data-abrir-modal, então qualquer módulo aciona um modal sem importar código.
- Caminhos com import.meta.url, que valem tanto dentro quanto fora da SPA.

Depois da refatoração, rodei de novo os 4 roteiros de teste (SPA, validação, localStorage e Chart.js, com mais de 30 cenários) e todos passaram, sem erros no console.
```
