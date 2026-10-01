// Testes de ponta a ponta da plataforma, executados num Chrome headless.
// Uso: npm test  (ou: node tests/executar.mjs)

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { iniciarServidor, abrirNavegador, esperar } from './navegador.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const testes = [];
const teste = (grupo, nome, executar) => testes.push({ grupo, nome, executar });

function confirmar(condicao, mensagem) {
  if (!condicao) {
    throw new Error(mensagem);
  }
}

async function preencherCadastroValido(p, { nome = 'Maria Silva', tipo = 'tipo-voluntario' } = {}) {
  await p.digitar('nome', nome);
  await p.digitar('cpf', '52998224725');
  await p.digitar('email', 'maria@exemplo.com');
  await p.digitar('telefone', '11987654321');
  await p.digitar('cep', '01310100');
  await p.digitar('logradouro', 'Avenida Paulista');
  await p.digitar('numero', '1000');
  await p.digitar('bairro', 'Bela Vista');
  await p.digitar('cidade', 'São Paulo');
  await p.js(`document.getElementById('nascimento').value = '1995-05-10';
    document.getElementById('estado').value = 'SP';
    document.getElementById('${tipo}').click();
    document.getElementById('lgpd').click();`);
}

const titulo = (p) => p.js("document.querySelector('main h1')?.textContent");
const erroDo = (p, campo) => p.js(`document.getElementById('erro-${campo}')?.textContent ?? ''`);
const cadastrosSalvos = (p) => p.js("JSON.parse(localStorage.getItem('raizes:cadastros') || '[]')");

// ---------------------------------------------------------------- SPA
teste('SPA', 'navega para Projetos sem recarregar e atualiza título, menu e foco', async (p, base) => {
  await p.abrir(`${base}index.html`);
  await p.js("window.__mesmoDocumento = true");
  await p.clicar('.menu a[href$="html/projetos.html"]', 900);
  confirmar(await p.js('location.hash') === '#/projetos', 'hash diferente de #/projetos');
  confirmar(await titulo(p) === 'Projetos sociais', 'h1 incorreto');
  confirmar((await p.js('document.title')).startsWith('Projetos sociais'), 'título da aba não mudou');
  confirmar(await p.js("document.querySelector('.menu [aria-current]').textContent") === 'Projetos', 'menu não marcou Projetos');
  confirmar(await p.js("document.activeElement.tagName") === 'H1', 'foco não foi para o h1');
  confirmar(await p.js('window.__mesmoDocumento') === true, 'a página recarregou');
});

teste('SPA', 'link do submenu leva à seção e Voltar retorna', async (p) => {
  await p.clicar('.submenu a[href$="#doacoes"]', 900);
  confirmar(await p.js('location.hash') === '#/projetos#doacoes', 'hash da âncora incorreto');
  confirmar(await p.js("document.activeElement.id") === 'doacoes', 'foco não foi para a seção');
  await p.js('history.back()');
  await esperar(800);
  confirmar(await p.js('location.hash') === '#/projetos', 'Voltar não restaurou a rota');
});

teste('SPA', 'âncora Contato rola até o rodapé sem trocar a rota', async (p) => {
  await p.clicar('.menu a[href="#contato"]', 400);
  confirmar(await p.js('location.hash') === '#/projetos', 'a rota mudou');
  confirmar(await p.js('document.activeElement.id') === 'contato', 'foco não foi para o rodapé');
});

teste('SPA', 'entrada direta por endereço e rota inexistente', async (p, base) => {
  await p.abrir(`${base}index.html#/cadastro`);
  confirmar(await titulo(p) === 'Cadastre-se', 'entrada direta não abriu o cadastro');
  await p.abrir(`${base}index.html#/nao-existe`);
  confirmar(await titulo(p) === 'Página não encontrada', 'rota inexistente sem aviso');
});

teste('SPA', 'cliques rápidos com rede lenta mostram a última página clicada', async (p, base) => {
  await p.abrir(`${base}index.html`, 600);
  await p.rede({ latency: 400 });
  await p.js(`document.querySelector('.menu a[href$="html/projetos.html"]').click();
    setTimeout(() => { location.hash = '#/cadastro'; }, 50);`);
  await esperar(2500);
  await p.rede({});
  confirmar(await titulo(p) === 'Cadastre-se', 'a página exibida não é a última clicada');
});

teste('SPA', 'sem conexão mostra aviso e "tente novamente" recupera', async (p, base) => {
  await p.cmd('Network.setCacheDisabled', { cacheDisabled: true });
  await p.abrir(`${base}index.html`, 600);
  await p.rede({ offline: true });
  await p.clicar('.rodape a[href$="componentes.html"]', 1200);
  confirmar(await titulo(p) === 'Sem conexão com a internet', 'aviso de conexão ausente');
  await p.rede({});
  await p.clicar('[data-tentar-novamente]', 1200);
  confirmar(await titulo(p) === 'Guia de componentes', 'nova tentativa não carregou a página');
  await p.cmd('Network.setCacheDisabled', { cacheDisabled: false });
});

