# EP3 · Etapa 2 — Navegação de página única (SPA)

```text
ABORDAGEM
Usei roteamento por hash (#/projetos, #/cadastro) em js/router.js. O index.html é a casca da aplicação: cabeçalho, menu e rodapé ficam fixos, e só o conteúdo de <main id="conteudo"> é trocado. Escolhi o hash porque o GitHub Pages não tem servidor configurável: um endereço como /projetos daria erro 404 ao recarregar, enquanto o trecho depois do # nunca vai ao servidor. Mantive os links apontando para os arquivos reais (html/projetos.html). Assim, sem JavaScript ou se o carregamento falhar, a navegação comum continua funcionando (aprimoramento progressivo).

FLUXO
1) Um único ouvinte de clique no document (delegação) captura todos os links, inclusive os injetados depois. Se o link aponta para uma página da tabela ROTAS, o padrão é cancelado e o hash é alterado.
2) O evento hashchange chama renderizar(), que também atende aos botões Voltar e Avançar e à entrada direta por um link compartilhado.
3) renderizar() busca o arquivo com fetch, interpreta com DOMParser, guarda o resultado em cache e converte os caminhos relativos (../imagens) em absolutos.
4) O DOM é atualizado de uma vez com replaceChildren(), trocando só os filhos do <main>.
5) Depois da troca: o <title> é atualizado, o menu recebe aria-current, os comportamentos da página são religados (iniciarCadastro) e o foco vai para o <h1>, para o leitor de tela anunciar a nova página. Rotas inexistentes exibem "Página não encontrada".

TRECHO PRINCIPAL (resumido; o arquivo completo também trata âncoras locais, cache, erros e rota inexistente)
const ROTAS = {
  '/': 'index.html',
  '/projetos': 'html/projetos.html',
  '/cadastro': 'html/cadastro.html',
  '/componentes': 'html/componentes.html',
};

document.addEventListener('click', (evento) => {
  const link = evento.target.closest('a[href]');
  const rota = link && rotaDoLink(link);
  if (!rota) return;
  evento.preventDefault();
  location.hash = rota; // dispara o hashchange
});

window.addEventListener('hashchange', () => renderizar(rotaAtual()));

async function renderizar(rota) {
  const [caminho, ancora] = rota.split('#');
  const pagina = await carregarPagina(ROTAS[caminho]);
  principal.replaceChildren(...pagina.conteudo.cloneNode(true).childNodes);
  document.title = pagina.titulo;
  marcarMenu(caminho);
  iniciarCadastro();
  focarElemento(ancora ? document.getElementById(ancora) : principal.querySelector('h1'));
}

Testei no navegador as trocas de página, as âncoras (#/projetos#doacoes), Voltar e Avançar, a entrada direta, a rota inválida e o envio do cadastro dentro da SPA, sem recarregar o documento e sem erros no console.
```
