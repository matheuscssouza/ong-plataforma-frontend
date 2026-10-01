// Máscaras de CPF, telefone e CEP e conferência dos dígitos do CPF.
// Funções puras: recebem texto e devolvem texto (ou booleano), sem tocar no DOM.

export const somenteDigitos = (valor) => valor.replace(/\D/g, '');

export function mascaraCpf(valor) {
  return somenteDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function mascaraTelefone(valor) {
  let digitos = somenteDigitos(valor);
  // Número colado com o código do país (+55): o 55 é descartado.
  if (digitos.length > 11 && digitos.startsWith('55')) {
    digitos = digitos.slice(2);
  }
  return digitos
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

export function mascaraCep(valor) {
  return somenteDigitos(valor)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');
}

// Confere os dois dígitos verificadores do CPF.
export function cpfValido(cpf) {
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
