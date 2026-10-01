# EP4 · Etapa 2 — Instalação local e versionamento no README

```text
Instalação local documentada no README:
1) Ter os pré-requisitos: navegador moderno, Git e Python 3.8+ ou Node 22+. Para os testes, Node 22+ e Google Chrome.
2) Clonar: git clone https://github.com/matheuscssouza/ong-plataforma-frontend.git e entrar na pasta.
3) Não há dependências para instalar: o Chart.js vem por CDN.
4) Executar npm start (ou python3 -m http.server 8000) e abrir http://localhost:8000. O README avisa que abrir o arquivo direto do disco não funciona, porque os ES Modules exigem HTTP.
5) Rodar npm test para executar os 20 testes de ponta a ponta.

Versionamento: o README e o CONTRIBUTING.md descrevem o GitFlow (main em produção, develop para integração, feature/, release/ e hotfix/, sempre por pull request revisado), o padrão Conventional Commits (feat, fix, docs, refactor...), as versões semânticas com tags (v1.0.0, v1.1.0, v2.0.0) e o checklist de revisão antes de cada PR.
```
