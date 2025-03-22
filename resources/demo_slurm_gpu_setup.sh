#!/bin/bash
# Demo Script: Slurm Cluster with GPU Support for AI Training
# Open Source HPC for National Innovation Workshop
# 
# Bu script, workshop sırasında canlı demo için kullanılacak temel
# Slurm cluster kurulumu ve GPU destekli AI eğitimi için hazırlanmıştır.
# 
# NOT: Bu script eğitim amaçlıdır ve gerçek bir üretim ortamında
# kullanılmadan önce güvenlik ve performans açısından gözden geçirilmelidir.

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonksiyonlar
function print_header() {
    echo -e "\n${BLUE}===========================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===========================================================${NC}\n"
}

function print_step() {
    echo -e "${GREEN}[+] $1${NC}"
}

function print_substep() {
    echo -e "${YELLOW}  [-] $1${NC}"
}

function print_error() {
    echo -e "${RED}[!] HATA: $1${NC}"
}

function check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 komutu bulunamadı. Lütfen yükleyin."
        exit 1
    fi
}

# Demo başlangıcı
clear
print_header "AÇIK KAYNAK HPC DEMO: SLURM CLUSTER VE GPU AI EĞİTİMİ"
echo "Tarih: $(date)"
echo "Sunan: [Adınız]"
echo "Kurum: PeakOps"
echo

# Sistem kontrolü
print_step "Sistem kontrolü yapılıyor..."
print_substep "İşletim sistemi: $(uname -s) $(uname -r)"
print_substep "CPU: $(lscpu | grep "Model name" | sed 's/Model name: *//g')"
print_substep "Bellek: $(free -h | awk '/^Mem:/ {print $2}')"

# Gerekli komutların kontrolü
check_command docker
check_command python3
check_command git

# Docker kontrolü
print_step "Docker durumu kontrol ediliyor..."
docker info | grep "Running\|Containers\|Images"

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

  c2:
    image: giovtorres/slurm-docker-cluster:latest
    hostname: c2
    container_name: c2
    volumes:
      - ./shared:/shared
    environment:
      - SLURM_NODENAME=c2
    networks:
      - slurm-net

networks:
  slurm-net:
EOF

# Paylaşılan klasör oluşturma
print_step "Paylaşılan klasör oluşturuluyor..."
mkdir -p $DEMO_DIR/shared

# Python AI eğitim scripti oluşturma
print_step "Python AI eğitim scripti oluşturuluyor..."
cat > $DEMO_DIR/shared/ai_training.py << 'EOF'
#!/usr/bin/env python3
# AI Eğitim Demo Scripti
# Bu script, basit bir sinir ağı modelini eğitir ve performans ölçümü yapar

import numpy as np
import time
import os
import sys

# GPU kullanılabilirliğini kontrol etmeye çalış
try:
    import torch
    has_torch = True
    has_gpu = torch.cuda.is_available()
    device_name = torch.cuda.get_device_name(0) if has_gpu else "CPU"
except ImportError:
    has_torch = False
    has_gpu = False
    device_name = "CPU (PyTorch yüklü değil)"

# Sistem bilgilerini yazdır
print(f"Hostname: {os.uname().nodename}")
print(f"Slurm Job ID: {os.environ.get('SLURM_JOB_ID', 'N/A')}")
print(f"CPU Count: {os.cpu_count()}")
print(f"PyTorch Installed: {has_torch}")
print(f"GPU Available: {has_gpu}")
print(f"Device: {device_name}")
print("-" * 50)

# Veri boyutu (artırarak test edebilirsiniz)
N = 10000
D_in = 1000
H = 100
D_out = 10
print(f"Veri Boyutu: {N}x{D_in}")

# Eğitim fonksiyonu (NumPy ile)
def train_numpy():
    print("NumPy ile eğitim başlatılıyor...")
    
    # Rastgele veri oluştur
    np.random.seed(42)
    x = np.random.randn(N, D_in)
    y = np.random.randn(N, D_out)
    
    # Rastgele model parametreleri
    w1 = np.random.randn(D_in, H)
    w2 = np.random.randn(H, D_out)
    
    learning_rate = 1e-6
    t_start = time.time()
    
    # Eğitim döngüsü
    for t in range(20):
        # İleri geçiş
        h = x.dot(w1)
        h_relu = np.maximum(h, 0)
        y_pred = h_relu.dot(w2)
        
        # Kayıp hesapla
        loss = np.square(y_pred - y).sum()
        
        # Geri yayılım
        grad_y_pred = 2.0 * (y_pred - y)
        grad_w2 = h_relu.T.dot(grad_y_pred)
        grad_h_relu = grad_y_pred.dot(w2.T)
        grad_h = grad_h_relu.copy()
        grad_h[h < 0] = 0
        grad_w1 = x.T.dot(grad_h)
        
        # Parametreleri güncelle
        w1 -= learning_rate * grad_w1
        w2 -= learning_rate * grad_w2
        
        if t % 5 == 0:
            print(f"Epoch {t}: Loss = {loss:.6f}")
    
    t_end = time.time()
    print(f"NumPy eğitim süresi: {t_end - t_start:.2f} saniye")
    return t_end - t_start

