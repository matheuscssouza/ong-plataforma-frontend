# EP4 · Etapa 4 — Otimização de imagens

```text
Usei três formatos, cada um pelo seu papel:
- WebP: formato principal das ilustrações, servido pelo elemento <picture>. Tem compressão melhor que PNG e JPEG; nas imagens do projeto, ficou de 30% a 75% menor que o PNG equivalente.
- PNG: alternativa no <img> do <picture> para navegadores sem suporte a WebP. É adequado a ilustrações de cores chapadas (melhor que JPEG, que borra as bordas). Comprimi com paleta de 64 cores: voluntarios.png caiu de 33,9 KB para 10,2 KB sem diferença visível.
- SVG: logo e ícone da aba. É vetorial, pesa 0,5 KB e fica nítido em qualquer tamanho e densidade de tela.
A otimização é feita pelo script npm run otimizar-imagens (biblioteca sharp), que só troca um arquivo quando a versão nova é menor. No total, as imagens foram de 95 KB para 39,6 KB (58% menor). As imagens abaixo da primeira tela usam loading="lazy", e todas têm width e height para não deslocar o layout.
```
