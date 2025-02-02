const express = require('express');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { exec } = require('child_process');
const fs = require('fs');

const argv = yargs(hideBin(process.argv)).argv;
const isProd = argv.prod || false;

const app = express();
const port = process.env.PORT || 3000;

const assetsBasePath = path.join(__dirname, '../public/assets');

// Serve all tenant CSS files
fs.readdirSync(assetsBasePath).forEach((tenantName) => {
  const tenantPath = path.join(assetsBasePath, tenantName);
  app.use(`/assets/${tenantName}/`, express.static(tenantPath));
});

app.get('/', (req, res) => {
  res.send('Serving SCSS for all tenants');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving SCSS from ${assetsBasePath}`);
});

// Watch SCSS files and recompile on changes
if (!isProd) {
  fs.readdirSync(assetsBasePath).forEach((tenantName) => {
    const tenantCssPath = path.join(assetsBasePath, tenantName, 'css');
    const watchCommand = `npx sass --watch ${tenantCssPath}:${tenantCssPath}`;
    exec(watchCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Error watching SCSS files for tenant ${tenantName}: ${error.message}`
        );
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(
        `SCSS files for tenant ${tenantName} are being watched and compiled: ${stdout}`
      );
    });
  });
}