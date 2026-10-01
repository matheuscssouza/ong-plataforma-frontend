// Acesso ao localStorage. O localStorage só guarda texto, então os dados
// passam por JSON.stringify ao gravar e JSON.parse ao ler.
// Os erros são tratados aqui (navegação privada, cota cheia ou JSON
// corrompido) para o resto da aplicação nunca quebrar por causa deles.

const CHAVES = {
  rascunho: 'raizes:rascunho-cadastro',
  cadastros: 'raizes:cadastros',
};

function lerJSON(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch {
    return padrao;
  }
}

function salvarJSON(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

function removerChave(chave) {
  try {
    localStorage.removeItem(chave);
  } catch {
    // Sem acesso ao armazenamento: não há o que remover.
  }
}