# PyTorch ile eğitim (GPU varsa kullanır)
def train_pytorch():
    if not has_torch:
        print("PyTorch yüklü değil, bu adım atlanıyor.")
        return None
    
    print(f"PyTorch ile eğitim başlatılıyor... (Device: {device_name})")
    
    # Cihazı belirle
    device = torch.device("cuda:0" if has_gpu else "cpu")
    
    # Rastgele veri oluştur
    torch.manual_seed(42)
    x = torch.randn(N, D_in, device=device)
    y = torch.randn(N, D_out, device=device)
    
    # Model tanımla
    model = torch.nn.Sequential(
        torch.nn.Linear(D_in, H),
        torch.nn.ReLU(),
        torch.nn.Linear(H, D_out),
    ).to(device)
    
    # Kayıp fonksiyonu ve optimizer
    loss_fn = torch.nn.MSELoss(reduction='sum')
    optimizer = torch.optim.SGD(model.parameters(), lr=1e-6)
    
    t_start = time.time()
    
    # Eğitim döngüsü
    for t in range(20):
        # İleri geçiş
        y_pred = model(x)
        
        # Kayıp hesapla
        loss = loss_fn(y_pred, y)
        
        # Gradyanları sıfırla
        optimizer.zero_grad()
        
        # Geri yayılım
        loss.backward()
        
        # Parametreleri güncelle
        optimizer.step()
        
        if t % 5 == 0:
            print(f"Epoch {t}: Loss = {loss.item():.6f}")
    
    t_end = time.time()
    print(f"PyTorch eğitim süresi: {t_end - t_start:.2f} saniye")
    return t_end - t_start

# Ana fonksiyon
if __name__ == "__main__":
    # NumPy ile eğitim (CPU)
    numpy_time = train_numpy()
    
    print("\n" + "-" * 50 + "\n")
    
    # PyTorch ile eğitim (GPU varsa)
    pytorch_time = train_pytorch()
    
    # Karşılaştırma
    if pytorch_time is not None and numpy_time is not None:
        speedup = numpy_time / pytorch_time
        print(f"\nHızlanma: {speedup:.2f}x ({device_name} vs CPU)")
EOF

# Slurm iş betiği oluşturma
print_step "Slurm iş betiği oluşturuluyor..."
cat > $DEMO_DIR/shared/ai_job.sh << 'EOF'
#!/bin/bash
#SBATCH --job-name=ai_training
#SBATCH --output=ai_training_%j.out
#SBATCH --error=ai_training_%j.err
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=2
#SBATCH --time=00:10:00

echo "Slurm AI Eğitim İşi Başlatıldı"
echo "================================"
echo "İş ID: $SLURM_JOB_ID"
echo "Düğüm: $SLURMDHOST"
echo "Başlangıç Zamanı: $(date)"
echo

# Sistem bilgilerini yazdır
echo "Sistem Bilgileri:"
echo "----------------"
lscpu | grep "Model name\|CPU(s)\|Thread(s) per core"
free -h
echo

# Python versiyonunu kontrol et
echo "Python Bilgileri:"
echo "----------------"
python3 --version
pip3 list | grep "numpy\|torch"
echo

# AI eğitim scriptini çalıştır
echo "AI Eğitim Başlatılıyor..."
echo "------------------------"
python3 /shared/ai_training.py

echo
echo "İş Tamamlandı: $(date)"
EOF

# Slurm info scripti oluşturma
print_step "Slurm bilgi scripti oluşturuluyor..."
cat > $DEMO_DIR/shared/slurm_info.sh << 'EOF'
#!/bin/bash
# Slurm Cluster Bilgi Scripti

echo "===== SLURM CLUSTER BİLGİLERİ ====="
echo "Tarih: $(date)"
echo

