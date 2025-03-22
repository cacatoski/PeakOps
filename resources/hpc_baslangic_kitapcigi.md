# Açık Kaynak HPC Başlangıç Kitapçığı

## İçindekiler

1. [Giriş](#giriş)
2. [HPC Temel Kavramlar](#hpc-temel-kavramlar)
3. [Açık Kaynak HPC Yazılımları](#açık-kaynak-hpc-yazılımları)
4. [Temel Cluster Kurulumu](#temel-cluster-kurulumu)
5. [Slurm İş Planlayıcısı](#slurm-iş-planlayıcısı)
6. [GPU Entegrasyonu ve AI Uygulamaları](#gpu-entegrasyonu-ve-ai-uygulamaları)
7. [Performans Optimizasyonu](#performans-optimizasyonu)
8. [Kaynaklar ve İleri Okuma](#kaynaklar-ve-ileri-okuma)

## Giriş

Bu kitapçık, açık kaynak Yüksek Performanslı Hesaplama (HPC) sistemleri hakkında temel bilgiler sunmak ve kurumların kendi HPC altyapılarını oluşturmasına yardımcı olmak amacıyla hazırlanmıştır. Açık kaynak çözümler, maliyet etkinliği, özelleştirilebilirlik, güvenlik ve sürdürülebilirlik açısından önemli avantajlar sağlamaktadır.

## HPC Temel Kavramlar

### HPC Nedir?

Yüksek Performanslı Hesaplama (HPC), geleneksel bilgisayarların kapasitesini aşan karmaşık hesaplamaları gerçekleştirmek için çok sayıda bilgisayarın paralel çalışmasını sağlayan sistemlerdir. HPC sistemleri, büyük veri setlerinin işlenmesi, karmaşık simülasyonlar, yapay zeka uygulamaları ve bilimsel araştırmalar gibi alanlarda kullanılmaktadır.

### HPC Mimarisi

Tipik bir HPC sistemi şu bileşenlerden oluşur:

- **Hesaplama Düğümleri (Compute Nodes)**: İşlemlerin gerçekleştirildiği sunucular
- **Ağ Altyapısı (Network)**: Düğümler arası yüksek hızlı iletişimi sağlayan bağlantılar (InfiniBand, OmniPath, yüksek hızlı Ethernet)
- **Depolama Sistemleri**: Yüksek performanslı dosya sistemleri (Lustre, BeeGFS, GPFS)
- **İş Planlayıcısı**: Kaynakların verimli kullanımını sağlayan yazılımlar (Slurm, PBS, Grid Engine)
- **Yönetim Düğümü**: Sistemin yönetimini sağlayan sunucu

## Açık Kaynak HPC Yazılımları

### İşletim Sistemleri
- **Rocky Linux / AlmaLinux**: Red Hat Enterprise Linux türevi, uzun dönem destek
- **Ubuntu Server**: Kullanımı kolay, geniş paket desteği
- **OpenHPC**: HPC için optimize edilmiş dağıtım

### İş Planlayıcıları
- **Slurm**: Ölçeklenebilir ve hata toleranslı iş planlayıcısı
- **OpenPBS**: Esnek kaynak yönetimi
- **HTCondor**: Yüksek verimli hesaplama için

### Kütüphaneler ve Araçlar
- **OpenMPI/MPICH**: Paralel programlama için mesaj geçirme arayüzü
- **OpenMP**: Paylaşımlı bellek paralel programlama
- **CUDA/ROCm**: GPU programlama platformları
- **Singularity/Apptainer**: HPC için konteyner çözümü
- **EasyBuild/Spack**: Yazılım kurulum ve yönetim araçları

## Temel Cluster Kurulumu

### Donanım Gereksinimleri
- **Yönetim Düğümü**: 2x CPU, 64GB RAM, 1TB SSD
- **Hesaplama Düğümleri**: Minimum 8 çekirdek CPU, 64GB RAM, SSD
- **Ağ**: Minimum 10GbE, tercihen InfiniBand veya eşdeğeri
- **Depolama**: Yüksek performanslı paylaşımlı depolama

### Temel Kurulum Adımları

1. İşletim sistemi kurulumu
   ```bash
   # Rocky Linux 9 kurulumu sonrası temel paketlerin yüklenmesi
   dnf update -y
   dnf install -y epel-release
   dnf groupinstall -y "Development Tools"
   ```

2. Ağ yapılandırması
   ```bash
   # /etc/hosts dosyasına düğüm bilgilerinin eklenmesi
   cat << EOF >> /etc/hosts
   192.168.1.100 management
   192.168.1.101 compute01
   192.168.1.102 compute02
   EOF
   ```

3. NFS paylaşımı kurulumu
   ```bash
   # Yönetim düğümünde
   dnf install -y nfs-utils
   mkdir -p /shared
   echo "/shared *(rw,sync,no_root_squash)" >> /etc/exports
   systemctl enable --now nfs-server
   exportfs -a
   
   # Hesaplama düğümlerinde
   dnf install -y nfs-utils
   mkdir -p /shared
   echo "management:/shared /shared nfs defaults 0 0" >> /etc/fstab
   mount -a
   ```

4. SSH anahtarı yapılandırması
   ```bash
   # Yönetim düğümünde
   ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
   for i in compute01 compute02; do
     ssh-copy-id $i
   done
   ```

## Slurm İş Planlayıcısı

### Kurulum

```bash
# Yönetim düğümünde
dnf install -y munge munge-libs munge-devel
dnf install -y mariadb-server mariadb-devel
dnf install -y slurm slurm-devel slurm-munge slurm-perlapi slurm-slurmctld

# Hesaplama düğümlerinde
dnf install -y munge munge-libs
dnf install -y slurm slurm-slurmd
```

### Temel Konfigürasyon

```bash
# /etc/slurm/slurm.conf örneği
ClusterName=hpc-cluster
SlurmctldHost=management

# Düğüm tanımlamaları
NodeName=compute[01-02] CPUs=8 RealMemory=64000 State=UNKNOWN

# Bölüm tanımlamaları
PartitionName=debug Nodes=compute[01-02] Default=YES MaxTime=1-00:00:00 State=UP
```

### Temel Slurm Komutları

```bash
# İş gönderme
sbatch job_script.sh

# İş durumu sorgulama
squeue

# Düğüm durumu görüntüleme
sinfo

# İnteraktif oturum başlatma
srun --pty bash -i

# İş iptali
scancel JOB_ID
```

## GPU Entegrasyonu ve AI Uygulamaları

### NVIDIA GPU Kurulumu

```bash
# NVIDIA sürücü kurulumu
dnf config-manager --add-repo https://developer.download.nvidia.com/compute/cuda/repos/rhel9/x86_64/cuda-rhel9.repo
dnf install -y cuda-drivers

# CUDA toolkit kurulumu
dnf install -y cuda
```

### GPU İş Gönderimi

```bash
# GPU iş betiği örneği (gpu_job.sh)
#!/bin/bash
#SBATCH --job-name=gpu_test
#SBATCH --output=gpu_test_%j.out
#SBATCH --error=gpu_test_%j.err
#SBATCH --ntasks=1
#SBATCH --gres=gpu:1

nvidia-smi
python3 /shared/ai_training.py
```

### PyTorch ile Basit AI Eğitimi

```python
# /shared/ai_training.py
import torch
import torch.nn as nn
import torch.optim as optim
import time

# GPU kullanılabilirliğini kontrol et
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Basit bir sinir ağı modeli
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(1000, 500)
        self.fc2 = nn.Linear(500, 100)
        self.fc3 = nn.Linear(100, 10)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Rastgele veri oluştur
x = torch.randn(10000, 1000).to(device)
y = torch.randint(0, 10, (10000,)).to(device)

# Model, kayıp fonksiyonu ve optimizer
model = SimpleNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Eğitim zamanını ölç
start_time = time.time()

# Eğitim döngüsü
for epoch in range(10):
    optimizer.zero_grad()
    outputs = model(x)
    loss = criterion(outputs, y)
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")

end_time = time.time()
print(f"Training completed in {end_time - start_time:.2f} seconds")
```

## Performans Optimizasyonu

### Sistem Düzeyinde Optimizasyon

- **CPU Frekans Yönetimi**: Performance governor kullanımı
  ```bash
  dnf install -y tuned
  tuned-adm profile hpc-compute
  ```

- **NUMA Farkındalığı**: İş planlayıcısı ile NUMA düğümlerinin eşleştirilmesi
  ```bash
  # Slurm iş betiğinde
  #SBATCH --hint=nomultithread
  #SBATCH --cpu-bind=cores
  ```

- **Ağ Optimizasyonu**: RDMA ve yüksek MTU değerleri
  ```bash
  # /etc/sysctl.conf
  net.core.rmem_max = 16777216
  net.core.wmem_max = 16777216
  ```

### Uygulama Düzeyinde Optimizasyon

- **Derleyici Optimizasyonları**: Donanıma özgü optimizasyonlar
  ```bash
  gcc -O3 -march=native -mtune=native program.c -o program
  ```

- **Kütüphane Seçimi**: Optimizasyon için MKL, OpenBLAS gibi kütüphanelerin kullanımı
  ```bash
  # OpenBLAS kurulumu
  dnf install -y openblas-devel
  ```

- **I/O Optimizasyonu**: Paralel dosya sistemleri ve I/O stratejileri
  ```bash
  # MPI-IO örneği
  mpirun -np 16 ./io_benchmark --stripe-count=4 --stripe-size=4M
  ```

## Kaynaklar ve İleri Okuma

### Resmi Dokümantasyon
- [Slurm Resmi Dokümantasyonu](https://slurm.schedmd.com/documentation.html)
- [OpenMPI Kullanıcı Kılavuzu](https://www.open-mpi.org/doc/)
- [NVIDIA CUDA Dokümantasyonu](https://docs.nvidia.com/cuda/)

### Eğitim Kaynakları
- [OpenHPC Kullanıcı Kılavuzu](https://openhpc.community/downloads/)
- [HPC University](http://www.hpcuniversity.org/resources/)
- [XSEDE HPC Eğitimleri](https://www.xsede.org/web/xup/online-training)

### Topluluk Kaynakları
- [HPC Stack Exchange](https://scicomp.stackexchange.com/)
- [Slurm Mail Listesi](https://lists.schedmd.com/mailman/listinfo/slurm-users)
- [OpenHPC GitHub](https://github.com/openhpc/ohpc)

---

Bu kitapçık, açık kaynak HPC sistemleri hakkında temel bilgiler sunmaktadır. Daha detaylı bilgi ve destek için workshop sunumlarına ve kaynak kodlarına başvurabilirsiniz.
