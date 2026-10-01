# EP4 · Etapa 3 — Navegação por teclado e leitores de tela

| Nome do componente | Descrição do ajuste ou problema retificado |
|---|---|
| Campo de data de nascimento | Problema achado nesta etapa: ao percorrer com Tab, o contorno de foco sumia nas partes internas do campo (dia, mês, ano e botão do calendário). Os campos passaram a usar :focus e :focus-within, e o contorno aparece em todas as paradas. |
| Contorno de foco de links e botões | Todo elemento interativo mostra contorno de 3px com afastamento de 2px via :focus-visible: verde-escuro (contraste 9,8:1) no fundo claro e amarelo (5,5:1) no rodapé escuro. Antes o foco era amarelo sobre branco, com 1,8:1. |
| Link "Pular para o conteúdo" | Primeira parada do Tab, aparece só ao receber foco e leva direto ao conteúdo, sem passar de novo pelo menu. O <main> ganhou tabindex="-1" para o foco chegar de fato a ele em todos os navegadores. |
| Menu hambúrguer (celular) | Botão nativo que abre com Enter ou Espaço e anuncia aberto/fechado por aria-expanded. Com o menu fechado, os links ficam com visibility: hidden e saem da ordem do Tab. Esc fecha e devolve o foco ao botão. |
| Submenu de Projetos (dropdown) | No desktop abria só com o mouse; ganhou uma seta que é um botão: Enter abre, Tab entra nos itens e Esc fecha e devolve o foco à seta. O leitor de tela lê "Submenu de Projetos, recolhido/expandido". |
| Modal de confirmação (<dialog>) | Abre com showModal(): o foco vai para dentro do modal, o resto da página fica inerte e Esc fecha devolvendo o foco ao botão que o abriu. aria-labelledby faz o leitor de tela anunciar o título ao abrir. |
| Navegação da SPA | Ao trocar de página sem recarregar, o foco vai para o novo <h1> e uma região aria-live anuncia "Página carregada: …". O menu fecha também pelo botão Voltar, e o menu marca a página atual com aria-current. |
| Formulário de cadastro | Ordem de Tab segue a ordem visual (35 paradas). Erros são lidos junto com o campo por aria-describedby, e o resumo traz links que levam ao campo sem tirá-lo da ordem de tabulação (correção no roteador). |
| Rótulos de campos obrigatórios | O leitor de tela lia "Nome completo asterisco". O asterisco ficou com aria-hidden, já que o required é anunciado, e o grupo de rádios ganhou o texto oculto "(obrigatório)" na legenda. |
| Gráfico de horas (Chart.js) | O <canvas> não é interativo, então tem role="img" e aria-label, e os dados ficam numa tabela dentro de <details>, cujo resumo é focável e abre com Enter. Assim, teclado e leitor de tela acessam os mesmos números. |
