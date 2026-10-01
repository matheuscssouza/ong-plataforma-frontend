# EP4 · Etapa 2 — Estratégia de versionamento (GitFlow)

```text
Adotei o GitFlow com papéis fixos para cada branch:
- main: só código de produção. O GitHub Pages publica a partir dela, então nada é feito direto nela.
- develop: criada a partir da main, integra o que está pronto para a próxima versão.
- feature/*: cada funcionalidade nasce da develop numa branch própria (ex.: feature/documentacao-contribuicao) e volta por pull request, com descrição do que mudou e de como testar.
- release/*: sai da develop para fechar uma versão e entra na main com uma tag (v1.0.0).
- hotfix/*: sai da main para correções urgentes e volta para a main e a develop.
Assim, o trabalho em andamento fica isolado nas features, a develop reúne o que já foi revisado e a main só muda numa versão fechada. Os commits seguem o Conventional Commits (feat, fix, docs, refactor), e o fluxo está documentado no CONTRIBUTING.md.
```
