const fs = require("fs").promises;

async function leerArchivo() {
  try {
    const data = await fs.readFile("mensaje.txt", "utf8");
    console.log("Async/Await:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

leerArchivo();

console.log("➡️ El programa sigue mientras se lee el archivo...");