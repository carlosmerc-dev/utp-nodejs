import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { promises as fs } from "fs";
import * as os from "os";

// Tipos simples para mostrar TS vs JS
interface Info {
  platform: NodeJS.Platform;
  cpus: number;
}

// Helper con tipos explícitos
function sendJSON(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body, null, 2));
}

// Handlers muy sencillos
async function home(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  sendJSON(res, 200, {
    message: "Hola desde TS (http + os + fs)",
    endpoints: ["/os", "/file?name=demo.txt"],
  });
}

async function getOs(
  _req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const info: Info = { platform: os.platform(), cpus: os.cpus().length };
  sendJSON(res, 200, info);
}

async function getFile(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const url = new URL(req.url ?? "/", "http://localhost");
  const name = url.searchParams.get("name");
  if (!name) {
    sendJSON(res, 400, { error: "Falta ?name=" });
    return;
  }
  try {
    // Escribe si no existe y luego lee
    try {
      await fs.access(name);
    } catch {
      await fs.writeFile(name, "hola TS");
    }
    const content: string = await fs.readFile(name, "utf8");
    sendJSON(res, 200, { name, content });
  } catch (e) {
    sendJSON(res, 500, { error: e instanceof Error ? e.message : String(e) });
  }
}

// Router mínimo
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const path = url.pathname;
  if (path === "/") return home(req!, res);
  if (path === "/os") return getOs(req!, res);
  if (path === "/file") return getFile(req!, res);
  sendJSON(res, 404, { error: "Ruta no encontrada" });
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
