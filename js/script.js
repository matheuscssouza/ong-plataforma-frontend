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

  // Verificação de consistência (js/validacao.js): mensagens por campo e resumo no envio.
  iniciarValidacao(formulario);

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

    const primeiroNome = formulario.nome.value.trim().split(' ')[0];

    setTimeout(() => {
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
    if (!resetAposEnvio) {
      mostrarToast('Formulário limpo.');
    }
    resetAposEnvio = false;
  });
}

iniciarCadastro();
