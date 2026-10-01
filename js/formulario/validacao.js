// Verificação de consistência do formulário de cadastro.
// Cada campo passa pelas regras nativas do HTML5 (required, pattern, min...)
// e por regras extras de negócio. O erro aparece no próprio campo (estilo +
// mensagem injetada no DOM) enquanto a pessoa preenche, e é resumido num
// alerta no topo quando ela tenta enviar.

import { cpfValido } from './mascaras.js';

const ORDEM_VALIDITY = [
  'valueMissing', 'badInput', 'typeMismatch', 'patternMismatch',
  'tooShort', 'rangeUnderflow', 'rangeOverflow', 'stepMismatch',
];

const MENSAGENS_PADRAO = {
  valueMissing: 'Este campo é obrigatório.',
  badInput: 'Valor inválido.',
  typeMismatch: 'Formato inválido.',
  patternMismatch: 'Formato inválido.',
  tooShort: 'Texto curto demais.',
  rangeUnderflow: 'Valor abaixo do permitido.',
  rangeOverflow: 'Valor acima do permitido.',
  stepMismatch: 'Valor fora do intervalo permitido.',
};

// Mensagens específicas por campo (pelo atributo name) e, em "extra",
// regras que o HTML não consegue expressar sozinho.
const REGRAS = {
  nome: {
    valueMissing: 'Informe seu nome completo.',
    tooShort: 'O nome precisa ter pelo menos 3 letras.',
    patternMismatch: 'Use apenas letras e espaços.',
    extra: (valor) => (valor.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : ''),
  },
  cpf: {
    valueMissing: 'Informe seu CPF.',
    patternMismatch: 'Complete o CPF no formato 000.000.000-00.',
    extra: (valor) => (cpfValido(valor) ? '' : 'CPF inválido: os dígitos verificadores não conferem.'),
  },
  nascimento: {
    valueMissing: 'Informe sua data de nascimento.',
    rangeOverflow: 'É preciso ter pelo menos 16 anos para se cadastrar.',
    rangeUnderflow: 'Confira o ano de nascimento.',
  },
  email: {
    valueMissing: 'Informe seu e-mail.',
    typeMismatch: 'Informe um e-mail válido, como nome@exemplo.com.',
    extra: (valor) => (/\.[a-z]{2,}$/i.test(valor) ? '' : 'O e-mail precisa terminar com um domínio, como .com ou .org.'),
  },
  telefone: {
    valueMissing: 'Informe um celular com DDD.',
    patternMismatch: 'Complete o celular no formato (00) 00000-0000.',
    extra: (valor) => (/^\([1-9]{2}\) 9/.test(valor) ? '' : 'Use um DDD válido; o número de celular começa com 9.'),
  },
  cep: {
    valueMissing: 'Informe o CEP.',
    patternMismatch: 'Complete o CEP no formato 00000-000.',
  },
  logradouro: { valueMissing: 'Informe a rua, avenida ou travessa.' },
  numero: {
    valueMissing: 'Informe o número ou S/N.',
    patternMismatch: 'Use apenas o número (ex.: 120 ou 120A) ou S/N.',
  },
  bairro: { valueMissing: 'Informe o bairro.' },
  cidade: { valueMissing: 'Informe a cidade.' },
  estado: { valueMissing: 'Selecione o estado.' },
  tipo: { valueMissing: 'Escolha como deseja participar.' },
  valor: {
    valueMissing: 'Informe o valor da doação mensal.',
    badInput: 'Digite apenas números.',
    rangeUnderflow: 'O valor mínimo é R$ 10.',
    rangeOverflow: 'O valor máximo é R$ 10.000.',
    stepMismatch: 'Use múltiplos de R$ 5 (ex.: 10, 15, 20).',
  },
  lgpd: { valueMissing: 'É preciso autorizar o uso dos dados para concluir o cadastro.' },
};

function camposValidaveis(formulario) {
  // Um representante por name: os três rádios de "tipo" contam como um campo.
  const porNome = new Map();
  formulario.querySelectorAll('input[name], select[name], textarea[name]').forEach((campo) => {
    if (campo.willValidate && !porNome.has(campo.name)) {
      porNome.set(campo.name, campo);
    }
  });
  return [...porNome.values()];
}

function mensagemDoCampo(campo) {
  campo.setCustomValidity('');
  const regra = REGRAS[campo.name] ?? {};
  const falha = ORDEM_VALIDITY.find((chave) => campo.validity[chave]);
  if (falha) {
    return regra[falha] ?? MENSAGENS_PADRAO[falha];
  }
  if (campo.value && regra.extra) {
    return regra.extra(campo.value);
  }
  return '';
}

function ajustarDescricao(campo, id, incluir) {
  const ids = new Set((campo.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean));
  if (incluir) {
    ids.add(id);
  } else {
    ids.delete(id);
  }
  if (ids.size) {
    campo.setAttribute('aria-describedby', [...ids].join(' '));
  } else {
    campo.removeAttribute('aria-describedby');
  }
}