echo "--- Düğüm Bilgileri ---"
sinfo -N -l
echo

echo "--- Bölüm Bilgileri ---"
sinfo
echo

echo "--- Kuyruk Bilgileri ---"
squeue
echo

echo "--- Düğüm Detayları ---"
scontrol show nodes
echo

echo "--- Bölüm Detayları ---"
scontrol show partitions
echo

echo "--- Slurm Versiyonu ---"
scontrol --version
echo
EOF

# Performans test scripti oluşturma
print_step "Performans test scripti oluşturuluyor..."
cat > $DEMO_DIR/shared/benchmark.sh << 'EOF'
#!/bin/bash
#SBATCH --job-name=benchmark
#SBATCH --output=benchmark_%j.out
#SBATCH --error=benchmark_%j.err
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=2
#SBATCH --time=00:05:00

echo "Slurm Benchmark İşi Başlatıldı"
echo "=============================="
echo "İş ID: $SLURM_JOB_ID"
echo "Düğüm: $SLURMDHOST"
echo "Başlangıç Zamanı: $(date)"
echo

# STREAM Benchmark
echo "STREAM Bellek Benchmark"
echo "----------------------"
cat > stream.c << 'EOC'
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <sys/time.h>

#ifndef N
#define N 20000000
#endif

#define NTIMES 10

int main() {
    double *a, *b, *c;
    double scalar = 3.0;
    struct timeval start, end;
    double times[4][NTIMES];
    
    printf("STREAM Benchmark - Memory Bandwidth Test\n");
    printf("Array size = %d\n", N);
    
    a = (double*)malloc(sizeof(double) * N);
    b = (double*)malloc(sizeof(double) * N);
    c = (double*)malloc(sizeof(double) * N);
    
    // Initialize arrays
    for (int j = 0; j < N; j++) {
        a[j] = 1.0;
        b[j] = 2.0;
        c[j] = 0.0;
    }
    
    printf("Running benchmark...\n");
    
    for (int k = 0; k < NTIMES; k++) {
        // Copy
        gettimeofday(&start, NULL);
        #pragma omp parallel for
        for (int j = 0; j < N; j++)
            c[j] = a[j];
        gettimeofday(&end, NULL);
        times[0][k] = (end.tv_sec - start.tv_sec) + (end.tv_usec - start.tv_usec) * 1e-6;
        
        // Scale
        gettimeofday(&start, NULL);
        #pragma omp parallel for
        for (int j = 0; j < N; j++)
            b[j] = scalar * c[j];
        gettimeofday(&end, NULL);
        times[1][k] = (end.tv_sec - start.tv_sec) + (end.tv_usec - start.tv_usec) * 1e-6;
        
        // Add
        gettimeofday(&start, NULL);
        #pragma omp parallel for
        for (int j = 0; j < N; j++)
            c[j] = a[j] + b[j];
        gettimeofday(&end, NULL);
        times[2][k] = (end.tv_sec - start.tv_sec) + (end.tv_usec - start.tv_usec) * 1e-6;
        
        // Triad
        gettimeofday(&start, NULL);
        #pragma omp parallel for
        for (int j = 0; j < N; j++)
            a[j] = b[j] + scalar * c[j];
        gettimeofday(&end, NULL);
        times[3][k] = (end.tv_sec - start.tv_sec) + (end.tv_usec - start.tv_usec) * 1e-6;
    }
    
    // Calculate average times and bandwidths
    double avgtime[4] = {0};
    for (int k = 1; k < NTIMES; k++) { // Skip the first iteration
        for (int j = 0; j < 4; j++) {
            avgtime[j] += times[j][k];
        }
    }
    
    for (int j = 0; j < 4; j++) {
        avgtime[j] /= (double)(NTIMES - 1);
    }
    
    double bytes[4] = {
        2 * sizeof(double) * N, // Copy
        2 * sizeof(double) * N, // Scale
        3 * sizeof(double) * N, // Add
        3 * sizeof(double) * N  // Triad
    };
    
    const char *label[4] = {"Copy", "Scale", "Add", "Triad"};
    
    printf("\nOperation    Best Rate (MB/s)   Avg time (s)   Min time (s)   Max time (s)\n");
    for (int j = 0; j < 4; j++) {
        // Find min and max times
        double mintime = times[j][1];
        double maxtime = times[j][1];
        for (int k = 2; k < NTIMES; k++) {
            mintime = (times[j][k] < mintime) ? times[j][k] : mintime;
            maxtime = (times[j][k] > maxtime) ? times[j][k] : maxtime;
        }
        
        printf("%8s    %12.1f    %12.6f    %12.6f    %12.6f\n",
               label[j], bytes[j] / (1024 * 1024 * mintime), avgtime[j], mintime, maxtime);
    }
    
    free(a);
    free(b);
    free(c);
    
    return 0;
}
EOC

