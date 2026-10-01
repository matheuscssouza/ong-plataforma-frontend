# EP2 · Etapa 4 — Reflexão sobre a aprendizagem

Nesta segunda experiência, saí da estrutura para a apresentação. Como minha base é backend, o maior desafio foi pensar em CSS como um sistema, e não como ajustes isolados.

Pontos fortes: a organização continuou sendo meu melhor resultado. Montei um Design System com variáveis para cores, escala tipográfica e espaçamentos, e nenhum valor visual ficou solto no código. Implementei o grid de 12 colunas com cinco breakpoints mobile first, o menu hambúrguer com dropdown, os estados de botões e formulários e os componentes de feedback (badges, alertas, toast e modal), todos validados no W3C sem erros. Também cuidei da acessibilidade com critério: calculei os contrastes e corrigi a borda dos campos e o contorno de foco, que estavam abaixo do mínimo da WCAG.

Oportunidades de melhoria: vários problemas só apareceram nos testes visuais, como o cartão sozinho numa linha, as margens que não colapsam dentro do Grid e do Flexbox e o cabeçalho que quebrava no celular. Preciso antecipar esses comportamentos. A folha de estilos cresceu para mais de mil linhas num único arquivo, e o próximo passo é dividi-la em módulos e adotar uma convenção de nomes como BEM. Ainda falta testar com leitor de tela real e criar testes automatizados para o JavaScript.

Contribuição profissional: percebi que um Design System funciona como as constantes e os contratos que uso no backend: centraliza decisões e evita retrabalho. O guia de componentes, com classes e atributos padronizados, é a ponte entre front-end e back-end, porque permite que outra pessoa gere o HTML sem conhecer o CSS. Saio desta etapa conseguindo dialogar melhor com designers e desenvolvedores front-end e entregar interfaces acessíveis, que são essenciais para o público diverso das ONGs.