// Mostra ou remove a mensagem de erro de um campo, alterando o DOM.
function exibirErro(formulario, campo, mensagem) {
  const grupo = campo.type === 'radio'
    ? formulario.querySelectorAll(`[name="${campo.name}"]`)
    : [campo];
  const conteiner = campo.closest('.campo, .grupo-opcoes, .consentimento');
  const id = `erro-${campo.name}`;
  let aviso = document.getElementById(id);

  if (mensagem) {
    if (!aviso) {
      aviso = document.createElement('p');
      aviso.className = 'mensagem-erro';
      aviso.id = id;
      conteiner.append(aviso);
    }
    aviso.textContent = mensagem;
  } else {
    aviso?.remove();
  }

  conteiner.classList.toggle('tem-erro', Boolean(mensagem));
  grupo.forEach((item) => {
    if (mensagem) {
      item.setAttribute('aria-invalid', 'true');
    } else {
      item.removeAttribute('aria-invalid');
    }
    ajustarDescricao(item, id, Boolean(mensagem));
  });
}

function validarCampo(formulario, campo) {
  const mensagem = mensagemDoCampo(campo);
  if (mensagem && campo.validity.valid) {
    campo.setCustomValidity(mensagem); // mantém :user-invalid coerente com a regra extra
  }
  exibirErro(formulario, campo, mensagem);
  return mensagem;
}

// Valida todos os campos; em caso de erro, monta o resumo com links para cada campo.
export function validarFormulario(formulario) {
  const erros = camposValidaveis(formulario)
    .map((campo) => ({ campo, mensagem: validarCampo(formulario, campo) }))
    .filter(({ mensagem }) => mensagem);

  const alerta = document.getElementById('alerta-erros');
  const texto = document.getElementById('alerta-erros-texto');
  const lista = document.getElementById('alerta-erros-lista');

  if (!erros.length) {
    alerta.hidden = true;
    return true;
  }

  texto.textContent = erros.length === 1
    ? 'Há 1 campo para corrigir:'
    : `Há ${erros.length} campos para corrigir:`;
  lista.replaceChildren(...erros.map(({ campo, mensagem }) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${campo.id || campo.name}`;
    link.textContent = mensagem;
    item.append(link);
    return item;
  }));
  alerta.hidden = false;
  focarCampo(erros[0].campo);
  return false;
}

function focarCampo(campo) {
  campo.focus({ preventScroll: true });
  campo.closest('.campo, .grupo-opcoes, .consentimento')?.scrollIntoView({ block: 'center' });
}

function limparValidacao(formulario) {
  camposValidaveis(formulario).forEach((campo) => {
    campo.setCustomValidity('');
    exibirErro(formulario, campo, '');
  });
  formulario.querySelectorAll('[data-alterado]').forEach((campo) => delete campo.dataset.alterado);
  document.getElementById('alerta-erros').hidden = true;
}

export function iniciarValidacao(formulario) {
  // Com JavaScript, as mensagens nativas dão lugar às mensagens da página.
  formulario.noValidate = true;

  const valor = formulario.querySelector('[name="valor"]');
  const ajudaValor = document.getElementById('ajuda-valor');

  // Regra entre campos: quem escolhe doar precisa informar o valor.
  function sincronizarDoacao() {
    const tipo = formulario.querySelector('[name="tipo"]:checked')?.value;
    valor.required = tipo === 'doador' || tipo === 'ambos';
    ajudaValor.textContent = valor.required
      ? 'Obrigatório para doadores. Valores de R$ 10 em diante, em múltiplos de R$ 5.'
      : 'Opcional. Valores de R$ 10 em diante, em múltiplos de R$ 5.';
    if (valor.dataset.alterado || valor.getAttribute('aria-invalid')) {
      validarCampo(formulario, valor);
    }
  }

  // Ao sair do campo, valida o que a pessoa alterou.
  formulario.addEventListener('focusout', (evento) => {
    const campo = evento.target;
    if (campo.name && campo.dataset.alterado) {
      validarCampo(formulario, campo);
    }
  });

  // Enquanto digita, um campo que já está com erro é revalidado em tempo real,
  // para a mensagem sumir assim que o problema for corrigido.
  formulario.addEventListener('input', (evento) => {
    const campo = evento.target;
    if (!campo.name) {
      return;
    }
    campo.dataset.alterado = 'true';
    if (campo.getAttribute('aria-invalid')) {
      validarCampo(formulario, campo);
    }
  });

  formulario.addEventListener('change', (evento) => {
    const campo = evento.target;
    if (campo.name === 'tipo') {
      sincronizarDoacao();
    }
    if (campo.type === 'radio' || campo.type === 'checkbox' || campo.tagName === 'SELECT') {
      campo.dataset.alterado = 'true';
      validarCampo(formulario, campo);
    }
  });

  formulario.addEventListener('reset', () => {
    // O reset limpa os valores depois deste evento; esperamos para recalcular.
    setTimeout(() => {
      limparValidacao(formulario);
      sincronizarDoacao();
    });
  });

  // Um rascunho restaurado pode já vir com "Doador" marcado.
  sincronizarDoacao();
}
