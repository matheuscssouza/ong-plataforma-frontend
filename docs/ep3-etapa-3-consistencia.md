# EP3 · Etapa 3 — Verificação de consistência em formulários

```text
As rotinas ficam em js/validacao.js. Com JavaScript ativo, o formulário recebe noValidate = true: as regras nativas do HTML5 continuam valendo, mas as mensagens passam a ser da própria página, mais claras e no padrão visual do site. Sem JavaScript, a validação nativa do navegador continua funcionando.

CRITÉRIOS
1) Regras nativas lidas pela Constraint Validation API (campo.validity): campos obrigatórios vazios (valueMissing), formato (patternMismatch no CPF, telefone, CEP, nome e número; typeMismatch no e-mail), tamanho mínimo (tooShort), faixa de valores (rangeOverflow/Underflow na idade mínima de 16 anos e na doação de R$ 10 a R$ 10.000) e múltiplos de R$ 5 (stepMismatch).
2) Regras extras de consistência, que o HTML não expressa: nome com pelo menos nome e sobrenome; CPF com dígitos verificadores corretos; e-mail terminando em domínio (.com, .org); celular com DDD válido e número começando com 9.
3) Regra entre campos: ao escolher "Doador" ou "Voluntário e doador", o valor da doação passa a ser obrigatório, e o texto de ajuda muda para avisar isso.
Cada campo tem uma mensagem específica, como "CPF inválido: os dígitos verificadores não conferem.", em vez de um genérico "campo inválido".

QUANDO VERIFICA
- focusout: ao sair de um campo alterado.
- input: enquanto a pessoa digita num campo que já está com erro, a mensagem some assim que o problema é corrigido (tempo real).
- change: em rádios, caixas de seleção e listas.
- submit: preventDefault() e verificação de todos os campos; o envio só segue se tudo estiver correto.

NOTIFICAÇÃO VISUAL (manipulação do DOM)
- No campo: aria-invalid="true" ativa o estilo de erro (borda e fundo vermelhos e ícone de alerta), a classe tem-erro deixa o rótulo vermelho e um <p class="mensagem-erro"> é criado com createElement e inserido logo abaixo, ligado ao campo por aria-describedby para o leitor de tela ler o erro. Quando o erro é corrigido, o parágrafo é removido e o campo volta ao normal ou ganha o ✓ verde.
- No envio: um alerta role="alert" no topo lista "Há N campos para corrigir", com um link para cada erro que leva direto ao campo, e o foco vai para o primeiro campo com problema.

Testei 11 cenários no navegador (envio vazio, nome sem sobrenome, CPF errado, e-mail sem domínio, telefone fixo, menor de 16 anos, doação exigida para doadores, links do resumo, limpar e envio válido), sem erros no console.
```
