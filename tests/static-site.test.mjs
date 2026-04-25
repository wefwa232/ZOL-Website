import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('uses built Tailwind CSS instead of the browser CDN', async () => {
  const html = await read('index.html');

  assert(!html.includes('cdn.tailwindcss.com'));
  assert.match(html, /<link rel="stylesheet" href="css\/styles\.css(?:\?v=[^\"]+)?">/);
});

test('hero content has a no-JavaScript fallback and animates to visible', async () => {
  const [html, css, js] = await Promise.all([
    read('index.html'),
    read('css/custom.css'),
    read('js/main.js'),
  ]);

  assert.match(html, /document\.documentElement\.classList\.add\('js'\)/);
  assert.match(css, /\.js\s+\.hero-copy/);
  assert.match(css, /\.js[\s\S]*?\.hero-visual[\s\S]*?opacity:\s*0;/);
  assert.match(js, /fromTo\('\.hero-copy'/);
  assert.match(js, /opacity:\s*1/);
});

test('navigation, FAQ, and icon controls expose accessible state', async () => {
  const [html, js] = await Promise.all([read('index.html'), read('js/main.js')]);

  assert.match(html, /id="mobile-menu-btn"[\s\S]*aria-expanded="false"[\s\S]*aria-controls="mobile-menu"/);
  assert.match(html, /id="mobile-menu"[\s\S]*aria-hidden="true"/);
  assert.match(html, /class="faq-toggle"[\s\S]*aria-expanded="false"[\s\S]*aria-controls=/);
  assert.match(html, /data-lucide=/);
  assert.match(js, /createIcons/);
  assert.match(js, /setAttribute\('aria-expanded'/);
});

test('uses local imagery and defines site icons/social metadata', async () => {
  const html = await read('index.html');

  assert(!html.includes('placehold.co'));
  assert.match(html, /images\/gallery\/reading-session\.svg/);
  assert.match(html, /rel="icon"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="twitter:card"/);
});

test('README reflects the current production stack', async () => {
  const readme = await read('README.md');

  assert.match(readme, /Tailwind CSS \(CLI build\)/);
  assert.match(readme, /GSAP \+ ScrollTrigger/);
  assert.match(readme, /Lucide/);
  assert.match(readme, /Bricolage Grotesque \+ Manrope/);
  assert(!readme.includes('Typed.js'));
  assert(!readme.includes('AOS'));
});
