// Dados exibidos pelos templates. Para incluir um projeto ou campanha,
// basta acrescentar um objeto aqui; a marcação é gerada por js/templates.js.

const PROJETOS = [
  {
    id: 'horta',
    titulo: 'Horta Comunitária',
    imagem: 'projeto-horta',
    alt: 'Ilustração de canteiros com mudas brotando sob o sol',
    legenda: 'Horta instalada em terreno cedido pela subprefeitura.',
    badges: [
      { texto: 'Meio ambiente', tipo: 'ambiente' },
      { texto: 'Vagas abertas', tipo: 'aberta' },
    ],
    descricao: 'Produção de hortaliças orgânicas distribuídas gratuitamente às famílias cadastradas, com oficinas de alimentação saudável.',
    publico: 'Famílias do Jardim Esperança',
    frequencia: 'Mutirões aos sábados',
    inicio: { data: '2016-03', rotulo: 'Março de 2016' },
  },
  {
    id: 'reforco',
    titulo: 'Reforço Escolar',
    imagem: 'projeto-reforco',
    alt: 'Ilustração de uma lousa com anotações e uma pilha de livros',
    legenda: 'Aulas acontecem na sede do instituto.',
    badges: [
      { texto: 'Educação', tipo: 'educacao' },
      { texto: 'Vagas abertas', tipo: 'aberta' },
    ],
    descricao: 'Apoio em português e matemática para estudantes do ensino fundamental, no contraturno escolar.',
    publico: 'Crianças de 7 a 14 anos',
    frequencia: 'Segunda a quinta, das 14h às 17h',
    inicio: { data: '2015-08', rotulo: 'Agosto de 2015' },
  },
  {
    id: 'digital',
    titulo: 'Inclusão Digital',
    imagem: 'projeto-digital',
    alt: 'Ilustração de um notebook com sinal de confirmação na tela',
    legenda: 'Laboratório montado com computadores doados.',
    badges: [
      { texto: 'Tecnologia', tipo: 'tecnologia' },
      { texto: 'Lista de espera' },
    ],
    descricao: 'Cursos de informática básica, uso seguro da internet e introdução à programação para jovens e adultos.',
    publico: 'Jovens a partir de 15 anos e adultos',
    frequencia: 'Turmas noturnas e aos sábados',
    inicio: { data: '2019-02', rotulo: 'Fevereiro de 2019' },
  },
];

const CAMPANHAS = [
  {
    id: 'doacao-mensal',
    titulo: 'Doação mensal',
    badges: [{ texto: 'Contínua' }],
    descricao: 'Uma contribuição fixa garante sementes, material escolar e a manutenção dos computadores ao longo do ano.',
    rodape: { tipo: 'link', texto: 'Quero ser doador mensal', destino: 'cadastro.html' },
  },
  {
    id: 'material-escolar',
    titulo: 'Campanha Material Escolar',
    badges: [{ texto: 'Prazo: fev/2027', tipo: 'prazo' }],
    descricao: 'Arrecadação de cadernos, lápis e mochilas para os alunos do Reforço Escolar.',
    rodape: { tipo: 'prazo', data: '2027-02-28', rotulo: '28 de fevereiro de 2027' },
  },
  {
    id: 'computadores',
    titulo: 'Doe um computador',
    badges: [{ texto: 'Aberta', tipo: 'aberta' }],
    descricao: 'Computadores e notebooks usados são revisados pelos voluntários e ampliam as turmas de Inclusão Digital.',
    rodape: { tipo: 'texto', texto: 'Entregas na sede, de segunda a sexta.' },
  },
];
