interface ResourceDocument {
  name: string;
  description: string;
  path: string;
  category: 'management' | 'documentation';
}

interface ResourceSection {
  title: string;
  description: string;
  documents: ResourceDocument[];
}

export const resourcesData: ResourceSection[] = [
  {
    title: "Proje Yönetimi",
    description: "HPC projelerinin etkin yönetimi için gerekli dokümanlar ve araçlar",
    documents: [
      {
        name: "Görev Takip Sistemi",
        description: "HPC projelerinde görev ve iş takibi için kullanılan sistem",
        path: "/project_management/gorev_takip_sistemi",
        category: "management"
      },
      {
        name: "Kanban Board",
        description: "Proje akışını görselleştirmek için kullanılan Kanban sistemi",
        path: "/project_management/kanban_board",
        category: "management"
      },
      {
        name: "Proje Zaman Çizelgesi",
        description: "Proje milestone'ları ve zaman planlaması",
        path: "/project_management/proje_zaman_cizelgesi",
        category: "management"
      },
      {
        name: "Risk Değerlendirmesi",
        description: "Proje risklerinin analizi ve yönetimi",
        path: "/project_management/risk_degerlendirmesi",
        category: "management"
      }
    ]
  },
  {
    title: "Dokümantasyon",
    description: "HPC sistemleri ve projeleri için teknik ve organizasyonel dokümanlar",
    documents: [
      {
        name: "Açık Kaynak HPC Faydaları",
        description: "Açık kaynak HPC sistemlerinin avantajları ve kullanım alanları",
        path: "/documentation/acik_kaynak_hpc_faydalari",
        category: "documentation"
      },
      {
        name: "Workshop Ajandası",
        description: "HPC eğitim ve çalıştayları için örnek program",
        path: "/documentation/workshop_ajandasi",
        category: "documentation"
      },
      {
        name: "İletişim Planı",
        description: "Proje paydaşları ile iletişim stratejisi",
        path: "/documentation/iletisim_plani",
        category: "documentation"
      },
      {
        name: "Hedef Kitle ve Kurumlar",
        description: "HPC projelerinin hedef kitlesi ve potansiyel iş birlikleri",
        path: "/documentation/hedef_kitle_ve_kurumlar",
        category: "documentation"
      }
    ]
  }
];
