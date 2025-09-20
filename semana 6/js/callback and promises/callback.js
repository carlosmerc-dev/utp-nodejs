const fs = require("fs");

function mostrarResultado(err, data) {
  if (err) {
    console.error("❌ Error al leer:", err);
    return;
  }
  console.log("Callback:", data);
}

fs.readFile("mensaje.txt", "utf8", mostrarResultado);

console.log("➡️ El programa sigue mientras se lee el archivo...");