import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "out");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await cp(output, resolve(dist, "client"), { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const pathname = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname + ".html";
    response = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), request));
    return response;
  },
};
`;

await writeFile(resolve(dist, "server", "index.js"), worker, "utf8");
