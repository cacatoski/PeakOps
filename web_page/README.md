# Ulusal İnovasyon için Açık Kaynak HPC Web Sayfası

Bu klasör, "Ulusal İnovasyon için Açık Kaynak HPC" projesi için hazırlanmış statik web sayfasını içerir. Bu web sayfası, projenin GitHub reposundaki içeriği dinamik olarak gösterecek şekilde tasarlanmıştır.

## İçerik

- `index.html`: Ana web sayfası
- `styles.css`: Sayfa stilleri
- `scripts.js`: JavaScript fonksiyonları
- `images/`: Görsel dosyaları

## Özellikler

- Modern ve duyarlı (responsive) tasarım
- GitHub reposundan dinamik içerik çekme
- Bootstrap 5 framework kullanımı
- Çalıştay kayıt formu
- Markdown dosyalarını HTML'e dönüştürme

## Natro Hosting'e Yükleme Adımları

1. Natro cPanel'e giriş yapın (https://cpanel.natro.com)
2. Dosya Yöneticisi'ni açın
3. `sadecehr.com` alan adının kök dizinine gidin
4. `web_page` klasöründeki tüm dosyaları bu dizine yükleyin
5. Eğer alt dizin olarak yüklemek isterseniz (örn: sadecehr.com/hpc):
   - Önce kök dizinde `hpc` adında bir klasör oluşturun
   - Dosyaları bu klasöre yükleyin

## Yerel Geliştirme

Yerel geliştirme için basit bir HTTP sunucusu kullanabilirsiniz:

```bash
cd /Users/cacatoski/Open\ Source\ HPC\ for\ National\ Innovation/web_page
python3 -m http.server 8000
```

Ardından tarayıcınızda `http://localhost:8000` adresine giderek sayfayı görüntüleyebilirsiniz.

## GitHub İçeriği

Web sayfası, aşağıdaki GitHub dosyalarını dinamik olarak yükler:

1. `README.md` - Proje hakkında genel bilgi
2. `documentation/workshop_ajandasi.md` - Çalıştay ajandası
3. `documentation/acik_kaynak_hpc_faydalari.md` - Açık kaynak HPC faydaları
4. `documentation/hedef_kitle_ve_kurumlar.md` - Hedef kitle ve kurumlar
5. `resources/demo_slurm_gpu_setup.sh` - Demo SLURM GPU kurulum betiği

Bu dosyaların GitHub reponuzda bulunduğundan emin olun. Eğer dosya isimleri veya yolları farklıysa, `scripts.js` dosyasındaki `fetchGitHubContent()` fonksiyonunu güncelleyin.

## Özelleştirme

Sayfayı özelleştirmek için:

1. `index.html` - Sayfa yapısı ve içeriği
2. `styles.css` - Görsel stiller ve düzen
3. `scripts.js` - Dinamik fonksiyonlar ve GitHub entegrasyonu

## Not

Bu web sayfası, WordPress entegrasyonu yerine doğrudan GitHub reposundan içerik çeken bağımsız bir statik web sayfası olarak tasarlanmıştır. Herhangi bir sunucu tarafı işleme gerektirmez ve herhangi bir web sunucusunda barındırılabilir.
