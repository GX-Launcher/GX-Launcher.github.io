const currentResentVersion = 510;
const currentResentStoreVersion = 501;
let flag1 = false;
let flag2 = false;

window.eaglercraftXOpts = {
  allowUpdateSvc: false,
  allowUpdateDL: false,
  allowFNAWSkins: false,
  allowBootMenu: false,
  allowServerRedirects: false,
  checkRelaysForUpdates: false,
  enableMinceraft: false,
  container: 'game_frame',
  servers: [
    {
      addr: 'wss://play.webmc.fun',
      name: '\u00A7b\u00A7lWebMC\u00A7r',
      hideAddr: true
    },
    {
      addr: 'java://java.webmc.fun',
      name: '\u00A7b\u00A7lWebMC\u00A7r \u00A78[JAVA]\u00A7r',
      hideAddr: true
    }
  ],
  assetsURI: [ { url: 'game/assets.epw' } ],
  hooks: {
    localStorageSaved: async (key, data) => {
      if (key === 's') {
        await s();
      }
    },
    screenChanged: (screen, scaledWidth, scaledHeight, realWidth, realHeight, scaleFactor) => {
      if (!flag2 && screen.startsWith('com.resentclient.client.')) {
        canvas().style.visibility = 'visible';
        loader.canvas.style.opacity = '0';
        window.removeEventListener('resize', loader.redraw);
        setTimeout(() => {
          loader.canvas.remove();
        }, 300);
        flag2 = true;
      }
    }
  },
  optionsTXT: {
    // fov: '0.25',
    enableFNAWSkins: false,
    snooperEnabled: false
  }
}

window.ResentLoadScreen = {
  createLoadScreen: () => {},
  changeToDecompressingAssets: () => {},
  setMaxDecompressSteps: (a) => {},
  setDecompressStep: (a) => {},
  decompressProgressUpdate: (a) => {},
  showInteractScreen: () => {},
  showInteractScreenWithCallback: (a) => {},
  showFinalScreen: () => {},
  destroyLoadScreen: () => {},
  hasInteracted: () => { return false; },
  hasDestroyed: () => { return true; }
}

const loader = {
  canvas: null,
  redraw: null
}

window.open = new Proxy(window.open, {
  apply (a, b, c) {
    let url = c[0].trim();
    if (url === 'https://lax1dude.net/eaglerxserver') {
      url = 'https://github.com/lax1dude/eaglerxserver/releases/latest/download/EaglerXServer.jar';
    }
    if (url !== c[0]) {
      c[0] = url;
    }
    return Reflect.apply(a, b, c);
  }
});

CanvasRenderingContext2D.prototype.drawImage = new Proxy(CanvasRenderingContext2D.prototype.drawImage, {
  apply(a, b, c) {
    if (!flag1 && c[3] === 1920 && c[4] === 1080) {
      canvas().style.visibility = 'hidden';
      loader.canvas.style.visibility = 'visible';
      flag1 = true;
    } else {
      return Reflect.apply(a, b, c);
    }
  }
});

Worker.prototype.postMessage = new Proxy(Worker.prototype.postMessage, {
  apply(a, b, c) {
    if (c[0]?.eaglercraftXOpts?.hooks) {
      delete c[0].eaglercraftXOpts.hooks;
    }
    return Reflect.apply(a, b, c);
  }
});

async function start () {
  loader.canvas = document.querySelector('.loader');
  const ver = await gzipC(JSON.stringify({ 'lastUpdated': Date.now(), 'integer': currentResentVersion }));
  localStorage.setItem('_eaglercraftX.ResentLatestBuild', ver);
  let g = localStorage.getItem('_eaglercraftX.g');
  g = g ? await gzipD(g) : '';
  for (const k in window.eaglercraftXOpts.optionsTXT) {
    const r = new RegExp(`^${k}:.*$`, 'm');
    if (r.test(g)) {
      g = g.replace(r, `${k}:${g[k]}`);
    } else {
      g += (g.endsWith('\n') || g.length === 0 ? '' : '\n') + `${k}:${window.eaglercraftXOpts.optionsTXT[k]}\n`;
    }
  }
  localStorage.setItem('_eaglercraftX.g', await gzipC(g));
  await s();
  const img = new Image();
  img.src = 'loader.png';
  img.onload = () => {
    loader.redraw = () => draw(img, loader.canvas);
    loader.redraw();
    window.addEventListener('resize', loader.redraw);
  }
  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
  });
  main();
}

async function s () {
  await writeServers(['_eaglercraftX.s']);
}

async function gzipC (txt) {
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new TextEncoder().encode(txt));
  writer.close();
  const verBuf = await new Response(stream.readable).arrayBuffer();
  const bytes = new Uint8Array(verBuf);
  let ret = '';
  for (let i = 0; i < bytes.length; i++) {
    ret += String.fromCharCode(bytes[i]);
  }
  return btoa(ret);
}

async function gzipD (txt) {
  const bin = atob(txt);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const ret = await new Response(stream.readable).arrayBuffer();
  return new TextDecoder().decode(ret);
}

function canvas () {
  return document.querySelector('._eaglercraftX_wrapper_element');
}

function draw(img, canvas) {
  const ctx = canvas.getContext("2d");

  const dpr = devicePixelRatio || 1;

  const cssW = canvas.clientWidth || innerWidth;
  const cssH = canvas.clientHeight || innerHeight;

  canvas.width = Math.max(1, Math.floor(cssW * dpr));
  canvas.height = Math.max(1, Math.floor(cssH * dpr));

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const w = cssW;
  const h = cssH;

  const s = Math.min(w, h);
  const x = (w - s) / 2;
  const y = (h - s) / 2;

  ctx.clearRect(0, 0, w, h);

  ctx.drawImage(img, 0, 0, img.width, img.height, x, y, s, s);

  if (x > 0) {
    ctx.drawImage(img, 0, 0, 1, img.height, 0, 0, x, h);
  }
  if (w - x - s > 0) {
    ctx.drawImage(img, img.width - 1, 0, 1, img.height, x + s, 0, w - x - s, h);
  }
  if (y > 0) {
    ctx.drawImage(img, 0, 0, img.width, 1, x, 0, s, y);
  }
  if (h - y - s > 0) {
    ctx.drawImage(img, 0, img.height - 1, img.width, 1, x, y + s, s, h - y - s);
  }
}