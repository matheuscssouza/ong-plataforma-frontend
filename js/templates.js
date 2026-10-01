// Sistema de templates: clona elementos <template> do HTML5 e preenche as
// cópias com os dados de js/dados.js. O texto entra sempre por textContent
// (nunca por innerHTML), então nenhum dado é interpretado como HTML.

// Caminhos calculados a partir deste arquivo: funcionam tanto na página
// html/projetos.html quanto na SPA carregada pelo index.html.
const PASTA_JS = document.currentScript.src;
const PASTA_IMAGENS = new URL('../imagens/', PASTA_JS);
const PASTA_HTML = new URL('../html/', PASTA_JS);

function clonarTemplate(raiz, id) {
  const modelo = raiz.querySelector(`#${id}`) ?? document.getElementById(id);
  return modelo.content.firstElementChild.cloneNode(true);
}

function criarBadges(raiz, lista, badges) {
  const temModelo = raiz.querySelector('#tpl-badge') ?? document.getElementById('tpl-badge');
  badges.forEach(({ texto, tipo }) => {
    const badge = temModelo
      ? clonarTemplate(raiz, 'tpl-badge')
      : Object.assign(document.createElement('li'), { className: 'badge' });
    badge.textContent = texto;
    if (tipo) {
      badge.classList.add(`badge-${tipo}`);
    }
    lista.append(badge);
  });
}

function criarTempo(data, rotulo) {
  const tempo = document.createElement('time');
  tempo.dateTime = data;
  tempo.textContent = rotulo;
  return tempo;
}

function criarProjeto(raiz, projeto) {
  const artigo = clonarTemplate(raiz, 'tpl-projeto');
  const idTitulo = `titulo-${projeto.id}`;
  artigo.setAttribute('aria-labelledby', idTitulo);

  artigo.querySelector('source').srcset = new URL(`${projeto.imagem}.webp`, PASTA_IMAGENS);
  const imagem = artigo.querySelector('img');
  imagem.src = new URL(`${projeto.imagem}.png`, PASTA_IMAGENS);
  imagem.alt = projeto.alt;
  artigo.querySelector('figcaption').textContent = projeto.legenda;

  const titulo = artigo.querySelector('h3');
  titulo.id = idTitulo;
  titulo.textContent = projeto.titulo;

  criarBadges(raiz, artigo.querySelector('.badges'), projeto.badges);
  artigo.querySelector('[data-campo="descricao"]').textContent = projeto.descricao;
  artigo.querySelector('[data-campo="publico"]').textContent = projeto.publico;
  artigo.querySelector('[data-campo="frequencia"]').textContent = projeto.frequencia;
  artigo.querySelector('[data-campo="inicio"]').append(criarTempo(projeto.inicio.data, projeto.inicio.rotulo));
  return artigo;
}

function criarCampanha(raiz, campanha) {
  const cartao = clonarTemplate(raiz, 'tpl-campanha');
  const idTitulo = `titulo-${campanha.id}`;
  cartao.setAttribute('aria-labelledby', idTitulo);

  const titulo = cartao.querySelector('h3');
  titulo.id = idTitulo;
  titulo.textContent = campanha.titulo;

  criarBadges(raiz, cartao.querySelector('.badges'), campanha.badges);
  cartao.querySelector('[data-campo="descricao"]').textContent = campanha.descricao;

  const rodape = cartao.querySelector('[data-campo="rodape"]');
  const { tipo, texto, destino, data, rotulo } = campanha.rodape;
  if (tipo === 'link') {
    const link = document.createElement('a');
    link.href = new URL(destino, PASTA_HTML);
    link.textContent = texto;
    rodape.append(link);
  } else if (tipo === 'prazo') {
    rodape.append('Até ', criarTempo(data, rotulo), '.');
  } else {
    rodape.textContent = texto;
  }
  return cartao;
}

const ROTULOS_TIPO = { voluntario: 'Voluntário', doador: 'Doador', ambos: 'Voluntário e doador' };
const BADGES_PROJETO = {
  horta: { texto: 'Horta Comunitária', tipo: 'ambiente' },
  reforco: { texto: 'Reforço Escolar', tipo: 'educacao' },
  digital: { texto: 'Inclusão Digital', tipo: 'tecnologia' },
};

function criarCadastro(raiz, cadastro) {
  const cartao = clonarTemplate(raiz, 'tpl-cadastro');
  cartao.querySelector('h3').textContent = cadastro.nome;

  const badges = [{ texto: ROTULOS_TIPO[cadastro.tipo] ?? cadastro.tipo, tipo: 'aberta' }];
  (cadastro.projetos ?? []).forEach((projeto) => {
    if (BADGES_PROJETO[projeto]) {
      badges.push(BADGES_PROJETO[projeto]);
    }
  });
  criarBadges(raiz, cartao.querySelector('.badges'), badges);

  cartao.querySelector('[data-campo="email"]').textContent = cadastro.email;
  cartao.querySelector('[data-campo="local"]').textContent = `${cadastro.cidade} – ${cadastro.estado}`;
  const quando = new Date(cadastro.enviadoEm).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' });
  cartao.querySelector('[data-campo="data"]').append(criarTempo(cadastro.enviadoEm, quando));

  const remover = cartao.querySelector('[data-remover-cadastro]');
  remover.dataset.removerCadastro = cadastro.id;
  remover.setAttribute('aria-label', `Remover o cadastro de ${cadastro.nome}`);
  return cartao;
}

const COMPONENTES = {
  projetos: { dados: () => PROJETOS, criar: criarProjeto },
  campanhas: { dados: () => CAMPANHAS, criar: criarCampanha },
  // Lidos do localStorage a cada renderização; os mais recentes primeiro.
  cadastros: { dados: () => lerJSON(CHAVES.cadastros, []).reverse(), criar: criarCadastro },
};

// Procura contêineres marcados com data-componente dentro de "raiz" e
// os preenche. Montamos tudo num DocumentFragment e inserimos de uma vez,
// o que evita um redesenho da página a cada item.
function renderizarComponentes(raiz = document) {
  raiz.querySelectorAll('[data-componente]').forEach((conteiner) => {
    const componente = COMPONENTES[conteiner.dataset.componente];
    if (!componente) {
      return;
    }
    const fragmento = document.createDocumentFragment();
    const itens = componente.dados();
    itens.forEach((item) => fragmento.append(componente.criar(raiz, item)));
    if (!itens.length && conteiner.dataset.vazio) {
      const aviso = document.createElement('p');
      aviso.textContent = conteiner.dataset.vazio;
      fragmento.append(aviso);
    }
    conteiner.replaceChildren(fragmento);
  });
}

renderizarComponentes();
