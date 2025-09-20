import os from "os";

// Información básica
console.log("Plataforma:", os.platform());
console.log("Sistema operativo:", os.type());
console.log("Arquitectura:", os.arch());
console.log("Hostname:", os.hostname());
console.log("Memoria total:", (os.totalmem() / (1024 ** 3)).toFixed(2), "GB");
console.log("Memoria libre:", (os.freemem() / (1024 ** 3)).toFixed(2), "GB");

// Números de núcleos CPU
const cpus = os.cpus();
console.log("Número de núcleos:", cpus.length);
console.log("Modelo CPU:", cpus[0].model, "-", cpus[0].speed, "MHz");

// Tiempo de actividad
console.log("Uptime (segundos):", os.uptime());

// Interfaces
console.log("Interfaces:", getLocalIPv4());


function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const addrs = interfaces[name];
    for (const addrInfo of addrs) {
      const isV4 = (typeof addrInfo.family === "string")
        ? addrInfo.family === "IPv4"
        : addrInfo.family === 4;
      if (isV4 && !addrInfo.internal) {
        return addrInfo.address;
      }
    }
  }
  return null; 
}