import http from "http";
import fs from "fs";
import path from "path";

// 根路径静态服务器：模拟自定义域名 p.ikev.top 的部署形态。
// 站点产物（out/）直接挂在根路径，无子路径前缀。
const ROOT = path.resolve("out");
const PORT = 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  let filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("forbidden");
  }

  const send = (p) => {
    const ext = path.extname(p);
    res.writeHead(200, { "content-type": TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(p).pipe(res);
  };

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) return send(filePath);
    if (!err && stat.isDirectory())
      return send(path.join(filePath, "index.html"));
    const htmlAlt = path.join(ROOT, urlPath.replace(/\/$/, "") + ".html");
    if (fs.existsSync(htmlAlt)) return send(htmlAlt);
    const dirAlt = path.join(ROOT, urlPath, "index.html");
    if (fs.existsSync(dirAlt)) return send(dirAlt);
    res.writeHead(404);
    res.end("404 not found");
  });
});

server.listen(PORT, () =>
  console.log(`serving ${ROOT} at http://localhost:${PORT}`)
);
