const http = require("http");
const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "www");
const port = 8080;

const server = http.createServer((req, res) => {
  // Nếu truy cập root → trả về index.html
  let filePath =
    req.url === "/"
      ? path.join(folder, "index.html")
      : path.join(folder, req.url);

  const ext = path.extname(filePath);

  // Mặc định content-type
  let contentType = "text/html";
  const mimeTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  if (mimeTypes[ext]) {
    contentType = mimeTypes[ext];
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // File không tồn tại
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Not Found</h1>");
      } else {
        res.writeHead(500);
        res.end("Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Static server is running at http://localhost:${port}`);
});
