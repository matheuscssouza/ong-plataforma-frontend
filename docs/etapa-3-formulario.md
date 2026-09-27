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
