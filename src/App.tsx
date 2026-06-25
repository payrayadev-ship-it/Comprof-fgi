import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  CheckCircle2,
  Award,
  Clock,
  Users,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ExternalLink,
  Eye,
  Sun,
  Moon,
  Send,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building,
  Check,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Coins,
  Hammer,
  HelpCircle,
  Star,
  ArrowRight,
  Share2,
  Linkedin,
  Copy,
  Instagram,
  Facebook,
  Calculator,
  Ruler
} from "lucide-react";

// --- CUSTOM LOGO FOR PT. FORESYNDO GLOBAL INDONESIA (FGI) ---
const FGILogo = ({ className = "", darkMode = true }: { className?: string; darkMode?: boolean }) => (
  <div className={`flex items-center space-x-3 ${className}`} id="fgi-logo">
    <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center rounded shadow-md flex-shrink-0 border border-amber-500/40">
      <span className="text-xl font-black italic tracking-tighter text-amber-400">FGI</span>
    </div>
    <div className="leading-tight text-left">
      <h1 className={`text-xs font-black tracking-wider ${darkMode ? "text-white" : "text-slate-900"}`}>PT. FORESYNDO GLOBAL INDONESIA</h1>
      <p className="text-[9px] text-amber-500 font-bold uppercase tracking-[0.2em] mt-0.5">Developer & Kontraktor</p>
    </div>
  </div>
);

// --- INTERACTIVE NUMBER COUNTER COMPONENT ---
function Counter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef} id={`counter-${end}`}>{count}{suffix}</span>;
}

// --- DATA DEFINITIONS ---
interface Project {
  id: number;
  title: string;
  enTitle?: string;
  category: "Perumahan" | "Komersial" | "Infrastruktur";
  image: string;
  location: string;
  enLocation?: string;
  desc: string;
  enDesc?: string;
  size: string;
  enSize?: string;
  year: string;
  enYear?: string;
  highlights: string[];
  enHighlights?: string[];
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Perumahan Modern - Grand Foresyndo Hills",
    enTitle: "Modern Housing - Grand Foresyndo Hills",
    category: "Perumahan",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    location: "Bandung Selatan, Jawa Barat",
    enLocation: "South Bandung, West Java",
    desc: "Kawasan hunian modern eksklusif dengan konsep Smart Eco-Living, memadukan keasrian alam pegunungan Bandung dengan fasilitas teknologi rumah pintar tercanggih.",
    enDesc: "An exclusive modern residential area with a Smart Eco-Living concept, blending the serene nature of Bandung mountains with state-of-the-art smart home technology.",
    size: "5 Hektar",
    enSize: "5 Hectares",
    year: "2024 - 2025",
    enYear: "2024 - 2025",
    highlights: ["24-Hour Smart Security", "Solar Panel Grid System", "Water Treatment Plan", "Clubhouse & Jogging Track"]
  },
  {
    id: 2,
    title: "Cluster Premium - Emerald Residence",
    enTitle: "Premium Cluster - Emerald Residence",
    category: "Perumahan",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    location: "Pameungpeuk, Kabupaten Bandung",
    enLocation: "Pameungpeuk, Bandung Regency",
    desc: "Cluster premium berdesain Arsitektur Tropis Modern dengan spesifikasi material berkualitas tinggi, didesain khusus untuk kenyamanan dan nilai investasi jangka panjang keluarga Anda.",
    enDesc: "A premium cluster designed in Modern Tropical Architecture with high-quality material specifications, specially curated for your family's comfort and long-term investment.",
    size: "2.5 Hektar",
    enSize: "2.5 Hectares",
    year: "2025 - Sedang Berjalan",
    enYear: "2025 - Ongoing",
    highlights: ["Sertifikat Hak Milik (SHM)", "Underground Utility Cables", "Private Playground", "One-Gate System"],
    enHighlights: ["Freehold Certificate (SHM)", "Underground Utility Cables", "Private Playground", "One-Gate System"]
  },
  {
    id: 3,
    title: "Ruko Komersial - Golden Square Boulevard",
    enTitle: "Commercial Shophouse - Golden Square Boulevard",
    category: "Komersial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    location: "Banjaran Raya, Bandung",
    enLocation: "Banjaran Raya, Bandung",
    desc: "Kawasan ruko bisnis modern 3 lantai yang terletak strategis di jalan utama, dirancang khusus untuk mengakomodasi perkantoran, ritel premium, kuliner, dan pusat perbelanjaan.",
    enDesc: "A strategic 3-story modern business shophouse area located on the main road, designed specifically to accommodate offices, premium retail, culinary, and shopping hubs.",
    size: "45 Unit Ruko",
    enSize: "45 Shophouse Units",
    year: "2023 - Selesai",
    enYear: "2023 - Completed",
    highlights: ["Lokasi Sangat Strategis (Main Road)", "Parkir Luas & Aman", "Desain Kaca Tempered Modern", "Akses Jalan Lebar"],
    enHighlights: ["Highly Strategic Location (Main Road)", "Ample & Secure Parking", "Modern Tempered Glass Design", "Wide Road Access"]
  },
  {
    id: 4,
    title: "Gudang Industri - FGI Logistics Park",
    enTitle: "Industrial Warehouse - FGI Logistics Park",
    category: "Komersial",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    location: "Kawasan Industri Bandung, Jawa Barat",
    enLocation: "Bandung Industrial Area, West Java",
    desc: "Kompleks pergudangan modern berstandar internasional yang dilengkapi infrastruktur kokoh, ruang manuver kontainer luas, serta sistem keamanan terintegrasi untuk logistik modern.",
    enDesc: "An international-standard modern warehouse complex equipped with solid infrastructure, spacious container maneuver areas, and integrated security for modern logistics.",
    size: "12 Unit Gudang",
    enSize: "12 Warehouse Units",
    year: "2024 - Selesai",
    enYear: "2024 - Completed",
    highlights: ["Kekuatan Lantai Beton K-350", "Dock Levelers & Roll-up Doors", "Akses Tol Dekat (15 Menit)", "Fire Hydrant System"],
    enHighlights: ["K-350 Concrete Floor Strength", "Dock Levelers & Roll-up Doors", "Close Highway Access (15 Min)", "Fire Hydrant System"]
  },
  {
    id: 5,
    title: "Kawasan Bisnis - Central Plaza & Commercial Hub",
    enTitle: "Business District - Central Plaza & Commercial Hub",
    category: "Komersial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    location: "Pusat Kota Bandung, Jawa Barat",
    enLocation: "Bandung City Center, West Java",
    desc: "Pembangunan gedung perkantoran dan ruang usaha terpadu berlantai 6 dengan sertifikasi Green Building, menciptakan atmosfer kerja produktif, prestisius, dan hemat energi.",
    enDesc: "A 6-story integrated office building and business space development with Green Building certification, creating a productive, prestigious, and energy-saving work atmosphere.",
    size: "12,500 m² Luas Bangunan",
    enSize: "12,500 m² Building Area",
    year: "2024 - 2026",
    enYear: "2024 - 2026",
    highlights: ["Energy Efficient HVAC", "High-speed Fiber Optic Ready", "Modern Lobby & Cafe Area", "Double-glazed UV Glass Window"]
  },
  {
    id: 6,
    title: "Infrastruktur Kawasan - Site Development & Akses Jalan",
    enTitle: "Regional Infrastructure - Site Development & Access Road",
    category: "Infrastruktur",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    location: "Langonsari, Kabupaten Bandung",
    enLocation: "Langonsari, Bandung Regency",
    desc: "Pengerjaan matang site development, pengurukan lahan, sistem drainase modern beton pracetak, serta pengerasan jalan aspal hotmix untuk menyokong konektivitas kawasan perkotaan baru.",
    enDesc: "Meticulous execution of site development, land grading, modern precast concrete drainage systems, and hotmix asphalt road paving to support connectivity of the new urban area.",
    size: "3.2 KM Jalan Utama",
    enSize: "3.2 KM Main Road",
    year: "2025 - Sedang Berjalan",
    enYear: "2025 - Ongoing",
    highlights: ["U-Ditch Concrete Drainage", "Aspal Hotmix Kelas II", "Retaining Wall Anti Longsor", "Penerangan Jalan Umum LED Solar"],
    enHighlights: ["U-Ditch Concrete Drainage", "Class II Hotmix Asphalt", "Anti-landslide Retaining Wall", "LED Solar Public Street Lighting"]
  }
];

