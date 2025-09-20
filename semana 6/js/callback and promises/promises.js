const fs = require("fs").promises;

fs.readFile("mensaje.txt", "utf8")
  .then((data) => {
    console.log("Promise:", data);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });

console.log("➡️ El programa sigue mientras se lee el archivo...");