# EP3 · Etapa 3 — Interatividade com eventos

```text
Organizei os ouvintes por área, e nos elementos que a SPA troca usei delegação de eventos: um único addEventListener no document identifica o alvo com event.target.closest(). Assim, botões e links injetados depois do carregamento funcionam sem registrar ouvintes de novo.

NAVEGAÇÃO (router.js)
- click no document: se o link aponta para uma página interna, preventDefault() cancela o carregamento normal e o hash recebe a rota (#/projetos). Âncoras locais, como "Contato", também usam preventDefault(): a página rola até o destino e o foco vai para ele, sem perder a rota atual.
- hashchange na window: busca a página, troca o conteúdo do <main> com replaceChildren(), atualiza o <title>, marca o menu com aria-current e move o foco para o <h1>. O mesmo evento atende aos botões Voltar e Avançar.

MENU (menu.js)
- click no botão hambúrguer e na seta do submenu: alterna aria-expanded entre true e false. O CSS lê esse atributo para abrir o painel e girar o ícone, então o estilo muda sem manipular classes.
- click nos links do menu e fora da navegação: fecha o menu e os submenus.
- keydown no document: a tecla Esc fecha o que estiver aberto e devolve o foco ao botão que o abriu.

FORMULÁRIO DE CADASTRO (script.js)
- input no CPF, telefone e CEP: a cada tecla, o valor é reformatado pela máscara. No CPF completo, setCustomValidity() marca o campo como inválido se os dígitos verificadores não conferirem; o CSS (:user-invalid) então pinta o campo de vermelho e mostra o ícone e a mensagem.
- invalid (na fase de captura): a cada campo reprovado pela validação nativa, o name entra num Set; ao final, um alerta role="alert" informa quantos campos precisam de correção.
- submit: preventDefault() impede o envio ao servidor e a recarga da página. O botão fica desabilitado com "Enviando…" (estilo :disabled) e, ao terminar, o formulário é limpo e o modal de confirmação abre com o primeiro nome da pessoa.
- reset: zera a validação customizada, esconde o alerta de erro e mostra o toast "Formulário limpo.".

FEEDBACK (feedback.js)
- click delegado: botões com data-toast criam uma notificação, data-abrir-modal chama showModal(), data-fechar-modal fecha o <dialog>, e um clique no fundo escurecido também fecha. Cada toast tem o próprio click no "×" e some sozinho depois de 5 segundos (setTimeout).
```
