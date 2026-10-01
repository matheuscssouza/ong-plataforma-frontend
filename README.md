# Instituto Raízes do Amanhã — Plataforma Web para ONG

Plataforma web para uma organização do terceiro setor, construída com **HTML5 semântico**, **CSS3** e **JavaScript vanilla**. O projeto evolui em etapas: primeiro a estrutura acessível e o formulário com validação, depois um design system completo, layout responsivo em grid de 12 colunas, navegação interativa e componentes de feedback.

**🔗 Site publicado:** https://matheuscssouza.github.io/ong-plataforma-frontend/

![Página inicial](docs/screenshots/inicio.png)

---

## Contexto

Projeto desenvolvido na disciplina **Desenvolvimento Front-end** do curso de Engenharia de Software da Universidade Cruzeiro do Sul, ao longo de três Experiências Práticas.

O terceiro setor brasileiro reúne mais de 820 mil organizações da sociedade civil, mas só uma parte delas tem presença digital adequada. Para ONGs, que dependem de voluntários e doações, um site claro e acessível é o que transforma um visitante em apoiador. O desafio foi projetar essa plataforma com semântica correta (essencial para SEO e leitores de tela), uma interface consistente e um cadastro que garanta a integridade dos dados coletados.

> O **Instituto Raízes do Amanhã** é uma organização fictícia, criada para fins acadêmicos. Endereço e contatos exibidos no site são ilustrativos.

## Páginas

| Página | Conteúdo |
|---|---|
| [`index.html`](index.html) | Apresentação da ONG: missão, visão e valores, números de impacto, formas de ajudar e contato |
| [`projetos.html`](projetos.html) | Três projetos sociais com badges e ficha de informações, voluntariado e campanhas de doação |
| [`cadastro.html`](cadastro.html) | Cadastro de voluntários e doadores com validação, máscaras, alertas e confirmação em modal |
| [`componentes.html`](componentes.html) | Guia de componentes: badges, alertas, toasts, modal e botões, com as classes para reutilização |

## Destaques técnicos

### Experiência Prática I — Estrutura semântica e formulários

**Semântica e acessibilidade**
- Estrutura com `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` e `address`.
- Um único `<h1>` por página e hierarquia de títulos sem saltos de nível.
- Seções nomeadas com `aria-labelledby`, página atual indicada no menu com `aria-current` e link "Pular para o conteúdo".
- Texto alternativo descritivo nas imagens informativas e `alt=""` na logo decorativa.

**Formulário de cadastro**
- Campos agrupados em `fieldset` + `legend`, com tipos adequados a cada dado (`email`, `date`, `tel`, `number`, `radio`, `checkbox`).
- Validação nativa: `required`, `pattern`, `minlength`/`maxlength`, `min`/`max`/`step`.
- Máscaras em JavaScript para **CPF**, **telefone** e **CEP**, e conferência dos dígitos verificadores do CPF com `setCustomValidity`.

**Imagens**
- Ilustrações próprias em **WebP** e **PNG**, servidas com `<picture>`, em 2x e com `width`/`height` definidos.

### Experiência Prática II — Estilização e layouts

**Design system** (variáveis no `:root` de [`css/style.css`](css/style.css))
- Paleta com cores primárias, secundárias, neutras, de feedback e de categoria, todas com contraste verificado pela WCAG (texto principal com 15,4:1).
- Escala tipográfica modular de razão 1,25 (14px a 39px) e espaçamentos em escala de 8px.
- Nenhuma cor ou espaçamento solto no código: tudo vem das variáveis.

**Layout responsivo**
- Grid de **12 colunas** aplicado ao conteúdo e aos blocos internos, com **cinco breakpoints mobile first**: 576, 768, 992, 1200 e 1440px.
- **Flexbox** nos componentes internos: cartões com a última linha alinhada à base, menu, grupos de botões e campos.

**Navegação interativa**
- Menu **hambúrguer** no celular e **dropdown** de Projetos no desktop, controlados por `aria-expanded`.
- Fecha com Esc e com clique fora; sem JavaScript o menu continua visível; animações respeitam `prefers-reduced-motion`.

![Menu no celular](docs/screenshots/menu-celular.png)

**Estados e feedback**
- Botões com `:hover`, `:focus-visible`, `:active` e `:disabled`.
- Campos com sinalização de sucesso e erro (`:user-valid` / `:user-invalid`), com ícone e mensagem em texto, não só cor.
- Componentes de feedback reutilizáveis: **badges**, **alertas** (info, sucesso, aviso e erro), **toasts** e **modal** com o `<dialog>` nativo.
- O envio do cadastro mostra o botão desabilitado ("Enviando…"), um alerta com a contagem de campos a corrigir e um modal de confirmação.

