# Etapa 3 — Formulários interativos e cadastro

## Agrupamento lógico dos campos (`fieldset` e `legend`)

O formulário de cadastro.html foi dividido em três `<fieldset>`, cada um com uma `<legend>` que nomeia o grupo. O leitor de tela anuncia essa legenda ao entrar no grupo, o que dá contexto semântico além do visual.

1) "Dados pessoais": nome completo (type="text"), CPF (text com inputmode="numeric", que abre o teclado numérico no celular), data de nascimento (type="date"), e-mail (type="email") e telefone celular (type="tel").

2) "Endereço": CEP, logradouro, número, complemento, bairro e cidade em campos de texto, e o estado em um `<select>` com as 27 unidades da federação, o que evita erros de digitação.

3) "Como deseja participar": para os grupos de opções, usei `<fieldset>` aninhados com legenda própria. "Tipo de apoio" traz botões de rádio (voluntário, doador ou ambos), pois só uma escolha é possível. "Projetos de interesse" usa caixas de seleção (checkbox), que permitem várias escolhas. Completam o grupo a disponibilidade (`<select>`), o valor da doação (type="number") e uma `<textarea>` para mensagem.

Cada campo tem um `<label>` cujo atributo for aponta para o id do input. Assim, clicar no rótulo foca o campo, e o leitor de tela lê o nome correto. O atributo name identifica o dado no envio, e o autocomplete (name, email, bday, postal-code etc.) permite que o navegador preencha as informações. Fora dos grupos ficam o consentimento da LGPD e os botões de enviar e limpar.
