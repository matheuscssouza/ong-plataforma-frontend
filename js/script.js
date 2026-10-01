// Máscaras e validações complementares do formulário de cadastro.
// As regras básicas (required, pattern, type, min/max) ficam no HTML;
// aqui só entra o que o HTML5 não faz sozinho.

const somenteDigitos = (valor) => valor.replace(/\D/g, '');

function mascaraCpf(valor) {
  return somenteDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascaraTelefone(valor) {
  return somenteDigitos(valor)
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

function mascaraCep(valor) {
  return somenteDigitos(valor)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');
}

// Confere os dois dígitos verificadores do CPF.
function cpfValido(cpf) {
  const d = somenteDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) {
    return false;
  }
  for (let posicao = 9; posicao <= 10; posicao++) {
    let soma = 0;
    for (let i = 0; i < posicao; i++) {
      soma += Number(d[i]) * (posicao + 1 - i);
    }
    const digito = (soma * 10) % 11 % 10;
    if (digito !== Number(d[posicao])) {
      return false;
    }
  }
  return true;
}

function focarElementoSemRolar(elemento) {
  if (!elemento) {
    return;
  }
  elemento.setAttribute('tabindex', '-1');
  elemento.focus({ preventScroll: true });
}

// Liga máscaras, validações e envio ao formulário de cadastro.
// Chamada ao carregar a página e, na SPA, sempre que o roteador
// injeta o formulário no <main>.
function iniciarCadastro() {
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
    salvarJSON(CHAVES.cadastros, cadastros);
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

  formulario.addEventListener('submit', (evento) => {
    // Sem servidor neste projeto: o envio é simulado depois da verificação.
    evento.preventDefault();
    if (!validarFormulario(formulario)) {
      return;
    }
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

iniciarCadastro();
