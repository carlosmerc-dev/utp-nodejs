import * as os from "os";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";

// Crear servidor HTTP con `http`
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h1>API de Sistema Node.js</h1>
        <ul>
          <li><a href="/info">Info General del Sistema</a></li>
          <li><a href="/cpu">Información de CPU</a></li>
          <li><a href="/memory">Información de Memoria</a></li>
          <li><a href="/network">Información de Red</a></li>
          <li><a href="/files">Información de Archivos</a></li>
          <li><a href="/os">Información del SO</a></li>
        </ul>
      `);
      break;

    case "/info":
      const systemInfo = {
        platform: os.platform(),
        architecture: os.arch(),
        cpus: os.cpus().length,
        freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
        totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
        uptime: `${(os.uptime() / 3600).toFixed(2)} horas`
      };
      sendJsonResponse(res, systemInfo);
      break;

    case "/cpu":
      const cpuInfo = {
        cores: os.cpus(),
        loadAvg: os.loadavg()
      };
      sendJsonResponse(res, cpuInfo);
      break;

    case "/memory":
      const memoryInfo = {
        total: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        free: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        used: `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`
      };
      sendJsonResponse(res, memoryInfo);
      break;

    case "/network":
      const networkInfo = {
        interfaces: os.networkInterfaces(),
        hostname: os.hostname()
      };
      sendJsonResponse(res, networkInfo);
      break;

    case "/files":
      const currentDir = process.cwd();
      const files = fs.readdirSync(currentDir);
      const filesInfo = files.map(file => {
        const stats = fs.statSync(path.join(currentDir, file));
        return {
          name: file,
          size: `${(stats.size / 1024).toFixed(2)} KB`,
          created: stats.birthtime,
          modified: stats.mtime,
          isDirectory: stats.isDirectory()
        };
      });
      sendJsonResponse(res, filesInfo);
      break;

    case "/os":
      const osInfo = {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        uptime: os.uptime(),
        userInfo: os.userInfo(),
        constants: os.constants
      };
      sendJsonResponse(res, osInfo);
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "404 - No encontrado" }));
  }
});

// Función auxiliar para enviar respuestas JSON
function sendJsonResponse(res: http.ServerResponse, data: any) {
  res.writeHead(200, { 
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(data, null, 2));
}

// Escuchar en puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('- http://localhost:3000/');
  console.log('- http://localhost:3000/info');
  console.log('- http://localhost:3000/cpu');
  console.log('- http://localhost:3000/memory');
  console.log('- http://localhost:3000/network');
  console.log('- http://localhost:3000/files');
  console.log('- http://localhost:3000/os');
});
