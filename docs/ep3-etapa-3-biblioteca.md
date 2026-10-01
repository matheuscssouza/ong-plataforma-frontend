# EP3 · Etapa 3 — Integração com bibliotecas externas (Chart.js)

```text
SOLUÇÃO E PROPÓSITO
Integrei a biblioteca Chart.js (versão 4.5.1, licença MIT) via CDN do jsDelivr para exibir, em projetos.html, um gráfico de barras com as horas de trabalho voluntário de cada projeto em 2025. O propósito é comunicar o impacto da ONG de forma visual, o que ajuda a convencer doadores, e desenhar isso à mão em <canvas> seria trabalhoso.

CARREGAMENTO SEM CONFLITOS (js/grafico.js)
1) Sob demanda: o <script> do Chart.js não fica no HTML. A função carregarChartJs() só cria o elemento <script> quando a página tem um <canvas data-grafico>, então quem não visita a página de projetos não baixa os cerca de 200 KB da biblioteca.
2) Uma única vez: o carregamento é guardado numa Promise; nas visitas seguintes pela SPA, a biblioteca já está em window.Chart e não é baixada de novo.
3) Segurança: versão fixa na URL e atributo integrity (SRI, hash sha384) com crossOrigin="anonymous". Se o arquivo do CDN for alterado, o navegador se recusa a executá-lo.
4) Escopo: a biblioteca expõe só o objeto global Chart, e o meu código fica em funções próprias, sem variáveis com o mesmo nome.

INICIALIZAÇÃO E CONFIGURAÇÃO
- Os dados vêm de uma <table> no HTML, dentro de "Ver os dados em tabela". A função lerTabela() lê cada linha (projeto, horas e categoria), e assim não há dados duplicados.
- new Chart(canvas, { type: 'bar', data, options }) cria o gráfico com indexAxis: 'y' (barras horizontais, mais legíveis no celular), as cores do Design System lidas das variáveis CSS com getComputedStyle (verde, azul e roxo por categoria), números no formato brasileiro com toLocaleString('pt-BR') nos eixos e na dica, e maintainAspectRatio: false para respeitar a altura do contêiner.
- Acessibilidade: o <canvas> tem role="img" e aria-label, a tabela continua disponível para leitores de tela e, se a pessoa pediu menos movimento no sistema (prefers-reduced-motion), a animação é desligada.
- Na SPA, o roteador chama renderizarGraficos() após cada troca de página, e o gráfico anterior é destruído com destroy() antes de criar outro.

FALHA CONTROLADA
Se o CDN estiver fora do ar ou bloqueado, o erro é capturado: o gráfico é ocultado e a tabela abre sozinha, então a informação nunca se perde. Testei os dois casos no navegador, sem erros no console.
```
