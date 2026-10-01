// Formulário de cadastro: máscaras, rascunho, envio e lista de cadastros.
// Orquestra os módulos de máscara, validação, armazenamento e feedback.

import { mascaraCpf, mascaraTelefone, mascaraCep } from './mascaras.js';
import { iniciarValidacao, validarFormulario } from './validacao.js';
import { CHAVES, lerJSON, salvarJSON, removerChave } from '../servicos/armazenamento.js';
import { mostrarToast } from '../componentes/feedback.js';
import { renderizarComponentes } from '../componentes/templates.js';

function focarElementoSemRolar(elemento) {
  if (!elemento) {
    return;
  }
  elemento.setAttribute('tabindex', '-1');
  elemento.focus({ preventScroll: true });
}

// Liga máscaras, validações, rascunho e envio ao formulário de cadastro.
// Chamada ao carregar a página e, na SPA, sempre que o roteador
// injeta o formulário no <main>.
export function iniciarCadastro() {
  const formulario = document.getElementById('form-cadastro');
  if (!formulario || formulario.dataset.iniciado) {
    return;
  }
  formulario.dataset.iniciado = 'true';

  const cpf = document.getElementById('cpf');
  const telefone = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const nascimento = document.getElementById('nascimento');

  // O evento "input" dispara a cada tecla digitada ou texto colado.
  cpf.addEventListener('input', () => {
    cpf.value = mascaraCpf(cpf.value);
  });

  telefone.addEventListener('input', () => {
    telefone.value = mascaraTelefone(telefone.value);
  });

  cep.addEventListener('input', () => {
    cep.value = mascaraCep(cep.value);
  });

  // Idade mínima de 16 anos, calculada a partir da data de hoje.
  const limite = new Date();
  limite.setFullYear(limite.getFullYear() - 16);
  nascimento.max = limite.toISOString().slice(0, 10);

  // --- Rascunho no localStorage ---
  // O CPF e o consentimento ficam de fora: dado sensível não é guardado no navegador.
  const NAO_GUARDAR = ['cpf', 'lgpd'];
  let temporizadorRascunho;

  function lerFormulario() {
    const dadosFormulario = new FormData(formulario);
    const dados = Object.fromEntries(dadosFormulario);
    dados.projetos = dadosFormulario.getAll('projetos');
    NAO_GUARDAR.forEach((nome) => delete dados[nome]);
    return dados;
  }

  function preencherFormulario(dados) {
    Object.entries(dados).forEach(([nome, valor]) => {
      if (nome === 'projetos') {
        formulario.querySelectorAll('[name="projetos"]').forEach((caixa) => {
          caixa.checked = valor.includes(caixa.value);
        });
        return;
      }
      const campo = formulario.elements.namedItem(nome);
      if (campo) {
        campo.value = valor; // em grupos de rádio, marca a opção com esse valor
      }
    });
  }

  function salvarRascunho() {
    const dados = lerFormulario();
    const preenchido = Object.values(dados).some((valor) => (Array.isArray(valor) ? valor.length : valor));
    if (preenchido) {
      salvarJSON(CHAVES.rascunho, dados);
    } else {
      removerChave(CHAVES.rascunho);
    }
  }

  // Grava 400 ms depois da última alteração, em vez de a cada tecla.
  function agendarRascunho() {
    clearTimeout(temporizadorRascunho);
    temporizadorRascunho = setTimeout(salvarRascunho, 400);
  }

  const rascunho = lerJSON(CHAVES.rascunho, null);
  if (rascunho) {
    preencherFormulario(rascunho);
    mostrarToast('Recuperamos o rascunho do seu cadastro. Use "Limpar" para recomeçar.');
  }
  formulario.addEventListener('input', agendarRascunho);
  formulario.addEventListener('change', agendarRascunho);

  // Verificação de consistência (js/validacao.js): mensagens por campo e resumo no envio.
  iniciarValidacao(formulario);

  // --- Cadastros enviados, guardados como array no localStorage ---
  const secaoCadastros = document.getElementById('meus-cadastros');

  function guardarCadastro(dados) {
    const cadastros = lerJSON(CHAVES.cadastros, []);
    cadastros.push({
      id: Date.now().toString(36),
      nome: dados.nome,
      email: dados.email,
      cidade: dados.cidade,
      estado: dados.estado,
      tipo: dados.tipo,
      projetos: dados.projetos,
      enviadoEm: new Date().toISOString(),
    });
    if (!salvarJSON(CHAVES.cadastros, cadastros)) {
      mostrarToast('Não foi possível salvar o cadastro neste navegador (armazenamento cheio ou bloqueado).', 'erro', 8000);
    }
    renderizarComponentes(secaoCadastros);
  }

  secaoCadastros?.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-remover-cadastro]');
    if (!botao) {
      return;
    }
    const restantes = lerJSON(CHAVES.cadastros, [])
      .filter((cadastro) => cadastro.id !== botao.dataset.removerCadastro);
    salvarJSON(CHAVES.cadastros, restantes);
    renderizarComponentes(secaoCadastros);
    focarElementoSemRolar(secaoCadastros.querySelector('h2'));
    mostrarToast('Cadastro removido deste navegador.');
  });

  // --- Feedback do envio ---
  const botaoEnviar = formulario.querySelector('button[type="submit"]');
  const modal = document.getElementById('modal-confirmacao');
  let resetAposEnvio = false;

  let enviando = false;

  formulario.addEventListener('submit', (evento) => {
    // Sem servidor neste projeto: o envio é simulado depois da verificação.
    evento.preventDefault();
    // Um envio por vez: ignora cliques duplos, Enter repetido e requestSubmit().
    if (enviando || !validarFormulario(formulario)) {
      return;
    }
    enviando = true;
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando…';

    const dados = lerFormulario();
    const primeiroNome = dados.nome.trim().split(' ')[0];

    setTimeout(() => {
      guardarCadastro(dados);
      clearTimeout(temporizadorRascunho);
      removerChave(CHAVES.rascunho);
      resetAposEnvio = true;
      formulario.reset();
      botaoEnviar.disabled = false;
      enviando = false;
      botaoEnviar.textContent = 'Enviar cadastro';
      document.getElementById('modal-confirmacao-texto').textContent =
        `Obrigado, ${primeiroNome}! Seu cadastro foi recebido e nossa equipe entrará em contato em até 3 dias úteis.`;
      modal.showModal();
    }, 1200);
  });

  formulario.addEventListener('reset', () => {
    clearTimeout(temporizadorRascunho);
    removerChave(CHAVES.rascunho);
    if (!resetAposEnvio) {
      mostrarToast('Formulário limpo.');
    }
    resetAposEnvio = false;
  });
}
