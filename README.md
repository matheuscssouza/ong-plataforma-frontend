# Instituto Raízes do Amanhã — Plataforma Web para ONG

Plataforma web para uma organização do terceiro setor, construída com **HTML5 semântico**, **CSS3** e **JavaScript vanilla**, com foco em acessibilidade, hierarquia de informação e formulário com validação nativa e máscaras de entrada.

**🔗 Site publicado:** https://matheuscssouza.github.io/ong-plataforma-frontend/

![Página inicial](docs/screenshots/inicio.png)

---

## Contexto

Projeto desenvolvido na disciplina **Desenvolvimento Front-end** (Experiência Prática I) do curso de Engenharia de Software da Universidade Cruzeiro do Sul.

O terceiro setor brasileiro reúne mais de 820 mil organizações da sociedade civil, mas só uma parte delas tem presença digital adequada. Para ONGs, que dependem de voluntários e doações, um site claro e acessível é o que transforma um visitante em apoiador. O desafio foi projetar essa plataforma com semântica correta (essencial para SEO e leitores de tela) e com um cadastro que garanta a integridade dos dados coletados.

> O **Instituto Raízes do Amanhã** é uma organização fictícia, criada para fins acadêmicos. Endereço e contatos exibidos no site são ilustrativos.

## Páginas

| Página | Conteúdo |
|---|---|
| [`index.html`](index.html) | Apresentação da ONG: missão, visão e valores, números de impacto, formas de ajudar e contato |
| [`projetos.html`](projetos.html) | Três projetos sociais com ficha de informações, seção de voluntariado e campanhas de doação |
| [`cadastro.html`](cadastro.html) | Formulário de cadastro de voluntários e doadores com validações e máscaras |

## Destaques técnicos

### Semântica e acessibilidade
- Estrutura com `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` e `address`.
- Um único `<h1>` por página e hierarquia de títulos sem saltos de nível.
- Seções nomeadas com `aria-labelledby`, página atual indicada no menu com `aria-current` e link "Pular para o conteúdo".
- Texto alternativo descritivo nas imagens informativas e `alt=""` na logo decorativa.
- Foco visível para navegação por teclado.

### Formulário de cadastro
- Campos agrupados em `fieldset` + `legend` (dados pessoais, endereço, participação), com `fieldset` aninhados para grupos de opções.
- Tipos adequados a cada dado: `email`, `date`, `tel`, `number`, `radio`, `checkbox`, além de `select` e `textarea`.
- Validação nativa: `required`, `pattern`, `minlength`/`maxlength`, `min`/`max`/`step` e destaque de erro com `:user-invalid`.
- Máscaras em JavaScript para **CPF** (`000.000.000-00`), **telefone** (`(00) 00000-0000`) e **CEP** (`00000-000`).
- Conferência dos dígitos verificadores do CPF integrada à validação nativa com `setCustomValidity`.

### Imagens e desempenho
- Ilustrações próprias exportadas em **WebP** e **PNG**, servidas com `<picture>` (WebP quando suportado, PNG como alternativa).
- Imagens em 2x para telas de alta densidade, com `width` e `height` definidos para evitar deslocamento do layout.

### Qualidade
- **W3C Markup Validator:** 0 erros e 0 avisos nas três páginas.
- **W3C CSS Validator:** 0 erros.
- Layout responsivo com CSS Grid e Flexbox.

![Página de projetos](docs/screenshots/projetos.png)

![Formulário de cadastro](docs/screenshots/cadastro.png)

## Tecnologias

- **HTML5** semântico
- **CSS3**: variáveis, Grid, Flexbox, media queries
- **JavaScript** (vanilla, sem dependências)
- Fontes **Fraunces** e **Lora** (Google Fonts)
- **Git** e **GitHub Pages**

## Estrutura de pastas

```
ong-plataforma-frontend/
├── index.html        # Página inicial (apresentação da ONG)
├── projetos.html     # Projetos sociais, voluntariado e doações
├── cadastro.html     # Formulário de voluntários/doadores
├── css/
│   └── style.css     # Estilos
├── js/
│   └── script.js     # Máscaras e validações do formulário
├── img/              # Imagens em PNG e WebP (logo também em SVG)
└── docs/             # Respostas de cada etapa e capturas de tela
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

| Etapa | Entrega | Marco no Git |
|---|---|---|
| 1. Início | Contextualização do desafio no terceiro setor | — |
| 2. Estrutura semântica e páginas | `index.html` e `projetos.html` com hierarquia HTML5 e organização de pastas | tag [`etapa-2`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/etapa-2) |
| 3. Formulários e cadastro | `cadastro.html` com agrupamentos, validações nativas, máscaras, imagens otimizadas e validação W3C | tag [`etapa-3`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/etapa-3) |
| 4. Síntese e reflexão | Checklist de qualidade e autoavaliação | tag [`etapa-4`](https://github.com/matheuscssouza/ong-plataforma-frontend/tree/etapa-4) |

As respostas de cada etapa estão documentadas na pasta [`docs/`](docs).

## Aprendizados

- Semântica e hierarquia de títulos são requisitos de acessibilidade, não detalhes visuais.
- A validação no navegador melhora a experiência e a qualidade dos dados, mas **não substitui a validação no servidor**.
- Pensar nos requisitos de mídia (formatos, tamanhos) desde o início evita retrabalho.

## Autor

**Matheus Souza** — estudante de Engenharia de Software, com foco em desenvolvimento backend (Python e Java).

[github.com/matheuscssouza](https://github.com/matheuscssouza)
