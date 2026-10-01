// Integração com a biblioteca externa Chart.js (gráficos em <canvas>).
// - Só é baixada quando a página tem um gráfico (carregamento sob demanda).
// - Versão fixa e verificação de integridade (SRI) no <script> do CDN.
// - A tabela do HTML é a fonte dos dados: sem JavaScript ou se o CDN
//   falhar, a tabela continua disponível e nada quebra.

const CHART_JS = {
  url: 'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js',
  integridade: 'sha384-jb8JQMbMoBUzgWatfe6COACi2ljcDdZQ2OxczGA3bGNeWe+6DChMTBJemed7ZnvJ',
};

let carregamentoChart = null;
let graficoAtual = null;

// Insere o <script> do CDN uma única vez e devolve uma Promise.
function carregarChartJs() {
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

function corDoTema(variavel) {
  return getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();
}

// Lê rótulos, valores e categorias das linhas da tabela de dados.
function lerTabela(tabela) {
  return [...tabela.tBodies[0].rows].map((linha) => ({
    rotulo: linha.cells[0].textContent.trim(),
    valor: Number(linha.cells[1].dataset.valor),
    categoria: linha.dataset.categoria,
  }));
}

const CORES_CATEGORIA = {
  ambiente: '--cor-primaria',
  educacao: '--cor-info',
  tecnologia: '--cor-terciaria',
};

async function renderizarGraficos(raiz = document) {
  const canvas = raiz.querySelector('canvas[data-grafico]');
  if (!canvas) {
    return;
  }
  const tabela = document.getElementById(canvas.dataset.grafico);
  const detalhes = tabela.closest('details');

  let Chart;
  try {
    Chart = await carregarChartJs();
  } catch {
    canvas.closest('.grafico').hidden = true;
    detalhes.open = true; // sem gráfico, os dados aparecem em tabela
    return;
  }

  // Na SPA o <canvas> é recriado a cada visita: o gráfico anterior é destruído.
  graficoAtual?.destroy();

  const dados = lerTabela(tabela);
  const semAnimacao = matchMedia('(prefers-reduced-motion: reduce)').matches;
  Chart.defaults.font.family = corDoTema('--fonte-interface');
  Chart.defaults.color = corDoTema('--cor-texto');

  graficoAtual = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: dados.map((item) => item.rotulo),
      datasets: [{
        label: 'Horas de trabalho voluntário',
        data: dados.map((item) => item.valor),
        backgroundColor: dados.map((item) => corDoTema(CORES_CATEGORIA[item.categoria])),
        borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      animation: semAnimacao ? false : { duration: 600 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (contexto) => `${contexto.parsed.x.toLocaleString('pt-BR')} horas`,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: corDoTema('--cor-borda') },
          ticks: { callback: (valor) => Number(valor).toLocaleString('pt-BR') },
        },
        y: { grid: { display: false } },
      },
    },
  });
}

renderizarGraficos();
