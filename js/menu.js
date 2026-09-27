// Menu principal: botão hambúrguer (telas pequenas) e submenu dropdown.
// O CSS decide o que aparece a partir do atributo aria-expanded;
// aqui só alternamos esse estado e tratamos teclado e cliques fora.

function alternar(botao, aberto = botao.getAttribute('aria-expanded') !== 'true') {
  botao.setAttribute('aria-expanded', String(aberto));
}

const botaoMenu = document.querySelector('.menu-botao');
const botoesSubmenu = document.querySelectorAll('.submenu-botao');

if (botaoMenu) {
  botaoMenu.addEventListener('click', () => alternar(botaoMenu));
}

botoesSubmenu.forEach((botao) => {
  botao.addEventListener('click', () => alternar(botao));
});

// Ao escolher um link (inclusive âncoras na mesma página), o menu se fecha.
document.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', () => {
    botoesSubmenu.forEach((botao) => alternar(botao, false));
    if (botaoMenu) {
      alternar(botaoMenu, false);
    }
  });
});

// Esc fecha o que estiver aberto e devolve o foco ao botão que abriu.
document.addEventListener('keydown', (evento) => {
  if (evento.key !== 'Escape') {
    return;
  }
  const submenuAberto = document.querySelector('.submenu-botao[aria-expanded="true"]');
  if (submenuAberto) {
    alternar(submenuAberto, false);
    submenuAberto.focus();
  } else if (botaoMenu && botaoMenu.getAttribute('aria-expanded') === 'true') {
    alternar(botaoMenu, false);
    botaoMenu.focus();
  }
});

// Clique fora da navegação fecha menu e submenus.
document.addEventListener('click', (evento) => {
  if (evento.target.closest('.navegacao')) {
    return;
  }
  botoesSubmenu.forEach((botao) => alternar(botao, false));
  if (botaoMenu) {
    alternar(botaoMenu, false);
  }
});
