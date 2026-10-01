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
