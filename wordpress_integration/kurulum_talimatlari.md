# WordPress Entegrasyonu Kurulum Talimatları

Bu doküman, "Ulusal İnovasyon için Açık Kaynak HPC" projesinin peakops.co WordPress sitenize nasıl entegre edileceğini adım adım açıklamaktadır.

## 1. WordPress Sayfası Oluşturma

1. WordPress yönetici panelinize giriş yapın (genellikle `https://peakops.co/wp-admin`)
2. Sol menüden "Sayfalar" > "Yeni Ekle" seçeneğine tıklayın
3. Sayfa başlığı olarak "Ulusal İnovasyon için Açık Kaynak HPC" yazın
4. Sayfa düzenleyicisinde, içerik eklemek için uygun düzenleyiciyi seçin:
   - Gutenberg (Blok) Düzenleyici kullanıyorsanız: "+" simgesine tıklayıp "HTML" bloğu ekleyin
   - Klasik Düzenleyici kullanıyorsanız: "Metin" sekmesine geçin
5. `proje_sayfasi_icerigi.html` dosyasındaki HTML kodunu kopyalayıp yapıştırın
6. Sayfayı önizleyin ve gerekli düzenlemeleri yapın
7. "Yayınla" butonuna tıklayarak sayfayı yayınlayın

## 2. Contact Form 7 Kayıt Formu Oluşturma

1. WordPress yönetici panelinizde "Contact" > "Contact Forms" menüsüne gidin (Contact Form 7 eklentisi kurulu olmalıdır)
2. "Yeni Ekle" butonuna tıklayın
3. Form başlığı olarak "HPC Çalıştay Kayıt Formu" yazın
4. Form düzenleyicisinde, `kayit_formu_kodu.html` dosyasındaki kodu yapıştırın
5. "Kaydet" butonuna tıklayın
6. Oluşturulan form kısa kodunu (shortcode) kopyalayın (örn: `[contact-form-7 id="123" title="HPC Çalıştay Kayıt Formu"]`)
7. WordPress sayfanıza dönün ve `[contact-form-7 id="123" title="HPC Çalıştay Kayıt Formu"]` kısmını kopyaladığınız gerçek kısa kod ile değiştirin

## 3. Görsel ve Bağlantı Düzenlemeleri

1. Sayfa içeriğindeki tüm bağlantıları kontrol edin ve GitHub repo URL'lerinizin doğru olduğundan emin olun
2. Sponsorlar bölümündeki `[PeakOps Logo URL]` kısmını gerçek logo URL'niz ile değiştirin
3. Sosyal medya bağlantılarını kendi sosyal medya hesaplarınızla güncelleyin
4. İletişim bilgilerini gerçek bilgilerinizle güncelleyin

## 4. Menü ve Navigasyon Ayarları

1. WordPress yönetici panelinizde "Görünüm" > "Menüler" bölümüne gidin
2. Ana menünüzü seçin veya yeni bir menü oluşturun
3. Sol panelden "Sayfalar" sekmesine tıklayın
4. Oluşturduğunuz "Ulusal İnovasyon için Açık Kaynak HPC" sayfasını bulun ve "Menüye Ekle" butonuna tıklayın
5. Menü öğesini istediğiniz konuma sürükleyin
6. "Menüyü Kaydet" butonuna tıklayın

## 5. SEO Optimizasyonu (Yoast SEO veya benzer bir eklenti kullanıyorsanız)

1. Sayfa düzenleme ekranında SEO ayarları bölümüne gidin
2. Meta başlık olarak "Ulusal İnovasyon için Açık Kaynak HPC | PeakOps" yazın
3. Meta açıklama olarak "Savunma ve kamu sektöründe açık kaynak HPC teknolojilerinin kullanımını teşvik etmek için ulusal bir girişim" yazın
4. Anahtar kelimeler olarak "açık kaynak, HPC, yüksek performanslı hesaplama, savunma, inovasyon" ekleyin

## 6. Mobil Uyumluluk Kontrolü

1. Sayfanızı yayınladıktan sonra farklı cihazlarda (masaüstü, tablet, mobil) görünümünü kontrol edin
2. Gerekirse düzenlemeler yaparak tüm cihazlarda düzgün görüntülenmesini sağlayın

## 7. GitHub Entegrasyonu Kontrolleri

1. GitHub reponuzdaki tüm bağlantıların çalıştığından emin olun
2. README.md dosyanızı güncelleyerek WordPress sayfanıza bağlantı ekleyin:
   ```markdown
   ## Web Sitesi
   Proje web sitesini ziyaret edin: [Ulusal İnovasyon için Açık Kaynak HPC](https://peakops.co/ulusal-inovasyon-icin-acik-kaynak-hpc)
   ```

## 8. Analitik ve İzleme Ayarları

1. Google Analytics veya benzer bir analitik aracı kullanıyorsanız, sayfanızın izlendiğinden emin olun
2. Gerekirse form gönderimlerini izlemek için özel olaylar (events) ekleyin

---

Bu talimatları takip ederek, "Ulusal İnovasyon için Açık Kaynak HPC" projenizi WordPress sitenize başarıyla entegre edebilirsiniz. Herhangi bir sorun yaşarsanız veya ek yardıma ihtiyacınız olursa, WordPress yönetici panelinizin özelliklerine göre adımları uyarlayabilirsiniz.
