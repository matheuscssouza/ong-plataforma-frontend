# Etapa 3 — Formulários interativos e cadastro

## Agrupamento lógico dos campos (`fieldset` e `legend`)

O formulário de cadastro.html foi dividido em três `<fieldset>`, cada um com uma `<legend>` que nomeia o grupo. O leitor de tela anuncia essa legenda ao entrar no grupo, o que dá contexto semântico além do visual.

1) "Dados pessoais": nome completo (type="text"), CPF (text com inputmode="numeric", que abre o teclado numérico no celular), data de nascimento (type="date"), e-mail (type="email") e telefone celular (type="tel").

2) "Endereço": CEP, logradouro, número, complemento, bairro e cidade em campos de texto, e o estado em um `<select>` com as 27 unidades da federação, o que evita erros de digitação.

3) "Como deseja participar": para os grupos de opções, usei `<fieldset>` aninhados com legenda própria. "Tipo de apoio" traz botões de rádio (voluntário, doador ou ambos), pois só uma escolha é possível. "Projetos de interesse" usa caixas de seleção (checkbox), que permitem várias escolhas. Completam o grupo a disponibilidade (`<select>`), o valor da doação (type="number") e uma `<textarea>` para mensagem.

Cada campo tem um `<label>` cujo atributo for aponta para o id do input. Assim, clicar no rótulo foca o campo, e o leitor de tela lê o nome correto. O atributo name identifica o dado no envio, e o autocomplete (name, email, bday, postal-code etc.) permite que o navegador preencha as informações. Fora dos grupos ficam o consentimento da LGPD e os botões de enviar e limpar.

## Campos e justificativa do atributo `type`

Enviadas na plataforma as 10 primeiras entradas (limite de 10); "Consentimento LGPD" ficou apenas neste registro.

| Nome do campo | Atributo type e justificativa |
|---|---|
| E-mail | type="email": o navegador exige o formato nome@dominio e o celular mostra teclado com @ e ponto. |
| Data de nascimento | type="date": abre um calendário nativo e grava a data no formato padrão AAAA-MM-DD, evitando datas escritas de formas diferentes. |
| Telefone celular | type="tel": abre o teclado telefônico no celular; não valida formato sozinho, pois cada país usa um padrão diferente. |
| CPF | type="text" com inputmode="numeric": é um código que pode começar com zero e terá pontuação, não um número para cálculo. |
| Valor da doação | type="number": aceita só números, mostra setas de incremento e teclado numérico, pois é um valor usado em cálculo. |
| Nome completo | type="text": texto livre com letras, espaços e acentos; autocomplete="name" permite ao navegador preencher o nome. |
| CEP | type="text" com inputmode="numeric": como o CPF, é um código com zeros à esquerda e hífen, não uma quantidade. |
| Logradouro, bairro e cidade | type="text": nomes livres; autocomplete (address-line1, address-level2) ajuda o navegador a preencher o endereço. |
| Tipo de apoio | type="radio" com o mesmo name: só uma opção pode ser marcada (voluntário, doador ou ambos). |
| Projetos de interesse | type="checkbox": permite marcar vários projetos ao mesmo tempo. |
| Consentimento LGPD | type="checkbox": uma única caixa que registra a autorização explícita da pessoa. |

Estado, disponibilidade e mensagem não usam `type`: são `<select>` (lista fechada de opções) e `<textarea>` (texto longo).

## Validações nativas e máscaras

| Nome do campo | Código da validação ou máscara aplicada |
|---|---|
| CPF | `pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" required maxlength="14" title="Formato: 000.000.000-00"` |
| Telefone celular | `pattern="\(\d{2}\) \d{5}-\d{4}" required maxlength="15" title="Formato: (00) 00000-0000"` |
| CEP | `pattern="\d{5}-\d{3}" required maxlength="9" title="Formato: 00000-000"` |
| Máscaras (CPF, telefone, CEP) | `JS no evento input: cpf.value = mascaraCpf(cpf.value), que insere pontos e hífen enquanto a pessoa digita` |
| CPF (dígitos verificadores) | `cpf.setCustomValidity(cpfValido(cpf.value) ? '' : 'CPF inválido') bloqueia o envio de CPF com dígito errado` |
| Nome completo | `required minlength="3" maxlength="100" pattern="[A-Za-zÀ-ÿ' ]+" title="Use apenas letras e espaços."` |
| E-mail | `type="email" required maxlength="120"` |
| Data de nascimento | `type="date" required min="1920-01-01" max="2010-12-31" (o JS ajusta o max para 16 anos atrás)` |
| Valor da doação | `type="number" min="10" max="10000" step="5"` |
| Tipo de apoio e LGPD | `required no radio (uma opção obrigatória) e required no checkbox de consentimento` |

## Validações nativas e integridade dos dados

As validações nativas do HTML5 funcionam como uma primeira barreira: o navegador verifica cada campo e bloqueia o envio do formulário enquanto houver algum dado inválido, sem precisar de código extra.

No cadastro.html, o atributo required impede campos essenciais vazios, como nome, CPF e o consentimento da LGPD. O pattern aplica uma expressão regular que precisa corresponder ao valor inteiro: o CPF só é aceito como 000.000.000-00, o telefone como (00) 00000-0000 e o CEP como 00000-000. Assim, todos os registros chegam no mesmo formato, o que facilita armazenar, buscar e comparar dados. Os tipos também validam: type="email" exige um endereço bem formado, type="date" garante uma data real e type="number" com min, max e step limita o valor da doação. Já minlength e maxlength evitam textos curtos demais ou excessivos.

Quando algo falha, o navegador exibe a mensagem do atributo title e destaca o campo com a pseudoclasse :user-invalid, orientando a correção no mesmo momento. Onde o HTML não alcança, entra o JavaScript: setCustomValidity integra à validação nativa a conferência dos dígitos verificadores do CPF, que uma expressão regular não consegue calcular.

O resultado é menos erro de digitação e menos requisições inúteis ao servidor. Mas essa validação pode ser desativada pelo usuário, então não substitui a segurança: o servidor deve validar os dados novamente antes de gravá-los.
