// Componentes de feedback reutilizáveis: toasts e modais.
// Uso sem escrever JavaScript, só com atributos no HTML:
//   <button data-toast="Mensagem" data-toast-tipo="erro">   → mostra um toast
//   <button data-abrir-modal="id-do-dialog">                 → abre o <dialog>
//   <button data-fechar-modal>  (dentro do dialog)           → fecha o <dialog>

function mostrarToast(mensagem, tipo = 'sucesso', duracao = 5000) {
  const area = document.querySelector('.toasts');
  if (!area) {
    return;
  }

  const toast = document.createElement('div');
  toast.className = tipo === 'erro' ? 'toast toast-erro' : 'toast';

  const texto = document.createElement('p');
  texto.textContent = mensagem;

  const fechar = document.createElement('button');
  fechar.type = 'button';
  fechar.className = 'toast-fechar';
  fechar.setAttribute('aria-label', 'Fechar notificação');
  fechar.textContent = '×';
  fechar.addEventListener('click', () => toast.remove());

  toast.append(texto, fechar);
  area.append(toast);
  setTimeout(() => toast.remove(), duracao);
}

document.querySelectorAll('[data-toast]').forEach((botao) => {
  botao.addEventListener('click', () => {
    mostrarToast(botao.dataset.toast, botao.dataset.toastTipo);
  });
});

document.querySelectorAll('[data-abrir-modal]').forEach((botao) => {
  botao.addEventListener('click', () => {
    document.getElementById(botao.dataset.abrirModal)?.showModal();
  });
});

document.querySelectorAll('dialog.modal').forEach((modal) => {
  // Clique no fundo escurecido (fora da caixa) fecha o modal; Esc já é nativo.
  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) {
      modal.close();
    }
  });
  modal.querySelectorAll('[data-fechar-modal]').forEach((botao) => {
    botao.addEventListener('click', () => modal.close());
  });
});
