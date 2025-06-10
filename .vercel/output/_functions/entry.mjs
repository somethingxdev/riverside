import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CGdsSy8h.mjs';
import { manifest } from './manifest_B_R3kkNk.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/send-telegram.astro.mjs');
const _page4 = () => import('./pages/blog/details.astro.mjs');
const _page5 = () => import('./pages/blog/_slug_.astro.mjs');
const _page6 = () => import('./pages/blog.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/faq.astro.mjs');
const _page9 = () => import('./pages/products.astro.mjs');
const _page10 = () => import('./pages/reviews.astro.mjs');
const _page11 = () => import('./pages/services.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.9.1_@types+node@22._62442aa7104a35a510180394bae25f00/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/send-telegram.ts", _page3],
    ["src/pages/blog/details.astro", _page4],
    ["src/pages/blog/[slug].astro", _page5],
    ["src/pages/blog/index.astro", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/faq.astro", _page8],
    ["src/pages/products.astro", _page9],
    ["src/pages/reviews.astro", _page10],
    ["src/pages/services.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "26916f68-51ac-4fa2-b6c8-7dfa7d45dda5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