const TRANSLATIONS = {
  id: {
    nav: {
      beranda: "Beranda",
      "tentang-kami": "Tentang Kami",
      layanan: "Layanan",
      proyek: "Proyek",
      "visi-misi": "Visi & Misi",
      "mengapa-kami": "Mengapa Kami",
      kontak: "Kontak",
      cta: "WhatsApp",
    },
    hero: {
      sub: "#1 Premium Developer",
      title1: "Membangun Masa Depan",
      title2: "dengan Properti Berkualitas",
      desc: "PT. FORESYNDO GLOBAL INDONESIA (FGI) menghadirkan solusi pengembangan properti, konstruksi, dan investasi yang profesional, terpercaya, dan berkelanjutan di Indonesia.",
      ctaConsult: "Konsultasi WhatsApp",
      ctaProjects: "Lihat Proyek",
      cardEst: "EST. 2016",
      cardDesc: "Menghubungkan kualitas arsitektur tinggi dengan kepatuhan hukum penuh dan manajemen profesional.",
      cardExplore: "Jelajahi Profil",
      statCompleted: "Proyek Selesai",
      statYears: "Tahun Pengalaman",
      statPartners: "Mitra Bisnis",
      statSatisfaction: "Kepuasan Klien",
    },
    about: {
      sub: "TENTANG KAMI",
      title: "PT. FORESYNDO GLOBAL INDONESIA (FGI)",
      desc1: "PT. FORESYNDO GLOBAL INDONESIA merupakan perusahaan yang bergerak di bidang pengembangan properti, konstruksi, investasi, dan konsultasi pembangunan yang berkomitmen menghadirkan proyek berkualitas tinggi serta bernilai investasi jangka panjang.",
      desc2: "Sejak awal didirikan, FGI berpegang pada integritas moral, transparansi pembiayaan, kepatuhan hukum penuh, serta kepuasan para pembeli dan mitra kami. Kami menyatukan tim arsitek, insinyur struktur, dan pengawas konstruksi berpengalaman untuk mewujudkan visi pembangunan bernilai tinggi di Indonesia.",
      tagTitle: "Legalitas Lengkap",
      tagSub: "PT Resmi & SIUJK",
      p1: "Prinsip Keamanan Legal",
      p1Sub: "Jaminan perizinan clean & clear.",
      p2: "Material Kelas Premium",
      p2Sub: "Struktur dan finishing bermutu tinggi.",
      p3: "Manajemen Terintegrasi",
      p3Sub: "Dari perencanaan hingga konstruksi fisik.",
      p4: "Kemitraan Terpercaya",
      p4Sub: "Melayani instansi, swasta, dan individu.",
    },
    services: {
      sub: "LAYANAN UTAMA",
      title: "Solusi Pengembangan Properti Terpadu",
      desc: "FGI menghadirkan spektrum keahlian yang luas untuk menjawab kebutuhan pembangunan dari perumahan asri hingga infrastruktur berskala besar.",
      cta: "Ajukan Pertanyaan",
      items: [
        {
          title: "Developer Perumahan",
          desc: "Pembangunan kawasan perumahan eksklusif dengan tata ruang ramah lingkungan, desain arsitektur kontemporer, dan legalitas kepemilikan terjamin.",
        },
        {
          title: "Konstruksi Bangunan",
          desc: "Kontraktor pelaksana pembangunan fisik rumah mewah, gedung perkantoran, ruko bisnis, hingga fasilitas publik berspesifikasi mutu beton prima.",
        },
        {
          title: "Kawasan Komersial",
          desc: "Pengembangan properti niaga strategis seperti ruko, business center, kawasan ritel, dan pusat perbelanjaan dengan analisis traffic tinggi.",
        },
        {
          title: "Investasi Properti",
          desc: "Layanan kemitraan investasi properti dengan imbal hasil (ROI) menguntungkan lewat kepemilikan aset bernilai tinggi yang dikelola profesional.",
        },
        {
          title: "Konsultan Properti",
          desc: "Analisis kelayakan lahan, estimasi RAB profesional, desain arsitektur 3D photorealistic, serta konsultasi regulasi perizinan tata kota.",
        },
        {
          title: "Infrastruktur & Site Dev",
          desc: "Pekerjaan pematangan lahan (cut & fill), pembuatan drainase beton pracetak, jalan aspal hotmix, dan instalasi utilitas dasar kawasan.",
        }
      ],
      calculator: {
        title: "Kalkulator Estimasi Biaya Konstruksi",
        desc: "Hitung perkiraan kasar awal anggaran pembangunan proyek Anda berdasarkan tipe bangunan dan total luas area secara instan.",
        projectType: "Tipe Bangunan / Proyek",
        areaSize: "Total Luas Bangunan",
        quality: "Standar Spesifikasi Material",
        qualityStd: "Standar (Sederhana)",
        qualityMed: "Menengah (Premium)",
        qualityLux: "Mewah (Eksklusif)",
        estTotal: "Estimasi Total Biaya Konstruksi",
        estRange: "Rentang Estimasi Kasar (Indikatif)",
        btnDiscuss: "Konsultasikan RAB Proyek",
        disclaimer: "Penting: Angka di atas merupakan estimasi kasar awal (RAB indikatif) berdasarkan harga pasar konstruksi 2026. Biaya riil dipengaruhi oleh desain arsitektur detail, struktur tanah, lokasi presisi, dan pemilihan spesifikasi material akhir.",
        types: [
          { name: "Hunian / Rumah Tinggal", std: 3800000, med: 5200000, lux: 8000000 },
          { name: "Ruko / Gedung Komersial", std: 4200000, med: 5800000, lux: 9000000 },
          { name: "Gudang / Pabrik Industri", std: 3000000, med: 4200000, lux: 6000000 },
          { name: "Kantor Modern / Hotel", std: 5000000, med: 7000000, lux: 11000000 }
        ]
      }
    },
    projects: {
      sub: "PORTFOLIO PROYEK",
      title: "Galeri Karya Unggulan FGI",
      desc: "Tinjauan portofolio konstruksi perumahan, ruko bisnis komersial, gedung perkantoran, dan infrastruktur kawasan yang telah kami selesaikan secara presisi.",
      filterSemua: "Semua",
      filterPerumahan: "Perumahan",
      filterKomersial: "Komersial",
      filterInfrastruktur: "Infrastruktur",
      viewDetail: "Lihat Detail",
      yearLabel: "Tahun",
      projectDetail: "Detail Proyek",
    },
    visiMisi: {
      sub: "VISI & MISI FGI",
      title: "Arah Strategis & Nilai Dasar Kami",
      desc: "Panduan moral dan peta jalan kami dalam setiap langkah pengerjaan proyek dari hulu hingga hilir.",
      visiSub: "VISI UTAMA",
      visiText: "“Menjadi perusahaan pengembang properti terpercaya dan terdepan di Indonesia.”",
      misiTitle: "MISI OPERASIONAL FGI",
      items: [
        {
          title: "Kepuasan Pemangku Kepentingan",
          desc: "Menjamin setiap proyek memberikan nilai tambah maksimal bagi klien, mitra, dan masyarakat luas.",
        },
        {
          title: "Standar Keamanan Tinggi",
          desc: "Menerapkan protokol keselamatan kerja (K3) ketat and kualitas rekayasa struktur yang tahan gempa.",
        },
        {
          title: "Inovasi & Berkelanjutan",
          desc: "Mengintegrasikan desain ramah lingkungan dengan material modern and teknologi ramah energi.",
        },
        {
          title: "Kepatuhan Hukum Mutlak",
          desc: "Menjamin semua dokumen legalitas, izin Amdal, dan hak guna kepemilikan selesai bersih dan sah sebelum proyek dimulai.",
        }
      ]
    },
    whyUs: {
      sub: "MENGAPA MEMILIH FGI?",
      title: "Membangun dengan Komitmen & Integritas",
      desc: "Kami memahami bahwa membangun properti adalah keputusan finansial yang besar bagi Anda maupun korporasi Anda. Oleh sebab itu, FGI melangkah dengan standar rekayasa sipil yang matang dan kemudahan administrasi legal sejak hari pertama proyek didesain.",
      quote: '"Integritas profesional kami menjamin setiap rupiah investasi properti Anda menghasilkan bangunan bernilai tinggi dan nyaman ditempati."',
      management: "Direksi PT. Foresyndo Global Indonesia",
      managementTitle: "Manajemen Komitmen Mutu",
      items: [
        {
          title: "Profesional",
          desc: "Didukung tim insinyur sipil, arsitek, dan pengawas proyek bersertifikasi keahlian nasional resmi.",
        },
        {
          title: "Berpengalaman",
          desc: "Telah menyelesaikan berbagai skala hunian, komersial, dan site development kawasan secara sukses.",
        },
        {
          title: "Tepat Waktu",
          desc: "Manajemen jadwal (Gantt Chart) yang ketat untuk memastikan penyerahan kunci sesuai kesepakatan kontrak.",
        },
        {
          title: "Transparan",
          desc: "Penyusunan Rencana Anggaran Biaya (RAB) terbuka tanpa ada biaya tersembunyi selama masa konstruksi.",
        },
        {
          title: "Legalitas Lengkap",
          desc: "Aspek perizinan, sertifikat hak milik, dan jaminan asuransi konstruksi terkelola dengan aman secara hukum.",
        },
        {
          title: "Harga Kompetitif",
          desc: "Mengoptimalkan biaya pengadaan material tanpa mengorbankan kualitas standar konstruksi nasional.",
        }
      ]
    },
    testimoni: {
      sub: "TESTIMONI KLIEN",
      title: "Apa Kata Klien & Mitra Kami?",
      desc: "Ulasan jujur dan kepuasan dari individu, investor ritel, dan perwakilan korporasi swasta yang bermitra dengan kami.",
      items: [
        {
          name: "Budi Santoso",
          role: "Pemilik Rumah di Grand Foresyndo Hills",
          comment: "Beli unit di Grand Foresyndo Hills adalah keputusan terbaik. Desainnya sangat modern, legalitas SHM cepat selesai, dan kualitas bangunannya kokoh.",
        },
        {
          name: "Diana Lestari",
          role: "Investor Ruko Golden Square",
          comment: "Tim FGI sangat transparan dan profesional. Proyek ruko diselesaikan tepat waktu sesuai RAB awal. ROI investasi saya sangat memuaskan.",
        },
        {
          name: "Ir. Hendra Wijaya",
          role: "Direktur Mitra Infrastruktur Swasta",
          comment: "Sangat puas dengan pengerjaan pematangan lahan dan aspal hotmix dari FGI. Rekayasa sipil matang, tim kooperatif, dan patuh standar keselamatan.",
        }
      ]
    },
    faq: {
      sub: "PERTANYAAN UMUM (FAQ)",
      title: "Informasi Seputar Layanan FGI",
      desc: "Temukan jawaban singkat atas beberapa pertanyaan penting yang paling sering ditanyakan mengenai prosedur kerja dan layanan kami.",
      items: [
        {
          q: "Apakah PT. FGI memiliki legalitas hukum resmi?",
          a: "Ya, PT. Foresyndo Global Indonesia adalah badan hukum resmi terdaftar di Kementerian Hukum dan HAM RI, dilengkapi dengan izin operasional, SIUJK (Surat Izin Usaha Jasa Konstruksi), dan keanggotaan asosiasi developer resmi.",
        },
        {
          q: "Bagaimana sistem pembayaran proyek di FGI?",
          a: "Sistem pembayaran kami fleksibel dan transparan. Bisa berupa cash bertahap (termin konstruksi) yang disesuaikan dengan progress lapangan, KPR untuk perumahan melalui bank mitra resmi, maupun pembayaran terjadwal sesuai kontrak kerja (SPK).",
        },
        {
          q: "Apakah semua proyek FGI dijamin bebas sengketa?",
          a: "Mutlak ya. Prinsip dasar FGI adalah tidak memulai proyek sebelum seluruh aspek pertanahan clean & clear serta seluruh sertifikat dan perizinan terkait (PBG/IMB) terbit secara sah secara hukum.",
        },
        {
          q: "Dapatkah saya berkonsultasi mengenai RAB dan desain?",
          a: "Sangat bisa. Kami menyediakan sesi konsultasi gratis bagi calon mitra untuk mendiskusikan Rencana Anggaran Biaya (RAB), peninjauan denah lokasi, serta visualisasi desain arsitektur 3D.",
        }
      ]
    },
    contact: {
      sub: "HUBUNGI KAMI",
      title: "Diskusikan Rencana Pembangunan Anda",
      desc: "Silakan kirimkan pesan, pertanyaan, atau ajakan kemitraan. Tim representatif FGI akan segera menghubungi Anda dalam waktu maksimal 1x24 jam.",
      successTitle: "Pesan Berhasil Terkirim!",
      successDesc: "Terima kasih telah menghubungi kami. Representatif FGI akan segera merespons pesan atau berkas Anda via nomor WhatsApp atau Email yang Anda cantumkan.",
      successCtaWa: "Kirim via WhatsApp",
      successCtaNew: "Kirim Pesan Baru",
      labelName: "Nama Lengkap *",
      labelPhone: "Nomor WhatsApp *",
      labelEmail: "Email (Opsional)",
      labelSubject: "Subjek",
      labelMessage: "Pesan Pertanyaan *",
      placeholderName: "Contoh: Budi Santoso",
      placeholderPhone: "Contoh: 081234567890",
      placeholderEmail: "budi@email.com",
      placeholderSubject: "Contoh: Konsultasi RAB / Survey Unit",
      placeholderMessage: "Tuliskan detail rencana properti Anda...",
      btnSend: "Kirim Form Pesan",
      btnSending: "Mengirimkan...",
      btnContactWa: "Hubungi via WA",
      headOffice: "FGI Kantor Pusat",
      officeAddrLabel: "Alamat Kantor",
      officeAddr: "Jalan Banjaran Raya KM 13 Langonsari, Pameungpeuk, Kabupaten Bandung, Jawa Barat, Indonesia.",
      officeHotlineLabel: "WhatsApp Hotline",
      officeEmailLabel: "Email Resmi",
    },
    footer: {
      desc: "PT. FORESYNDO GLOBAL INDONESIA (FGI) berkomitmen menghadirkan proyek pengembangan properti, perumahan, komersial, investasi, dan infrastruktur kawasan dengan kualitas arsitektur tinggi dan pembiayaan transparan.",
      certified: "Certified Legal Developer",
      siteMap: "Peta Situs",
      copyright: "Copyright © 2026 PT. FORESYNDO GLOBAL INDONESIA. All rights reserved.",
      socialFollow: "Ikuti Kami",
      newsletterTitle: "BERLANGGANAN NEWSLETTER",
      newsletterDesc: "Dapatkan info rilis unit & proyek properti terbaru langsung di email Anda.",
      newsletterPlaceholder: "Alamat email Anda...",
      newsletterSubmit: "Langganan",
      newsletterSuccess: "Email Anda berhasil terdaftar!",
      newsletterError: "Format email tidak valid.",
    },
    modal: {
      close: "Tutup",
      projectLocation: "Lokasi Proyek",
      projectSize: "Ukuran / Kapasitas",
      projectYear: "Tahun Pengerjaan",
      projectDesc: "Deskripsi Proyek",
      projectHighlights: "Spesifikasi & Keunggulan",
      askCta: "Tanyakan Proyek Ini via WA",
      shareTitle: "Bagikan Proyek",
      shareDesc: "Bagikan detail proyek ini dengan calon mitra atau kolega.",
      shareCopied: "Tautan disalin!",
    }
  },
  en: {
    nav: {
      beranda: "Home",
      "tentang-kami": "About Us",
      layanan: "Services",
      proyek: "Projects",
      "visi-misi": "Vision & Mission",
      "mengapa-kami": "Why Us",
      kontak: "Contact",
      cta: "WhatsApp",
    },
    hero: {
      sub: "#1 Premium Developer",
      title1: "Building the Future",
      title2: "with Premium Properties",
      desc: "PT. FORESYNDO GLOBAL INDONESIA (FGI) delivers professional, trusted, and sustainable property development, construction, and investment solutions in Indonesia.",
      ctaConsult: "WhatsApp Consultation",
      ctaProjects: "View Projects",
      cardEst: "EST. 2016",
      cardDesc: "Connecting high architectural quality with complete legal compliance and professional management.",
      cardExplore: "Explore Profile",
      statCompleted: "Projects Completed",
      statYears: "Years Experience",
      statPartners: "Business Partners",
      statSatisfaction: "Client Satisfaction",
    },
    about: {
      sub: "ABOUT US",
      title: "PT. FORESYNDO GLOBAL INDONESIA (FGI)",
      desc1: "PT. FORESYNDO GLOBAL INDONESIA is a leading company in property development, construction, investment, and development consulting, committed to delivering high-quality projects with long-term investment value.",
      desc2: "Since our establishment, FGI has adhered to moral integrity, financial transparency, complete legal compliance, and the total satisfaction of our buyers and partners. We bring together experienced architects, structural engineers, and construction supervisors to realize high-value development visions in Indonesia.",
      tagTitle: "Complete Legality",
      tagSub: "Official Corporation & SIUJK",
      p1: "Legal Security Principle",
      p1Sub: "Clean & clear licensing guaranteed.",
      p2: "Premium Class Materials",
      p2Sub: "High-grade structure and finishing.",
      p3: "Integrated Management",
      p3Sub: "From initial design to physical construction.",
      p4: "Trusted Partnership",
      p4Sub: "Serving government, corporate, and private clients.",
    },
    services: {
      sub: "CORE SERVICES",
      title: "Integrated Property Solutions",
      desc: "FGI provides a comprehensive spectrum of expertise to address construction needs ranging from serene residential compounds to large-scale infrastructure.",
      cta: "Ask a Question",
      items: [
        {
          title: "Residential Developer",
          desc: "Developing exclusive residential areas with eco-friendly layouts, contemporary architectural designs, and guaranteed ownership legality.",
        },
        {
          title: "Building Construction",
          desc: "Executing physical construction of luxury homes, commercial offices, business shops, and public facilities with premium-grade concrete specifications.",
        },
        {
          title: "Commercial Districts",
          desc: "Developing strategic commercial properties such as shophouses, business centers, retail complexes, and high-traffic shopping venues.",
        },
        {
          title: "Property Investment",
          desc: "Providing property investment partnership models with profitable return on investment (ROI) through professionally managed, high-value assets.",
        },
        {
          title: "Property Consulting",
          desc: "Conducting land feasibility analyses, professional cost estimates, photorealistic 3D architectural renders, and urban planning compliance consultation.",
        },
        {
          title: "Infrastructure & Site Dev",
          desc: "Handling detailed site preparation (cut & fill), precast concrete drainage systems, high-quality asphalt paving, and essential utility installations.",
        }
      ],
      calculator: {
        title: "Construction Cost Estimator",
        desc: "Calculate the rough preliminary budget of your construction project instantly based on the building type and total area size.",
        projectType: "Building / Project Type",
        areaSize: "Total Building Area",
        quality: "Material Specification Quality",
        qualityStd: "Standard (Simple)",
        qualityMed: "Medium (Premium)",
        qualityLux: "Luxury (Exclusive)",
        estTotal: "Estimated Total Construction Cost",
        estRange: "Estimated Rough Budget Range",
        btnDiscuss: "Consult Project Estimate (RAB)",
        disclaimer: "Important: The figures above are rough preliminary estimates (indicative RAB) based on 2026 construction market prices. The final official budget depends on detailed architectural designs, soil conditions, exact location, and final material choices.",
        types: [
          { name: "Residential / Luxury House", std: 3800000, med: 5200000, lux: 8000000 },
          { name: "Shophouse / Commercial Building", std: 4200000, med: 5800000, lux: 9000000 },
          { name: "Warehouse / Industrial Factory", std: 3000000, med: 4200000, lux: 6000000 },
          { name: "Modern Office / Hotel", std: 5000000, med: 7000000, lux: 11000000 }
        ]
      }
    },
    projects: {
      sub: "PROJECT PORTFOLIO",
      title: "FGI Featured Gallery",
      desc: "A showcase of our precisely completed residential communities, commercial shophouses, office buildings, and regional infrastructures.",
      filterSemua: "All",
      filterPerumahan: "Residential",
      filterKomersial: "Commercial",
      filterInfrastruktur: "Infrastructure",
      viewDetail: "View Details",
      yearLabel: "Year",
      projectDetail: "Project Details",
    },
    visiMisi: {
      sub: "FGI VISION & MISSION",
      title: "Strategic Direction & Core Values",
      desc: "Our moral guide and strategic roadmap for every step of our project development, from start to finish.",
      visiSub: "MAIN VISION",
      visiText: "“To be the most trusted and leading property developer in Indonesia.”",
      misiTitle: "FGI OPERATIONAL MISSION",
      items: [
        {
          title: "Stakeholder Satisfaction",
          desc: "Ensuring that every project delivers maximum value to our clients, partners, and the wider community.",
        },
        {
          title: "High Safety Standards",
          desc: "Implementing strict occupational health and safety (K3) protocols and earthquake-resistant structural engineering.",
        },
        {
          title: "Innovation & Sustainability",
          desc: "Integrating environmentally conscious designs with modern materials and energy-efficient systems.",
        },
        {
          title: "Absolute Legal Compliance",
          desc: "Ensuring all land titles, environmental impact assessments (AMDAL), and development permits are fully clear and legally certified prior to development.",
        }
      ]
    },
    whyUs: {
      sub: "WHY CHOOSE FGI?",
      title: "Building with Commitment & Integrity",
      desc: "We understand that building a property is a major financial decision for you and your organization. That is why FGI proceeds with advanced civil engineering standards and smooth legal administration from day one of design.",
      quote: '"Our professional integrity guarantees that every single coin of your property investment produces high-value, highly comfortable buildings."',
      management: "Board of Directors, PT. Foresyndo Global Indonesia",
      managementTitle: "Quality Commitment Management",
      items: [
        {
          title: "Professional",
          desc: "Supported by a team of certified civil engineers, architects, and project managers with official national credentials.",
        },
        {
          title: "Experienced",
          desc: "Successfully completed various scales of residential, commercial, and regional site development projects.",
        },
        {
          title: "On-Time",
          desc: "Adhering to strict scheduling (Gantt Chart) management to ensure handover strictly according to contractual agreements.",
        },
        {
          title: "Transparent",
          desc: "Providing open and transparent cost estimates (RAB) with zero hidden fees throughout the entire construction process.",
        },
        {
          title: "Fully Legal",
          desc: "Handling licensing, land deeds, and comprehensive construction insurance safely and legally.",
        },
        {
          title: "Competitive Pricing",
          desc: "Optimizing material procurement costs without compromising national standard construction quality.",
        }
      ]
    },
    testimoni: {
      sub: "CLIENT TESTIMONIALS",
      title: "What Our Clients & Partners Say",
      desc: "Honest feedback and satisfaction from homeowners, retail investors, and private corporate representatives partnering with us.",
      items: [
        {
          name: "Budi Santoso",
          role: "Homeowner at Grand Foresyndo Hills",
          comment: "Buying a unit at Grand Foresyndo Hills is the best choice I've made. The design is modern, deed certification was quick, and the build quality is exceptionally solid.",
        },
        {
          name: "Diana Lestari",
          role: "Investor at Golden Square",
          comment: "FGI's team is transparent and professional. The shophouses were completed on schedule within budget. The ROI has been excellent.",
        },
        {
          name: "Ir. Hendra Wijaya",
          role: "Director, Private Infrastructure Partner",
          comment: "Extremely satisfied with FGI's land preparation and asphalt paving work. Mature civil engineering, highly cooperative team, and safe practices.",
        }
      ]
    },
    faq: {
      sub: "FREQUENTLY ASKED QUESTIONS (FAQ)",
      title: "Useful Information About FGI",
      desc: "Find quick answers to some of the most important questions regarding our working procedures and services.",
      items: [
        {
          q: "Is PT. FGI officially licensed and legally established?",
          a: "Yes, PT. Foresyndo Global Indonesia is an officially registered corporation under the Ministry of Law and Human Rights of Indonesia, equipped with a constructor license (SIUJK) and developer association memberships.",
        },
        {
          q: "What is the payment structure at FGI?",
          a: "Our payment systems are flexible and transparent. We offer staged cash options based on construction milestones, mortgage options (KPR) for houses through partner banks, or contract-specified payment terms (SPK).",
        },
        {
          q: "Are FGI projects guaranteed to be dispute-free?",
          a: "Absolutely. FGI holds a strict policy never to commence physical work before all land holdings are clean & clear and all building permits (PBG/IMB) are fully issued and legally valid.",
        },
        {
          q: "Can I consult about construction budgets and layout designs?",
          a: "Certainly. We offer complimentary consultation sessions for prospective partners to discuss budget estimates (RAB), assess site designs, and view photorealistic 3D architectural renders.",
        }
      ]
    },
    contact: {
      sub: "CONTACT US",
      title: "Discuss Your Development Plans",
      desc: "Send us a message, inquiry, or partnership proposal. An FGI representative will respond within a maximum of 24 hours.",
      successTitle: "Message Sent Successfully!",
      successDesc: "Thank you for contacting us. An FGI representative will reach out to you shortly via the WhatsApp number or email address provided.",
      successCtaWa: "Send via WhatsApp",
      successCtaNew: "Send New Message",
      labelName: "Full Name *",
      labelPhone: "WhatsApp Number *",
      labelEmail: "Email (Optional)",
      labelSubject: "Subject",
      labelMessage: "Inquiry Message *",
      placeholderName: "Example: John Doe",
      placeholderPhone: "Example: +62 812 3456 7890",
      placeholderEmail: "johndoe@email.com",
      placeholderSubject: "Example: Budget Consultation / Site Survey",
      placeholderMessage: "Write down details about your property plans...",
      btnSend: "Submit Message Form",
      btnSending: "Sending...",
      btnContactWa: "Contact via WA",
      headOffice: "FGI Headquarters",
      officeAddrLabel: "Office Address",
      officeAddr: "Jalan Banjaran Raya KM 13 Langonsari, Pameungpeuk, Bandung Regency, West Java, Indonesia.",
      officeHotlineLabel: "WhatsApp Hotline",
      officeEmailLabel: "Official Email",
    },
    footer: {
      desc: "PT. FORESYNDO GLOBAL INDONESIA (FGI) is committed to delivering premium-quality residential, commercial, investment, and infrastructure projects with absolute integrity and transparency.",
      certified: "Certified Legal Developer",
      siteMap: "Site Map",
      copyright: "Copyright © 2026 PT. FORESYNDO GLOBAL INDONESIA. All rights reserved.",
      socialFollow: "Follow Us",
      newsletterTitle: "NEWSLETTER SUBSCRIPTION",
      newsletterDesc: "Get updates on new property launches and project releases directly in your inbox.",
      newsletterPlaceholder: "Your email address...",
      newsletterSubmit: "Subscribe",
      newsletterSuccess: "Your email has been successfully registered!",
      newsletterError: "Invalid email format.",
    },
    modal: {
      close: "Close",
      projectLocation: "Project Location",
      projectSize: "Size / Capacity",
      projectYear: "Year Completed",
      projectDesc: "Project Description",
      projectHighlights: "Specifications & Highlights",
      askCta: "Inquire About This Project on WA",
      shareTitle: "Share Project",
      shareDesc: "Share this project details with potential partners or colleagues.",
      shareCopied: "Link copied!",
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const [projectFilter, setProjectFilter] = useState<"Semua" | "Perumahan" | "Komersial" | "Infrastruktur">("Semua");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Floating WA pop-up state
  const [showWaPopup, setShowWaPopup] = useState<boolean>(true);

  // Share Copied State
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Cost Calculator State
  const [calcProjectType, setCalcProjectType] = useState<number>(0);
  const [calcAreaSize, setCalcAreaSize] = useState<number>(100);
  const [calcQuality, setCalcQuality] = useState<"std" | "med" | "lux">("med");

  // Parse URL query parameter on load to open a shared project
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project");
    if (projectId) {
      const proj = PROJECTS_DATA.find((p) => p.id === parseInt(projectId));
      if (proj) {
        setSelectedProject(proj);
        // Slight delay to allow DOM to render and scroll
        setTimeout(() => {
          scrollTo("proyek");
        }, 600);
      }
    }
  }, []);

  // Handle scroll detection for Header & Back-to-top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to highlight active navigation link
  useEffect(() => {
    const sections = ["beranda", "tentang-kami", "layanan", "proyek", "visi-misi", "mengapa-kami", "kontak"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Active when section covers a good center portion
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Set the correct body class when darkMode toggled
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formMessage) {
      alert("Harap isi semua kolom wajib (Nama, WhatsApp, dan Pesan).");
      return;
    }

    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      // Reset form fields
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormSubject("");
      setFormMessage("");
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      setNewsletterError(TRANSLATIONS[lang].footer.newsletterError);
      setNewsletterSuccess(false);
      return;
    }

    setNewsletterError("");
    setNewsletterSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setNewsletterSubmitting(false);
      setNewsletterSuccess(true);
      
      // Save to localStorage as persistent subscribers list
      try {
        const stored = localStorage.getItem("fgi_newsletter_subscribers");
        const subscribers = stored ? JSON.parse(stored) : [];
        if (!subscribers.includes(newsletterEmail)) {
          subscribers.push(newsletterEmail);
          localStorage.setItem("fgi_newsletter_subscribers", JSON.stringify(subscribers));
        }
      } catch (err) {
        console.error("Failed to save newsletter email to localStorage:", err);
      }

      setNewsletterEmail("");
      
      // Reset success status after 4 seconds
      setTimeout(() => {
        setNewsletterSuccess(false);
      }, 4000);
    }, 1200);
  };

  // Convert contact form to WhatsApp message link
  const sendToWhatsApp = () => {
    const messageText = `Halo FGI, saya ${formName || "Klien"}.%0A%0A*Subjek:* ${formSubject || "Informasi Proyek FGI"}%0A*Email:* ${formEmail || "-"}%0A*Telepon:* ${formPhone || "-"}%0A*Pesan:* ${formMessage || "Saya tertarik dengan layanan properti FGI."}`;
    window.open(`https://wa.me/6282338609205?text=${messageText}`, "_blank");
  };

  // Filtered projects
  const filteredProjects = projectFilter === "Semua"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === projectFilter);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-slate-100" : "bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white text-slate-900"} font-sans transition-colors duration-300 relative`}>
      
      {/* Background Ambient Decorative Lights (Premium Glow Effects) */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[5%] w-[45%] h-[45%] rounded-full premium-glow-blue opacity-80" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full premium-glow-gold opacity-60" />
      </div>

      {/* --- STICKY HEADER --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900 text-white border-b border-amber-500/25 shadow-lg ${
          scrolled ? "py-3 bg-slate-900/95" : "py-4 bg-slate-900"
        }`}
        id="navbar-sticky"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Brand */}
          <button onClick={() => scrollTo("beranda")} className="flex items-center cursor-pointer focus:outline-none" aria-label="Beranda">
            <FGILogo darkMode={true} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-3 items-center" id="desktop-menu">
            {[
              { id: "beranda", label: TRANSLATIONS[lang].nav.beranda },
              { id: "tentang-kami", label: TRANSLATIONS[lang].nav["tentang-kami"] },
              { id: "layanan", label: TRANSLATIONS[lang].nav.layanan },
              { id: "proyek", label: TRANSLATIONS[lang].nav.proyek },
              { id: "visi-misi", label: TRANSLATIONS[lang].nav["visi-misi"] },
              { id: "mengapa-kami", label: TRANSLATIONS[lang].nav["mengapa-kami"] },
              { id: "kontak", label: TRANSLATIONS[lang].nav.kontak }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                id={`navlink-${item.id}`}
                className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer relative ${
                  activeSection === item.id
                    ? "text-amber-400 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-amber-400"
                    : "text-slate-300 hover:text-amber-400"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 p-2 rounded-lg text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title={darkMode ? (lang === "id" ? "Ubah ke Mode Terang" : "Switch to Light Mode") : (lang === "id" ? "Ubah ke Mode Gelap" : "Switch to Dark Mode")}
              id="theme-toggle"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Toggle */}
            <div className="ml-2 flex items-center bg-slate-800/60 p-0.5 rounded border border-slate-700/60">
              <button
                onClick={() => setLang("id")}
                className={`px-2 py-1 text-[10px] font-black uppercase transition-all rounded-[3px] ${
                  lang === "id"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 cursor-pointer"
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-[10px] font-black uppercase transition-all rounded-[3px] ${
                  lang === "en"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 cursor-pointer"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Premium CTA Button */}
            <button
              onClick={() => scrollTo("kontak")}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 text-[11px] font-black uppercase tracking-widest rounded transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-1 shadow-md border border-amber-400/30"
              id="cta-nav"
            >
              {TRANSLATIONS[lang].nav.cta} <ArrowRight size={14} />
            </button>
          </nav>

          {/* Mobile Buttons (Toggle menu, language, & dark mode) */}
          <div className="flex items-center lg:hidden gap-1.5">
            {/* Mobile Language Toggle */}
            <div className="flex items-center bg-slate-800/60 p-0.5 rounded border border-slate-700/60 mr-1">
              <button
                onClick={() => setLang("id")}
                className={`px-1.5 py-0.5 text-[9px] font-black uppercase transition-all rounded-[3px] ${
                  lang === "id"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 cursor-pointer"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-1.5 py-0.5 text-[9px] font-black uppercase transition-all rounded-[3px] ${
                  lang === "en"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 cursor-pointer"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              id="mobile-theme-toggle"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 transition-colors"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t mt-3 ${
                darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
              }`}
              id="mobile-menu-dropdown"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {[
                  { id: "beranda", label: TRANSLATIONS[lang].nav.beranda },
                  { id: "tentang-kami", label: TRANSLATIONS[lang].nav["tentang-kami"] },
                  { id: "layanan", label: TRANSLATIONS[lang].nav.layanan },
                  { id: "proyek", label: TRANSLATIONS[lang].nav.proyek },
                  { id: "visi-misi", label: TRANSLATIONS[lang].nav["visi-misi"] },
                  { id: "mengapa-kami", label: TRANSLATIONS[lang].nav["mengapa-kami"] },
                  { id: "kontak", label: TRANSLATIONS[lang].nav.kontak }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${
                      activeSection === item.id
                        ? "text-amber-500 bg-amber-500/10"
                        : darkMode
                        ? "text-slate-300 hover:bg-slate-900"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <button
                    onClick={() => scrollTo("kontak")}
                    className="w-full text-center bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-black py-3 rounded-lg block shadow-md"
                  >
                    {TRANSLATIONS[lang].contact.btnContactWa}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* --- HERO SECTION --- */}
      <section id="beranda" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden z-10">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/85 mix-blend-multiply z-10" />
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Modern Property FGI Background"
            className="w-full h-full object-cover object-center scale-105 select-none"
            loading="eager"
          />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-12 sm:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Subhead, and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-8 text-left space-y-6 sm:space-y-8"
              id="hero-left-content"
            >
              <div className="inline-block px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full italic">
                {TRANSLATIONS[lang].hero.sub}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                {TRANSLATIONS[lang].hero.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 font-black">
                  {TRANSLATIONS[lang].hero.title2}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal border-l-4 border-amber-500 pl-4">
                {TRANSLATIONS[lang].hero.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => scrollTo("kontak")}
                  className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-[11px] font-black uppercase tracking-widest rounded hover:from-amber-500 hover:to-amber-700 transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {TRANSLATIONS[lang].hero.ctaConsult}
                  <Phone size={14} />
                </button>
                <button
                  onClick={() => scrollTo("proyek")}
                  className="px-5 py-3 border-2 border-amber-500/80 text-amber-400 text-[11px] font-bold uppercase tracking-widest rounded hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  {TRANSLATIONS[lang].hero.ctaProjects}
                  <Building size={14} />
                </button>
              </div>
            </motion.div>

            {/* Right Column: Mini Floating Stats Badge or Premium Geometric Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:col-span-4 flex justify-center relative"
              id="hero-right-badge"
            >
              {/* Premium Floating Ring Badge */}
              <div className="relative w-72 h-72 rounded border border-amber-500/35 bg-gradient-to-br from-slate-900 to-slate-950 p-8 flex flex-col justify-between shadow-2xl overflow-hidden group">
                <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-blue-600/20 blur-xl group-hover:bg-blue-600/30 transition-all duration-500" />
                <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full bg-amber-500/15 blur-xl group-hover:bg-amber-500/25 transition-all duration-500" />
                
                <div className="z-10 flex justify-between items-start">
                  <div className="bg-amber-500/10 p-2.5 rounded text-amber-400">
                    <Award size={32} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">{TRANSLATIONS[lang].hero.cardEst}</span>
                </div>
                
                <div className="z-10 mt-8">
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">PT. FGI</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {TRANSLATIONS[lang].hero.cardDesc}
                  </p>
                </div>

                <div className="z-10 pt-4 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 cursor-pointer" onClick={() => scrollTo("tentang-kami")}>
                  <span>{TRANSLATIONS[lang].hero.cardExplore}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- HERO STATISTICS GRID --- */}
          <div className="mt-20 lg:mt-28" id="hero-statistics">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { end: 100, suffix: "+", label: TRANSLATIONS[lang].hero.statCompleted, icon: <CheckCircle2 className="text-amber-500" size={24} />, highlight: false },
                { end: 10, suffix: "+", label: TRANSLATIONS[lang].hero.statYears, icon: <Clock className="text-slate-600 dark:text-slate-300" size={24} />, highlight: false },
                { end: 50, suffix: "+", label: TRANSLATIONS[lang].hero.statPartners, icon: <Users className="text-slate-600 dark:text-slate-300" size={24} />, highlight: false },
                { end: 100, suffix: "%", label: TRANSLATIONS[lang].hero.statSatisfaction, icon: <Award className="text-amber-400" size={24} />, highlight: true }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded shadow-md border transition-all duration-300 hover:shadow-lg ${
                    stat.highlight
                      ? "bg-gradient-to-br from-blue-800 via-blue-600 to-slate-100 border-amber-500/40 text-white"
                      : "bg-white dark:bg-[#131926] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  }`}
                >
                  <div className={`mb-3 p-2 rounded inline-block ${stat.highlight ? "bg-black/10 text-amber-400" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-2xl sm:text-3xl font-black leading-none ${stat.highlight ? "text-amber-400" : "text-amber-500 dark:text-amber-400"}`}>
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className={`text-[10px] uppercase font-bold mt-2 tracking-wider ${stat.highlight ? "text-slate-100" : "text-slate-400"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Floating Scroll Down Arrow */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 z-20 cursor-pointer select-none" onClick={() => scrollTo("tentang-kami")}>
          <span className="text-xs text-slate-400 tracking-wider">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-amber-500"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>


      {/* --- TENTANG KAMI SECTION --- */}
      <section id="tentang-kami" className={`py-24 relative overflow-hidden z-10 border-y ${darkMode ? "bg-[#0e1422] border-slate-900/50" : "bg-gradient-to-r from-blue-50/20 via-white to-blue-50/10 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Premium Image Display with Double Accents */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
              id="about-image-wrapper"
            >
              {/* Back Accent color blocks */}
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-blue-600/10 rounded z-0" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-amber-500/10 rounded z-0" />
              
              <div className="relative rounded overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 z-10">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop"
                  alt="Konstruksi & Properti Premium PT. FORESYNDO GLOBAL INDONESIA"
                  className="w-full h-[320px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Embedded Floating Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-slate-900/95 border border-amber-500/20 flex items-center gap-4 shadow-lg">
                  <div className="p-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded text-slate-950 flex-shrink-0 font-bold">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">{TRANSLATIONS[lang].about.tagTitle}</h4>
                    <p className="text-[10px] text-amber-400 font-medium uppercase tracking-wide mt-0.5">{TRANSLATIONS[lang].about.tagSub}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Texts */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
              id="about-text-content"
            >
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].about.sub}</h3>
                <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {TRANSLATIONS[lang].about.title}
              </h2>

              <p className={`text-base leading-relaxed border-l-4 border-amber-500 pl-4 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                {TRANSLATIONS[lang].about.desc1}
              </p>

              <p className={`text-base leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {TRANSLATIONS[lang].about.desc2}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-3 rounded border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-[#131926]/40">
                  <div className="p-1 rounded bg-amber-500/10 text-amber-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wide">{TRANSLATIONS[lang].about.p1}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-medium mt-1">{TRANSLATIONS[lang].about.p1Sub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-[#131926]/40">
                  <div className="p-1 rounded bg-amber-500/10 text-amber-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wide">{TRANSLATIONS[lang].about.p2}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-medium mt-1">{TRANSLATIONS[lang].about.p2Sub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-[#131926]/40">
                  <div className="p-1 rounded bg-amber-500/10 text-amber-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wide">{TRANSLATIONS[lang].about.p3}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-medium mt-1">{TRANSLATIONS[lang].about.p3Sub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-[#131926]/40">
                  <div className="p-1 rounded bg-amber-500/10 text-amber-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wide">{TRANSLATIONS[lang].about.p4}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-medium mt-1">{TRANSLATIONS[lang].about.p4Sub}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* --- LAYANAN SECTION --- */}
      <section id="layanan" className={`py-24 relative z-10 border-b ${darkMode ? "bg-[#0B0F19] border-slate-900" : "bg-gradient-to-b from-white via-blue-50/20 to-white border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="max-w-7xl mx-auto mb-16 space-y-4" id="services-header">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].services.sub}</h3>
              <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {TRANSLATIONS[lang].services.title}
            </h2>
            <p className={`text-base max-w-3xl ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              {TRANSLATIONS[lang].services.desc}
            </p>
          </div>

          {/* Services Grid (6 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
            {[
              {
                icon: <Building2 className="text-amber-500" size={24} />
              },
              {
                icon: <Hammer className="text-amber-500" size={24} />
              },
              {
                icon: <Briefcase className="text-amber-500" size={24} />
              },
              {
                icon: <Coins className="text-amber-500" size={24} />
              },
              {
                icon: <TrendingUp className="text-amber-500" size={24} />
              },
              {
                icon: <MapPin className="text-amber-500" size={24} />
              }
            ].map((srv, idx) => {
              const transSrv = TRANSLATIONS[lang].services.items[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-6 rounded border transition-all duration-300 hover:-translate-y-1 group ${
                    darkMode
                      ? "bg-[#131926] border-slate-800 hover:border-amber-500 shadow-md"
                      : "bg-white border-slate-200 shadow-sm hover:border-amber-500"
                  }`}
                >
                  <div className="mb-4 p-2.5 rounded bg-slate-100 dark:bg-slate-800 inline-block group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight uppercase">
                    {transSrv.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {transSrv.desc}
                  </p>
                  
                  <button
                    onClick={() => {
                      setFormSubject(`Konsultasi Jasa: ${transSrv.title}`);
                      scrollTo("kontak");
                    }}
                    className="mt-4 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {TRANSLATIONS[lang].services.cta} <ArrowRight size={12} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* --- INTERACTIVE COST CALCULATOR --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`mt-20 p-8 sm:p-10 rounded-2xl border transition-all duration-300 ${
              darkMode
                ? "bg-[#0f1422] border-slate-800/80 shadow-2xl shadow-blue-950/10"
                : "bg-white border-slate-200/80 shadow-xl shadow-slate-200/40"
            }`}
            id="cost-calculator"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                    {TRANSLATIONS[lang].services.calculator.title}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {TRANSLATIONS[lang].services.calculator.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              
              {/* Left Column: Input Fields (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Project Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest">
                    {TRANSLATIONS[lang].services.calculator.projectType}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRANSLATIONS[lang].services.calculator.types.map((type, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCalcProjectType(idx)}
                        className={`p-3.5 rounded text-left border transition-all duration-200 cursor-pointer w-full ${
                          calcProjectType === idx
                            ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold"
                            : darkMode
                              ? "border-slate-800 bg-[#131926] text-slate-300 hover:border-slate-700 hover:text-white"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        <span className="text-xs uppercase tracking-wider block">{type.name}</span>
                        <span className={`text-[10px] font-medium mt-1 block ${calcProjectType === idx ? "text-amber-400" : "text-slate-500"}`}>
                          Base: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(type.med)} / m²
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Size */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest">
                      {TRANSLATIONS[lang].services.calculator.areaSize}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="10"
                        max="10000"
                        value={calcAreaSize}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (isNaN(val)) {
                            setCalcAreaSize(10);
                          } else {
                            setCalcAreaSize(Math.min(10000, Math.max(10, val)));
                          }
                        }}
                        className={`w-24 p-1.5 rounded text-center text-xs font-black border focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all ${
                          darkMode
                            ? "bg-[#131926] border-slate-800 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-900"
                        }`}
                      />
                      <span className="text-xs font-bold text-slate-400">m²</span>
                    </div>
                  </div>
                  
                  {/* Range Slider Container */}
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-500">10m²</span>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="5"
                      value={calcAreaSize > 1000 ? 1000 : calcAreaSize}
                      onChange={(e) => setCalcAreaSize(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                    <span className="text-[10px] font-bold text-slate-500">1000m²</span>
                  </div>
                </div>

                {/* Material Quality Choice */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest">
                    {TRANSLATIONS[lang].services.calculator.quality}
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { key: "std", label: TRANSLATIONS[lang].services.calculator.qualityStd, desc: lang === "id" ? "Struktur Prima, Finishing Standar" : "Strong Structure, Standard Finishes" },
                      { key: "med", label: TRANSLATIONS[lang].services.calculator.qualityMed, desc: lang === "id" ? "Desain Modern, Finishing Mewah" : "Modern Design, Premium Finishes" },
                      { key: "lux", label: TRANSLATIONS[lang].services.calculator.qualityLux, desc: lang === "id" ? "Desain Eksklusif, Spek Tertinggi" : "Custom Architect, Highest Specs" }
                    ].map((q) => (
                      <button
                        key={q.key}
                        type="button"
                        onClick={() => setCalcQuality(q.key as "std" | "med" | "lux")}
                        className={`p-3 rounded text-center border transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                          calcQuality === q.key
                            ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold"
                            : darkMode
                              ? "border-slate-800 bg-[#131926] text-slate-400 hover:border-slate-700 hover:text-white"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        <span className="text-[11px] font-black uppercase tracking-wider block">{q.label}</span>
                        <span className="text-[9px] text-slate-500 mt-1 block leading-tight hidden sm:block">{q.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Calculations & Outputs (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className={`p-6 sm:p-8 rounded-xl h-full flex flex-col justify-between space-y-6 ${
                  darkMode ? "bg-[#131926] border border-slate-800/60" : "bg-slate-50 border border-slate-200/60"
                }`}>
                  
                  {/* Rate info */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                      <span className="font-semibold text-slate-400">{lang === "id" ? "Tipe Terpilih:" : "Selected Type:"}</span>
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-right">
                        {TRANSLATIONS[lang].services.calculator.types[calcProjectType]?.name}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                      <span className="font-semibold text-slate-400">{lang === "id" ? "Tarif per m²:" : "Rate per m²:"}</span>
                      <span className="font-bold text-amber-500 tracking-wide">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                          TRANSLATIONS[lang].services.calculator.types[calcProjectType]?.[calcQuality] || 0
                        )}
                      </span>
                    </div>

                    {/* Grand Total output */}
                    <div className="pt-2 text-center sm:text-left">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                        {TRANSLATIONS[lang].services.calculator.estTotal}
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight transition-all duration-300">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                          (TRANSLATIONS[lang].services.calculator.types[calcProjectType]?.[calcQuality] || 0) * calcAreaSize
                        )}
                      </div>
                    </div>

                    {/* Range output */}
                    <div className="pt-1">
                      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                        {TRANSLATIONS[lang].services.calculator.estRange}
                      </span>
                      <span className={`text-xs font-bold font-mono ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                          (TRANSLATIONS[lang].services.calculator.types[calcProjectType]?.[calcQuality] || 0) * calcAreaSize * 0.95
                        )}
                        {" - "}
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                          (TRANSLATIONS[lang].services.calculator.types[calcProjectType]?.[calcQuality] || 0) * calcAreaSize * 1.10
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Consult CTA button */}
                  <div className="pt-4 space-y-4">
                    <button
                      type="button"
                      onClick={() => {
                        const activeType = TRANSLATIONS[lang].services.calculator.types[calcProjectType];
                        const qualityLabel = calcQuality === "std" 
                          ? TRANSLATIONS[lang].services.calculator.qualityStd 
                          : calcQuality === "med" 
                            ? TRANSLATIONS[lang].services.calculator.qualityMed 
                            : TRANSLATIONS[lang].services.calculator.qualityLux;
                        const totalCostFormatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                          (activeType?.[calcQuality] || 0) * calcAreaSize
                        );

                        const subjectText = lang === "en"
                          ? `RAB Estimation: ${activeType?.name} (${calcAreaSize} m²)`
                          : `Estimasi RAB: ${activeType?.name} (${calcAreaSize} m²)`;

                        const messageText = lang === "en"
                          ? `Hello FGI Team,\n\nI used your online calculator and would like to request an official cost estimate (RAB) for the following project:\n\n- Project Type: ${activeType?.name}\n- Total Area: ${calcAreaSize} m²\n- Material Spec: ${qualityLabel}\n- Rough Estimated Cost: ${totalCostFormatted}\n\nPlease get back to me to discuss design layout, detailed specs, and timeline.\n\nThank you.`
                          : `Halo Tim FGI,\n\nSaya menggunakan kalkulator online Anda dan ingin mengajukan konsultasi untuk pembuatan RAB resmi proyek berikut:\n\n- Tipe Bangunan: ${activeType?.name}\n- Rencana Luas: ${calcAreaSize} m²\n- Spesifikasi Material: ${qualityLabel}\n- Estimasi Kasar Kalkulator: ${totalCostFormatted}\n\nMohon hubungi saya kembali untuk mendiskusikan denah, spesifikasi detail, serta timeline pembangunan.\n\nTerima kasih.`;

                        setFormSubject(subjectText);
                        setFormMessage(messageText);
                        scrollTo("kontak");
                      }}
                      className="w-full py-3 px-4 rounded text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.01] active:scale-95 shadow-md shadow-amber-500/10 cursor-pointer text-center block transition-all duration-200"
                    >
                      {TRANSLATIONS[lang].services.calculator.btnDiscuss}
                    </button>

                    {/* Disclaimer text */}
                    <p className="text-[9px] text-slate-500 leading-normal">
                      {TRANSLATIONS[lang].services.calculator.disclaimer}
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </section>


      {/* --- PORTFOLIO PROYEK SECTION --- */}
      <section id="proyek" className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Filter Menu */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6" id="portfolio-header">
            <div className="space-y-4 max-w-2xl w-full">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].projects.sub}</h3>
                <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {TRANSLATIONS[lang].projects.title}
              </h2>
              <p className={`text-sm sm:text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {TRANSLATIONS[lang].projects.desc}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className={`flex flex-wrap gap-1 p-1 rounded border ${
              darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
            }`} id="project-filters">
              {(["Semua", "Perumahan", "Komersial", "Infrastruktur"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    projectFilter === cat
                      ? "bg-amber-500 text-slate-950 shadow-sm font-black"
                      : "text-slate-400 hover:text-amber-500"
                  }`}
                >
                  {cat === "Semua" ? TRANSLATIONS[lang].projects.filterSemua :
                   cat === "Perumahan" ? TRANSLATIONS[lang].projects.filterPerumahan :
                   cat === "Komersial" ? TRANSLATIONS[lang].projects.filterKomersial :
                   TRANSLATIONS[lang].projects.filterInfrastruktur}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="projects-grid-list"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`group rounded overflow-hidden shadow border relative ${
                    darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  {/* Image Div */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={proj.image}
                      alt={lang === "en" && proj.enTitle ? proj.enTitle : proj.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 z-10" />

                    {/* Category Label Overlay */}
                    <span className="absolute top-4 left-4 z-20 bg-amber-500 text-slate-950 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded">
                      {proj.category === "Perumahan" ? TRANSLATIONS[lang].projects.filterPerumahan :
                       proj.category === "Komersial" ? TRANSLATIONS[lang].projects.filterKomersial :
                       TRANSLATIONS[lang].projects.filterInfrastruktur}
                    </span>

                    {/* Interactive Eye Button on Hover */}
                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-slate-950/65 backdrop-blur-xs transition-opacity duration-300 z-20">
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 rounded shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all cursor-pointer flex items-center gap-1.5 font-black text-xs uppercase tracking-wider border border-amber-400/20"
                      >
                        <Eye size={14} /> {TRANSLATIONS[lang].projects.viewDetail}
                      </button>
                    </div>
                  </div>

                  {/* Text Description Block */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <MapPin size={12} className="text-amber-500" />
                      <span>{lang === "en" && proj.enLocation ? proj.enLocation : proj.location}</span>
                    </div>
                    <h3 className="text-base font-bold tracking-tight line-clamp-1 group-hover:text-amber-500 transition-colors">
                      {lang === "en" && proj.enTitle ? proj.enTitle : proj.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {lang === "en" && proj.enDesc ? proj.enDesc : proj.desc}
                    </p>
                    
                    <div className="pt-3 border-t border-slate-500/10 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{TRANSLATIONS[lang].projects.yearLabel}: {(lang === "en" && proj.enYear ? proj.enYear : proj.year).split(" ")[0]}</span>
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="text-[11px] font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                      >
                        {TRANSLATIONS[lang].projects.projectDetail} <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>


      {/* --- VISI & MISI SECTION --- */}
      <section id="visi-misi" className={`py-24 relative z-10 border-y ${darkMode ? "bg-[#0e1422] border-slate-900/50" : "bg-gradient-to-r from-blue-50/20 via-white to-blue-50/10 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Headings & Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
              id="visi-left-card"
            >
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].visiMisi.sub}</h3>
                <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {TRANSLATIONS[lang].visiMisi.title}
              </h2>
              <p className={`text-sm sm:text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {TRANSLATIONS[lang].visiMisi.desc}
              </p>

              {/* Visi Card */}
              <div className={`p-8 rounded border ${
                darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-md"
              } relative overflow-hidden group`}>
                <div className="absolute right-[-10px] bottom-[-20px] text-slate-500/5 group-hover:text-amber-500/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <Building2 size={150} />
                </div>
                
                <div className="inline-block p-2.5 rounded bg-amber-500/10 text-amber-500 mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">{TRANSLATIONS[lang].visiMisi.visiSub}</h3>
                <p className={`text-base font-bold leading-relaxed border-l-4 border-amber-500 pl-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
                  {TRANSLATIONS[lang].visiMisi.visiText}
                </p>
              </div>
            </motion.div>

            {/* Right Col: Misi List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-4"
              id="misi-right-list"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-4">{TRANSLATIONS[lang].visiMisi.misiTitle}</h3>
              
              {TRANSLATIONS[lang].visiMisi.items.map((misi, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 p-4 rounded border ${
                    darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  } hover:border-amber-500/30 transition-all group`}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-amber-500/10 text-amber-500 text-xs font-bold font-mono">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide group-hover:text-amber-500 transition-colors">
                      {misi.title}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {misi.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>


      {/* --- MENGAPA KAMI SECTION --- */}
      <section id="mengapa-kami" className={`py-24 relative z-10 overflow-hidden ${darkMode ? "bg-[#0B0F19]" : "bg-gradient-to-b from-white via-blue-50/10 to-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Core values grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
              id="why-us-grid"
            >
              {[
                {
                  icon: <ShieldCheck className="text-amber-500" size={20} />
                },
                {
                  icon: <Clock className="text-amber-500" size={20} />
                },
                {
                  icon: <CheckCircle2 className="text-amber-400" size={20} />
                },
                {
                  icon: <Users className="text-amber-500" size={20} />
                },
                {
                  icon: <Award className="text-amber-400" size={20} />
                },
                {
                  icon: <Coins className="text-amber-500" size={20} />
                }
              ].map((item, idx) => {
                const transItem = TRANSLATIONS[lang].whyUs.items[idx];
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded border ${
                      darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-sm"
                    } hover:scale-[1.02] transition-transform duration-300`}
                  >
                    <div className="mb-3 p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 inline-block">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-bold mb-1 tracking-tight flex items-center gap-1.5 uppercase">
                      <Check className="text-amber-500" size={14} /> {transItem.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {transItem.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Right Col: Graphic presentation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
              id="why-us-info"
            >
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].whyUs.sub}</h3>
                <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {TRANSLATIONS[lang].whyUs.title}
              </h2>
              <p className={`text-base leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                {TRANSLATIONS[lang].whyUs.desc}
              </p>

              <div className="p-6 rounded border border-amber-500/25 bg-amber-500/5 text-slate-200 shadow-sm space-y-3 border-l-4 border-l-amber-500">
                <p className={`text-xs italic font-medium leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  {TRANSLATIONS[lang].whyUs.quote}
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-amber-500/10">
                  <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-700 to-blue-900 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-400 shadow-inner flex-shrink-0">FGI</div>
                  <div>
                    <h5 className={`font-bold text-xs uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-900"}`}>{TRANSLATIONS[lang].whyUs.management}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-medium mt-0.5">{TRANSLATIONS[lang].whyUs.managementTitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimoni" className={`py-24 relative z-10 border-y ${darkMode ? "bg-[#0e1422] border-slate-900/50" : "bg-slate-50/50 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-7xl mx-auto mb-16 space-y-4" id="testimonials-header">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].testimoni.sub}</h3>
              <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {TRANSLATIONS[lang].testimoni.title}
            </h2>
            <p className={`text-base max-w-3xl ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              {TRANSLATIONS[lang].testimoni.desc}
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-list">
            {TRANSLATIONS[lang].testimoni.items.map((testi, idx) => {
              const staticImages = [
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
              ];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-6 rounded border relative flex flex-col justify-between ${
                    darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  {/* Quote Icon Background */}
                  <div className="absolute top-6 right-6 text-slate-500/10 pointer-events-none">
                    <MessageSquare size={40} />
                  </div>
                  
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-0.5 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>

                    <p className={`text-xs sm:text-sm italic leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                      "{testi.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-500/10">
                    <img
                      src={staticImages[idx]}
                      alt={testi.name}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wide">
                        {testi.name}
                      </h4>
                      <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                        {testi.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* --- FAQ SECTION --- */}
      <section id="faq" className={`py-24 relative z-10 border-b ${darkMode ? "bg-[#0B0F19] border-slate-900" : "bg-gradient-to-b from-white via-blue-50/20 to-white border-slate-100"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4" id="faq-header">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].faq.sub}</h3>
              <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {TRANSLATIONS[lang].faq.title}
            </h2>
            <p className={`text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              {TRANSLATIONS[lang].faq.desc}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4" id="faq-accordions">
            {TRANSLATIONS[lang].faq.items.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded border overflow-hidden ${
                  darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm uppercase tracking-wider flex justify-between items-center gap-4 hover:bg-slate-500/5 transition-colors cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <span className="text-amber-500 flex-shrink-0">
                    {faqOpen === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}
                    >
                      <div className={`p-4 sm:p-5 text-xs leading-relaxed ${
                        darkMode ? "text-slate-400 bg-[#0B0F19]/50" : "text-slate-600 bg-slate-50"
                      }`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- KONTAK & MAPS SECTION --- */}
      <section id="kontak" className={`py-24 relative z-10 border-t ${darkMode ? "bg-[#0e1422] border-slate-900/50" : "bg-gradient-to-r from-blue-50/20 via-white to-blue-50/10 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col: Contact Info & Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
              id="contact-form-section"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].contact.sub}</h3>
                  <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {TRANSLATIONS[lang].contact.title}
                </h2>
                <p className={`text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {TRANSLATIONS[lang].contact.desc}
                </p>
              </div>

              {/* Form Block */}
              <div className={`p-6 sm:p-8 rounded border ${
                darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-md"
              }`}>
                {formSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                    id="contact-form-success"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 dark:text-white">{TRANSLATIONS[lang].contact.successTitle}</h3>
                    <p className={`text-sm max-w-md mx-auto ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {TRANSLATIONS[lang].contact.successDesc}
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={sendToWhatsApp}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {TRANSLATIONS[lang].contact.successCtaWa} <ExternalLink size={14} />
                      </button>
                      <button
                        onClick={() => setFormSuccess(false)}
                        className="bg-slate-500/10 hover:bg-slate-500/20 text-slate-300 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded cursor-pointer"
                      >
                        {TRANSLATIONS[lang].contact.successCtaNew}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4" id="fgi-contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2 text-slate-400">{TRANSLATIONS[lang].contact.labelName}</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder={TRANSLATIONS[lang].contact.placeholderName}
                          className={`w-full p-3 rounded text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                            darkMode ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2 text-slate-400">{TRANSLATIONS[lang].contact.labelPhone}</label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder={TRANSLATIONS[lang].contact.placeholderPhone}
                          className={`w-full p-3 rounded text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                            darkMode ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2 text-slate-400">{TRANSLATIONS[lang].contact.labelEmail}</label>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder={TRANSLATIONS[lang].contact.placeholderEmail}
                          className={`w-full p-3 rounded text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                            darkMode ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2 text-slate-400">{TRANSLATIONS[lang].contact.labelSubject}</label>
                        <input
                          type="text"
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          placeholder={TRANSLATIONS[lang].contact.placeholderSubject}
                          className={`w-full p-3 rounded text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                            darkMode ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] mb-2 text-slate-400">{TRANSLATIONS[lang].contact.labelMessage}</label>
                      <textarea
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder={TRANSLATIONS[lang].contact.placeholderMessage}
                        className={`w-full p-3 rounded text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 disabled:from-amber-600 disabled:to-amber-700 text-slate-950 text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded shadow-md cursor-pointer flex items-center justify-center gap-2 flex-1 border border-amber-400/20 transition-all"
                      >
                        {isSubmitting ? (
                          <>{TRANSLATIONS[lang].contact.btnSending}</>
                        ) : (
                          <>
                            {TRANSLATIONS[lang].contact.btnSend} <Send size={14} />
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={sendToWhatsApp}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {TRANSLATIONS[lang].contact.btnContactWa} <ExternalLink size={14} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Col: Contact details & embedded map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 space-y-6"
              id="contact-info-section"
            >
              <div className={`p-6 sm:p-8 rounded border space-y-6 ${
                darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-md"
              }`}>
                <h3 className="text-sm font-bold uppercase tracking-wider pb-3 border-b border-slate-500/10">{TRANSLATIONS[lang].contact.headOffice}</h3>

                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded flex-shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{TRANSLATIONS[lang].contact.officeAddrLabel}</h4>
                      <p className="text-xs font-medium mt-1 leading-relaxed">
                        {TRANSLATIONS[lang].contact.officeAddr}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded flex-shrink-0 mt-0.5">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{TRANSLATIONS[lang].contact.officeHotlineLabel}</h4>
                      <a href="https://wa.me/6282338609205" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-500 hover:text-amber-400 hover:underline mt-1 block">
                        0823 3860 9205
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded flex-shrink-0 mt-0.5">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{TRANSLATIONS[lang].contact.officeEmailLabel}</h4>
                      <a href="mailto:info@foresyndoglobalindonesia.my.id" className="text-xs font-semibold hover:text-amber-500 hover:underline mt-1 block">
                        info@foresyndoglobalindonesia.my.id
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps location */}
              <div className="rounded overflow-hidden border border-slate-800 h-[280px] shadow-sm relative" id="google-maps-embed">
                <iframe
                  title={lang === "en" ? "PT. FORESYNDO GLOBAL INDONESIA Head Office Location" : "Lokasi Kantor PT. FORESYNDO GLOBAL INDONESIA"}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15839.814309489578!2d107.5855099!3d-7.0252512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68eb3709b456bd%3A0xe6bfb9d628ebfe0c!2sLangonsari%2C%20Pameungpeuk%2C%20Bandung%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* --- FOOTER --- */}
      <footer className={`border-t ${darkMode ? "bg-slate-950 border-slate-800/80 text-slate-300" : "bg-slate-900 border-slate-800 text-slate-300"} pt-16 pb-8 relative z-10`} id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Logo & Brief Description */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center cursor-pointer" onClick={() => scrollTo("beranda")}>
                <FGILogo darkMode={true} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {TRANSLATIONS[lang].footer.desc}
              </p>
              
              {/* Trust certification label */}
              <div className="inline-flex items-center gap-2 p-2 px-3 rounded bg-[#131926] border border-slate-800">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{TRANSLATIONS[lang].footer.certified}</span>
              </div>

              {/* Social Media Links */}
              <div className="pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">{TRANSLATIONS[lang].footer.socialFollow}</h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/foresyndoglobalindonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded bg-slate-800/50 border border-slate-850 hover:border-amber-500 hover:text-amber-500 text-slate-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    title="Instagram"
                    id="social-instagram"
                  >
                    <Instagram size={15} />
                  </a>
                  <a
                    href="https://www.facebook.com/foresyndoglobalindonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded bg-slate-800/50 border border-slate-850 hover:border-amber-500 hover:text-amber-500 text-slate-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    title="Facebook"
                    id="social-facebook"
                  >
                    <Facebook size={15} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/foresyndo-global-indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded bg-slate-800/50 border border-slate-850 hover:border-amber-500 hover:text-amber-500 text-slate-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    title="LinkedIn"
                    id="social-linkedin"
                  >
                    <Linkedin size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.15em]">{TRANSLATIONS[lang].footer.siteMap}</h4>
              <ul className="space-y-2.5 text-xs font-medium uppercase tracking-wider">
                {[
                  { id: "beranda", label: TRANSLATIONS[lang].nav.beranda },
                  { id: "tentang-kami", label: TRANSLATIONS[lang].nav["tentang-kami"] },
                  { id: "layanan", label: TRANSLATIONS[lang].nav.layanan },
                  { id: "proyek", label: TRANSLATIONS[lang].projects.sub },
                  { id: "visi-misi", label: TRANSLATIONS[lang].nav["visi-misi"] },
                  { id: "mengapa-kami", label: TRANSLATIONS[lang].nav["mengapa-kami"] },
                  { id: "faq", label: TRANSLATIONS[lang].faq.sub }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowRight size={10} /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Legal Address */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.15em]">{TRANSLATIONS[lang].contact.headOffice}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {TRANSLATIONS[lang].contact.officeAddr}
              </p>
              <div className="space-y-1.5 text-xs">
                <p className="flex items-center gap-2">
                  <Phone size={12} className="text-amber-500" />
                  <span className="text-slate-400">{TRANSLATIONS[lang].contact.officeHotlineLabel}:</span> 
                  <a href="https://wa.me/6282338609205" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 hover:underline font-bold">
                    0823 3860 9205
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={12} className="text-amber-500" />
                  <span className="text-slate-400">{TRANSLATIONS[lang].contact.officeEmailLabel}:</span> 
                  <a href="mailto:info@foresyndoglobalindonesia.my.id" className="hover:text-amber-500 hover:underline font-medium">
                    info@foresyndoglobalindonesia.my.id
                  </a>
                </p>
              </div>
            </div>

            {/* Column 4: Discreet Newsletter */}
            <div className="lg:col-span-3 space-y-4" id="footer-newsletter">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.15em]">{TRANSLATIONS[lang].footer.newsletterTitle}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {TRANSLATIONS[lang].footer.newsletterDesc}
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-2 mt-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={TRANSLATIONS[lang].footer.newsletterPlaceholder}
                    className={`w-full p-2.5 pr-10 rounded text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all ${
                      darkMode ? "bg-[#111622] border-slate-800 text-white placeholder-slate-500" : "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
                    }`}
                    disabled={newsletterSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={newsletterSubmitting}
                    className="absolute right-1 p-1.5 rounded text-amber-500 hover:text-amber-400 disabled:text-slate-600 transition-all cursor-pointer flex items-center justify-center"
                    title={TRANSLATIONS[lang].footer.newsletterSubmit}
                  >
                    {newsletterSubmitting ? (
                      <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                  </button>
                </div>
                
                {/* Feedback Messages */}
                <AnimatePresence mode="wait">
                  {newsletterSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] text-emerald-500 font-medium tracking-wide flex items-center gap-1 mt-1"
                    >
                      <CheckCircle2 size={12} className="text-emerald-500" /> {TRANSLATIONS[lang].footer.newsletterSuccess}
                    </motion.p>
                  )}
                  {newsletterError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] text-red-500 font-medium tracking-wide flex items-center gap-1 mt-1"
                    >
                      <X size={12} className="text-red-500" /> {newsletterError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-wider">
            <p>{TRANSLATIONS[lang].footer.copyright}</p>
            <div className="flex gap-4">
              <span className="hover:text-amber-500 cursor-pointer">{TRANSLATIONS[lang].footer.siteMap}</span>
              <span className="hover:text-amber-500 cursor-pointer">{lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</span>
              <span className="hover:text-amber-500 cursor-pointer">{lang === "id" ? "Syarat & Ketentuan" : "Terms & Conditions"}</span>
            </div>
          </div>
        </div>
      </footer>


      {/* --- BACK TO TOP BUTTON --- */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 sm:right-8 p-3.5 rounded bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-950/30 hover:from-amber-500 hover:to-amber-700 hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer border border-amber-400/20"
            id="back-to-top"
            title={lang === "en" ? "Back to top" : "Kembali ke atas"}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>


      {/* --- FLOATING WHATSAPP BUTTON & CHAT BADGE --- */}
      <div className="fixed bottom-6 right-6 sm:right-8 z-40 flex flex-col items-end gap-3" id="floating-whatsapp-container">
        
        {/* Chat Badge Message */}
        <AnimatePresence>
          {showWaPopup && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-3.5 rounded border flex items-center justify-between gap-3 shadow-xl max-w-xs ${
                darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              <div className="flex gap-2.5 items-center">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">FGI</div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <h5 className="font-bold text-xs">CS Foresyndo</h5>
                  <p className="text-[10px] text-slate-400">{lang === "en" ? "How can we help you?" : "Ada yang bisa kami bantu?"}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWaPopup(false);
                }}
                className="text-slate-400 hover:text-slate-200 p-1 rounded cursor-pointer"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Icon Trigger */}
        <a
          href="https://wa.me/6282338609205"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          id="wa-float-btn"
          aria-label={lang === "en" ? "Contact FGI via WhatsApp" : "Hubungi FGI via WhatsApp"}
        >
          {/* Animated pulsing ripple circle */}
          <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-500/30 animate-ping group-hover:animate-none" />
          
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>


      {/* --- SELECTED PROJECT MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="project-detail-modal">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4 }}
              className={`relative max-w-3xl w-full rounded border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] ${
                darkMode ? "bg-[#131926] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-red-600 transition-colors cursor-pointer"
                id="close-modal-btn"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto">
                {/* Hero image header */}
                <div className="relative h-[250px] sm:h-[320px] w-full">
                  <img
                    src={selectedProject.image}
                    alt={lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded">
                      {selectedProject.category === "Perumahan" ? TRANSLATIONS[lang].projects.filterPerumahan :
                       selectedProject.category === "Komersial" ? TRANSLATIONS[lang].projects.filterKomersial :
                       TRANSLATIONS[lang].projects.filterInfrastruktur}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 leading-tight">
                      {lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded bg-slate-500/5 text-xs">
                    <div>
                      <h5 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{TRANSLATIONS[lang].modal.projectLocation}</h5>
                      <p className="font-semibold mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-red-500" /> {lang === "en" && selectedProject.enLocation ? selectedProject.enLocation : selectedProject.location}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{TRANSLATIONS[lang].modal.projectSize}</h5>
                      <p className="font-semibold mt-1 flex items-center gap-1">
                        <Building size={12} className="text-amber-500" /> {lang === "en" && selectedProject.enSize ? selectedProject.enSize : selectedProject.size}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <h5 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{TRANSLATIONS[lang].modal.projectYear}</h5>
                      <p className="font-semibold mt-1 flex items-center gap-1">
                        <Clock size={12} className="text-amber-500" /> {lang === "en" && selectedProject.enYear ? selectedProject.enYear : selectedProject.year}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm uppercase tracking-wide">{TRANSLATIONS[lang].modal.projectDesc}</h4>
                    <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {lang === "en" && selectedProject.enDesc ? selectedProject.enDesc : selectedProject.desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm uppercase tracking-wide">{TRANSLATIONS[lang].modal.projectHighlights}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(lang === "en" && selectedProject.enHighlights ? selectedProject.enHighlights : selectedProject.highlights).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social sharing for this project */}
                  <div className="pt-5 border-t border-slate-500/10 space-y-3" id="project-sharing-section">
                    <h4 className="font-bold text-xs uppercase tracking-[0.1em] flex items-center gap-1.5 text-amber-500">
                      <Share2 size={13} /> {TRANSLATIONS[lang].modal.shareTitle}
                    </h4>
                    <p className={`text-[11px] leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {TRANSLATIONS[lang].modal.shareDesc}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {/* WhatsApp Share Button */}
                      <button
                        onClick={() => {
                          const projectTitle = lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title;
                          const projectLoc = lang === "en" && selectedProject.enLocation ? selectedProject.enLocation : selectedProject.location;
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          const text = lang === "en"
                            ? `Check out this amazing project by PT. Foresyndo Global Indonesia:\n\n*${projectTitle}*\n📍 Location: ${projectLoc}\n\nView details here: ${shareUrl}`
                            : `Lihat proyek luar biasa dari PT. Foresyndo Global Indonesia:\n\n*${projectTitle}*\n📍 Lokasi: ${projectLoc}\n\nLihat detail selengkapnya di sini: ${shareUrl}`;
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer h-9"
                        title="Share via WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </button>

                      {/* LinkedIn Share Button */}
                      <button
                        onClick={() => {
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] dark:text-[#3cabee] border border-[#0077B5]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer h-9"
                        title="Share on LinkedIn"
                      >
                        <Linkedin size={13} />
                        LinkedIn
                      </button>

                      {/* Email Share Button */}
                      <button
                        onClick={() => {
                          const projectTitle = lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title;
                          const projectLoc = lang === "en" && selectedProject.enLocation ? selectedProject.enLocation : selectedProject.location;
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          const subject = lang === "en"
                            ? `Project Proposal: ${projectTitle} - PT. Foresyndo Global Indonesia`
                            : `Rekomendasi Proyek Properti: ${projectTitle} - PT. Foresyndo Global Indonesia`;
                          const body = lang === "en"
                            ? `Hello,\n\nI would like to share this property project with you:\n\nProject: ${projectTitle}\nLocation: ${projectLoc}\n\nYou can view more details and photos here:\n${shareUrl}\n\nBest regards.`
                            : `Halo,\n\nSaya ingin membagikan proyek properti ini kepada Anda:\n\nProyek: ${projectTitle}\nLokasi: ${projectLoc}\n\nAnda dapat melihat rincian lengkap dan foto proyek di sini:\n${shareUrl}\n\nSalam hangat.`;
                          window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer h-9"
                        title="Share via Email"
                      >
                        <Mail size={13} />
                        Email
                      </button>

                      {/* Copy Link Button */}
                      <button
                        onClick={() => {
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          navigator.clipboard.writeText(shareUrl)
                            .then(() => {
                              setShareCopied(true);
                              setTimeout(() => setShareCopied(false), 3000);
                            })
                            .catch((err) => console.error("Could not copy text: ", err));
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer h-9 ml-auto sm:ml-0"
                        title="Copy project link"
                      >
                        {shareCopied ? (
                          <>
                            <CheckCircle2 size={13} className="text-emerald-500" />
                            <span className="text-emerald-500">{TRANSLATIONS[lang].modal.shareCopied}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>{lang === "en" ? "Copy Link" : "Salin Link"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Call to action for this specific project */}
                  <div className="pt-6 border-t border-slate-500/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const messageText = lang === "en"
                          ? `Hello FGI, I am interested in inquiring about the project: *${selectedProject.enTitle || selectedProject.title}* in *${selectedProject.enLocation || selectedProject.location}*. Please send me more information.`
                          : `Halo FGI, saya tertarik menanyakan tentang proyek: *${selectedProject.title}* di *${selectedProject.location}*. Mohon informasi unit / pelaksanaannya lebih lanjut.`;
                        window.open(`https://wa.me/6282338609205?text=${encodeURIComponent(messageText)}`, "_blank");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow-sm flex items-center justify-center gap-2 flex-1 cursor-pointer"
                    >
                      {TRANSLATIONS[lang].modal.askCta} <ExternalLink size={14} />
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className={`text-xs font-bold uppercase tracking-wider px-6 py-3 rounded cursor-pointer ${
                        darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      {TRANSLATIONS[lang].modal.close}
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
