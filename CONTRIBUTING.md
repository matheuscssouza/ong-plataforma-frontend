# Guia de contribuição e manutenção

Este documento descreve como o projeto é versionado, como propor mudanças e como publicar uma nova versão do site.

## Fluxo de branches (GitFlow)

| Branch | Para que serve | Nasce de | Volta para |
|---|---|---|---|
| `main` | Código em produção. Cada merge aqui publica o site no GitHub Pages. | — | — |
| `develop` | Integração do que está pronto para a próxima versão. | `main` | — |
| `feature/<nome>` | Uma funcionalidade ou melhoria por vez. | `develop` | `develop` (por pull request) |
| `release/<versão>` | Preparação de uma versão: revisão final, documentação e número da versão. | `develop` | `main` e `develop` |
| `hotfix/<nome>` | Correção urgente de algo que já está em produção. | `main` | `main` e `develop` |

Regras:

- Ninguém trabalha direto na `main` ou na `develop`: toda mudança entra por **pull request**.
- Cada `feature/` resolve um único assunto e tem nome curto e descritivo, por exemplo `feature/acessibilidade-teclado`.
- Antes do merge, o pull request é revisado: a descrição diz o que mudou e como foi testado.
- Ao fechar uma `release/` ou `hotfix/`, a `main` recebe uma tag de versão (`v1.0.0`, `v1.0.1`...).

### Passo a passo de uma funcionalidade

```bash
git switch develop
git pull
git switch -c feature/nome-da-funcionalidade
# ... alterações e commits ...
git push -u origin feature/nome-da-funcionalidade
```

Depois, abra um pull request de `feature/nome-da-funcionalidade` para `develop`.

### Publicando uma versão

```bash
git switch develop
git pull
git switch -c release/1.1.0
# ajustes finais de documentação
git push -u origin release/1.1.0
```

Abra um pull request de `release/1.1.0` para `main`. Depois do merge, crie a tag e leve a versão de volta para a `develop`:

```bash
git switch main
git pull
git tag -a v1.1.0 -m "Versão 1.1.0"
git push origin v1.1.0
git switch develop
git merge main
git push
```

## Padrão de commits

As mensagens seguem o [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/), em português e no imperativo:

```
<tipo>: <o que a mudança faz>

<corpo opcional explicando o porquê>
```

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de falha |
| `docs` | Documentação |
| `style` | Estilos visuais (CSS) sem mudar comportamento |
| `refactor` | Reorganização de código sem mudar comportamento |
| `perf` | Melhoria de desempenho |
| `test` | Testes |
| `build` | Processo de build e dependências |
| `chore` | Tarefas de manutenção |

Exemplos reais do histórico:

- `feat: roteador SPA por hash que injeta o conteúdo das páginas no main`
- `fix: roteador descarta carregamentos antigos e mostra aviso sem conexão`
- `refactor: divide o JavaScript em ES Modules por responsabilidade`

## Checklist antes de abrir um pull request

- [ ] As páginas passam no [W3C Markup Validator](https://validator.w3.org/) sem erros.
- [ ] O CSS passa no [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) sem erros.
- [ ] O console do navegador não mostra erros ao navegar pelas páginas.
- [ ] A mudança funciona com teclado e em telas de celular.
- [ ] Nenhum dado sensível (senhas, chaves, `.env`) foi incluído.

## Rodando o projeto

O projeto não tem dependências nem build. Como usa ES Modules, precisa ser servido por HTTP:

```bash
python3 -m http.server 8000
```

Acesse http://localhost:8000.
