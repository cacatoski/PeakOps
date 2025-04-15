export const demoCodeData = {
  title: "Demo Script: Slurm Cluster with GPU Support for AI Training",
  description: "Bu script, workshop sırasında canlı demo için kullanılacak temel Slurm cluster kurulumu ve GPU destekli AI eğitimi için hazırlanmıştır.",
  code: `#!/bin/bash
# Demo Script: Slurm Cluster with GPU Support for AI Training
# Open Source HPC for National Innovation Workshop
# 
# Bu script, workshop sırasında canlı demo için kullanılacak temel
# Slurm cluster kurulumu ve GPU destekli AI eğitimi için hazırlanmıştır.

# Renk kodları tanımları
RED='\\x1b[0;31m'
GREEN='\\x1b[0;32m'
YELLOW='\\x1b[0;33m'
BLUE='\\x1b[0;34m'
NC='\\x1b[0m' # No Color

# Demo başlangıcı
clear
echo -e "\\n\\x1b[0;34m===========================================================\\x1b[0m"
echo -e "\\x1b[0;34mAÇIK KAYNAK HPC DEMO: SLURM CLUSTER VE GPU AI EĞİTİMİ\\x1b[0m"
echo -e "\\x1b[0;34m===========================================================\\x1b[0m\\n"

echo "Tarih: $(date)"
echo "Sunan: [Adınız]"
echo "Kurum: PeakOps"

# Demo klasörü oluşturma
DEMO_DIR="$HOME/hpc_demo"
echo -e "\\x1b[0;32m[+] Demo klasörü oluşturuluyor: $DEMO_DIR\\x1b[0m"
mkdir -p $DEMO_DIR
cd $DEMO_DIR

# Docker Compose dosyası oluşturma
echo -e "\\x1b[0;32m[+] Docker Compose dosyası oluşturuluyor...\\x1b[0m"
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
EOF`,
  pythonCode: `#!/usr/bin/env python3
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

# NumPy ile eğitim
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
print(f"NumPy Eğitim Süresi: {t_end - t_start:.4f} saniye")`,
  slurmJobScript: `#!/bin/bash
#SBATCH --job-name=ai_training
#SBATCH --output=ai_training_%j.out
#SBATCH --error=ai_training_%j.err
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --gres=gpu:1
#SBATCH --time=00:10:00

# Çalışma dizinini ayarla
cd $SLURM_SUBMIT_DIR

# Python ortamını etkinleştir (varsa)
# source /path/to/venv/bin/activate

# AI eğitim scriptini çalıştır
python3 ai_training.py

# İşlem tamamlandığında bildir
echo "AI eğitimi tamamlandı."
`
};
