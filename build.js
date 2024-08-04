const fs = require("node:fs");
const { exec } = require('child_process');
fs.readFile("./tsconfig.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error on build process")
    console.error(err);
    return;
  }
  const outDir = `./${JSON.parse(data).compilerOptions.outDir}`
  console.log("Deleting '" + outDir + "' folder contents")

  try {
    if (fs.existsSync(outDir)) {
      fs.rm(outDir, { recursive: true, force: true }, err => {
        if (err) {
          throw err;
        }
        console.log(`${outDir} is deleted!`);
        console.log("Building...")

        exec('tsc', err => {
          if (err) {
            throw err;
          }
          console.log("Done")
        })
      })
    }
  } catch (err) {
    console.error("Error on build process")
    console.error(err);
  }
});
