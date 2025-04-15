const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3002;

// CORS ayarları
app.use(cors());

// Statik dosyaları sunmak için
app.use('/project_management', express.static(path.join(__dirname, '../public/project_management')));
app.use('/documentation', express.static(path.join(__dirname, '../public/documentation')));

// Kök dizin için route
app.get('/', (req, res) => {
  res.send('Open Source HPC for National Innovation - Markdown Server');
});

// Markdown dosyalarını .md uzantısı olmadan sunmak için
app.get('/project_management/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/project_management/${req.params.file}.md`));
});

app.get('/documentation/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/documentation/${req.params.file}.md`));
});

app.listen(port, () => {
  console.log(`Statik dosya sunucusu ${port} portunda çalışıyor`);
});
