// Carregamento da biblioteca externa Chart.js pela rede (CDN).
// Versão fixa e verificação de integridade (SRI); baixada uma única vez.

const CHART_JS = {
  url: 'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js',
  integridade: 'sha384-jb8JQMbMoBUzgWatfe6COACi2ljcDdZQ2OxczGA3bGNeWe+6DChMTBJemed7ZnvJ',
};

let carregamentoChart = null;

// Insere o <script> do CDN uma única vez e devolve uma Promise.
export function carregarChartJs() {
  if (window.Chart) {
    return Promise.resolve(window.Chart);
  }
  carregamentoChart ??= new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = CHART_JS.url;
    script.integrity = CHART_JS.integridade;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolver(window.Chart);
    script.onerror = () => {
      carregamentoChart = null; // permite nova tentativa numa próxima visita
      rejeitar(new Error('Chart.js indisponível'));
    };
    document.head.append(script);
  });
  return carregamentoChart;
}
