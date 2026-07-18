import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const host = '127.0.0.1';
const publicPort = 3000;
const appPort = 3001;
const root = resolve(import.meta.dirname, '..');
const clientRoot = join(root, 'dist', 'client');

const types = {
  '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

const app = spawn(process.execPath, [
  join(root, 'node_modules', 'vinext', 'dist', 'cli.js'),
  'start', '--hostname', host, '--port', String(appPort),
], { cwd: root, stdio: 'inherit' });

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', `http://${host}`).pathname);
  const candidate = normalize(join(clientRoot, pathname));

  if (candidate.startsWith(clientRoot) && existsSync(candidate) && statSync(candidate).isFile()) {
    response.writeHead(200, {
      'Content-Type': types[extname(candidate)] ?? 'application/octet-stream',
      'Cache-Control': pathname.includes('-') ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    createReadStream(candidate).pipe(response);
    return;
  }

  const upstream = fetch(`http://${host}:${appPort}${request.url}`, {
    method: request.method,
    headers: request.headers,
  });

  upstream.then(async (result) => {
    const headers = Object.fromEntries(result.headers.entries());
    delete headers['content-encoding'];
    delete headers['content-length'];
    response.writeHead(result.status, headers);
    response.end(Buffer.from(await result.arrayBuffer()));
  }).catch(() => {
    response.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '1' });
    response.end('Iniciando vista local…');
  });
});

server.listen(publicPort, host, () => {
  console.log(`\n  Vista local: http://${host}:${publicPort}/\n`);
});

function stop() {
  server.close();
  app.kill();
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