teste('SPA', 'menu do celular fecha ao usar o botão Voltar', async (p, base) => {
  await p.tamanho(390, 844, true);
  await p.abrir(`${base}index.html`, 600);
  await p.clicar('.menu a[href$="html/projetos.html"]', 800);
  await p.clicar('.menu-botao', 200);
  await p.js('history.back()');
  await esperar(800);
  confirmar(await p.js("document.querySelector('.menu-botao').getAttribute('aria-expanded')") === 'false', 'menu continuou aberto');
  await p.tamanho(1280, 900);
});

// ---------------------------------------------------------- Componentes
teste('Componentes', 'toast e modal funcionam em conteúdo injetado pela SPA', async (p, base) => {
  await p.abrir(`${base}index.html#/componentes`);
  await p.clicar('[data-toast]', 300);
  confirmar((await p.js("document.querySelector('.toasts').textContent")).includes('Cadastro salvo'), 'toast não apareceu');
  await p.clicar('[data-abrir-modal]', 300);
  confirmar(await p.js("document.getElementById('modal-exemplo').open") === true, 'modal não abriu');
  await p.clicar('#modal-exemplo [data-fechar-modal]', 300);
  confirmar(await p.js("document.getElementById('modal-exemplo').open") === false, 'modal não fechou');
});

teste('Componentes', 'projetos e campanhas são gerados pelos templates', async (p, base) => {
  await p.abrir(`${base}html/projetos.html`, 1200);
  confirmar(await p.js("document.querySelectorAll('.projeto').length") === 3, 'esperados 3 projetos');
  confirmar(await p.js("document.querySelectorAll('[data-componente=campanhas] .cartao').length") === 3, 'esperadas 3 campanhas');
  confirmar(await p.js("[...document.querySelectorAll('.projeto img')].every((i) => i.complete && i.naturalWidth > 0)"), 'imagem não carregou');
});

// ------------------------------------------------------------ Formulário
teste('Formulário', 'máscaras aceitam texto colado sujo e com +55', async (p, base) => {
  await p.abrir(`${base}index.html`);
  await p.js('localStorage.clear()');
  await p.abrir(`${base}index.html#/cadastro`);
  await p.digitar('cpf', 'abc529.982xx247-25 999');
  confirmar(await p.js("document.getElementById('cpf').value") === '529.982.247-25', 'máscara de CPF falhou');
  await p.digitar('telefone', '+55 (11) 9 8765-4321');
  confirmar(await p.js("document.getElementById('telefone').value") === '(11) 98765-4321', 'máscara de telefone falhou');
  await p.digitar('cep', '01310100');
  confirmar(await p.js("document.getElementById('cep').value") === '01310-100', 'máscara de CEP falhou');
});

teste('Formulário', 'envio vazio lista os 13 campos e foca o primeiro', async (p) => {
  await p.js("document.getElementById('form-cadastro').reset()");
  await esperar(100);
  await p.clicar('button[type=submit]', 300);
  confirmar((await p.js("document.getElementById('alerta-erros-texto').textContent")).includes('13 campos'), 'resumo de erros incorreto');
  confirmar(await p.js('document.activeElement.id') === 'nome', 'foco não foi para o primeiro campo');
});

teste('Formulário', 'regras de consistência com mensagem por campo', async (p) => {
  await p.digitar('nome', 'Maria');
  await p.sairDoCampo();
  confirmar(await erroDo(p, 'nome') === 'Informe nome e sobrenome.', 'regra de sobrenome');
  await p.js("document.getElementById('nome').focus()");
  await p.cmd('Input.insertText', { text: ' Silva' });
  await esperar(80);
  confirmar(await erroDo(p, 'nome') === '', 'erro não sumiu ao corrigir');
  await p.digitar('cpf', '52998224724');
  await p.sairDoCampo();
  confirmar((await erroDo(p, 'cpf')).startsWith('CPF inválido'), 'dígito do CPF');
  await p.digitar('email', 'maria@exemplo');
  await p.sairDoCampo();
  confirmar((await erroDo(p, 'email')).includes('domínio'), 'domínio do e-mail');
  await p.digitar('telefone', '11887654321');
  await p.sairDoCampo();
  confirmar((await erroDo(p, 'telefone')).includes('começa com 9'), 'celular com 9');
});

teste('Formulário', 'doador precisa informar valor em múltiplos de R$ 5', async (p) => {
  await p.js("document.getElementById('tipo-doador').click()");
  confirmar(await p.js("document.getElementById('valor').required") === true, 'valor não ficou obrigatório');
  await p.digitar('valor', '12');
  await p.sairDoCampo();
  confirmar((await erroDo(p, 'valor')).includes('múltiplos de R$ 5'), 'regra de múltiplos');
  await p.js("document.getElementById('tipo-voluntario').click()");
  confirmar(await p.js("document.getElementById('valor').required") === false, 'valor continuou obrigatório');
});

