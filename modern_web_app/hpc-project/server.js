const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// CORS ayarları
app.use(cors());

// React uygulamasını serve et
app.use(express.static(path.join(__dirname, 'build')));

// Markdown dosyalarını serve et
app.use('/project_management', express.static(path.join(__dirname, 'public/project_management')));
app.use('/documentation', express.static(path.join(__dirname, 'public/documentation')));

// Markdown dosyalarını .md uzantısı olmadan sunmak için
app.get('/project_management/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `public/project_management/${req.params.file}.md`));
});

app.get('/documentation/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `public/documentation/${req.params.file}.md`));
});

// Tüm diğer istekleri React uygulamasına yönlendir
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
