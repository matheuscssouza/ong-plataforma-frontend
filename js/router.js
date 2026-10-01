// Roteador da SPA.
// Intercepta os cliques em links internos, troca só o conteúdo do <main>
// e registra a rota no hash da URL (#/projetos), sem recarregar o documento.
// Sem JavaScript, ou se o carregamento falhar, os mesmos links continuam
// abrindo as páginas HTML normais (aprimoramento progressivo).

const ROTAS = {
  '/': 'index.html',
  '/projetos': 'html/projetos.html',
  '/cadastro': 'html/cadastro.html',
  '/componentes': 'html/componentes.html',
};

const BASE = new URL('.', document.baseURI);
const principal = document.getElementById('conteudo');
const cache = new Map();

// Endereço absoluto de cada arquivo → rota (a raiz "/" também vale para "/").
const ROTA_POR_ARQUIVO = new Map(
  Object.entries(ROTAS).map(([rota, arquivo]) => [new URL(arquivo, BASE).href, rota]),
);
ROTA_POR_ARQUIVO.set(BASE.href, '/');

function rotaDoLink(link) {
  if (link.target || link.hasAttribute('download')) {
    return null;
  }
  const url = new URL(link.href);
  const rota = ROTA_POR_ARQUIVO.get(url.origin + url.pathname);
  if (!rota) {
    return null;
  }
  return url.hash ? rota + url.hash : rota;
}

function focarElemento(elemento) {
  if (!elemento.hasAttribute('tabindex')) {
    elemento.setAttribute('tabindex', '-1');
  }
  elemento.focus({ preventScroll: true });
  elemento.scrollIntoView({ block: 'start' });
}

// Busca o arquivo da página uma única vez e guarda o <main> e o título.
async function carregarPagina(arquivo) {
  if (cache.has(arquivo)) {
    return cache.get(arquivo);
  }
  const url = new URL(arquivo, BASE);
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }
  const documento = new DOMParser().parseFromString(await resposta.text(), 'text/html');
  const conteudo = documento.querySelector('main');

  // Caminhos relativos do arquivo (ex.: ../imagens) passam a valer a partir do index.
  conteudo.querySelectorAll('[src], [srcset], [href]').forEach((elemento) => {
    ['src', 'srcset', 'href'].forEach((atributo) => {
      const valor = elemento.getAttribute(atributo);
      if (valor && !valor.startsWith('#') && !/^[a-z]+:/i.test(valor)) {
        elemento.setAttribute(atributo, new URL(valor, url).href);
      }
    });
  });

  const pagina = { conteudo, titulo: documento.title };
  cache.set(arquivo, pagina);
  return pagina;
}

function marcarMenu(caminho) {
  document.querySelectorAll('.menu > li > a:not([href^="#"])').forEach((link) => {
    const rota = rotaDoLink(link)?.split('#')[0];
    if (rota === caminho) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function paginaNaoEncontrada() {
  const conteudo = document.createElement('main');
  conteudo.innerHTML = `
    <h1>Página não encontrada</h1>
    <p>O endereço acessado não existe. <a href="index.html">Voltar para o início</a>.</p>`;
  return { conteudo, titulo: 'Página não encontrada | Instituto Raízes do Amanhã' };
}

async function renderizar(rota, focarTitulo = true) {
  const [caminho, ancora] = rota.split('#');
  const arquivo = ROTAS[caminho];

  principal.setAttribute('aria-busy', 'true');
  let pagina;
  try {
    pagina = arquivo ? await carregarPagina(arquivo) : paginaNaoEncontrada();
  } catch {
    // Sem acesso por fetch (ex.: arquivo aberto direto do disco): navegação comum.
    location.href = new URL(arquivo, BASE).href;
    return;
  }

  principal.replaceChildren(...pagina.conteudo.cloneNode(true).childNodes);
  renderizarComponentes(principal);
  principal.removeAttribute('aria-busy');
  document.title = pagina.titulo;
  marcarMenu(caminho);
  iniciarCadastro();

  const alvo = ancora ? document.getElementById(ancora) : null;
  if (alvo) {
    focarElemento(alvo);
  } else if (focarTitulo) {
    // O foco vai para o título: o leitor de tela anuncia a nova página.
    focarElemento(principal.querySelector('h1') ?? principal);
    window.scrollTo(0, 0);
  }
}

function rotaAtual() {
  const hash = location.hash;
  if (hash.startsWith('#/')) {
    return hash.slice(1);
  }
  return hash === '' ? '/' : null;
}

document.addEventListener('click', (evento) => {
  if (evento.defaultPrevented || evento.button !== 0
    || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) {
    return;
  }
  const link = evento.target.closest('a[href]');
  if (!link) {
    return;
  }

  // Âncora na própria página (ex.: Contato, Pular para o conteúdo):
  // rola até o destino sem alterar a rota atual.
  const href = link.getAttribute('href');
  if (href.startsWith('#')) {
    const destino = document.getElementById(href.slice(1));
    if (destino) {
      evento.preventDefault();
      focarElemento(destino);
    }
    return;
  }

  const rota = rotaDoLink(link);
  if (!rota) {
    return;
  }
  evento.preventDefault();
  if (location.hash === `#${rota}`) {
    renderizar(rota);
  } else {
    location.hash = rota; // dispara o hashchange abaixo
  }
});

// Voltar e Avançar do navegador também passam por aqui.
window.addEventListener('hashchange', () => {
  const rota = rotaAtual();
  if (rota) {
    renderizar(rota);
  }
});

// Entrada direta por um endereço com rota (ex.: link compartilhado ou recarga).
if (location.hash.startsWith('#/')) {
  renderizar(rotaAtual(), false);
}