gcc -O3 -fopenmp stream.c -o stream
./stream
rm stream stream.c

# CPU Benchmark
echo
echo "CPU Benchmark - Linpack"
echo "----------------------"
cat > linpack.c << 'EOC'
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>
#include <sys/time.h>

#define N 2000
#define NITER 3

double second() {
    struct timeval tv;
    gettimeofday(&tv, NULL);
    return (double)tv.tv_sec + (double)tv.tv_usec * 1e-6;
}

int main() {
    double *a, *b, *x, *y;
    double alpha, beta;
    double t1, t2, times[NITER];
    double flops;
    int i, j, k, iter;
    
    printf("Linpack Benchmark - N = %d\n", N);
    
    a = (double*)malloc(N * N * sizeof(double));
    b = (double*)malloc(N * sizeof(double));
    x = (double*)malloc(N * sizeof(double));
    y = (double*)malloc(N * sizeof(double));
    
    // Initialize a, b, x
    for (i = 0; i < N; i++) {
        x[i] = 1.0;
        b[i] = 0.0;
        for (j = 0; j < N; j++) {
            a[i*N + j] = (double)(rand() % 100) / 100.0;
            b[i] += a[i*N + j];
        }
    }
    
    alpha = 1.0;
    beta = 0.0;
    
    for (iter = 0; iter < NITER; iter++) {
        t1 = second();
        
        // Matrix-vector multiplication: y = alpha*A*x + beta*y
        for (i = 0; i < N; i++) {
            y[i] = beta * y[i];
            for (j = 0; j < N; j++) {
                y[i] += alpha * a[i*N + j] * x[j];
            }
        }
        
        t2 = second();
        times[iter] = t2 - t1;
    }
    
    // Calculate average time and FLOPS
    double avg_time = 0.0;
    for (i = 0; i < NITER; i++) {
        avg_time += times[i];
    }
    avg_time /= NITER;
    
    // 2*N*N floating point operations for matrix-vector multiply
    flops = 2.0 * N * N / avg_time;
    
    printf("Average time: %.6f seconds\n", avg_time);
    printf("Performance: %.2f MFLOPS\n", flops / 1e6);
    
    free(a);
    free(b);
    free(x);
    free(y);
    
    return 0;
}
EOC

gcc -O3 linpack.c -o linpack -lm
./linpack
rm linpack linpack.c

echo
echo "İş Tamamlandı: $(date)"
EOF

# Çalıştırma izinleri verme
print_step "Çalıştırma izinleri veriliyor..."
chmod +x $DEMO_DIR/shared/*.sh
chmod +x $DEMO_DIR/shared/*.py

# Docker compose başlatma
print_step "Docker Compose ile Slurm cluster başlatılıyor..."
cd $DEMO_DIR
docker-compose up -d

# Cluster'ın hazır olmasını bekle
print_step "Cluster'ın hazır olması bekleniyor..."
sleep 10

# Slurm durumunu kontrol et
print_step "Slurm durumu kontrol ediliyor..."
docker exec slurmctld sinfo

# Demo talimatları
print_header "DEMO KULLANIM TALİMATLARI"
echo "1. Slurm cluster başarıyla başlatıldı."
echo "2. Cluster bilgilerini görüntülemek için:"
echo "   docker exec slurmctld /shared/slurm_info.sh"
echo
echo "3. AI eğitim işini göndermek için:"
echo "   docker exec slurmctld sbatch /shared/ai_job.sh"
echo
echo "4. Benchmark işini göndermek için:"
echo "   docker exec slurmctld sbatch /shared/benchmark.sh"
echo
echo "5. İş kuyruğunu kontrol etmek için:"
echo "   docker exec slurmctld squeue"
echo
echo "6. İş çıktılarını görüntülemek için:"
echo "   docker exec slurmctld ls -la *.out"
echo "   docker exec slurmctld cat [çıktı_dosyası]"
echo
echo "7. Cluster'ı durdurmak için:"
echo "   cd $DEMO_DIR && docker-compose down"
echo
echo "Demo dosyaları: $DEMO_DIR"
echo

print_header "DEMO HAZIR"
