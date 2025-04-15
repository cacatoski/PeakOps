const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Proje kök dizini
const projectRoot = path.resolve(__dirname, '..');

// Markdown dosyalarının bulunduğu klasörler
const directories = [
  {
    src: 'project_management',
    dest: 'project_management'
  },
  {
    src: 'documentation',
    dest: 'documentation'
  }
];

// Kaynak ve hedef klasörleri oluştur
const publicDir = path.join(projectRoot, 'public');
const buildDir = path.join(projectRoot, 'build');

// HTML şablonu
const template = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UHPC - Ulusal Yüksek Performanslı Hesaplama Merkezi</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <style>
        body {
            background-color: #f6f8fa;
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        }
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        @media (max-width: 767px) {
            body {
                padding: 10px;
            }
            .markdown-body {
                padding: 15px;
            }
        }
        pre code.hljs {
            padding: 1em;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="markdown-body">
        CONTENT
    </div>
    <script>hljs.highlightAll();</script>
</body>
</html>
`;

// Marked ayarlarını yapılandır
marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function(code, lang) {
    const language = lang || 'plaintext';
    return `<pre><code class="hljs language-${language}">${code}</code></pre>`;
  }
});

// Markdown dosyalarını HTML'e dönüştür
directories.forEach(dir => {
  const srcDir = path.join(publicDir, dir.src);
  const destDir = path.join(buildDir, dir.dest);

  console.log(`İşleniyor: ${srcDir} -> ${destDir}`);

  // Hedef klasörü oluştur
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    // Markdown dosyalarını işle
    const files = fs.readdirSync(srcDir);
    console.log(`Bulunan dosyalar: ${files.join(', ')}`);

    files.forEach(file => {
      if (file.endsWith('.md')) {
        const srcFile = path.join(srcDir, file);
        const markdown = fs.readFileSync(srcFile, 'utf-8');
        const html = marked.parse(markdown);
        const fullHtml = template.replace('CONTENT', html);
        
        // .md uzantısını .html ile değiştir
        const htmlFile = file.replace('.md', '.html');
        const destFile = path.join(destDir, htmlFile);
        
        fs.writeFileSync(destFile, fullHtml);
        console.log(`Dönüştürüldü: ${file} -> ${htmlFile}`);
      }
    });
  } catch (error) {
    console.error(`Hata: ${dir.src} klasörü işlenirken hata oluştu:`, error);
  }
});
