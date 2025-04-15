document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gönderiliyor...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    form.innerHTML = '<div class="text-center"><div class="mb-4"><i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i></div><h3>Kayıt İşleminiz Alındı!</h3><p class="mb-4">Kayıt formunuz başarıyla gönderildi. Çalıştay hakkında detaylı bilgiler e-posta adresinize gönderilecektir.</p></div>';
                }, 2000);
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Copy code button
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const codeElement = document.querySelector('#code-placeholder');
            const textArea = document.createElement('textarea');
            textArea.value = codeElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const tooltip = bootstrap.Tooltip.getInstance(copyBtn);
            tooltip.hide();
            copyBtn.setAttribute('data-bs-original-title', 'Kopyalandı!');
            tooltip.show();
            
            setTimeout(() => {
                copyBtn.setAttribute('data-bs-original-title', 'Kopyala');
            }, 2000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading the page
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Fetch GitHub content
    fetchGitHubContent();
});

// Function to fetch GitHub content
async function fetchGitHubContent() {
    try {
        console.log("İçerik yükleme başladı...");
        
        // Hide spinners after content is loaded
        document.querySelectorAll('.spinner-border').forEach(spinner => {
            spinner.style.display = 'none';
        });
        
        // Add README content directly
        if (document.getElementById('readme-placeholder')) {
            console.log("README içeriği yükleniyor...");
            document.getElementById('readme-placeholder').innerHTML = marked.parse(`# Open Source HPC for National Innovation

## Proje Hakkında
Bu proje, açık kaynak Yüksek Performanslı Hesaplama (HPC) teknolojilerinin ulusal inovasyon ve savunma sektöründe kullanımını teşvik etmek, farkındalık yaratmak ve kurumlar arası işbirliğini güçlendirmek amacıyla oluşturulmuştur.

## Proje Hedefleri
- Açık kaynak HPC'nin savunma ve kamu sektöründeki farkındalığını artırmak
- PeakOps'un bilgi birikimini sosyal sorumluluk çatısında görünür kılmak
- Potansiyel ortaklıklara ve danışmanlık işlerine kapı aralamak
- Ulusal yazılım/hardware ekosistemine katkıda bulunmak

## Proje Yapısı
- **presentations/**: Workshop ve etkinlikler için hazırlanan sunumlar
- **roadmaps/**: Proje yol haritaları ve planlama dokümanları
- **project_management/**: Proje takibi için Kanban board ve görev yönetimi
- **resources/**: Katılımcılar için kaynaklar, kitapçıklar ve eğitim materyalleri
- **documentation/**: Proje dokümantasyonu ve teknik belgeler`);
        }
        
        // Add workshop content directly
        if (document.getElementById('workshop-placeholder')) {
            console.log("Workshop içeriği yükleniyor...");
            document.getElementById('workshop-placeholder').innerHTML = marked.parse(`# Ulusal İnovasyon için Açık Kaynak HPC Workshop Ajandası

## Etkinlik Bilgileri

**Tarih:** 3 Mayıs 2025 (Cumartesi)  
**Saat:** 09:30 - 16:30  
**Yer:** Online (Zoom)  
**Format:** Hibrit (Fiziksel ve Online katılım imkanı)

## Detaylı Program

### 09:30 - 10:00 | Açılış Konuşması ve Tanışma
- PeakOps adına açılış konuşması
- Katılımcı kurumların tanıtımı
- Günün programının açıklanması

### 10:00 - 10:45 | HPC Sistemleri: Temel Kavramlar
- HPC nedir ve neden önemlidir?
- HPC mimarileri ve bileşenleri
- HPC kullanım alanları ve ulusal önemi

### 11:00 - 12:00 | Açık Kaynak HPC Ekosistemi
- Açık kaynak HPC yazılımları
- Açık kaynak HPC'nin avantajları
- Başarılı açık kaynak HPC projeleri

### 13:00 - 14:15 | Demo: Slurm Cluster ve GPU AI Eğitimi
- Temel cluster kurulumu
- Slurm iş planlayıcısı konfigürasyonu
- GPU entegrasyonu
- Yapay zeka modeli eğitimi örneği

### 14:30 - 15:15 | Ulusal İnovasyon için HPC Stratejileri
- Savunma sanayinde HPC kullanım alanları
- Kamu kurumlarında HPC uygulamaları
- Ulusal HPC yol haritası önerisi

### 15:15 - 16:00 | Kurum Senaryoları ve Tartışma
- Katılımcı kurumlardan vaka çalışmaları
- Moderasyonlu tartışma
- Özetleme ve çıkarımlar

### 16:00 - 16:30 | Kapanış ve Sonraki Adımlar
- Workshop çıktılarının özetlenmesi
- Sonraki adımlar ve eylem planı
- Teşekkür ve kapanış`);
        }
        
        // Add benefits content directly
        if (document.getElementById('benefits-placeholder')) {
            console.log("Faydalar içeriği yükleniyor...");
            document.getElementById('benefits-placeholder').innerHTML = marked.parse(`# Açık Kaynak HPC Çözümlerinin Ulusal İnovasyon İçin Faydaları

## Stratejik Faydalar

### Teknolojik Bağımsızlık
- **Dışa Bağımlılığın Azaltılması**: Kapalı kaynak çözümlere olan bağımlılığın azaltılması
- **Kritik Altyapı Kontrolü**: Ulusal güvenlik açısından kritik sistemlerde tam kontrol
- **Stratejik Karar Alma Özgürlüğü**: Teknoloji seçiminde bağımsız karar alabilme

### Veri Egemenliği
- **Veri Lokalizasyonu**: Hassas verilerin ulusal sınırlar içinde kalmasının sağlanması
- **Veri Güvenliği**: Kaynak koduna erişim sayesinde güvenlik açıklarının hızlı tespiti
- **Denetlenebilirlik**: Sistemlerin ulusal güvenlik standartlarına uygunluğunun denetlenmesi

## Ekonomik Faydalar

### Maliyet Etkinliği
- **Lisans Maliyetlerinden Tasarruf**: Yüksek lisans maliyetlerinin ortadan kalkması
- **Donanım Kaynaklarının Verimli Kullanımı**: Özelleştirilmiş çözümlerle maksimum performans
- **Ölçeklenebilir Maliyet Yapısı**: İhtiyaca göre büyüyebilen, modüler maliyet yapısı

### Toplam Sahip Olma Maliyeti (TCO)
- **Uzun Vadeli Maliyet Avantajı**: 3-5 yıllık perspektifte önemli maliyet avantajı
- **Bakım ve Destek Esnekliği**: Tek bir tedarikçiye bağlı kalmadan bakım ve destek
- **Yükseltme Maliyetlerinin Azalması**: Kademeli ve ihtiyaca göre yükseltme imkanı`);
        }
        
        // Add target audience content directly
        if (document.getElementById('target-placeholder')) {
            console.log("Hedef kitle içeriği yükleniyor...");
            document.getElementById('target-placeholder').innerHTML = marked.parse(`# Hedef Kitle ve Kurumlar Analizi

## Hedef Sektörler

### 1. Savunma Sanayi
Savunma sanayi, yüksek performanslı hesaplama (HPC) sistemlerini simülasyon, modelleme, veri analizi ve yapay zeka uygulamalarında kullanmaktadır. Açık kaynak HPC çözümleri, maliyet etkinliği ve güvenlik açısından önemli avantajlar sunmaktadır.

### 2. Kamu Kurumları
Kamu kurumları, büyük veri analizi, bilimsel araştırmalar ve e-devlet hizmetleri için HPC sistemlerine ihtiyaç duymaktadır. Açık kaynak çözümler, bağımsızlık ve sürdürülebilirlik sağlamaktadır.

### 3. Araştırma Merkezleri ve Üniversiteler
Akademik kurumlar, bilimsel araştırmalar, simülasyonlar ve veri analizi için HPC sistemlerini yoğun olarak kullanmaktadır. Açık kaynak çözümler, akademik özgürlük ve işbirliği için ideal bir platform sunmaktadır.

## Hedef Kurumlar Listesi

### Savunma Sanayi
1. **ASELSAN**
2. **HAVELSAN**
3. **ROKETSAN**
4. **STM (Savunma Teknolojileri Mühendislik)**
5. **TÜBİTAK SAGE**

### Kamu Kurumları
1. **TÜBİTAK ULAKBİM**
2. **Türkiye Bilimler Akademisi (TÜBA)**
3. **Sanayi ve Teknoloji Bakanlığı**
4. **Savunma Sanayii Başkanlığı (SSB)**

### Araştırma Merkezleri ve Üniversiteler
1. **İTÜ Bilgi İşlem Daire Başkanlığı**
2. **ODTÜ BUYEM**
3. **Boğaziçi Üniversitesi**
4. **Sabancı Üniversitesi**`);
        }
        
        // Add code content directly
        if (document.getElementById('code-placeholder')) {
            console.log("Kod içeriği yükleniyor...");
            document.getElementById('code-placeholder').textContent = `#!/bin/bash
# Demo Script: Slurm Cluster with GPU Support for AI Training
# Open Source HPC for National Innovation Workshop
# 
# Bu script, workshop sırasında canlı demo için kullanılacak temel
# Slurm cluster kurulumu ve GPU destekli AI eğitimi için hazırlanmıştır.

# Renk kodları
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Fonksiyonlar
function print_header() {
    echo -e "\\n${BLUE}===========================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===========================================================${NC}\\n"
}

function print_step() {
    echo -e "${GREEN}[+] $1${NC}"
}

# Demo başlangıcı
clear
print_header "AÇIK KAYNAK HPC DEMO: SLURM CLUSTER VE GPU AI EĞİTİMİ"
echo "Tarih: $(date)"
echo "Sunan: [Adınız]"
echo "Kurum: PeakOps"

# Demo klasörü oluşturma
DEMO_DIR="$HOME/hpc_demo"
print_step "Demo klasörü oluşturuluyor: $DEMO_DIR"
mkdir -p $DEMO_DIR
cd $DEMO_DIR

# Docker Compose dosyası oluşturma
print_step "Docker Compose dosyası oluşturuluyor..."
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  slurmctld:
    image: giovtorres/slurm-docker-cluster:latest
    hostname: slurmctld
    container_name: slurmctld
    volumes:
      - ./shared:/shared
    environment:
      - SLURM_NODENAME=slurmctld
    ports:
      - "8888:8888"
    networks:
      - slurm-net

  c1:
    image: giovtorres/slurm-docker-cluster:latest
    hostname: c1
    container_name: c1
    volumes:
      - ./shared:/shared
    environment:
      - SLURM_NODENAME=c1
    networks:
      - slurm-net

networks:
  slurm-net:
EOF`;
        }
        
        console.log("Syntax highlighting uygulanıyor...");
        // Apply syntax highlighting to code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            try {
                hljs.highlightElement(block);
            } catch (e) {
                console.error("Syntax highlighting hatası:", e);
            }
        });
        
        console.log("İçerik yükleme tamamlandı.");
    } catch (error) {
        console.error('Error loading content:', error);
        document.querySelectorAll('.github-body').forEach(body => {
            body.innerHTML = '<div class="alert alert-danger">İçerik yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>';
        });
    }
}

// Sayfa yüklendiğinde içeriği yükle
document.addEventListener('DOMContentLoaded', function() {
    console.log("Sayfa yüklendi, içerik yükleme başlatılıyor...");
    fetchGitHubContent();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.background = '#1a202c';
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'var(--dark-color)';
    }
});
