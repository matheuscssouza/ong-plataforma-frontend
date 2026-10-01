// Acesso ao localStorage. O localStorage só guarda texto, então os dados
// passam por JSON.stringify ao gravar e JSON.parse ao ler.
// Os erros são tratados aqui (navegação privada, cota cheia ou JSON
// corrompido) para o resto da aplicação nunca quebrar por causa deles.

export const CHAVES = {
  rascunho: 'raizes:rascunho-cadastro',
  cadastros: 'raizes:cadastros',
  tema: 'raizes:tema',
};

export function lerJSON(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch {
    return padrao;
  }
}

export function salvarJSON(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function removerChave(chave) {
  try {
    localStorage.removeItem(chave);
  } catch {
    // Sem acesso ao armazenamento: não há o que remover.
  }
}
