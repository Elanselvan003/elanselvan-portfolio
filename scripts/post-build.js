import fs from 'node:fs';
import path from 'node:path';

const browserDir = path.resolve('dist/Elanselvan__portfolio/browser');
const src404 = path.join(browserDir, '404/index.html');
const dest404 = path.join(browserDir, '404.html');

if (fs.existsSync(src404)) {
  fs.copyFileSync(src404, dest404);
  console.log('✓ Successfully generated 404.html for Cloudflare Pages (HTTP 404 handler).');
} else {
  console.warn('! 404/index.html not found, skipping 404.html copy.');
}

