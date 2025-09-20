import * as os from "os";
import * as fs from "fs";
import * as http from "http";

// Información del sistema con `os`
const systemInfo = `
  Plataforma: ${os.platform()}
  Arquitectura: ${os.arch()}
  CPUs: ${os.cpus().length}
  Memoria libre: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
`;

// Guardar información en un archivo con `fs`
const logFile = "system-info.txt";
fs.writeFileSync(logFile, systemInfo);

// Crear servidor HTTP con `http`
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Servidor HTTP con Node + TypeScript \nVisita /info para ver detalles.");
  } else if (req.url === "/info") {
    const fileContent = fs.readFileSync(logFile, "utf-8");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Info del sistema:\n\n" + fileContent);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - No encontrado");
  }
});

// Escuchar en puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
