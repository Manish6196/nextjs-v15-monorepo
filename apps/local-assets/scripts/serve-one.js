const express = require('express');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { exec } = require('child_process');

const argv = yargs(hideBin(process.argv)).argv;
const tenantName = argv.tenantName || 'default';
const isProd = argv.prod || false;

const app = express();
const port = process.env.PORT || 3000;

const assetsPath = path.join(__dirname, `../public/assets/${tenantName}/scss`);
app.use('/scss', express.static(assetsPath));

app.get('/', (req, res) => {
  res.send(`Serving SCSS for tenant: ${tenantName}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving SCSS from ${assetsPath}`);
});

// Watch SCSS files and recompile on changes
if (!isProd) {
  const watchCommand = `npx sass --watch ${assetsPath}:${assetsPath}`;
  exec(watchCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error watching SCSS files: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`SCSS files are being watched and compiled: ${stdout}`);
  });
}
