# EP4 · Etapa 4 — Deploy em produção

```text
Plataforma: GitHub Pages (https://matheuscssouza.github.io/ong-plataforma-frontend/).
Motivos técnicos:
- O site é estático (HTML, CSS e JS sem servidor), exatamente o que o Pages hospeda, de graça para repositório público e com HTTPS automático e CDN.
- Fica no mesmo lugar do código, das issues, dos pull requests e das tags, sem outra conta ou serviço externo.
- Combina com o GitFlow: só a main vai para produção. Um workflow do GitHub Actions roda npm ci, npm run build e os 20 testes; se tudo passar, publica a pasta dist/. Em pull requests ele só testa, sem publicar.
- As escolhas do projeto respeitam os limites do Pages: a SPA usa rotas com # porque o Pages não permite regras de reescrita no servidor, e a build usa caminhos relativos (base './') porque o site fica numa subpasta.
Vercel e Netlify também serviriam, mas acrescentariam um serviço externo sem ganho real para um site estático.
```

## Configuração do ambiente de produção e CI/CD

```text
1) Ligação ao repositório: com o repositório público no GitHub, ativei o GitHub Pages nas configurações, o que gerou o endereço https://matheuscssouza.github.io/ong-plataforma-frontend/ com HTTPS.
2) Build reproduzível: package.json com os scripts build (Vite) e test, e package-lock.json versionado, para o servidor instalar as mesmas versões com npm ci.
3) Workflow .github/workflows/deploy.yml (GitHub Actions):
- Job build: Node 22, npm ci, npm run build e os 20 testes no código-fonte e na build, com o Chrome do servidor.
- Em pull requests para develop ou main, só esse job roda, e o resultado aparece no PR antes do merge.
- Em push na main, o job deploy publica a pasta dist/ com actions/deploy-pages, com permissões mínimas (pages: write e id-token: write).
4) Em Settings → Pages, a origem passa a ser "GitHub Actions", para publicar a build e não os arquivos-fonte.
Fluxo: feature → PR para develop (CI) → release → PR para main (CI) → deploy automático com tag de versão.
```
