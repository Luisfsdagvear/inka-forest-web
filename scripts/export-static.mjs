import { spawn } from "node:child_process";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const clientDir = join(root, "dist", "client");
const basePath = "/inka-forest-web/";
const port = 4173;

const server = spawn(process.execPath, [
  join(root, "node_modules", "vinext", "dist", "cli.js"),
  "start",
  "--hostname",
  "127.0.0.1",
  "--port",
  String(port),
], { cwd: root, stdio: "ignore" });

async function waitForPage() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) return response.text();
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 200));
  }
  throw new Error("The production page did not become available.");
}

try {
  let html = await waitForPage();
  html = html
    .replace("<head>", `<head><base href="${basePath}">`)
    .replace(/(["'])\/(?![\/>]|inka-forest-web\/)/g, `$1${basePath}`)
    .replace(/\\"\/(?![\/>]|inka-forest-web\/)/g, `\\"${basePath}`);
  await writeFile(join(clientDir, "index.html"), html, "utf8");

  for (const file of await readdir(clientDir)) {
    if (!file.endsWith(".css")) continue;
    const path = join(clientDir, file);
    const css = (await readFile(path, "utf8"))
      .replace(/url\(\/(?!inka-forest-web\/)/g, `url(${basePath}`);
    await writeFile(path, css, "utf8");
  }

  await writeFile(join(clientDir, ".nojekyll"), "", "utf8");
} finally {
  server.kill();
}
