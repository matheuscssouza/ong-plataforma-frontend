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

// Delegação de eventos: um único ouvinte no documento atende também
// aos botões e modais que a SPA injetar depois do carregamento.
document.addEventListener('click', (evento) => {
  const alvo = evento.target;

  // Clique no fundo escurecido (fora da caixa) fecha o modal; Esc já é nativo.
  if (alvo instanceof HTMLDialogElement && alvo.classList.contains('modal')) {
    alvo.close();
    return;
  }

  const botaoToast = alvo.closest('[data-toast]');
  if (botaoToast) {
    mostrarToast(botaoToast.dataset.toast, botaoToast.dataset.toastTipo);
    return;
  }

  const botaoAbrir = alvo.closest('[data-abrir-modal]');
  if (botaoAbrir) {
    document.getElementById(botaoAbrir.dataset.abrirModal)?.showModal();
    return;
  }

  const botaoFechar = alvo.closest('[data-fechar-modal]');
  if (botaoFechar) {
    botaoFechar.closest('dialog')?.close();
  }
});
