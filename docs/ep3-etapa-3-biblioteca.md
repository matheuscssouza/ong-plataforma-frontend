# EP3 · Etapa 3 — Integração com bibliotecas externas (Chart.js)

```text
SOLUÇÃO E PROPÓSITO
Integrei a biblioteca Chart.js (v4.5.1, licença MIT) via CDN do jsDelivr para exibir, em projetos.html, um gráfico de barras com as horas de trabalho voluntário de cada projeto em 2025. O objetivo é comunicar o impacto da ONG de forma visual, o que ajuda a convencer doadores.

CARREGAMENTO SEM CONFLITOS (js/grafico.js)
1) Sob demanda: carregarChartJs() só cria o <script> do CDN quando a página tem um <canvas data-grafico>; quem não visita Projetos não baixa os cerca de 200 KB da biblioteca.
2) Uma única vez: o carregamento fica guardado numa Promise, e nas visitas seguintes pela SPA a biblioteca já está em window.Chart.
3) Segurança: versão fixa na URL e atributo integrity (SRI, sha384) com crossOrigin="anonymous"; se o arquivo do CDN for alterado, o navegador não o executa.
4) Escopo: a biblioteca expõe só o objeto global Chart, e meu código fica em funções próprias.

INICIALIZAÇÃO E CONFIGURAÇÃO
- Os dados vêm de uma <table> no HTML ("Ver os dados em tabela"), lida por lerTabela(), sem dados duplicados.
- new Chart(canvas, { type: 'bar', data, options }) com barras horizontais (indexAxis: 'y'), cores do Design System lidas das variáveis CSS com getComputedStyle, números no formato brasileiro com toLocaleString('pt-BR') e maintainAspectRatio: false.
- Acessibilidade: canvas com role="img" e aria-label, tabela para leitores de tela e animação desligada com prefers-reduced-motion.
- Na SPA, o roteador chama renderizarGraficos() a cada troca de página, e o gráfico anterior é removido com destroy().

FALHA CONTROLADA
Se o CDN falhar, o erro é capturado: o gráfico é ocultado e a tabela abre sozinha, sem perda de informação. Testei os dois casos no navegador, sem erros no console.
```
