// Infraestrutura dos testes: servidor estático local + Chrome headless
// controlado pelo Chrome DevTools Protocol (CDP). Usa só recursos do
// Node (http, child_process, WebSocket global), sem dependências.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

export async function iniciarServidor(raiz) {
  const servidor = createServer(async (req, res) => {
    const caminho = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const arquivo = join(raiz, caminho.endsWith('/') ? `${caminho}index.html` : caminho);
    try {
      const conteudo = await readFile(arquivo);
      res.writeHead(200, { 'Content-Type': TIPOS[extname(arquivo)] ?? 'application/octet-stream' });
      res.end(conteudo);
    } catch {
      res.writeHead(404);
      res.end('não encontrado');
    }
  });
  await new Promise((resolver) => servidor.listen(0, '127.0.0.1', resolver));
  return { servidor, base: `http://127.0.0.1:${servidor.address().port}/` };
}

function localizarChrome() {
  const candidatos = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  const chrome = candidatos.find((caminho) => existsSync(caminho));
  if (!chrome) {
    throw new Error('Chrome não encontrado. Defina a variável CHROME_PATH com o caminho do executável.');
  }
  return chrome;
}

const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

export async function abrirNavegador() {
  const perfil = mkdtempSync(join(tmpdir(), 'ong-testes-'));
  const porta = 9400 + Math.floor(Math.random() * 500);
  const processo = spawn(localizarChrome(), [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, 'about:blank',
  ], { stdio: 'ignore' });

  let alvo;
  for (let tentativa = 0; tentativa < 50 && !alvo; tentativa += 1) {
    try {
      alvo = await (await fetch(`http://127.0.0.1:${porta}/json/new?about:blank`, { method: 'PUT' })).json();
    } catch {
      await esperar(200);
    }
  }
  if (!alvo) {
    processo.kill();
    throw new Error('Não foi possível conectar ao Chrome.');
  }

  const pagina = new Pagina(alvo.webSocketDebuggerUrl);
  await pagina.conectar();
  pagina.fechar = async () => {
    pagina.ws.close();
    processo.kill();
    await esperar(300);
    rmSync(perfil, { recursive: true, force: true });
  };
  return pagina;
}

class Pagina {
  constructor(url) {
    this.url = url;
    this.id = 0;
    this.pendentes = new Map();
    this.ouvintes = new Set();
    this.erros = [];
  }

  async conectar() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolver) => { this.ws.onopen = resolver; });
    this.ws.onmessage = (mensagem) => {
      const dados = JSON.parse(mensagem.data);
      if (dados.id && this.pendentes.has(dados.id)) {
        this.pendentes.get(dados.id)(dados);
        this.pendentes.delete(dados.id);
        return;
      }
      if (dados.method === 'Runtime.exceptionThrown') {
        this.erros.push(dados.params.exceptionDetails.exception?.description?.split('\n')[0]);
      }
      this.ouvintes.forEach((ouvinte) => ouvinte(dados));
    };
    await this.cmd('Page.enable');
    await this.cmd('Runtime.enable');
    await this.cmd('Network.enable');
    await this.tamanho(1280, 900);
  }

  cmd(metodo, parametros = {}) {
    return new Promise((resolver) => {
      this.id += 1;
      this.pendentes.set(this.id, resolver);
      this.ws.send(JSON.stringify({ id: this.id, method: metodo, params: parametros }));
    });
  }

  tamanho(largura, altura, celular = false) {
    return this.cmd('Emulation.setDeviceMetricsOverride', {
      width: largura, height: altura, deviceScaleFactor: 1, mobile: celular,
    });
  }

  // Executa uma expressão na página e devolve o valor.
  async js(expressao) {
    const resposta = await this.cmd('Runtime.evaluate', { expression: expressao, awaitPromise: true, returnByValue: true });
    if (resposta.result?.exceptionDetails) {
      throw new Error(resposta.result.exceptionDetails.exception?.description ?? 'erro no script de teste');
    }
    return resposta.result?.result?.value;
  }

  carregado() {
    return new Promise((resolver) => {
      const ouvinte = (dados) => {
        if (dados.method === 'Page.loadEventFired') {
          this.ouvintes.delete(ouvinte);
          resolver();
        }
      };
      this.ouvintes.add(ouvinte);
    });
  }

  // Abre um endereço do zero (passa por about:blank para forçar recarga).
  async abrir(endereco, espera = 900) {
    let fim = this.carregado();
    await this.cmd('Page.navigate', { url: 'about:blank' });
    await fim;
    fim = this.carregado();
    await this.cmd('Page.navigate', { url: endereco });
    await fim;
    await esperar(espera);
  }

  // Digita como uma pessoa: foca o campo e insere o texto (dispara "input").
  async digitar(id, texto) {
    await this.js(`(() => { const c = document.getElementById(${JSON.stringify(id)}); c.value = ''; c.focus(); })()`);
    await this.cmd('Input.insertText', { text: texto });
    await esperar(40);
  }

  async sairDoCampo() {
    await this.js('document.activeElement.blur()');
    await esperar(80);
  }

  async clicar(seletor, espera = 700) {
    await this.js(`document.querySelector(${JSON.stringify(seletor)}).click()`);
    await esperar(espera);
  }

  rede(condicoes) {
    return this.cmd('Network.emulateNetworkConditions', {
      offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1, ...condicoes,
    });
  }
}

export { esperar };
