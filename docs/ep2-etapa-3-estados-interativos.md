# EP2 · Etapa 3 — Estados interativos de botões e formulários

```text
Tratei os estados como uma sequência lógica, sempre com transition de 0.2s (variável --transicao) em background-color, border-color, box-shadow e transform, para que cada mudança seja percebida sem ser brusca.

BOTÕES (.botao e .botao-secundario)
- Padrão: fundo --cor-primaria (#1f6f4a), texto branco e borda de 2px transparente, que reserva o espaço para a borda do botão secundário e evita que ele "pule" de tamanho.
- :hover: fundo escurece para --cor-primaria-escura (#154d33), ganha a sombra --sombra-botao (0 4px 12px com verde a 25%) e sobe 1px com transform: translateY(-1px). No secundário, o fundo branco vira --cor-primaria-clara e a borda escurece.
- :focus-visible: contorno de 3px em verde-escuro com outline-offset de 2px, mais a mesma sombra. Uso :focus-visible, e não :focus, para o contorno aparecer na navegação por teclado sem poluir o clique do mouse.
- :active: a sombra some e o botão volta ao lugar com scale(0.98), simulando o pressionar.
- :disabled e [aria-disabled="true"]: fundo cinza --cor-desabilitado (#e3e8e5), texto --cor-texto-suave (contraste de 6,2:1), sem sombra nem movimento e cursor: not-allowed.
- Os botões do menu (hambúrguer e seta do submenu) seguem a mesma lógica: hover com fundo verde-claro, foco com contorno e active com scale(0.96).

FORMULÁRIO
- Neutro: borda --cor-borda-campo (#7a8a81, contraste de 3,6:1). No :hover, a borda escurece; no :focus-visible, fica verde e recebe contorno de 3px. Rádios e checkboxes usam accent-color com a cor primária.
- Sucesso (:user-valid): borda verde (--cor-sucesso) e ícone de check à direita, aplicado como background-image em SVG.
- Erro (:user-invalid): borda --cor-erro (#b3261e), fundo --cor-erro-clara e ícone de alerta. Com o seletor :has(), o rótulo e o texto de ajuda do campo também ficam vermelhos, e um ::after exibe "Verifique este campo.". O grupo de rádios obrigatório ganha borda vermelha quando fica sem resposta.
- Uso :user-valid/:user-invalid, e não :valid/:invalid, porque só são aplicados depois que a pessoa interage com o campo ou tenta enviar: o formulário não abre cheio de erros.

A cor nunca é o único sinal: ícone e texto acompanham o vermelho e o verde, como pede a WCAG 1.4.1, pensando em pessoas com daltonismo.
```
