# Etapa 2 — Desenvolvimento da página inicial

Trecho principal de `index.html` com as seções institucionais de apresentação e os dados de contato.

```html
    <section class="destaque" aria-labelledby="titulo-principal">
      <h1 id="titulo-principal">Instituto Raízes do Amanhã</h1>
      <p>Cultivamos oportunidades para crianças, jovens e famílias da periferia de São Paulo por meio da educação, da segurança alimentar e da inclusão digital.</p>
      <p class="acoes">
        <a class="botao" href="cadastro.html">Quero ser voluntário</a>
        <a class="botao botao-secundario" href="projetos.html">Conheça os projetos</a>
      </p>
    </section>

    <section aria-labelledby="titulo-quem-somos">
      <h2 id="titulo-quem-somos">Quem somos</h2>
      <div class="institucional">
        <figure>
          <img src="img/voluntarios.svg" alt="Ilustração de três voluntários lado a lado diante de uma horta comunitária" width="480" height="300">
          <figcaption>Voluntários e moradores constroem juntos cada projeto.</figcaption>
        </figure>
        <p>Fundado em 2015 por moradores do bairro, o Instituto Raízes do Amanhã é uma organização da sociedade civil sem fins lucrativos. Atuamos onde o poder público ainda não chega, com o apoio de voluntários, doadores e parceiros locais.</p>
      </div>
    </section>

    <!-- ... demais seções: Nosso impacto, Como ajudar, Transparência ... -->

  <footer class="rodape" id="contato">
    <h2>Contato</h2>
    <address>
      <strong>Instituto Raízes do Amanhã</strong><br>
      Rua das Sementes, 123 – Jardim Esperança, São Paulo – SP<br>
      <a href="mailto:contato@raizesdoamanha.org.br">contato@raizesdoamanha.org.br</a> ·
      <a href="tel:+551100000000">(11) 0000-0000</a>
    </address>
    <p><small>&copy; <time datetime="2026">2026</time> Instituto Raízes do Amanhã. Organização fictícia criada para fins acadêmicos.</small></p>
  </footer>
```
