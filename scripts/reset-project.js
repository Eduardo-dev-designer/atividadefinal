const fs = require("fs");
const path = require("path");
const appPath = path.join(process.cwd(), "src", "app");
if (!fs.existsSync(appPath)) fs.mkdirSync(appPath, { recursive: true });
console.log("Pasta src/app pronta. Copie os arquivos do jogo para esta pasta.");
