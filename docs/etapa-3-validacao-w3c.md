# Etapa 3 — Validação W3C

Submeti as três páginas ao W3C Markup Validation Service em dois momentos. Durante o desenvolvimento, usei a validação por entrada direta (Validate by Direct Input) a cada página criada ou alterada. Na versão final, publicada no GitHub Pages, usei a validação por endereço (Validate by URI).

Resultado final: index.html, projetos.html e cadastro.html retornaram "Document checking completed. No errors or warnings to show", ou seja, nenhum erro e nenhum aviso.

Houve um apontamento durante o desenvolvimento, no formulário de cadastro.html. O validador acusou erro no campo de telefone: o valor "tel-national" do atributo autocomplete não é permitido naquele contexto. Substituí por autocomplete="tel", valor aceito pela especificação para campos de telefone, e a página passou a validar sem erros. Depois de cada alteração seguinte (imagens em `<picture>`, troca de fontes, validações e máscaras), revalidei as páginas para garantir que nenhum erro novo fosse introduzido.

Alguns cuidados preventivos evitaram outros apontamentos comuns: declaração `<!DOCTYPE html>` e lang="pt-BR", um único `<h1>` por página e sem pular níveis de título, alt em todas as imagens (vazio na logo decorativa), todo `<fieldset>` com sua `<legend>`, todo campo ligado a um `<label>` por for/id, e o caractere & escapado como `&amp;` no link das fontes.

Também validei a folha de estilos no W3C CSS Validator: 0 erros e 5 avisos. Os avisos apenas informam que variáveis CSS (var(--...)) não são verificadas estaticamente pela ferramenta; não indicam problema e não exigiram correção.
