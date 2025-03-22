# Elementor ve GitHub Raw İçerik Entegrasyonu Kurulum Talimatları

Bu doküman, "Ulusal İnovasyon için Açık Kaynak HPC" projesi için hazırlanan Elementor şablonunun ve GitHub raw içerik entegrasyonunun kurulum adımlarını içermektedir.

## Gerekli Eklentiler

1. **Elementor Pro** - Sayfa oluşturucu
2. **Contact Form 7** - Kayıt formu için

## Kurulum Adımları

### 1. Tema Fonksiyonu Ekleme

Tema dosyanıza (`functions.php`) eklediğiniz GitHub raw içerik kısa kodunu kullanarak, GitHub'daki dosyaları doğrudan WordPress sitenizde gösterebilirsiniz. Bu kısa kod aşağıdaki gibidir:

```php
function github_raw_embed($atts) {
    $a = shortcode_atts(array('file' => ''), $atts);
    $content = wp_remote_get($a['file']);
    return '<pre>' . esc_html(wp_remote_retrieve_body($content)) . '</pre>';
}
add_shortcode('githubraw', 'github_raw_embed');
```

Bu fonksiyon, `[githubraw file="URL"]` şeklinde kullanılabilir ve belirtilen URL'deki içeriği WordPress sayfanızda gösterir.

### 2. Markdown Desteği (İsteğe Bağlı)

GitHub'daki Markdown dosyalarını daha güzel bir şekilde görüntülemek için, `github_raw_embed` fonksiyonunu aşağıdaki gibi geliştirebilirsiniz:

```php
function github_raw_embed($atts) {
    $a = shortcode_atts(array('file' => '', 'format' => 'raw'), $atts);
    $content = wp_remote_get($a['file']);
    $body = wp_remote_retrieve_body($content);
    
    if ($a['format'] === 'markdown') {
        // Parsedown kütüphanesini kullanarak Markdown'ı HTML'e dönüştürme
        if (!class_exists('Parsedown')) {
            require_once get_template_directory() . '/inc/Parsedown.php'; // Parsedown.php dosyasının yolunu belirtin
        }
        $parsedown = new Parsedown();
        return '<div class="markdown-content">' . $parsedown->text($body) . '</div>';
    }
    
    return '<pre>' . esc_html($body) . '</pre>';
}
add_shortcode('githubraw', 'github_raw_embed');
```

Bu geliştirilmiş fonksiyon, `[githubraw file="URL" format="markdown"]` şeklinde kullanılabilir ve Markdown içeriğini HTML olarak dönüştürür.

### 3. Contact Form 7 Kurulumu

1. WordPress yönetici panelinizden "Eklentiler > Yeni Ekle" bölümüne gidin.
2. Arama kutusuna "Contact Form 7" yazın ve eklentiyi bulun.
3. "Şimdi Yükle" ve ardından "Etkinleştir" düğmelerine tıklayın.

### 4. Kayıt Formunun Oluşturulması

1. WordPress yönetici panelinizden "İletişim > İletişim Formları" bölümüne gidin.
2. "Yeni Ekle" düğmesine tıklayın.
3. Form başlığını "HPC Çalıştay Kayıt Formu" olarak girin.
4. Aşağıdaki form kodunu Form sekmesine yapıştırın:

```
<label> Adınız Soyadınız (gerekli)
    [text* your-name] </label>

<label> E-posta Adresiniz (gerekli)
    [email* your-email] </label>

<label> Kurumunuz
    [text your-institution] </label>

<label> Pozisyonunuz
    [text your-position] </label>

<label> HPC Deneyim Seviyeniz
    [select experience include_blank "Başlangıç" "Orta" "İleri"] </label>

<label> Çalıştaydan Beklentileriniz
    [textarea your-expectations] </label>

[submit "Kayıt Ol"]
```

5. E-posta sekmesinde e-posta ayarlarınızı yapılandırın.
6. Kaydet düğmesine tıklayın.
7. Oluşturulan form kısa kodunu not alın (örn: `[contact-form-7 id="123" title="HPC Çalıştay Kayıt Formu"]`).

### 5. Elementor Şablonunun İçe Aktarılması

1. WordPress yönetici panelinizden "Şablonlar > Şablonları İçe Aktar" bölümüne gidin.
2. "Dosya Seç" düğmesine tıklayın ve `elementor_github_template.json` dosyasını seçin.
3. "İçe Aktar" düğmesine tıklayın.

### 6. Şablonu Düzenleme

