# EP4 · Etapa 2 — Registros de commits e releases

| Mensagem de commit ou tag | Descrição e justificação |
|---|---|
| `v1.0.0` | Tag anotada (MAJOR 1): primeira versão estável do site, com páginas semânticas, formulário com validação nativa e máscaras e W3C sem erros. Marca o fim da Experiência Prática I. |
| `v1.1.0` | Tag anotada (MINOR): adiciona design system, grid de 12 colunas, menu responsivo e componentes de feedback. É MINOR porque são novidades compatíveis: nenhum endereço ou comportamento antigo quebrou. |
| `v2.0.0` | Tag anotada (MAJOR): o site vira SPA em ES Modules, com templates, localStorage e Chart.js. É MAJOR porque houve mudança incompatível: as páginas foram para html/ e as imagens para imagens/, mudando os endereços. |
| `chore: estrutura inicial do projeto` | Primeiro commit: cria as pastas css/, img/ e js/, o .gitignore (segredos e arquivos locais fora do Git), o README e o checklist de entregas. Tipo chore por ser configuração, sem funcionalidade. |
| `feat: adiciona máscaras de CPF, telefone e CEP e verificação do CPF` | Nova funcionalidade (feat): máscaras aplicadas enquanto a pessoa digita e conferência dos dígitos do CPF. Separada do commit das validações nativas, para cada mudança ter um único assunto. |
| `style: implementa grid de 12 colunas com cinco breakpoints mobile first` | Tipo style porque altera só o CSS, sem mudar comportamento: o conteúdo passa a se distribuir em 12 colunas, com pontos de quebra em 576, 768, 992, 1200 e 1440px. |
| `feat: roteador SPA por hash que injeta o conteúdo das páginas no main` | Funcionalidade central da v2.0.0: a navegação troca só o <main>, sem recarregar a página. Usa hash (#/projetos) porque o GitHub Pages não permite configurar rotas no servidor. |
| `refactor: divide o JavaScript em ES Modules por responsabilidade` | Tipo refactor: reorganiza o código em módulos (componentes, formulário, serviços, dados) sem mudar o que o usuário vê. Justificativa: baixo acoplamento e manutenção mais fácil. |
| `fix: roteador descarta carregamentos antigos e mostra aviso sem conexão` | Correção (fix) encontrada nos testes de estresse: cliques rápidos com rede lenta mostravam a página errada, e sem internet aparecia a tela de erro do navegador. Gera versão PATCH quando sai isolado. |
| `docs: guia de contribuição com fluxo GitFlow e padrão de commits` | Documentação (docs) feita numa branch feature/ e enviada por pull request para a develop: descreve as branches do GitFlow, o padrão de commits e o checklist de revisão. |
