# EP3 · Etapa 3 — Retenção de dados no navegador (localStorage)

```text
O QUE É GUARDADO (duas chaves no localStorage)
1) "raizes:rascunho-cadastro": um objeto com o que já foi digitado no formulário (nome, e-mail, endereço, tipo de apoio, projetos marcados, valor etc.). Se a aba fechar ou a página recarregar, nada se perde.
2) "raizes:cadastros": um array com os cadastros enviados (nome, e-mail, cidade, estado, tipo, projetos e data de envio), exibido na seção "Cadastros feitos neste navegador".
Por privacidade (LGPD), o CPF e o consentimento nunca são gravados: o localStorage não é criptografado e pode ser lido por qualquer script da página.

GRAVAR (set)
Centralizei o acesso em js/armazenamento.js. salvarJSON(chave, valor) executa localStorage.setItem(chave, JSON.stringify(valor)), já que o localStorage só aceita texto. O rascunho é montado com new FormData(formulario), convertido em objeto com Object.fromEntries e com os projetos marcados obtidos por getAll('projetos'). Os eventos input e change disparam a gravação com um atraso de 400 ms (debounce), para não gravar a cada tecla. No envio, o cadastro recebe um id e a data em ISO (toISOString), entra no array com push() e o array inteiro é gravado de novo. O rascunho é apagado com removeItem.

RECUPERAR (get + parse)
lerJSON(chave, padrao) faz localStorage.getItem(chave) e, se houver texto, JSON.parse(texto), devolvendo o objeto ou array original. Tudo fica dentro de try/catch: se o armazenamento estiver bloqueado ou o JSON estiver corrompido, a função devolve o valor padrão (null ou []) e a página continua funcionando.

RESTAURAR A INTERFACE NO CARREGAMENTO
- Rascunho: ao abrir o cadastro, preencherFormulario() percorre o objeto e devolve cada valor ao campo pelo name (formulario.elements.namedItem); em grupos de rádio, atribuir o valor marca a opção certa, e as caixas de projeto são marcadas conforme o array. Um toast avisa que o rascunho foi recuperado, e a regra "doador precisa informar valor" é reaplicada.
- Lista: o sistema de templates lê o array com lerJSON, inverte a ordem (mais recentes primeiro) e clona o <template id="tpl-cadastro"> para cada item, preenchendo por textContent. Com o array vazio, aparece "Nenhum cadastro foi feito neste navegador ainda.". O botão Remover filtra o array pelo id, grava de novo e redesenha a lista.

Testei no navegador: o rascunho volta depois de recarregar, a lista permanece entre recarregamentos, a remoção funciona, um JSON corrompido não quebra a página e nenhum CPF chega ao localStorage.
```
