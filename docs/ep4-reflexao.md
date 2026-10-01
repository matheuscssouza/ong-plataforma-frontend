# EP4 — Reflexão sobre a aprendizagem

Nesta última experiência, o foco saiu do código e foi para o processo: versionar, garantir acessibilidade e levar o projeto para produção como uma equipe profissional faria.

Pontos fortes: estruturei o repositório com GitFlow, commits semânticos, versões (v1.0.0 a v2.1.0), issues, milestones e pull requests descritivos. Transformei meus roteiros de teste em 20 testes automatizados, que o GitHub Actions roda em cada pull request antes de publicar a build. Na acessibilidade, o axe-core não apontou violações, mas a revisão manual com teclado e com a árvore de acessibilidade encontrou falhas reais (rolagem em 320px, foco invisível no campo de data, asterisco lido pelo leitor de tela), que corrigi. Também criei os temas escuro e de alto contraste e configurei a build com Vite.

Oportunidades de melhoria: adotei o GitFlow só na quarta etapa e deixei pull requests acumularem; revisar e integrar em lotes pequenos teria evitado conflitos. Os merges feitos pelo site gravaram meu e-mail pessoal, porque não configurei a privacidade da conta antes. Ao otimizar, apliquei carregamento sob demanda na imagem principal e piorei o LCP; só percebi porque medi antes e depois. Ainda falta testar com um leitor de tela real, como NVDA ou VoiceOver, e não só pela árvore de acessibilidade.

Contribuição profissional: CI/CD, versionamento semântico e revisão por pull request são o dia a dia de qualquer equipe, inclusive no backend. Aprendi que ferramentas automáticas não substituem a verificação manual e que otimização sem medição pode piorar o resultado. Saio com um projeto completo, publicado e documentado para o portfólio, e com um fluxo de trabalho que posso levar para qualquer equipe.
