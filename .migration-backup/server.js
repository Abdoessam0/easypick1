import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import server from './dist/server/server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = path.join(__dirname, 'dist', 'client');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

async function handleRequest(req, res) {
  try {
    // 1. Serve static files from dist/client if they exist
    const urlPath = req.url.split('?')[0];
    const safeSuffix = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(CLIENT_DIR, safeSuffix);

    try {
      const stats = await fs.promises.stat(filePath);
      if (stats.isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable'
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    } catch {
      // File does not exist, fall back to SSR handler
    }

    // 2. Fallback to SSR Handler using Web Request/Response
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const hostHeader = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${hostHeader}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          for (const val of value) {
            headers.append(key, val);
          }
        } else {
          headers.set(key, value);
        }
      }
    }

    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = Readable.toWeb(req);
    }

    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      // @ts-ignore
      duplex: 'half'
    });

    const webResponse = await server.fetch(webRequest);

    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;
    
    webResponse.headers.forEach((value, key) => {
      if (key === 'set-cookie') {
        const cookies = webResponse.headers.getSetCookie();
        res.setHeader(key, cookies);
      } else {
        res.setHeader(key, value);
      }
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error('Error handling request:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('Internal Server Error');
  }
}

createServer(handleRequest).listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