![Formulário com validação](docs/screenshots/cadastro.png)

![Modal de confirmação](docs/screenshots/modal.png)

**Guia de componentes**
- A página [`componentes.html`](componentes.html) documenta cada componente com suas classes. Modal e toasts podem ser acionados só com atributos (`data-abrir-modal`, `data-toast`), permitindo que o back-end gere o HTML sem escrever JavaScript.

![Guia de componentes](docs/screenshots/componentes.png)

### Qualidade
- **W3C Markup Validator:** 0 erros e 0 avisos nas quatro páginas.
- **W3C CSS Validator:** 0 erros.
- Testes visuais em larguras de 375px a 1500px, sem rolagem horizontal.

![Página de projetos](docs/screenshots/projetos.png)

## Tecnologias

- **HTML5** semântico
- **CSS3**: variáveis, Grid, Flexbox, media queries, pseudo-classes de validação e animações
- **JavaScript** (vanilla, sem dependências)
- Fontes **Fraunces** e **Lora** (Google Fonts)
- **Git** e **GitHub Pages**

## Estrutura de pastas

```
ong-plataforma-frontend/
├── index.html         # Página inicial (apresentação da ONG)
├── projetos.html      # Projetos sociais, voluntariado e doações
├── cadastro.html      # Formulário de voluntários/doadores
├── componentes.html   # Guia de componentes
├── css/
│   └── style.css      # Design system, layout e componentes
├── js/
│   ├── menu.js        # Menu hambúrguer e dropdown
│   ├── feedback.js    # Toasts e modais reutilizáveis
│   └── script.js      # Máscaras, validações e envio do cadastro
├── img/               # Imagens em PNG e WebP (logo também em SVG)
└── docs/              # Respostas de cada etapa e capturas de tela
```

## Como rodar localmente

O projeto não precisa de instalação nem de build.

```bash
git clone https://github.com/matheuscssouza/ong-plataforma-frontend.git
cd ong-plataforma-frontend
```

Abra o `index.html` no navegador ou, se preferir, sirva a pasta com um servidor local:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Etapas do desenvolvimento

Cada etapa concluída tem uma tag no Git, que preserva o projeto exatamente como foi entregue.

**Experiência Prática I — Estrutura semântica e formulários** (tag [`ep1-final`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/ep1-final))

| Etapa | Entrega | Tag |
|---|---|---|
| 2. Estrutura semântica e páginas | `index.html` e `projetos.html` com hierarquia HTML5 e organização de pastas | [`etapa-2`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/etapa-2) |
| 3. Formulários e cadastro | Agrupamentos, validações nativas, máscaras, imagens otimizadas e validação W3C | [`etapa-3`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/etapa-3) |
| 4. Síntese e reflexão | Checklist de qualidade e autoavaliação | [`etapa-4`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/etapa-4) |

**Experiência Prática II — Estilização e layouts** (tag [`ep2-final`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/ep2-final))

| Etapa | Entrega | Tag |
|---|---|---|
| 2. Design system e estruturação responsiva | Variáveis de cor, tipografia e espaçamento; grid de 12 colunas; cinco breakpoints; Flexbox | [`ep2-etapa-2`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/ep2-etapa-2) |
| 3. Componentes visuais e navegação | Menu hambúrguer e dropdown, estados interativos, badges, alertas, toasts, modal e guia de componentes | [`ep2-etapa-3`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/ep2-etapa-3) |
| 4. Síntese e reflexão | Revisão das implementações e autoavaliação | [`ep2-etapa-4`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/ep2-etapa-4) |

**Experiência Prática III — JavaScript e interatividade:** em andamento.

As respostas de cada etapa estão documentadas na pasta [`docs/`](docs).

## Aprendizados

- Semântica e hierarquia de títulos são requisitos de acessibilidade, não detalhes visuais.
- A validação no navegador melhora a experiência e a qualidade dos dados, mas **não substitui a validação no servidor**.
- Um design system funciona como as constantes de um backend: centraliza decisões e evita retrabalho.
- Grid organiza as áreas da página; Flexbox organiza o conteúdo dentro de cada componente.
- Cor nunca deve ser o único sinal: ícones e texto tornam o feedback acessível a todas as pessoas.

## Autor

**Matheus Souza** — estudante de Engenharia de Software, com foco em desenvolvimento backend (Python e Java).

[github.com/matheuscssouza](https://github.com/matheuscssouza)
