// Ponto de entrada: o único script que as páginas carregam (type="module").
// Cada módulo cuida de uma responsabilidade; aqui eles só são ligados.

import { iniciarMenu } from './componentes/menu.js';
import { iniciarFeedback } from './componentes/feedback.js';
import { renderizarComponentes } from './componentes/templates.js';
import { renderizarGraficos } from './componentes/grafico.js';
import { iniciarCadastro } from './formulario/cadastro.js';
import { iniciarRoteador } from './roteador.js';

// Prepara o conteúdo de uma página: no carregamento e, na SPA, a cada troca.
function iniciarConteudo(raiz) {
  renderizarComponentes(raiz);
  renderizarGraficos(raiz);
  iniciarCadastro();
}

iniciarMenu();
iniciarFeedback();
iniciarConteudo(document);

// Só o index.html é a casca da SPA; as páginas de html/ também funcionam sozinhas.
if (document.body.hasAttribute('data-spa')) {
  iniciarRoteador(iniciarConteudo);
}
