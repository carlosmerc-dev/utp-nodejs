import http from 'http';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Bienvenido al servidor HTTP nativo" }));
    return;
  }
  if (req.method === 'GET' && req.url === '/saludo') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ saludo: "Hola, alumno" }));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

server.listen(3000, () => console.log("Servidor escuchando en http://localhost:3000"));