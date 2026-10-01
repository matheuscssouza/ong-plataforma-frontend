// Seletor de tema: do sistema, claro, escuro ou alto contraste.
// O CSS troca as cores pelo atributo data-tema do <html>; "do sistema"
// remove o atributo e deixa valer prefers-color-scheme e prefers-contrast.

import { CHAVES, lerJSON, salvarJSON } from '../servicos/armazenamento.js';

const TEMAS = ['claro', 'escuro', 'alto-contraste'];

function aplicarTema(tema) {
  if (TEMAS.includes(tema)) {
    document.documentElement.dataset.tema = tema;
  } else {
    delete document.documentElement.dataset.tema;
  }
  // Componentes que leem cores das variáveis CSS (como o gráfico) se redesenham.
  document.dispatchEvent(new CustomEvent('tema-alterado'));
}

export function iniciarTema() {
  const seletor = document.getElementById('tema');
  if (!seletor) {
    return;
  }
  const salvo = lerJSON(CHAVES.tema, 'sistema');
  seletor.value = TEMAS.includes(salvo) ? salvo : 'sistema';

  seletor.addEventListener('change', () => {
    salvarJSON(CHAVES.tema, seletor.value);
    aplicarTema(seletor.value);
  });

  // Mudanças do próprio sistema (ex.: modo escuro automático à noite) também redesenham.
  ['(prefers-color-scheme: dark)', '(prefers-contrast: more)'].forEach((consulta) => {
    matchMedia(consulta).addEventListener('change', () => {
      document.dispatchEvent(new CustomEvent('tema-alterado'));
    });
  });
}