teste('Formulário', 'envio válido abre o modal e grava um único cadastro', async (p, base) => {
  await p.abrir(`${base}index.html#/cadastro`);
  await p.js('localStorage.clear()');
  await preencherCadastroValido(p);
  await p.js(`const b = document.querySelector('button[type=submit]');
    b.click(); b.click(); document.getElementById('form-cadastro').requestSubmit();`);
  await esperar(1800);
  confirmar(await p.js("document.getElementById('modal-confirmacao').open") === true, 'modal não abriu');
  confirmar((await cadastrosSalvos(p)).length === 1, 'envio duplicado gravou mais de um cadastro');
  await p.js("document.getElementById('modal-confirmacao').close()");
});

// ---------------------------------------------------------- localStorage
teste('localStorage', 'rascunho é restaurado após recarregar, sem o CPF', async (p, base) => {
  await p.js("localStorage.removeItem('raizes:rascunho-cadastro')");
  await p.digitar('nome', 'Ana Souza');
  await p.digitar('cpf', '52998224725');
  await p.js("document.getElementById('tipo-doador').click()");
  await p.digitar('valor', '30');
  await esperar(600);
  await p.abrir(`${base}index.html#/cadastro`);
  confirmar(await p.js("document.getElementById('nome').value") === 'Ana Souza', 'nome não restaurado');
  confirmar(await p.js("document.getElementById('cpf').value") === '', 'CPF não deveria ser restaurado');
  confirmar(await p.js("document.getElementById('valor').required") === true, 'regra do doador não reaplicada');
});

teste('localStorage', 'lista de cadastros persiste e permite remover', async (p, base) => {
  await p.abrir(`${base}html/cadastro.html`);
  confirmar(await p.js("document.querySelectorAll('#meus-cadastros article').length") === 1, 'lista não persistiu');
  await p.clicar('[data-remover-cadastro]', 300);
  confirmar((await cadastrosSalvos(p)).length === 0, 'cadastro não foi removido');
});

teste('localStorage', 'dados adulterados ou corrompidos não quebram nem executam código', async (p, base) => {
  await p.js(`localStorage.setItem('raizes:cadastros', JSON.stringify([{ id: 'x',
    nome: '<img src=x onerror="window.__xss = 1">Teste', email: 'a@b.com', cidade: 'X', estado: 'SP',
    tipo: 'doador', projetos: [], enviadoEm: 'data-invalida' }]))`);
  await p.abrir(`${base}index.html#/cadastro`);
  confirmar(await p.js('window.__xss') === undefined, 'código injetado foi executado');
  confirmar(await p.js("document.querySelectorAll('#meus-cadastros img').length") === 0, 'HTML injetado foi interpretado');
  await p.js("localStorage.setItem('raizes:cadastros', '{quebrado')");
  await p.abrir(`${base}index.html#/cadastro`);
  confirmar(await titulo(p) === 'Cadastre-se', 'página quebrou com JSON corrompido');
});

teste('localStorage', 'nenhum CPF é gravado no navegador', async (p) => {
  const algum = await p.js(`Object.keys(localStorage).some((chave) =>
    /\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}/.test(localStorage.getItem(chave)))`);
  confirmar(!algum, 'há CPF no localStorage');
});

// --------------------------------------------------------------- Chart.js
teste('Chart.js', 'biblioteca só é baixada na página com gráfico', async (p, base) => {
  await p.abrir(`${base}index.html`);
  confirmar(await p.js('typeof window.Chart') === 'undefined', 'Chart.js baixado sem necessidade');
  await p.clicar('.menu a[href$="html/projetos.html"]', 2500);
  confirmar(await p.js("window.Chart?.getChart(document.querySelector('canvas[data-grafico]'))?.data.datasets[0].data.join()") === '5100,4200,2900', 'gráfico sem os dados da tabela');
});

teste('Chart.js', 'sem acesso ao CDN, a tabela aparece no lugar do gráfico', async (p, base) => {
  await p.cmd('Network.setBlockedURLs', { urls: ['*cdn.jsdelivr.net*'] });
  await p.cmd('Network.setCacheDisabled', { cacheDisabled: true });
  await p.abrir(`${base}html/projetos.html`, 1500);
  confirmar(await p.js("document.querySelector('.grafico').hidden") === true, 'gráfico vazio continuou visível');
  confirmar(await p.js("document.querySelector('.grafico-dados').open") === true, 'tabela não abriu');
  await p.cmd('Network.setBlockedURLs', { urls: [] });
  await p.cmd('Network.setCacheDisabled', { cacheDisabled: false });
});

// ------------------------------------------------------------- Execução
const { servidor, base } = await iniciarServidor(RAIZ);
const pagina = await abrirNavegador();
let falhas = 0;
let grupoAtual = '';

for (const { grupo, nome, executar } of testes) {
  if (grupo !== grupoAtual) {
    console.log(`\n${grupo}`);
    grupoAtual = grupo;
  }
  pagina.erros = [];
  try {
    await executar(pagina, base);
    confirmar(pagina.erros.length === 0, `erro no console: ${pagina.erros.join(' | ')}`);
    console.log(`  ✓ ${nome}`);
  } catch (erro) {
    falhas += 1;
    console.log(`  ✗ ${nome}\n      ${erro.message}`);
  }
}

console.log(`\n${testes.length - falhas} de ${testes.length} testes passaram.`);
await pagina.fechar();
servidor.close();
process.exit(falhas ? 1 : 0);