1. İçe aktarılan şablonu düzenlemek için "Şablonlar > Tüm Şablonlar" bölümüne gidin.
2. "Açık Kaynak HPC Projesi" şablonunun üzerine gelin ve "Düzenle" bağlantısına tıklayın.
3. Şablonda yer alan GitHub raw dosya yollarını kendi reponuza göre güncelleyin:
   - `[githubraw file="https://raw.githubusercontent.com/cacatoski/PeakOps/main/README.md"]`
   - `[githubraw file="https://raw.githubusercontent.com/cacatoski/PeakOps/main/documentation/workshop_ajandasi.md"]`
   - `[githubraw file="https://raw.githubusercontent.com/cacatoski/PeakOps/main/documentation/acik_kaynak_hpc_faydalari.md"]`
4. Kayıt formu kısa kodunu, oluşturduğunuz formun kısa koduyla değiştirin.
5. "Güncelle" düğmesine tıklayın.

### 7. Şablonu Sayfaya Uygulama

1. WordPress yönetici panelinizden "Sayfalar > Yeni Ekle" bölümüne gidin.
2. Sayfa başlığını "Ulusal İnovasyon için Açık Kaynak HPC" olarak girin.
3. "Elementor ile Düzenle" düğmesine tıklayın.
4. Elementor editöründe, sol üst köşedeki "Şablonları İçe Aktar" simgesine tıklayın.
5. "Şablonlarım" sekmesinden "Açık Kaynak HPC Projesi" şablonunu seçin.
6. "Şablonu Ekle" düğmesine tıklayın.
7. "Yayınla" düğmesine tıklayın.

## CSS Özelleştirmeleri

Elementor şablonunda, GitHub içeriğini görüntülemek için aşağıdaki CSS stilleri kullanılmıştır:

```css
pre {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
}
```

Bu stilleri, temanızın CSS dosyasına veya WordPress Özelleştirici > Ek CSS bölümüne ekleyerek, GitHub içeriğinin görünümünü daha da iyileştirebilirsiniz.

## GitHub İçeriğinin Güncellenmesi

GitHub reponuzdaki içeriği güncelledikçe, WordPress sayfanızdaki içerik de otomatik olarak güncellenecektir. `github_raw_embed` fonksiyonu, her sayfa yüklendiğinde GitHub'dan en son içeriği çeker.

## Önbellek Yönetimi

GitHub içeriğini daha hızlı yüklemek ve GitHub API sınırlamalarını aşmamak için, içeriği önbelleğe almak iyi bir fikirdir. Aşağıdaki geliştirilmiş fonksiyonu kullanabilirsiniz:

```php
function github_raw_embed($atts) {
    $a = shortcode_atts(array('file' => '', 'cache' => '3600'), $atts);
    $cache_key = 'github_raw_' . md5($a['file']);
    $cached_content = get_transient($cache_key);
    
    if (false === $cached_content) {
        $response = wp_remote_get($a['file']);
        if (is_wp_error($response)) {
            return '<div class="github-error">GitHub içeriği yüklenemedi: ' . $response->get_error_message() . '</div>';
        }
        
        $content = wp_remote_retrieve_body($response);
        set_transient($cache_key, $content, intval($a['cache']));
    } else {
        $content = $cached_content;
    }
    
    return '<pre>' . esc_html($content) . '</pre>';
}
add_shortcode('githubraw', 'github_raw_embed');
```

Bu fonksiyon, içeriği belirtilen süre (saniye cinsinden) boyunca önbelleğe alır. Varsayılan olarak 1 saat (3600 saniye) önbelleğe alınır, ancak kısa kod parametresi ile bu süreyi değiştirebilirsiniz: `[githubraw file="URL" cache="7200"]`

## Sorun Giderme

### GitHub İçeriği Görüntülenmiyor

1. GitHub dosya URL'lerinin doğru olduğunu kontrol edin.
2. GitHub reponuzun herkese açık olduğundan emin olun.
3. WordPress'in dış bağlantılara erişebildiğinden emin olun.
4. Tarayıcı konsolunda hata olup olmadığını kontrol edin.

### Kayıt Formu Çalışmıyor

1. Contact Form 7 eklentisinin doğru şekilde kurulduğundan ve etkinleştirildiğinden emin olun.
2. Form kısa kodunun doğru olduğunu kontrol edin.
3. E-posta ayarlarınızı kontrol edin.

## Özelleştirme

Elementor editörünü kullanarak şablonun tasarımını istediğiniz gibi özelleştirebilirsiniz. Renkleri, yazı tiplerini, boşlukları ve diğer tasarım öğelerini değiştirebilirsiniz.
