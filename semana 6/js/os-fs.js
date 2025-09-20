import os from "os";
import { writeFileSync } from "fs";

const info = {
  platform: os.platform(),
  type: os.type(),
  arch: os.arch(),
  uptime_s: os.uptime(),
  totalmem: os.totalmem()
};
writeFileSync("system-info.json", JSON.stringify(info, null, 2));
console.log("Snapshot generado → system-info.json");