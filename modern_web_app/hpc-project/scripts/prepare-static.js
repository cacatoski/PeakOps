const fs = require('fs');
const path = require('path');

// Statik dışa aktarma için hazırlık scripti
console.log('Statik dışa aktarma için hazırlık yapılıyor...');

// Build klasörünü kontrol et
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  console.error('Build klasörü bulunamadı. Önce "npm run build" komutunu çalıştırın.');
  process.exit(1);
}

// Statik dışa aktarma klasörünü oluştur
const staticExportDir = path.join(__dirname, '../../static-export');
if (!fs.existsSync(staticExportDir)) {
  fs.mkdirSync(staticExportDir, { recursive: true });
  console.log(`Statik dışa aktarma klasörü oluşturuldu: ${staticExportDir}`);
}

// Build klasöründeki dosyaları statik dışa aktarma klasörüne kopyala
const copyDir = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

try {
  copyDir(buildDir, staticExportDir);
  console.log('Dosyalar başarıyla kopyalandı.');
  
  // .htaccess dosyası oluştur (Natro hosting için)
  const htaccessContent = `
# Yönlendirmeler ve URL yeniden yazma kuralları
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # SPA için tüm istekleri index.html'e yönlendir
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Tarayıcı önbelleğe alma
<IfModule mod_expires.c>
  ExpiresActive On
  
  # CSS, JS ve medya dosyaları için önbellek süresi
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # HTML için kısa önbellek süresi
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Sıkıştırma
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
`;
  
  fs.writeFileSync(path.join(staticExportDir, '.htaccess'), htaccessContent);
  console.log('.htaccess dosyası oluşturuldu.');
  
  console.log('Statik dışa aktarma işlemi tamamlandı!');
  console.log(`Dosyalar şu klasöre kopyalandı: ${staticExportDir}`);
  console.log('Bu klasördeki tüm dosyaları Natro hosting\'e yükleyebilirsiniz.');
} catch (error) {
  console.error('Hata:', error);
  process.exit(1);
}
