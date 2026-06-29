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
  ArrowUpRight,
  Share2,
  Linkedin,
  Copy,
  Instagram,
  Facebook,
  Twitter,
  Calculator,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Video,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Info,
  Sliders,
  Loader2,
  Printer,
  Wallet,
  Calendar,
  Percent,
  Download
} from "lucide-react";

import { generateProjectBrochure } from "./utils/brochure";
import { downloadCompanyProfilePDF, downloadJVAgreementDraftPDF, downloadOpportunityProspectusPDF } from "./utils/pdfGenerator";
import { InvestorD3Chart } from "./components/InvestorD3Chart";
import { QRCodeSVG } from "qrcode.react";

// --- CUSTOM LOGO FOR PT. FORESYNDO GLOBAL INDONESIA (FGI) ---
const FGILogo = ({ className = "", darkMode = true }: { className?: string; darkMode?: boolean }) => (
  <div className={`flex items-center space-x-3 ${className}`} id="fgi-logo">
    <div className="w-11 h-11 flex items-center justify-center rounded-lg overflow-hidden bg-white shadow-md flex-shrink-0 border border-slate-200 p-0.5">
      <img
        src="/assets/images/fgi_logo_new_1782645239893.jpg"
        alt="PT. Foresyndo Global Indonesia Logo"
        className="w-full h-full object-contain rounded-md"
        referrerPolicy="no-referrer"
      />
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
  images?: string[];
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
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413719-875871274712?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop"
    ],
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
  },
  {
    id: 7,
    title: "Hunian Hotel & Smart Living - Foresyndo Residence 2",
    enTitle: "Boutique Hotel & Smart Living - Foresyndo Residence 2",
    category: "Perumahan",
    image: "/assets/images/foresyndo_residence_two_1782634018176.jpg",
    images: [
      "/assets/images/foresyndo_residence_two_1782634018176.jpg",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop"
    ],
    location: "Jatitujuh, Kabupaten Majalengka, Jawa Barat",
    enLocation: "Jatitujuh, Majalengka Regency, West Java",
    desc: "Proyek hunian hotel (boutique hotel) eksklusif dengan integrasi teknologi Smart Living terdepan. Dirancang untuk efisiensi energi, kenyamanan premium, dan gaya hidup modern yang prestisius.",
    enDesc: "An exclusive boutique hotel residential project integrated with cutting-edge Smart Living technology. Designed for energy efficiency, premium comfort, and a prestigious modern lifestyle.",
    size: "250 m² Luas Lahan",
    enSize: "250 m² Land Area",
    year: "2026 - Baru Diluncurkan",
    enYear: "2026 - Newly Launched",
    highlights: ["Sistem IoT Smart Living Terintegrasi", "Boutique Hotel Concept Suite", "Desain Arsitektur Modern Tropis", "Sertifikasi Efisiensi Energi Terpadu"],
    enHighlights: ["Integrated IoT Smart Living System", "Boutique Hotel Concept Suite", "Modern Tropical Architectural Design", "Integrated Energy Efficiency Certification"]
  }
];

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    titleId: "Perumahan Modern - Grand Foresyndo Hills",
    titleEn: "Modern Housing Estate - Grand Foresyndo Hills",
    categoryId: "Perumahan",
    categoryEn: "Residential",
    locationId: "Bandung Selatan, Jawa Barat",
    locationEn: "South Bandung, West Java",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    titleId: "Ruko Komersial - Golden Square Boulevard",
    titleEn: "Commercial Shophouse - Golden Square Boulevard",
    categoryId: "Komersial",
    categoryEn: "Commercial",
    locationId: "Banjaran Raya, Bandung",
    locationEn: "Banjaran Raya, Bandung",
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
    titleId: "Infrastruktur Kawasan - Site Development & Akses Jalan",
    titleEn: "Regional Infrastructure - Site Development & Access Road",
    categoryId: "Infrastruktur",
    categoryEn: "Infrastructure",
    locationId: "Langonsari, Kabupaten Bandung",
    locationEn: "Langonsari, Bandung Regency",
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    titleId: "Gudang Industri - FGI Logistics Park",
    titleEn: "Industrial Warehouse - FGI Logistics Park",
    categoryId: "Komersial",
    categoryEn: "Commercial",
    locationId: "Kawasan Industri Bandung, Jawa Barat",
    locationEn: "Bandung Industrial Area, West Java",
  },
  {
    image: "/assets/images/foresyndo_residence_two_1782634018176.jpg",
    titleId: "Hunian Hotel & Smart Living - Foresyndo Residence 2",
    titleEn: "Boutique Hotel & Smart Living - Foresyndo Residence 2",
    categoryId: "Perumahan",
    categoryEn: "Residential / Hospitality",
    locationId: "Jatitujuh, Kabupaten Majalengka, Jawa Barat",
    locationEn: "Jatitujuh, Majalengka Regency, West Java",
  }
];

const TRANSLATIONS = {
  id: {
    nav: {
      beranda: "Beranda",
      "tentang-kami": "Tentang Kami",
      struktur: "Struktur",
      layanan: "Layanan",
      proyek: "Proyek",
      investor: "Investor",
      "visi-misi": "Visi & Misi",
      "mengapa-kami": "Mengapa Kami",
      karir: "Karir",
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
    org: {
      sub: "STRUKTUR ORGANISASI",
      title: "Tata Kelola & Struktur Organisasi FGI",
      desc: "Struktur manajemen PT. Foresyndo Global Indonesia dirancang untuk transparansi operasional, kepatuhan hukum yang ketat, serta efisiensi eksekusi proyek sipil.",
      viewDiagram: "Bagan Hierarki",
      viewGrid: "Detail Tim & Divisi",
      roles: {
        rups: "Rapat Umum Pemegang Saham (RUPS)",
        rupsDesc: "Organ kekuasaan tertinggi perusahaan yang menetapkan arah kebijakan strategis jangka panjang, pengesahan anggaran, dan keputusan pemegang saham.",
        komisaris: "Dewan Komisaris",
        komisarisDesc: "Melakukan pengawasan atas jalannya kebijakan pengurusan perusahaan secara umum serta memberikan nasihat kepada jajaran Direksi secara berkala.",
        ceo: "Direktur Utama (President Director / CEO)",
        ceoDesc: "Memimpin seluruh roda operasional perusahaan, menjalin kemitraan investasi strategis, serta mengesahkan keputusan eksekutif tertinggi.",
        cfo: "Direktur Keuangan & Administrasi (CFO)",
        cfoDesc: "Mengelola aliran dana, audit laporan keuangan, transparansi biaya pembangunan (RAB), kepatuhan pajak, serta urusan administratif.",
        coo: "Direktur Operasional & Konstruksi (COO)",
        cooDesc: "Mengawasi jalannya pengerjaan fisik proyek di lapangan, memastikan standar mutu bahan, keselamatan kerja (K3), dan ketepatan timeline.",
        architecture: "Divisi Arsitektur & Perencanaan",
        architectureDesc: "Merancang desain tata kota, masterplan perumahan, visualisasi 3D photorealistic, serta detail teknis tata ruang estetis.",
        civil: "Divisi Konstruksi & Rekayasa Sipil",
        civilDesc: "Melaksanakan kalkulasi kekuatan struktur beton, drainase pracetak, jalan aspal, serta pengawasan teknis kekuatan bangunan.",
        legal: "Divisi Legalitas & Perizinan",
        legalDesc: "Menjamin seluruh perizinan AMDAL, sertifikat tanah (SHM/HGB), izin mendirikan bangunan (PBG/IMB), dan kontrak hukum clean & clear.",
        pmo: "Manajemen Proyek (PMO) & Logistik",
        pmoDesc: "Mengatur penjadwalan proyek melalui Gantt Chart, mengelola rantai pasok material berkualitas tinggi, dan koordinasi mandor lapangan."
      }
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
        },
        {
          name: "Amelia Putri",
          role: "Pemilik Villa Dago Haven",
          comment: "FGI mewujudkan villa impian kami dengan detail yang sangat menakjubkan. Tim mereka sangat responsif dari tahap perencanaan arsitektur hingga serah terima kunci.",
        },
        {
          name: "Rian Hidayat",
          role: "Manajer Konstruksi Retail",
          comment: "Bekerja sama dengan FGI untuk renovasi outlet komersial kami sangat memuaskan. Pekerjaan selesai sesuai standar kualitas tinggi dan minim hambatan birokrasi.",
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
    careers: {
      sub: "KARIR & BUDAYA",
      title: "Bergabung & Tumbuh Bersama PT. FGI",
      cultureTitle: "Budaya Kerja FGI",
      cultureDesc: "Di PT. FORESYNDO GLOBAL INDONESIA, kami percaya bahwa kesuksesan jangka panjang dibangun di atas integritas, kolaborasi yang solid, dan standar keunggulan yang tanpa kompromi. Kami menawarkan lingkungan kerja dinamis, pelatihan berkelanjutan, dan peluang besar bagi Anda untuk membentuk masa depan lanskap properti Indonesia.",
      culturePoints: [
        { title: "Integritas & Hukum Utama", desc: "Menjamin seluruh aktivitas kerja dan legalitas proyek berjalan dengan kepatuhan hukum 100%." },
        { title: "Standar Emas Konstruksi", desc: "Mengutamakan kualitas material premium dan ketepatan struktur di setiap proyek kami." },
        { title: "Keseimbangan & Kesejahteraan", desc: "Mendukung perkembangan karir profesional sekaligus menghargai kehidupan pribadi setiap individu." }
      ],
      openPositions: "Posisi yang Sedang Dibuka",
      applyBtn: "Lamar Sekarang",
      btnDetails: "Detail Persyaratan",
      location: "Lokasi",
      jobType: "Tipe Pekerjaan",
      positions: [
        {
          title: "Site Engineer / Civil Engineer",
          location: "Bandung, Jawa Barat",
          type: "Full-Time (Kontrak/Tetap)",
          desc: "Mengawasi, memantau, dan mengarahkan seluruh pengerjaan fisik struktur dan infrastruktur lapangan sesuai gambar kerja (DED) dan standar kualitas FGI.",
          reqs: [
            "Pendidikan minimal S1 Teknik Sipil.",
            "Pengalaman minimal 3 tahun sebagai Site Engineer proyek perumahan atau komersial.",
            "Menguasai AutoCAD, SAP2000, MS Project, dan manajemen lapangan.",
            "Memiliki sertifikat keahlian konstruksi (SKA/SKK) adalah nilai tambah.",
            "Kemampuan kepemimpinan yang kuat dan komunikasi yang taktis."
          ]
        },
        {
          title: "Project Architect & BIM Modeler",
          location: "Bandung, Jawa Barat",
          type: "Full-Time",
          desc: "Merancang denah tapak (site plan), layout arsitektur 3D, serta membuat pemodelan BIM/DED komprehensif untuk proyek residensial premium & ruko komersial.",
          reqs: [
            "Pendidikan minimal S1 Arsitektur.",
            "Pengalaman minimal 2 tahun dalam merancang proyek perumahan premium.",
            "Sangat mahir menggunakan Revit, SketchUp, V-Ray/Enscape, dan AutoCAD.",
            "Memiliki portfolio desain arsitektur modern minimalis yang kuat.",
            "Kreatif, teliti terhadap detail estetika dan kepraktisan struktur."
          ]
        },
        {
          title: "Legal Real Estate & Land Acquisition Specialist",
          location: "Bandung, Jawa Barat",
          type: "Full-Time",
          desc: "Mengelola seluruh legalitas akuisisi tanah, verifikasi keaslian sertifikat, kepengurusan izin PBG/IMB, dan memastikan compliance hukum di setiap tahap operasional.",
          reqs: [
            "Pendidikan S1 Hukum (diutamakan spesialisasi hukum agraria atau bisnis).",
            "Pengalaman minimal 3 tahun di industri developer properti / notaris pertanahan.",
            "Memiliki jaringan kuat dengan dinas tata ruang, BPN, dan pejabat daerah terkait.",
            "Memahami regulasi terbaru terkait perizinan konstruksi, KKPR, dan tata ruang.",
            "Keterampilan negosiasi yang andal dan pemecahan masalah hukum yang solutif."
          ]
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
      printBrochure: "Cetak Brosur Proyek",
      printingBrochure: "Menyiapkan Brosur...",
    },
    videoShowcase: {
      tabGallery: "Galeri Foto",
      tabVideo: "Video Showcase (Veo AI)",
      introTitle: "Eksplorasi Proyek dengan Google Veo",
      introDesc: "Rasakan masa depan hunian ini melalui tayangan video promosi sinematik resolusi tinggi yang ditenagai oleh Google Veo (AI Video Generation).",
      stylePreset: "Pilihan Gaya Visual Video",
      customPromptLabel: "Modifikasi Kreatif (Opsional)",
      customPromptPlaceholder: "Contoh: tambahkan efek matahari terbenam keemasan atau suasana gerimis sinematik...",
      enableAILabel: "Gunakan AI Generatif Google Veo (Butuh API Key)",
      enableAISimulated: "Mode Simulasi Interaktif (Instan & Tanpa API Key)",
      generateBtn: "Hasilkan Video Promosi (Veo)",
      renderingTitle: "Menyiapkan Tayangan Sinematik...",
      backToSetup: "Sesuaikan Ulang Gaya",
      apiNotConfiguredAlert: "Kunci API (GEMINI_API_KEY) belum dikonfigurasi di server FGI. Menjalankan Mode Simulasi Interaktif dengan visual stok premium berkualitas tinggi untuk kemudahan demonstrasi.",
      simulationModeActive: "Mode Simulasi Aktif - Stok Video Premium",
      quotaExceededWarning: "Batas Kuota Gemini Terlampaui (429): Tayangan dialihkan secara aman ke Mode Simulasi Premium dengan pemutaran video sinematik presisi tinggi."
    }
  },
  en: {
    nav: {
      beranda: "Home",
      "tentang-kami": "About Us",
      struktur: "Structure",
      layanan: "Services",
      proyek: "Projects",
      investor: "Investor",
      "visi-misi": "Vision & Mission",
      "mengapa-kami": "Why Us",
      karir: "Careers",
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
    org: {
      sub: "ORGANIZATIONAL STRUCTURE",
      title: "FGI Governance & Organization Structure",
      desc: "The management structure of PT. Foresyndo Global Indonesia is engineered for operational transparency, strict legal compliance, and high-efficiency civil project execution.",
      viewDiagram: "Hierarchy Chart",
      viewGrid: "Team & Division Details",
      roles: {
        rups: "General Meeting of Shareholders (RUPS)",
        rupsDesc: "The supreme governing body of the company that establishes long-term strategic directions, approves corporate budgets, and handles major shareholder decisions.",
        komisaris: "Board of Commissioners",
        komisarisDesc: "Responsible for supervising general corporate management and advising the Board of Directors on operational compliance and strategy.",
        ceo: "President Director & CEO",
        ceoDesc: "Leads the company's overall operations, establishes strategic investment partnerships, and authorizes key executive decisions.",
        cfo: "Director of Finance & Administration (CFO)",
        cfoDesc: "Manages capital flow, audits financial records, ensures construction cost transparency (RAB), tax compliance, and general administration.",
        coo: "Director of Operations & Construction (COO)",
        cooDesc: "Supervises on-site physical construction, enforces material quality standards, K3 safety protocols, and strict schedule adherence.",
        architecture: "Architecture & Planning Division",
        architectureDesc: "Designs town plans, residential masterplans, photorealistic 3D visualization, and aesthetic spatial details.",
        civil: "Construction & Civil Engineering Division",
        civilDesc: "Handles structural concrete calculations, precast drainage engineering, asphalt paving, and building stability audits.",
        legal: "Legality & Compliance Division",
        legalDesc: "Ensures all environmental licenses (AMDAL), land titles (SHM/HGB), building permits (PBG/IMB), and contract law remain clean & clear.",
        pmo: "Project Management (PMO) & Logistics",
        pmoDesc: "Schedules construction phases via Gantt Charts, coordinates raw material supply chains, and manages site foremen."
      }
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
        },
        {
          name: "Amelia Putri",
          role: "Villa Owner at Dago Haven",
          comment: "FGI brought our dream villa to life with incredible attention to detail. Their team was super responsive from architectural planning all the way to key handover.",
        },
        {
          name: "Rian Hidayat",
          role: "Retail Construction Manager",
          comment: "Partnering with FGI for our commercial outlet renovation was highly satisfying. The work was completed to high standards with zero bureaucratic hassle.",
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
    careers: {
      sub: "CAREER & CULTURE",
      title: "Join & Grow with PT. FGI",
      cultureTitle: "FGI Company Culture",
      cultureDesc: "At PT. FORESYNDO GLOBAL INDONESIA, we believe that sustainable success is built on absolute integrity, solid teamwork, and an uncompromising standard of excellence. We offer a dynamic work environment, ongoing professional development, and high-growth opportunities for you to shape the future of real estate in Indonesia.",
      culturePoints: [
        { title: "Integrity & Legal Excellence", desc: "We ensure all business operations and project layouts comply 100% with Indonesian legal and land regulatory frameworks." },
        { title: "Gold Standard Construction", desc: "Prioritizing structural stability, premium materials, and architectural beauty in every development." },
        { title: "Growth & Work-Life Balance", desc: "Supporting career advancement while valuing the personal well-being and life balance of our teams." }
      ],
      openPositions: "Current Open Positions",
      applyBtn: "Apply Now",
      btnDetails: "Requirements",
      location: "Location",
      jobType: "Job Type",
      positions: [
        {
          title: "Site Engineer / Civil Engineer",
          location: "Bandung, West Java",
          type: "Full-Time",
          desc: "Supervise, monitor, and direct all structural and infrastructural physical work on-site based on detailed architectural blueprints (DED) and FGI's quality benchmarks.",
          reqs: [
            "Bachelor's degree (S1) in Civil Engineering.",
            "At least 3 years of experience as a Site Engineer in residential or commercial developments.",
            "Proficient in AutoCAD, SAP2000, MS Project, and on-site workforce management.",
            "Possession of a professional construction expertise certificate (SKA/SKK) is highly preferred.",
            "Strong leadership skills and tactical communication capabilities."
          ]
        },
        {
          title: "Project Architect & BIM Modeler",
          location: "Bandung, West Java",
          type: "Full-Time",
          desc: "Design detailed master site plans, photorealistic 3D architectural renders, and produce full BIM/DED sets for upcoming luxury residential and commercial shophouses.",
          reqs: [
            "Bachelor's degree (S1) in Architecture.",
            "Minimum 2 years of experience designing premium residential and housing concepts.",
            "Highly proficient in Revit, SketchUp, V-Ray/Enscape, and AutoCAD.",
            "A strong portfolio of modern, minimalist, high-end architectural works.",
            "Creative mindset with a keen eye for aesthetic details and practical structural design."
          ]
        },
        {
          title: "Legal Real Estate & Land Acquisition Specialist",
          location: "Bandung, West Java",
          type: "Full-Time",
          desc: "Manage the entire legal pipeline for land acquisition, verify deeds/land authenticity, secure PBG/IMB building licenses, and ensure 100% regulatory compliance.",
          reqs: [
            "Bachelor's degree (S1) in Law (focus on Land or Business law is preferred).",
            "At least 3 years of experience in property development companies or land notary offices.",
            "Established connection network with spatial planning boards, BPN, and local authorities.",
            "Solid knowledge of recent regulatory codes on construction licenses, KKPR, and land zoning.",
            "Excellent negotiation skills and a solutions-oriented approach to complex legal scenarios."
          ]
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
      printBrochure: "Print Project Brochure",
      printingBrochure: "Preparing Brochure...",
    },
    videoShowcase: {
      tabGallery: "Photo Gallery",
      tabVideo: "Video Showcase (Veo AI)",
      introTitle: "Explore Project with Google Veo",
      introDesc: "Experience the future of this project through a high-definition cinematic promotional video powered by Google Veo (AI Video Generation).",
      stylePreset: "Visual Style Preset",
      customPromptLabel: "Creative Modification (Optional)",
      customPromptPlaceholder: "Example: add golden sunset sunset flare or cinematic rainy mood...",
      enableAILabel: "Use Google Veo Generative AI (Requires API Key)",
      enableAISimulated: "Interactive Simulation Mode (Instant, No API Key)",
      generateBtn: "Generate Promotional Video (Veo)",
      renderingTitle: "Preparing Cinematic Showcase...",
      backToSetup: "Reconfigure Visual Style",
      apiNotConfiguredAlert: "API Key (GEMINI_API_KEY) is not configured on the server FGI. Using Interactive Simulation Mode with premium quality stock videos for high-fidelity demonstration.",
      simulationModeActive: "Simulation Mode Active - Premium Stock Video",
      quotaExceededWarning: "Gemini API Quota Exceeded (429): Streaming automatically transitioned to Premium Simulation Mode with a high-fidelity cinematic project flythrough."
    }
  }
};

const INVESTOR_TRANSLATIONS = {
  id: {
    sub: "HUBUNGAN INVESTOR & KEMITRAAN",
    title: "Membangun Nilai Bersama FGI",
    desc: "PT. Foresyndo Global Indonesia membuka peluang kolaborasi bagi investor ritel, pemilik lahan, dan lembaga keuangan melalui model pembiayaan proyek konstruksi (Joint Venture) yang transparan, aman secara hukum, dan menguntungkan.",
    calculator: {
      title: "Kalkulator Simulasi ROI",
      desc: "Simulasikan potensi imbal hasil investasi Anda berdasarkan modal, sektor proyek, dan durasi pendanaan.",
      amountLabel: "Jumlah Investasi Anda:",
      durationLabel: "Durasi Pendanaan:",
      typeLabel: "Sektor Sifat Proyek:",
      years: "Tahun",
      types: {
        residential: "Hunian & Hospitality (ROI ~14% p.a.)",
        commercial: "Komersial & Ruko (ROI ~17% p.a.)",
        infrastructure: "Infrastruktur & Kawasan (ROI ~12% p.a.)"
      },
      resultsTitle: "Proyeksi Keuntungan Finansial",
      yieldRate: "Estimasi Imbal Hasil (p.a.)",
      netProfit: "Proyeksi Keuntungan Bersih",
      totalPayout: "Total Pengembalian Dana",
      quarterlyPayout: "Estimasi Bagi Hasil Triwulan",
      cta: "Hubungi Tim Keuangan"
    },
    opportunities: {
      title: "Peluang Kemitraan Aktif",
      desc: "Daftar proyek konstruksi FGI yang saat ini membuka pembiayaan partisipasi modal kerja (JV) dengan kuota terbatas.",
      funded: "Terdanai",
      minTicket: "Minimal Investasi",
      targetPool: "Target Pool Modal",
      estimatedRoi: "Proyeksi Bagi Hasil",
      statusOpen: "Terbuka untuk Pendanaan",
      statusProgress: "Pematangan Lahan & Izin",
      ctaInquire: "Ajukan Minat",
      downloadPro: "Unduh Prospektus (PDF)"
    },
    form: {
      title: "Formulir Kemitraan Investor",
      desc: "Silakan isi formulir di bawah ini untuk menjadwalkan konsultasi formal tatap muka dengan Direksi FGI.",
      name: "Nama Lengkap Anda *",
      email: "Alamat Email Aktif *",
      phone: "Nomor WhatsApp / HP *",
      projectInterest: "Pilihan Proyek Investasi",
      projectPlaceholder: "-- Pilih Proyek / Sektor --",
      message: "Catatan atau Kebutuhan Khusus",
      submit: "Kirim Formulir Pernyataan Minat",
      successTitle: "Minat Investasi Terkirim!",
      successDesc: "Terima kasih atas kepercayaan Anda. Data minat investasi Anda telah dicatat oleh sistem kami. Silakan klik tombol di bawah untuk berkomunikasi langsung dengan Direksi Keuangan PT. FGI via WhatsApp resmi.",
      waCta: "Hubungi Direksi FGI via WA"
    },
    faq: {
      title: "Pertanyaan Umum Investor",
      q1: "Bagaimana sistem pembagian keuntungan (profit sharing) dilakukan?",
      a1: "Bagi hasil ditransfer langsung ke rekening bank terdaftar setiap triwulan (3 bulan) sekali, berdasarkan laporan keuangan progress lapangan yang transparan.",
      q2: "Apakah investasi dilindungi oleh jaminan aset nyata?",
      a2: "Ya, setiap perjanjian Joint Venture (JV) di PT. FGI diikat di hadapan Notaris resmi dan dijaminkan melalui hak opsi kepemilikan aset tanah/bangunan proyek proporsional terhadap nilai modal investasi Anda.",
      q3: "Berapa batas minimum investasi di PT. FGI?",
      a3: "Batas minimum partisipasi modal kerja berbeda-beda untuk tiap proyek, dimulai dari Rp 250 Juta untuk klaster hunian, hingga Rp 1 Miliar untuk proyek infrastruktur industri.",
      q4: "Apakah investor berhak ikut mengawasi jalannya proyek?",
      a4: "Tentu. FGI menyediakan portal laporan progress bulanan (berupa dokumentasi foto udara, kemajuan fisik konstruksi, dan pembukuan) yang dapat diakses oleh seluruh mitra investor secara daring."
    },
    downloads: {
      title: "Dokumen Hubungan Investor",
      desc: "Unduh materi resmi kami untuk mempelajari tata kelola dan legalitas perusahaan secara mendalam.",
      doc1: "Profil Perusahaan & Portofolio FGI.pdf",
      doc2: "Draft Standar Perjanjian Joint Venture.pdf"
    }
  },
  en: {
    sub: "INVESTOR RELATIONS & PARTNERSHIP",
    title: "Building Shared Value with FGI",
    desc: "PT. Foresyndo Global Indonesia opens collaborative opportunities for retail investors, landowners, and financial institutions through a Joint Venture model that is transparent, legally secure, and profitable.",
    calculator: {
      title: "ROI Simulation Calculator",
      desc: "Simulate your potential investment yields based on your capital, project sector, and funding duration.",
      amountLabel: "Your Capital Investment:",
      durationLabel: "Funding Duration:",
      typeLabel: "Project Sector Type:",
      years: "Years",
      types: {
        residential: "Residential & Hospitality (ROI ~14% p.a.)",
        commercial: "Commercial & Retail (ROI ~17% p.a.)",
        infrastructure: "Infrastructure & Logistics (ROI ~12% p.a.)"
      },
      resultsTitle: "Financial Profit Projection",
      yieldRate: "Estimated Yield Rate (p.a.)",
      netProfit: "Projected Net Profit",
      totalPayout: "Total Fund Payout",
      quarterlyPayout: "Est. Quarterly Profit Payout",
      cta: "Contact Finance Team"
    },
    opportunities: {
      title: "Active Partnership Opportunities",
      desc: "FGI construction projects currently open for working capital participation (JV) with limited slots.",
      funded: "Funded",
      minTicket: "Minimum Ticket Size",
      targetPool: "Target Capital Pool",
      estimatedRoi: "Projected Dividend Yield",
      statusOpen: "Open for Funding",
      statusProgress: "Land Clearing & Permitting",
      ctaInquire: "Inquire Interest",
      downloadPro: "Download Prospectus (PDF)"
    },
    form: {
      title: "Investor Partnership Form",
      desc: "Please fill out the form below to schedule a formal face-to-face consultation with FGI Directors.",
      name: "Your Full Name *",
      email: "Active Email Address *",
      phone: "WhatsApp / Phone Number *",
      projectInterest: "Investment Project Choice",
      projectPlaceholder: "-- Choose Project / Sector --",
      message: "Special Notes or Requirements",
      submit: "Submit Letter of Interest",
      successTitle: "Investment Interest Registered!",
      successDesc: "Thank you for your trust. Your investment interest has been securely recorded. Please click the button below to connect directly with the Finance Director of PT. FGI via official WhatsApp.",
      waCta: "Connect with FGI Directors via WA"
    },
    faq: {
      title: "Investor FAQ",
      q1: "How is the profit-sharing distributed?",
      a1: "Dividends are transferred directly to your registered bank account every quarter (3 months), based on transparent progress reports of the project.",
      q2: "Is my investment secured by physical assets?",
      a2: "Yes, every Joint Venture (JV) agreement at PT. FGI is signed in front of an official Notary and backed by proportional ownership options over project land/buildings.",
      q3: "What is the minimum ticket size to invest?",
      a3: "The minimum investment varies per project, starting from IDR 250 Million for housing projects, up to IDR 1 Billion for industrial infrastructure projects.",
      q4: "Do investors have the right to inspect project progress?",
      a4: "Absolutely. FGI provides monthly progress portals (including drone photography, structural progress, and bookkeeping) accessible online for all investment partners."
    },
    downloads: {
      title: "Investor Relations Documents",
      desc: "Download our official materials to study our corporate governance and legal standards in depth.",
      doc1: "FGI Company Profile & Portfolio.pdf",
      doc2: "Standard Joint Venture Agreement Draft.pdf"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const [orgView, setOrgView] = useState<"diagram" | "grid">("diagram");
  const [selectedOrgCard, setSelectedOrgCard] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<"Semua" | "Perumahan" | "Komersial" | "Infrastruktur">("Semua");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState<number>(0);

  // Veo Video Showcase State Variables
  const [videoTabActive, setVideoTabActive] = useState<boolean>(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean>(false);
  const [videoMode, setVideoMode] = useState<"none" | "generating" | "completed" | "error">("none");
  const [videoProgressText, setVideoProgressText] = useState<string>("");
  const [videoProgressPercent, setVideoProgressPercent] = useState<number>(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoStyle, setVideoStyle] = useState<string>("Sunset Golden Hour");
  const [videoCustomPrompt, setVideoCustomPrompt] = useState<string>("");
  const [useAIVideo, setUseAIVideo] = useState<boolean>(false);
  const [videoMuted, setVideoMuted] = useState<boolean>(true);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [videoHasError, setVideoHasError] = useState<boolean>(false);
  const [videoErrorReason, setVideoErrorReason] = useState<string | null>(null);
  const [slideshowIndex, setSlideshowIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let interval: any;
    if (videoTabActive && (videoHasError || videoMode === "completed")) {
      interval = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % (selectedProject?.images?.length || 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [videoTabActive, videoHasError, videoMode, selectedProject]);

  useEffect(() => {
    setActiveImageIndex(0);
    // Reset video states when switching projects
    setVideoTabActive(false);
    setVideoMode("none");
    setVideoProgressText("");
    setVideoProgressPercent(0);
    setGeneratedVideoUrl(null);
    setVideoStyle("Sunset Golden Hour");
    setVideoCustomPrompt("");
    setVideoMuted(true);
    setVideoPlaying(true);
    setVideoHasError(false);
    setVideoErrorReason(null);
  }, [selectedProject]);

  useEffect(() => {
    // Fetch video configuration from Express server on mount
    fetch("/api/video-config")
      .then((res) => res.json())
      .then((data) => {
        setApiKeyConfigured(data.apiKeyConfigured);
        if (data.apiKeyConfigured) {
          setUseAIVideo(true);
        }
      })
      .catch((err) => console.error("Error fetching video config:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const handleGenerateVideo = async () => {
    if (!selectedProject) return;
    setVideoMode("generating");
    setVideoProgressPercent(0);

    const updates = lang === "en" ? [
      "Analyzing project architectural lines...",
      "Generating high-fidelity 3D volume grids...",
      "Synthesizing customized lighting & textures...",
      "Computing camera flythrough trajectory...",
      "Rendering final video keyframes via Google Veo...",
      "Optimizing media encoding parameters..."
    ] : [
      "Menganalisis garis arsitektur proyek...",
      "Membangun grid volume 3D presisi tinggi...",
      "Mensintesis pencahayaan & tekstur khusus...",
      "Menghitung lintasan drone kamera sinematik...",
      "Rendering keyframe video final via Google Veo...",
      "Mengoptimalkan kompresi & parameter tayangan..."
    ];

    let currentUpdateIndex = 0;
    setVideoProgressText(updates[0]);

    setVideoHasError(false);
    if (!useAIVideo || !apiKeyConfigured) {
      const interval = setInterval(() => {
        setVideoProgressPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setVideoMode("completed");
            setGeneratedVideoUrl(`/api/fallback-video/${selectedProject.id}`);
            return 100;
          }
          
          const nextPercent = prev + Math.floor(Math.random() * 15) + 10;
          const pct = nextPercent > 100 ? 100 : nextPercent;
          
          const updateIdx = Math.floor((pct / 100) * updates.length);
          if (updates[updateIdx]) {
            setVideoProgressText(updates[updateIdx]);
          }
          
          return pct;
        });
      }, 700);
    } else {
      try {
        const response = await fetch("/api/generate-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: selectedProject.id,
            style: videoStyle,
            customPrompt: videoCustomPrompt,
            useAI: true
          })
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error("Failed to trigger video generation");
        }

        if (data.mode === "simulation") {
          if (data.error) {
            setVideoErrorReason(data.error);
          }
          setGeneratedVideoUrl(data.fallbackUrl);
          setVideoMode("completed");
          return;
        }

        const operationName = data.operationName;
        let pollCount = 0;
        const maxPolls = 60;
        
        const pollInterval = setInterval(async () => {
          pollCount++;
          
          setVideoProgressPercent((prev) => {
            const next = prev + Math.floor(Math.random() * 3) + 1;
            return next > 95 ? 95 : next;
          });

          const currentTextIdx = Math.floor((pollCount % updates.length));
          setVideoProgressText(updates[currentTextIdx]);

          try {
            const statusRes = await fetch("/api/video-status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ operationName })
            });
            const statusData = await statusRes.json();
            
            if (statusData.done) {
              clearInterval(pollInterval);
              
              if (statusData.error) {
                console.error("Veo operation completed with error:", statusData.error);
                setVideoMode("error");
                return;
              }

              setVideoProgressPercent(100);
              setVideoProgressText(lang === "en" ? "Streaming high-definition video..." : "Membuka aliran video resolusi tinggi...");
              
              const downloadRes = await fetch("/api/video-download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ operationName })
              });

              if (!downloadRes.ok) {
                throw new Error("Failed to stream video file");
              }

              const blob = await downloadRes.blob();
              const blobUrl = URL.createObjectURL(blob);
              setGeneratedVideoUrl(blobUrl);
              setVideoMode("completed");
            } else if (pollCount >= maxPolls) {
              clearInterval(pollInterval);
              console.error("Video generation timed out");
              setVideoMode("error");
            }
          } catch (pollErr) {
            console.error("Error polling video status:", pollErr);
          }
        }, 5000);
      } catch (err) {
        console.error("Error triggering video generation:", err);
        setVideoMode("error");
      }
    }
  };

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [investorFaqOpen, setInvestorFaqOpen] = useState<number | null>(null);
  const [activeJobDetails, setActiveJobDetails] = useState<number | null>(null);
  const [testimonialSlide, setTestimonialSlide] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formTone, setFormTone] = useState<"standard" | "formal" | "urgent">("standard");
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Floating WA pop-up state
  const [showWaPopup, setShowWaPopup] = useState<boolean>(true);

  // Share Copied State
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPrintingBrochure, setIsPrintingBrochure] = useState<boolean>(false);

  // Cost Calculator State
  const [calcProjectType, setCalcProjectType] = useState<number>(0);
  const [calcAreaSize, setCalcAreaSize] = useState<number>(100);
  const [calcQuality, setCalcQuality] = useState<"std" | "med" | "lux">("med");

  // Investor Relations State
  const [investorAmount, setInvestorAmount] = useState<number>(1000000000); // Default 1 Billion IDR
  const [investorDuration, setInvestorDuration] = useState<number>(2); // Default 2 Years
  const [investorType, setInvestorType] = useState<"residential" | "commercial" | "infrastructure">("residential");
  const [investorName, setInvestorName] = useState<string>("");
  const [investorEmail, setInvestorEmail] = useState<string>("");
  const [investorPhone, setInvestorPhone] = useState<string>("");
  const [investorMessage, setInvestorMessage] = useState<string>("");
  const [investorSuccess, setInvestorSuccess] = useState<boolean>(false);

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

  // Handle window resize detection for responsive layout sizes (e.g. carousel testimonial)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer to highlight active navigation link
  useEffect(() => {
    const sections = ["beranda", "tentang-kami", "struktur", "layanan", "proyek", "investor", "visi-misi", "mengapa-kami", "karir", "kontak"];
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

  // Dynamic document title and meta tags for SEO optimization based on active section & language
  useEffect(() => {
    const seoData: Record<"id" | "en", Record<string, { title: string; desc: string }>> = {
      id: {
        beranda: {
          title: "PT. FORESYNDO GLOBAL INDONESIA | Beranda & Profil Perusahaan",
          desc: "PT. FORESYNDO GLOBAL INDONESIA (FGI) menghadirkan solusi pengembangan properti, konstruksi, perumahan, investasi, dan infrastruktur premium yang profesional."
        },
        "tentang-kami": {
          title: "Tentang Kami | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Profil PT. FORESYNDO GLOBAL INDONESIA (FGI), pengembang properti dan kontraktor premium terpercaya berkomitmen membangun masa depan berkelanjutan."
        },
        layanan: {
          title: "Layanan Kami | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Solusi lengkap konstruksi sipil, pematangan lahan, aspal hotmix, desain arsitektur, dan investasi properti berkualitas tinggi dari PT. FORESYNDO GLOBAL INDONESIA."
        },
        proyek: {
          title: "Proyek Portofolio | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Lihat portofolio proyek real estate, perumahan eksklusif, infrastruktur, dan renovasi komersial berstandar tinggi yang berhasil diselesaikan oleh FGI."
        },
        "visi-misi": {
          title: "Visi & Misi | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Komitmen FGI menjadi perusahaan pengembang dan kontraktor terdepan dengan mengutamakan kualitas, inovasi, rekayasa matang, dan kepuasan mitra."
        },
        "mengapa-kami": {
          title: "Mengapa Memilih FGI | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Keunggulan PT. FORESYNDO GLOBAL INDONESIA: legalitas resmi lengkap, rekayasa sipil berstandar tinggi, tim ahli berpengalaman, dan garansi kualitas kerja."
        },
        testimoni: {
          title: "Testimoni Klien | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Apa kata mitra dan pemilik properti tentang kami? Simak review kepuasan pengerjaan proyek dari PT. FORESYNDO GLOBAL INDONESIA."
        },
        karir: {
          title: "Karir & Lowongan Kerja | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Bergabunglah bersama tim profesional PT. FORESYNDO GLOBAL INDONESIA dan bangun karir impian Anda di industri konstruksi dan pengembangan properti."
        },
        kontak: {
          title: "Hubungi Kami | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Hubungi kantor pemasaran dan tim teknis PT. FORESYNDO GLOBAL INDONESIA (FGI) untuk konsultasi rencana proyek konstruksi atau pembelian unit properti."
        },
        struktur: {
          title: "Struktur Organisasi | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Tata kelola dan bagan hierarki manajemen PT. FORESYNDO GLOBAL INDONESIA (FGI) dari Komisaris, Direksi, hingga Divisi Teknis dan Legalitas."
        }
      },
      en: {
        beranda: {
          title: "PT. FORESYNDO GLOBAL INDONESIA | Home & Corporate Profile",
          desc: "PT. FORESYNDO GLOBAL INDONESIA (FGI) delivers premium, professional, and sustainable property development, construction, investment, and infrastructure solutions."
        },
        "tentang-kami": {
          title: "About Us | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Company profile of PT. FORESYNDO GLOBAL INDONESIA (FGI), a trusted premium real estate developer and contractor committed to building a sustainable future."
        },
        layanan: {
          title: "Our Services | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Comprehensive solutions in civil construction, land preparation, asphalt paving, architectural design, and high-yield property investment from FGI."
        },
        proyek: {
          title: "Project Portfolio | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Explore our portfolio of high-standard real estate, exclusive housing developments, public infrastructure, and commercial renovations completed by FGI."
        },
        "visi-misi": {
          title: "Vision & Mission | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "FGI's commitment to being a leading developer and contractor by prioritizing quality, innovation, meticulous engineering, and partner satisfaction."
        },
        "mengapa-kami": {
          title: "Why Choose FGI | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "The advantages of PT. FORESYNDO GLOBAL INDONESIA: full legal compliance, robust civil engineering standards, expert teams, and work quality guarantees."
        },
        testimoni: {
          title: "Client Testimonials | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Hear from our partners and property owners about their satisfaction with PT. FORESYNDO GLOBAL INDONESIA's high-quality project execution."
        },
        karir: {
          title: "Careers & Jobs | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Join the professional team of PT. FORESYNDO GLOBAL INDONESIA and build your dream career in the construction and real estate development industry."
        },
        kontak: {
          title: "Contact Us | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Get in touch with PT. FORESYNDO GLOBAL INDONESIA (FGI). Reach out for construction project consultations or premium property unit inquiries."
        },
        struktur: {
          title: "Organizational Structure | PT. FORESYNDO GLOBAL INDONESIA",
          desc: "Corporate governance and management hierarchy chart of PT. FORESYNDO GLOBAL INDONESIA (FGI) spanning the Board of Commissioners, Directors, and Technical teams."
        }
      }
    };

    const currentSeo = seoData[lang][activeSection] || seoData[lang]["beranda"];
    
    // Update Document Title
    document.title = currentSeo.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", currentSeo.desc);

    // Update Open Graph (OG) Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", currentSeo.title);

    // Update Open Graph (OG) Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", currentSeo.desc);

    // Update Twitter Title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta");
      twitterTitle.setAttribute("property", "twitter:title");
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute("content", currentSeo.title);

    // Update Twitter Description
    let twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement("meta");
      twitterDescription.setAttribute("property", "twitter:description");
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute("content", currentSeo.desc);

  }, [activeSection, lang]);

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

  // Generate a formatted professional message
  const formattedEnquiryMessage = React.useMemo(() => {
    const isId = lang === "id";
    const name = formName.trim() || (isId ? "[Nama Anda]" : "[Your Name]");
    const subject = formSubject.trim() || (isId ? "Informasi Proyek FGI" : "FGI Project Inquiry");
    const email = formEmail.trim() || "-";
    const phone = formPhone.trim() || (isId ? "[Nomor Kontak]" : "[Contact Number]");
    const message = formMessage.trim() || (isId ? "[Pesan Pertanyaan Anda]" : "[Your Inquiry Message]");

    if (formTone === "formal") {
      return isId
        ? `Yth. Manajemen PT. Foresyndo Global Indonesia (FGI)\n\nDengan hormat,\nSaya yang bertanda tangan di bawah ini:\n- Nama: ${name}\n- No. HP/WA: ${phone}\n- Email: ${email}\n\nIngin menyampaikan kueri dengan subjek: *${subject}*.\n\nDetail Pesan:\n"${message}"\n\nDemikian pesan ini saya sampaikan secara formal. Terima kasih atas tanggapan dan waktu Bapak/Ibu.\n\nHormat kami,\n${name}`
        : `To the Management of PT. Foresyndo Global Indonesia (FGI)\n\nDear Sir/Madam,\nI am writing to formally submit a professional inquiry:\n- Name: ${name}\n- WhatsApp: ${phone}\n- Email: ${email}\n\nSubject: *${subject}*\n\nInquiry Details:\n"${message}"\n\nThank you for your valuable time. I look forward to hearing from your representative.\n\nSincerely,\n${name}`;
    }

    if (formTone === "urgent") {
      return isId
        ? `[PERMINTAAN HUBUNGI CEPAT / URGENT]\n\nHalo PT. FGI, mohon hubungi saya sesegera mungkin mengenai proyek:\n- Nama: ${name}\n- No. HP/WA: ${phone}\n- Email: ${email}\n- Topik Utama: *${subject}*\n\nDetail Kebutuhan:\n"${message}"\n\nTerima kasih, mohon bantuan respons cepat tim admin FGI.`
        : `[URGENT CALLBACK REQUEST]\n\nHello PT. FGI, please contact me as soon as possible regarding this project:\n- Name: ${name}\n- WhatsApp: ${phone}\n- Email: ${email}\n- Main Topic: *${subject}*\n\nDetailed Request:\n"${message}"\n\nThank you, looking forward to a prompt response from the FGI team.`;
    }

    // Default Standard tone
    return isId
      ? `Halo FGI, saya ${name}.\n\n*Subjek:* ${subject}\n*Email:* ${email}\n*Telepon:* ${phone}\n\n*Pesan:* ${message}`
      : `Hello FGI, I am ${name}.\n\n*Subject:* ${subject}\n*Email:* ${email}\n*WhatsApp:* ${phone}\n\n*Message:* ${message}`;
  }, [formName, formSubject, formEmail, formPhone, formMessage, formTone, lang]);

  // Copy professional formatted message to clipboard
  const copyFormattedMessage = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formattedEnquiryMessage);
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = formattedEnquiryMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  // Convert contact form to WhatsApp message link
  const sendToWhatsApp = () => {
    const encodedText = encodeURIComponent(formattedEnquiryMessage);
    window.open(`https://wa.me/6287797330546?text=${encodedText}`, "_blank");
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
              { id: "struktur", label: TRANSLATIONS[lang].nav.struktur },
              { id: "layanan", label: TRANSLATIONS[lang].nav.layanan },
              { id: "proyek", label: TRANSLATIONS[lang].nav.proyek },
              { id: "investor", label: TRANSLATIONS[lang].nav.investor },
              { id: "visi-misi", label: TRANSLATIONS[lang].nav["visi-misi"] },
              { id: "mengapa-kami", label: TRANSLATIONS[lang].nav["mengapa-kami"] },
              { id: "karir", label: TRANSLATIONS[lang].nav.karir },
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
            <>
              {/* Semi-transparent Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden"
                id="mobile-menu-backdrop"
              />

              {/* Drawer Sliding Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className={`fixed top-0 right-0 bottom-0 w-[300px] sm:w-[350px] z-50 h-screen shadow-2xl flex flex-col justify-between p-6 lg:hidden ${
                  darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"
                }`}
                id="mobile-menu-drawer"
              >
                <div className="flex flex-col h-full">
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200/20 dark:border-slate-800/20">
                    <FGILogo className="scale-90 origin-left" darkMode={darkMode} />
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        darkMode
                          ? "text-slate-400 hover:text-amber-400 hover:bg-slate-900"
                          : "text-slate-500 hover:text-amber-500 hover:bg-slate-100"
                      }`}
                      aria-label="Close Mobile Menu"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Drawer Navigation Links */}
                  <div className="flex-1 overflow-y-auto py-6 space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {[
                      { id: "beranda", label: TRANSLATIONS[lang].nav.beranda },
                      { id: "tentang-kami", label: TRANSLATIONS[lang].nav["tentang-kami"] },
                      { id: "struktur", label: TRANSLATIONS[lang].nav.struktur },
                      { id: "layanan", label: TRANSLATIONS[lang].nav.layanan },
                      { id: "proyek", label: TRANSLATIONS[lang].nav.proyek },
                      { id: "investor", label: TRANSLATIONS[lang].nav.investor },
                      { id: "visi-misi", label: TRANSLATIONS[lang].nav["visi-misi"] },
                      { id: "mengapa-kami", label: TRANSLATIONS[lang].nav["mengapa-kami"] },
                      { id: "karir", label: TRANSLATIONS[lang].nav.karir },
                      { id: "kontak", label: TRANSLATIONS[lang].nav.kontak }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold transition-all cursor-pointer ${
                          activeSection === item.id
                            ? "text-amber-500 bg-amber-500/10 border-l-4 border-amber-500 rounded-l-none"
                            : darkMode
                            ? "text-slate-300 hover:text-white hover:bg-slate-900"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Drawer Footer Controls */}
                  <div className="pt-6 border-t border-slate-200/20 dark:border-slate-800/20 space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {lang === "id" ? "Pengaturan" : "Settings"}
                      </span>
                      <div className="flex items-center gap-3">
                        {/* Drawer Language Switcher */}
                        <div className="flex items-center bg-slate-850 p-0.5 rounded border border-slate-800">
                          <button
                            onClick={() => setLang("id")}
                            className={`px-1.5 py-0.5 text-[8px] font-black uppercase transition-all rounded-[3px] ${
                              lang === "id"
                                ? "bg-amber-500 text-slate-950 shadow-sm"
                                : "text-slate-400 hover:text-slate-200 cursor-pointer"
                            }`}
                          >
                            ID
                          </button>
                          <button
                            onClick={() => setLang("en")}
                            className={`px-1.5 py-0.5 text-[8px] font-black uppercase transition-all rounded-[3px] ${
                              lang === "en"
                                ? "bg-amber-500 text-slate-950 shadow-sm"
                                : "text-slate-400 hover:text-slate-200 cursor-pointer"
                            }`}
                          >
                            EN
                          </button>
                        </div>

                        {/* Drawer Theme Toggle */}
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            darkMode ? "text-slate-400 hover:text-amber-400" : "text-slate-500 hover:text-amber-500"
                          }`}
                        >
                          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Premium CTA Button */}
                    <button
                      onClick={() => scrollTo("kontak")}
                      className="w-full text-center bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-black py-3.5 rounded-lg block shadow-lg cursor-pointer transform hover:scale-[1.01] active:scale-95 transition-all text-sm uppercase tracking-wider"
                    >
                      {TRANSLATIONS[lang].contact.btnContactWa}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>


      {/* --- HERO SECTION --- */}
      <section id="beranda" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden z-10">
        {/* Background Overlay Image (Auto-sliding Carousel) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/85 mix-blend-multiply z-10" />
          <AnimatePresence mode="wait">
            <motion.img
              key={heroSlideIndex}
              src={HERO_SLIDES[heroSlideIndex].image}
              alt="PT Foresyndo Global Indonesia Project Showcase"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
              loading="eager"
            />
          </AnimatePresence>

          {/* Interactive Slide Indicators & Showcase Badge */}
          <div className="absolute bottom-8 right-4 sm:right-12 z-20 flex flex-col items-end space-y-3 pointer-events-auto">
            {/* Project Title Badge */}
            <motion.div 
              key={`badge-${heroSlideIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-950/80 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-xl text-right max-w-xs shadow-2xl"
            >
              <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                {lang === "en" ? HERO_SLIDES[heroSlideIndex].categoryEn : HERO_SLIDES[heroSlideIndex].categoryId}
              </div>
              <div className="text-[12px] font-bold text-white mt-0.5 truncate leading-tight">
                {lang === "en" ? HERO_SLIDES[heroSlideIndex].titleEn : HERO_SLIDES[heroSlideIndex].titleId}
              </div>
              <div className="text-[10px] text-slate-400 italic mt-0.5">
                {lang === "en" ? HERO_SLIDES[heroSlideIndex].locationEn : HERO_SLIDES[heroSlideIndex].locationId}
              </div>
            </motion.div>

            {/* Pagination dots */}
            <div className="flex space-x-2 bg-slate-950/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-800/40">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    heroSlideIndex === idx ? "w-6 bg-amber-500" : "w-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
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


      {/* --- STRUKTUR ORGANISASI SECTION --- */}
      <section id="struktur" className={`py-24 relative overflow-hidden z-10 border-b ${darkMode ? "bg-[#0B0F19] border-slate-900" : "bg-slate-50 border-slate-100"}`}>
        {/* Subtle decorative background gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="flex justify-between items-center max-w-[240px] mx-auto mb-2">
              <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                {TRANSLATIONS[lang].org.sub}
              </h3>
              <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {TRANSLATIONS[lang].org.title}
            </h2>
            
            <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              {TRANSLATIONS[lang].org.desc}
            </p>

            {/* View Selector Buttons */}
            <div className="pt-6 flex justify-center">
              <div className={`inline-flex p-1 rounded-lg border ${
                darkMode ? "bg-slate-950/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <button
                  onClick={() => {
                    setOrgView("diagram");
                    setSelectedOrgCard(null);
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                    orgView === "diagram"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : darkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-900/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {TRANSLATIONS[lang].org.viewDiagram}
                </button>
                <button
                  onClick={() => {
                    setOrgView("grid");
                    setSelectedOrgCard(null);
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                    orgView === "grid"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : darkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-900/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {TRANSLATIONS[lang].org.viewGrid}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {orgView === "diagram" ? (
              <motion.div
                key="diagram"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12 max-w-5xl mx-auto"
                id="org-diagram-view"
              >
                {/* STAGE 1: RUPS */}
                <div className="flex flex-col items-center relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedOrgCard(selectedOrgCard === "rups" ? null : "rups")}
                    className={`p-6 rounded-lg border text-center max-w-sm w-full cursor-pointer transition-all ${
                      selectedOrgCard === "rups"
                        ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                        : darkMode
                        ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="mx-auto w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                      <Users size={20} />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">
                      {TRANSLATIONS[lang].org.roles.rups}
                    </h4>
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black mt-1">
                      {lang === "id" ? "Wewenang Tertinggi" : "Supreme Authority"}
                    </p>
                    
                    {selectedOrgCard === "rups" && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`text-xs mt-3 leading-relaxed border-t pt-3 ${
                          darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                        }`}
                      >
                        {TRANSLATIONS[lang].org.roles.rupsDesc}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  {/* Dotted link down */}
                  <div className="w-[2px] h-12 border-l-2 border-dashed border-slate-300 dark:border-slate-800" />
                </div>

                {/* STAGE 2: BOARD OF COMMISSIONERS */}
                <div className="flex flex-col items-center relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedOrgCard(selectedOrgCard === "komisaris" ? null : "komisaris")}
                    className={`p-6 rounded-lg border text-center max-w-sm w-full cursor-pointer transition-all ${
                      selectedOrgCard === "komisaris"
                        ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                        : darkMode
                        ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="mx-auto w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
                      <Award size={20} />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">
                      {TRANSLATIONS[lang].org.roles.komisaris}
                    </h4>
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black mt-1">
                      {lang === "id" ? "Pengawasan & Governance" : "Governance & Advisory"}
                    </p>

                    {selectedOrgCard === "komisaris" && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`text-xs mt-3 leading-relaxed border-t pt-3 ${
                          darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                        }`}
                      >
                        {TRANSLATIONS[lang].org.roles.komisarisDesc}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Dotted link down */}
                  <div className="w-[2px] h-12 border-l-2 border-dashed border-slate-300 dark:border-slate-800" />
                </div>

                {/* STAGE 3: EXECUTIVE LEADERSHIP (CEO) */}
                <div className="flex flex-col items-center relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedOrgCard(selectedOrgCard === "ceo" ? null : "ceo")}
                    className={`p-6 rounded-lg border text-center max-w-md w-full cursor-pointer transition-all relative ${
                      selectedOrgCard === "ceo"
                        ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                        : darkMode
                        ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    {/* Glowing Accent Border for CEO */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-lg" />
                    
                    <div className="mx-auto w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                      <Briefcase size={20} />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">
                      {TRANSLATIONS[lang].org.roles.ceo}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">
                      Hasanudin
                    </p>
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black mt-1">
                      {lang === "id" ? "Pimpinan Eksekutif Tertinggi" : "Chief Executive Leadership"}
                    </p>

                    {selectedOrgCard === "ceo" && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`text-xs mt-3 leading-relaxed border-t pt-3 ${
                          darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                        }`}
                      >
                        {TRANSLATIONS[lang].org.roles.ceoDesc}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Dotted link down to split */}
                  <div className="w-[2px] h-12 border-l-2 border-dashed border-slate-300 dark:border-slate-800 mx-auto" />
                </div>

                {/* STAGE 4: CFO & COO (DIRECTORS SPLIT) */}
                <div className="relative">
                  {/* Horizontal Connector Line */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[2px] border-t-2 border-dashed border-slate-300 dark:border-slate-800 hidden md:block" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:pt-6 relative">
                    {/* Vertical link helper lines for desktop */}
                    <div className="absolute top-0 left-1/4 w-[2px] h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-800 hidden md:block" />
                    <div className="absolute top-0 right-1/4 w-[2px] h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-800 hidden md:block" />

                    {/* CFO CARD */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedOrgCard(selectedOrgCard === "cfo" ? null : "cfo")}
                        className={`p-6 rounded-lg border text-center w-full max-w-sm cursor-pointer transition-all ${
                          selectedOrgCard === "cfo"
                            ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                            : darkMode
                            ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                            : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                          <Coins size={20} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-wider">
                          {TRANSLATIONS[lang].org.roles.cfo}
                        </h4>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">
                          Rina Amelia, S.E., M.Ak.
                        </p>
                        <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black mt-1">
                          {lang === "id" ? "Manajemen Keuangan & Legal" : "Finance & Compliance Director"}
                        </p>

                        {selectedOrgCard === "cfo" && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className={`text-xs mt-3 leading-relaxed border-t pt-3 ${
                              darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                            }`}
                          >
                            {TRANSLATIONS[lang].org.roles.cfoDesc}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    {/* COO CARD */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedOrgCard(selectedOrgCard === "coo" ? null : "coo")}
                        className={`p-6 rounded-lg border text-center w-full max-w-sm cursor-pointer transition-all ${
                          selectedOrgCard === "coo"
                            ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                            : darkMode
                            ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                            : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        <div className="mx-auto w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                          <Hammer size={20} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-wider">
                          {TRANSLATIONS[lang].org.roles.coo}
                        </h4>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">
                          Hendra Kurniawan, S.T., M.Sc.
                        </p>
                        <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black mt-1">
                          {lang === "id" ? "Manajemen Operasi & Konstruksi" : "Operations & Construction Director"}
                        </p>

                        {selectedOrgCard === "coo" && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className={`text-xs mt-3 leading-relaxed border-t pt-3 ${
                              darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                            }`}
                          >
                            {TRANSLATIONS[lang].org.roles.cooDesc}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Dotted split down to Division level */}
                  <div className="w-[2px] h-12 border-l-2 border-dashed border-slate-300 dark:border-slate-800 mx-auto" />
                </div>

                {/* STAGE 5: DIVISIONS */}
                <div className="relative">
                  {/* Horizontal Connection Line */}
                  <div className="absolute top-0 left-[12.5%] right-[12.5%] h-[2px] border-t-2 border-dashed border-slate-300 dark:border-slate-800 hidden lg:block" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:pt-6 relative">
                    {/* Vertical connectors for large screens */}
                    <div className="absolute top-0 left-[12.5%] w-[2px] h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-800 hidden lg:block" />
                    <div className="absolute top-0 left-[37.5%] w-[2px] h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-800 hidden lg:block" />
                    <div className="absolute top-0 left-[62.5%] w-[2px] h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-800 hidden lg:block" />
                    <div className="absolute top-0 left-[87.5%] w-[2px] h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-800 hidden lg:block" />

                    {/* Architecture Division */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedOrgCard(selectedOrgCard === "architecture" ? null : "architecture")}
                      className={`p-5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedOrgCard === "architecture"
                          ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                          : darkMode
                          ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                          <Ruler size={16} />
                        </div>
                        <h5 className="text-xs font-black uppercase tracking-wider">
                          {TRANSLATIONS[lang].org.roles.architecture}
                        </h5>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
                          {lang === "id" ? "Perencanaan Kreatif" : "Creative Planning"}
                        </p>
                      </div>
                      
                      {selectedOrgCard === "architecture" ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className={`text-[11px] mt-3 leading-relaxed border-t pt-3 ${
                            darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                          }`}
                        >
                          {TRANSLATIONS[lang].org.roles.architectureDesc}
                        </motion.p>
                      ) : (
                        <p className="text-[10px] text-amber-500 mt-3 font-semibold uppercase tracking-widest text-right flex items-center justify-end gap-1">
                          {lang === "id" ? "Info Detail" : "View Info"} <ArrowRight size={10} />
                        </p>
                      )}
                    </motion.div>

                    {/* Civil Construction Division */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedOrgCard(selectedOrgCard === "civil" ? null : "civil")}
                      className={`p-5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedOrgCard === "civil"
                          ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                          : darkMode
                          ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="w-8 h-8 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                          <Building size={16} />
                        </div>
                        <h5 className="text-xs font-black uppercase tracking-wider">
                          {TRANSLATIONS[lang].org.roles.civil}
                        </h5>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
                          {lang === "id" ? "Rekayasa Struktur" : "Structural Engineering"}
                        </p>
                      </div>

                      {selectedOrgCard === "civil" ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className={`text-[11px] mt-3 leading-relaxed border-t pt-3 ${
                            darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                          }`}
                        >
                          {TRANSLATIONS[lang].org.roles.civilDesc}
                        </motion.p>
                      ) : (
                        <p className="text-[10px] text-amber-500 mt-3 font-semibold uppercase tracking-widest text-right flex items-center justify-end gap-1">
                          {lang === "id" ? "Info Detail" : "View Info"} <ArrowRight size={10} />
                        </p>
                      )}
                    </motion.div>

                    {/* Legal & Compliance Division */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedOrgCard(selectedOrgCard === "legal" ? null : "legal")}
                      className={`p-5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedOrgCard === "legal"
                          ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                          : darkMode
                          ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                          <ShieldCheck size={16} />
                        </div>
                        <h5 className="text-xs font-black uppercase tracking-wider">
                          {TRANSLATIONS[lang].org.roles.legal}
                        </h5>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
                          {lang === "id" ? "Keamanan Legalitas" : "Legal & Compliance"}
                        </p>
                      </div>

                      {selectedOrgCard === "legal" ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className={`text-[11px] mt-3 leading-relaxed border-t pt-3 ${
                            darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                          }`}
                        >
                          {TRANSLATIONS[lang].org.roles.legalDesc}
                        </motion.p>
                      ) : (
                        <p className="text-[10px] text-amber-500 mt-3 font-semibold uppercase tracking-widest text-right flex items-center justify-end gap-1">
                          {lang === "id" ? "Info Detail" : "View Info"} <ArrowRight size={10} />
                        </p>
                      )}
                    </motion.div>

                    {/* PMO Division */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedOrgCard(selectedOrgCard === "pmo" ? null : "pmo")}
                      className={`p-5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedOrgCard === "pmo"
                          ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                          : darkMode
                          ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="w-8 h-8 rounded bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
                          <Clock size={16} />
                        </div>
                        <h5 className="text-xs font-black uppercase tracking-wider">
                          {TRANSLATIONS[lang].org.roles.pmo}
                        </h5>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
                          {lang === "id" ? "Timeline & Logistik" : "Timelines & Logistics"}
                        </p>
                      </div>

                      {selectedOrgCard === "pmo" ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className={`text-[11px] mt-3 leading-relaxed border-t pt-3 ${
                            darkMode ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"
                          }`}
                        >
                          {TRANSLATIONS[lang].org.roles.pmoDesc}
                        </motion.p>
                      ) : (
                        <p className="text-[10px] text-amber-500 mt-3 font-semibold uppercase tracking-widest text-right flex items-center justify-end gap-1">
                          {lang === "id" ? "Info Detail" : "View Info"} <ArrowRight size={10} />
                        </p>
                      )}
                    </motion.div>

                  </div>
                </div>

                {/* Helpful Instruction Tip */}
                <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-500 pt-6">
                  {lang === "id" ? "💡 Klik pada masing-masing jabatan untuk membaca detail rincian tugas & wewenang" : "💡 Click on each position card to read the detail scope of roles & duties"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                id="org-grid-view"
              >
                {[
                  {
                    key: "rups",
                    title: TRANSLATIONS[lang].org.roles.rups,
                    subtitle: lang === "id" ? "Wewenang Strategis Tertinggi" : "Supreme Strategic Authority",
                    desc: TRANSLATIONS[lang].org.roles.rupsDesc,
                    icon: <Users size={20} />,
                    color: "bg-blue-500/10 text-blue-500 border-blue-500/10",
                    staff: lang === "id" ? "Pemegang Saham Utama FGI" : "Key Shareholders & Founders"
                  },
                  {
                    key: "komisaris",
                    title: TRANSLATIONS[lang].org.roles.komisaris,
                    subtitle: lang === "id" ? "Dewan Pengawas Utama" : "Principal Board of Oversight",
                    desc: TRANSLATIONS[lang].org.roles.komisarisDesc,
                    icon: <Award size={20} />,
                    color: "bg-purple-500/10 text-purple-500 border-purple-500/10",
                    staff: "Drs. M. Taufik, M.B.A."
                  },
                  {
                    key: "ceo",
                    title: TRANSLATIONS[lang].org.roles.ceo,
                    subtitle: lang === "id" ? "Manajemen Direksi Utama" : "President Director & CEO",
                    desc: TRANSLATIONS[lang].org.roles.ceoDesc,
                    icon: <Briefcase size={20} />,
                    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
                    staff: "Hasanudin"
                  },
                  {
                    key: "cfo",
                    title: TRANSLATIONS[lang].org.roles.cfo,
                    subtitle: lang === "id" ? "Direktur Keuangan & Legalitas" : "Finance & Admin Director",
                    desc: TRANSLATIONS[lang].org.roles.cfoDesc,
                    icon: <Coins size={20} />,
                    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/10",
                    staff: "Rina Amelia, S.E., M.Ak."
                  },
                  {
                    key: "coo",
                    title: TRANSLATIONS[lang].org.roles.coo,
                    subtitle: lang === "id" ? "Direktur Operasional & Teknik" : "Operations & Technical Director",
                    desc: TRANSLATIONS[lang].org.roles.cooDesc,
                    icon: <Hammer size={20} />,
                    color: "bg-orange-500/10 text-orange-500 border-orange-500/10",
                    staff: "Hendra Kurniawan, S.T., M.Sc."
                  },
                  {
                    key: "architecture",
                    title: TRANSLATIONS[lang].org.roles.architecture,
                    subtitle: lang === "id" ? "Kepala Tim Arsitek & Desain" : "Chief of Architecture",
                    desc: TRANSLATIONS[lang].org.roles.architectureDesc,
                    icon: <Ruler size={20} />,
                    color: "bg-sky-500/10 text-sky-500 border-sky-500/10",
                    staff: "Aditya Pratama, S.Ars., IAI"
                  },
                  {
                    key: "civil",
                    title: TRANSLATIONS[lang].org.roles.civil,
                    subtitle: lang === "id" ? "Kepala Tim Insinyur Sipil" : "Lead Civil Engineer",
                    desc: TRANSLATIONS[lang].org.roles.civilDesc,
                    icon: <Building size={20} />,
                    color: "bg-rose-500/10 text-rose-500 border-rose-500/10",
                    staff: "Ir. Yusuf Nugroho, S.T., IPM"
                  },
                  {
                    key: "legal",
                    title: TRANSLATIONS[lang].org.roles.legal,
                    subtitle: lang === "id" ? "Kepala Bagian Hukum & Izin" : "Chief Legal Officer",
                    desc: TRANSLATIONS[lang].org.roles.legalDesc,
                    icon: <ShieldCheck size={20} />,
                    color: "bg-teal-500/10 text-teal-500 border-teal-500/10",
                    staff: "Farhan Syahputra, S.H., M.H."
                  },
                  {
                    key: "pmo",
                    title: TRANSLATIONS[lang].org.roles.pmo,
                    subtitle: lang === "id" ? "Manajer Proyek & Logistik" : "Project Manager & Logistics Head",
                    desc: TRANSLATIONS[lang].org.roles.pmoDesc,
                    icon: <Clock size={20} />,
                    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/10",
                    staff: "Bambang Setiawan, S.T."
                  }
                ].map((member) => (
                  <motion.div
                    key={member.key}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`p-6 rounded-lg border flex flex-col justify-between ${
                      darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${member.color}`}>
                          {member.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-wider">{member.title}</h4>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">{member.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                        {member.desc}
                      </p>
                    </div>

                    <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                      darkMode ? "border-slate-800" : "border-slate-100"
                    }`}>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                        {lang === "id" ? "Penanggung Jawab / Tim" : "Responsible Personnel"}
                      </span>
                      <span className="font-bold text-amber-500 text-right">
                        {member.staff}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

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


      {/* --- HUBUNGAN INVESTOR & KEMITRAAN PORTAL --- */}
      <section id="investor" className={`py-24 relative z-10 border-b ${darkMode ? "bg-[#0B0F19] border-slate-900" : "bg-gradient-to-b from-white via-amber-50/10 to-white border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6" id="investor-header">
            <div className="space-y-4 max-w-3xl w-full">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">{INVESTOR_TRANSLATIONS[lang].sub}</h3>
                <div className="h-[1px] flex-grow mx-4 bg-slate-200 dark:bg-slate-800 mb-2"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {INVESTOR_TRANSLATIONS[lang].title}
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {INVESTOR_TRANSLATIONS[lang].desc}
              </p>
            </div>
          </div>

          {/* Grid Layout: Calculator & Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* LEFT COLUMN: ROI Calculator (lg:col-span-7) */}
            <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border ${
              darkMode ? "bg-[#131926]/80 border-slate-800" : "bg-white border-slate-200/80 shadow-md shadow-slate-100"
            }`} id="roi-calculator-box">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-amber-500" size={24} />
                <div>
                  <h3 className="text-lg font-bold">{INVESTOR_TRANSLATIONS[lang].calculator.title}</h3>
                  <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {INVESTOR_TRANSLATIONS[lang].calculator.desc}
                  </p>
                </div>
              </div>

              {/* Calculator Form Fields */}
              <div className="space-y-6">
                
                {/* 1. Investment Amount */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                      {INVESTOR_TRANSLATIONS[lang].calculator.amountLabel}
                    </label>
                    <span className="text-sm font-black font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                      {new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0
                      }).format(investorAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={250000000} // Minimum IDR 250 million
                    max={10000000000} // Maximum IDR 10 billion
                    step={250000000} // Step in IDR 250 million increments
                    value={investorAmount}
                    onChange={(e) => setInvestorAmount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-800 appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Rp 250 Jt</span>
                    <span>Rp 5 Miliar</span>
                    <span>Rp 10 Miliar</span>
                  </div>
                </div>

                {/* 2. Sifat Proyek / Sector */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                    {INVESTOR_TRANSLATIONS[lang].calculator.typeLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(["residential", "commercial", "infrastructure"] as const).map((type) => {
                      const isActive = investorType === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setInvestorType(type)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold"
                              : darkMode
                              ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300"
                              : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <div className="text-xs uppercase tracking-wider font-extrabold mb-1">{type}</div>
                          <div className="text-[10px] opacity-80 leading-snug">
                            {type === "residential" ? "Hunian (14% p.a.)" : type === "commercial" ? "Ruko (17% p.a.)" : "Infrastruktur (12% p.a.)"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Duration Selection */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                    {INVESTOR_TRANSLATIONS[lang].calculator.durationLabel}
                  </label>
                  <div className="flex gap-2">
                    {([1, 2, 3, 4, 5] as const).map((year) => {
                      const isActive = investorDuration === year;
                      return (
                        <button
                          key={year}
                          onClick={() => setInvestorDuration(year)}
                          className={`flex-1 py-2.5 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center ${
                            isActive
                              ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                              : darkMode
                              ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300"
                              : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          {year} {INVESTOR_TRANSLATIONS[lang].calculator.years}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Dynamic Interactive D3.js Compound Growth Forecast Chart */}
              <div className="mt-8 pt-6 border-t border-slate-200/10">
                <InvestorD3Chart
                  lang={lang}
                  darkMode={darkMode}
                  initialAmount={investorAmount}
                  onUpdateDuration={setInvestorDuration}
                  investorDuration={investorDuration}
                />
              </div>

            </div>

            {/* RIGHT COLUMN: Live Projections & Materials (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="projection-results-box">
              
              {/* Projections Card */}
              <div className={`p-6 sm:p-8 rounded-2xl border flex-1 flex flex-col justify-between ${
                darkMode ? "bg-[#131926]/80 border-slate-800" : "bg-white border-slate-200/80 shadow-md shadow-slate-100"
              }`}>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-amber-500 mb-6">
                    {INVESTOR_TRANSLATIONS[lang].calculator.resultsTitle}
                  </h4>
                  
                  {(() => {
                    const yieldPct = investorType === "residential" ? 14 : investorType === "commercial" ? 17 : 12;
                    const netProfit = investorAmount * (yieldPct / 100) * investorDuration;
                    const totalReturn = investorAmount + netProfit;
                    const quarterly = netProfit / (investorDuration * 4);
                    
                    return (
                      <div className="space-y-5">
                        {/* 1. Yield Rate */}
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-200/10">
                          <div className="flex items-center gap-2">
                            <Percent size={14} className="text-amber-500" />
                            <span className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                              {INVESTOR_TRANSLATIONS[lang].calculator.yieldRate}
                            </span>
                          </div>
                          <span className="text-sm font-black text-amber-400 font-mono">
                            {yieldPct}% p.a.
                          </span>
                        </div>

                        {/* 2. Projected Net Profit */}
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-200/10">
                          <div className="flex items-center gap-2">
                            <Coins size={14} className="text-amber-500" />
                            <span className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                              {INVESTOR_TRANSLATIONS[lang].calculator.netProfit}
                            </span>
                          </div>
                          <span className="text-sm font-black text-emerald-400 font-mono">
                            {new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0
                            }).format(netProfit)}
                          </span>
                        </div>

                        {/* 3. Est. Quarterly Payout */}
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-200/10">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-amber-500" />
                            <span className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                              {INVESTOR_TRANSLATIONS[lang].calculator.quarterlyPayout}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-300 font-mono">
                            {new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0
                            }).format(quarterly)}
                          </span>
                        </div>

                        {/* 4. Total Payout Header */}
                        <div className="flex justify-between items-center pt-4">
                          <div className="flex items-center gap-2">
                            <Wallet size={16} className="text-amber-500" />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                              {INVESTOR_TRANSLATIONS[lang].calculator.totalPayout}
                            </span>
                          </div>
                          <span className="text-xl font-black text-amber-500 font-mono">
                            {new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0
                            }).format(totalReturn)}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      const amountFormatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(investorAmount);
                      const sectorLabel = investorType === "residential" ? "Hunian & Hospitality" : investorType === "commercial" ? "Ruko & Komersial" : "Infrastruktur & Site Dev";
                      const msg = `Halo Tim Keuangan PT. FGI,\n\nSaya ingin berkonsultasi mengenai peluang investasi Joint Venture dengan estimasi rencana penempatan modal:\n- Sektor Proyek: *${sectorLabel}*\n- Nilai Modal: *${amountFormatted}*\n- Durasi: *${investorDuration} Tahun*\n\nMohon dihubungi kembali mengenai ketersediaan slot proyek kemitraan ini. Terima kasih.`;
                      window.open(`https://wa.me/6287797330546?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {INVESTOR_TRANSLATIONS[lang].calculator.cta} <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {/* Downloadable Materials Box */}
              <div className={`p-6 sm:p-8 rounded-2xl border ${
                darkMode ? "bg-[#131926]/80 border-slate-800" : "bg-white border-slate-200/80 shadow-md shadow-slate-100"
              }`} id="downloadable-investor-docs">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-500 mb-4">
                  {INVESTOR_TRANSLATIONS[lang].downloads.title}
                </h4>
                <p className={`text-xs mb-6 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {INVESTOR_TRANSLATIONS[lang].downloads.desc}
                </p>
                <div className="space-y-3">
                  {[
                    { title: INVESTOR_TRANSLATIONS[lang].downloads.doc1, size: "3.8 MB" },
                    { title: INVESTOR_TRANSLATIONS[lang].downloads.doc2, size: "1.2 MB" }
                  ].map((doc, docIdx) => (
                    <button
                      key={docIdx}
                      onClick={() => {
                        if (docIdx === 0) {
                          downloadCompanyProfilePDF(lang);
                        } else {
                          downloadJVAgreementDraftPDF(lang);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all hover:bg-amber-500/5 cursor-pointer ${
                        darkMode ? "bg-[#0B0F19] border-slate-850 hover:border-amber-500/30 text-slate-300" : "bg-slate-50 border-slate-100 hover:border-amber-500/30 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Download size={16} className="text-amber-500" />
                        <span className="text-xs font-bold truncate max-w-[200px] sm:max-w-[300px]">{doc.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-extrabold">{doc.size}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ACTIVE OPPORTUNITIES ROW */}
          <div className="mb-16" id="partnership-opportunities">
            <div className="space-y-3 mb-10 max-w-2xl">
              <h3 className="text-xl font-bold tracking-tight">{INVESTOR_TRANSLATIONS[lang].opportunities.title}</h3>
              <p className={`text-xs sm:text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {INVESTOR_TRANSLATIONS[lang].opportunities.desc}
              </p>
            </div>

            {/* Opportunities List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: lang === "en" ? "Grand Foresyndo Phase 3 - Premium Housing" : "Grand Foresyndo Phase 3 - Hunian Premium",
                  location: "Grogol, Kediri, Jawa Timur",
                  progress: 82,
                  target: "Rp 5.000.000.000",
                  minTicket: "Rp 250.000.000",
                  projectedRoi: "14% p.a.",
                  sector: "residential"
                },
                {
                  id: 2,
                  title: lang === "en" ? "FGI Business Hub - Commercial Block" : "FGI Hub Business Park - Kompleks Ruko",
                  location: "Jatitujuh, Majalengka, Jawa Barat",
                  progress: 45,
                  target: "Rp 12.000.000.000",
                  minTicket: "Rp 500.000.000",
                  projectedRoi: "17% p.a.",
                  sector: "commercial"
                },
                {
                  id: 3,
                  title: lang === "en" ? "Smart Industrial Logistics Warehouse" : "Pusat Pergudangan Logistik Smart",
                  location: "Kertajati, Majalengka, Jawa Barat",
                  progress: 15,
                  target: "Rp 25.000.000.000",
                  minTicket: "Rp 1.000.000.000",
                  projectedRoi: "12% p.a.",
                  sector: "infrastructure"
                }
              ].map((opp) => (
                <div
                  key={opp.id}
                  className={`rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                    darkMode
                      ? "bg-[#131926]/40 border-slate-800 hover:border-amber-500/20"
                      : "bg-white border-slate-200 hover:shadow-lg shadow-slate-100"
                  }`}
                >
                  {/* Top Header & Tag */}
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                        {opp.sector.toUpperCase()}
                      </span>
                      <span className={`text-[10px] font-extrabold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                        ● {opp.id === 3 ? INVESTOR_TRANSLATIONS[lang].opportunities.statusProgress : INVESTOR_TRANSLATIONS[lang].opportunities.statusOpen}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold tracking-tight line-clamp-1">{opp.title}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin size={10} className="text-amber-500" />
                        {opp.location}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-400">{INVESTOR_TRANSLATIONS[lang].opportunities.funded}</span>
                        <span className="text-amber-500 font-mono">{opp.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${opp.progress}%` }}></div>
                      </div>
                    </div>

                    {/* Financial stats row */}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-500/10">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block tracking-wider">
                          {INVESTOR_TRANSLATIONS[lang].opportunities.minTicket}
                        </span>
                        <span className="text-xs font-bold font-mono text-slate-300 dark:text-slate-200">
                          {opp.minTicket}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block tracking-wider">
                          {INVESTOR_TRANSLATIONS[lang].opportunities.estimatedRoi}
                        </span>
                        <span className="text-xs font-black font-mono text-emerald-400">
                          {opp.projectedRoi}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className={`px-5 py-4 flex gap-2 border-t ${darkMode ? "border-slate-850 bg-[#0B0F19]/40" : "border-slate-100 bg-slate-50/50"}`}>
                    <button
                      onClick={() => downloadOpportunityProspectusPDF(opp, lang)}
                      className={`flex-1 py-2 rounded text-[10px] font-bold uppercase tracking-wider text-center border cursor-pointer transition-colors ${
                        darkMode ? "border-slate-800 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      PDF Draft
                    </button>
                    <button
                      onClick={() => {
                        // Scroll to inquiry form and preset fields
                        setInvestorType(opp.sector as any);
                        const inquiryForm = document.getElementById("investor-inquiry-form-box");
                        if (inquiryForm) {
                          inquiryForm.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                      className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest rounded text-center transition-colors cursor-pointer"
                    >
                      {INVESTOR_TRANSLATIONS[lang].opportunities.ctaInquire}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LOWER SECTION: Interactive Inquiry Form & FAQ Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inquiry Form (lg:col-span-7) */}
            <div id="investor-inquiry-form-box" className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border ${
              darkMode ? "bg-[#131926]/80 border-slate-800" : "bg-white border-slate-200/80 shadow-md shadow-slate-100"
            }`}>
              <h3 className="text-xl font-bold tracking-tight mb-2">
                {INVESTOR_TRANSLATIONS[lang].form.title}
              </h3>
              <p className={`text-xs mb-6 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {INVESTOR_TRANSLATIONS[lang].form.desc}
              </p>

              {investorSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-md">
                    <Check size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-400">{INVESTOR_TRANSLATIONS[lang].form.successTitle}</h4>
                  <p className={`text-xs leading-relaxed max-w-md mx-auto ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {INVESTOR_TRANSLATIONS[lang].form.successDesc}
                  </p>
                  <button
                    onClick={() => {
                      const formattedCapital = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(investorAmount);
                      const sectorLabel = investorType === "residential" ? "Hunian & Hospitality" : investorType === "commercial" ? "Ruko & Komersial" : "Infrastruktur & Site Dev";
                      const msg = `[PERNYATAAN MINAT INVESTOR FORMAL]\n\nHalo PT. Foresyndo Global Indonesia,\nSaya ingin mengajukan minat kemitraan Joint Venture resmi:\n- Nama: *${investorName}*\n- Email: *${investorEmail}*\n- WhatsApp: *${investorPhone}*\n- Sektor Minat: *${sectorLabel}*\n- Estimasi Modal: *${formattedCapital}*\n- Durasi: *${investorDuration} Tahun*\n- Catatan Khusus: "${investorMessage || '-'}"\n\nMohon feedback tim humas / direksi keuangan PT. FGI. Terima kasih.`;
                      window.open(`https://wa.me/6287797330546?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto cursor-pointer"
                  >
                    {INVESTOR_TRANSLATIONS[lang].form.waCta} <ExternalLink size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setInvestorSuccess(false);
                      setInvestorName("");
                      setInvestorEmail("");
                      setInvestorPhone("");
                      setInvestorMessage("");
                    }}
                    className={`text-[10px] font-bold uppercase tracking-wider block mx-auto pt-4 ${darkMode ? "text-slate-500 hover:text-slate-400" : "text-slate-400 hover:text-slate-500"}`}
                  >
                    {lang === "en" ? "Submit Another Interest" : "Kirim Pernyataan Lain"}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!investorName || !investorEmail || !investorPhone) {
                      alert(lang === "en" ? "Please fill in all mandatory fields (Name, Email, and Phone Number)." : "Mohon isi semua kolom wajib (Nama, Email, dan No. WhatsApp).");
                      return;
                    }
                    // Save to local list
                    const lead = {
                      id: Date.now(),
                      name: investorName,
                      email: investorEmail,
                      phone: investorPhone,
                      amount: investorAmount,
                      duration: investorDuration,
                      sector: investorType,
                      message: investorMessage,
                      date: new Date().toISOString()
                    };
                    try {
                      const existingLeadsStr = localStorage.getItem("fgi_investor_leads");
                      const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
                      existingLeads.push(lead);
                      localStorage.setItem("fgi_investor_leads", JSON.stringify(existingLeads));
                    } catch (err) {
                      console.error("Error saving investor lead: ", err);
                    }
                    setInvestorSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider block ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {INVESTOR_TRANSLATIONS[lang].form.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={investorName}
                        onChange={(e) => setInvestorName(e.target.value)}
                        className={`w-full p-3 text-xs rounded-lg border ${
                          darkMode ? "bg-[#0B0F19] border-slate-800 focus:border-amber-500 text-white" : "bg-slate-50 border-slate-200 focus:border-amber-500 text-slate-900"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider block ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {INVESTOR_TRANSLATIONS[lang].form.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={investorPhone}
                        onChange={(e) => setInvestorPhone(e.target.value)}
                        className={`w-full p-3 text-xs rounded-lg border ${
                          darkMode ? "bg-[#0B0F19] border-slate-800 focus:border-amber-500 text-white" : "bg-slate-50 border-slate-200 focus:border-amber-500 text-slate-900"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`text-[10px] font-extrabold uppercase tracking-wider block ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {INVESTOR_TRANSLATIONS[lang].form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={investorEmail}
                      onChange={(e) => setInvestorEmail(e.target.value)}
                      className={`w-full p-3 text-xs rounded-lg border ${
                        darkMode ? "bg-[#0B0F19] border-slate-800 focus:border-amber-500 text-white" : "bg-slate-50 border-slate-200 focus:border-amber-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-[10px] font-extrabold uppercase tracking-wider block ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {INVESTOR_TRANSLATIONS[lang].form.message}
                    </label>
                    <textarea
                      rows={3}
                      value={investorMessage}
                      onChange={(e) => setInvestorMessage(e.target.value)}
                      className={`w-full p-3 text-xs rounded-lg border ${
                        darkMode ? "bg-[#0B0F19] border-slate-800 focus:border-amber-500 text-white" : "bg-slate-50 border-slate-200 focus:border-amber-500 text-slate-900"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                  >
                    {INVESTOR_TRANSLATIONS[lang].form.submit}
                  </button>
                </form>
              )}

            </div>

            {/* Investor FAQ Accordion (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6" id="investor-faq-box">
              <h3 className="text-xl font-bold tracking-tight">
                {INVESTOR_TRANSLATIONS[lang].faq.title}
              </h3>
              
              <div className="space-y-3">
                {[
                  { q: INVESTOR_TRANSLATIONS[lang].faq.q1, a: INVESTOR_TRANSLATIONS[lang].faq.a1 },
                  { q: INVESTOR_TRANSLATIONS[lang].faq.q2, a: INVESTOR_TRANSLATIONS[lang].faq.a2 },
                  { q: INVESTOR_TRANSLATIONS[lang].faq.q3, a: INVESTOR_TRANSLATIONS[lang].faq.a3 },
                  { q: INVESTOR_TRANSLATIONS[lang].faq.q4, a: INVESTOR_TRANSLATIONS[lang].faq.a4 }
                ].map((faq, idx) => {
                  const isOpen = investorFaqOpen === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border overflow-hidden transition-all ${
                        darkMode ? "bg-[#131926]/40 border-slate-850" : "bg-white border-slate-200 shadow-sm"
                      }`}
                    >
                      <button
                        onClick={() => setInvestorFaqOpen(isOpen ? null : idx)}
                        className="w-full text-left p-4 font-bold text-xs uppercase tracking-wider flex justify-between items-center gap-4 hover:bg-amber-500/5 transition-colors cursor-pointer"
                      >
                        <span className="leading-snug">{faq.q}</span>
                        <span className="text-amber-500 flex-shrink-0">
                          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`border-t ${darkMode ? "border-slate-850" : "border-slate-100"}`}
                          >
                            <div className={`p-4 text-xs leading-relaxed ${
                              darkMode ? "text-slate-400 bg-slate-950/20" : "text-slate-600 bg-slate-50/50"
                            }`}>
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

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
      <section id="testimoni" className={`py-24 relative z-10 border-y overflow-hidden ${darkMode ? "bg-[#0e1422] border-slate-900/50" : "bg-slate-50/50 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Controls */}
          {(() => {
            const testimonials = TRANSLATIONS[lang].testimoni.items;
            const visibleCount = windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1;
            const maxSlide = Math.max(0, testimonials.length - visibleCount);
            const clampedSlide = Math.min(testimonialSlide, maxSlide);

            const nextSlide = () => {
              setTestimonialSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
            };

            const prevSlide = () => {
              setTestimonialSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
            };

            const staticImages = [
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
            ];

            return (
              <>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16" id="testimonials-header">
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center mb-1">
                      <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">{TRANSLATIONS[lang].testimoni.sub}</h3>
                      <div className="h-[1px] flex-grow ml-4 bg-slate-200 dark:bg-slate-800"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {TRANSLATIONS[lang].testimoni.title}
                    </h2>
                    <p className={`text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {TRANSLATIONS[lang].testimoni.desc}
                    </p>
                  </div>

                  {/* Desktop slider controls */}
                  <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={prevSlide}
                      className={`p-3 rounded-full border transition-all cursor-pointer ${
                        darkMode
                          ? "bg-[#131926] border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-sm"
                      }`}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className={`p-3 rounded-full border transition-all cursor-pointer ${
                        darkMode
                          ? "bg-[#131926] border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-sm"
                      }`}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Slider viewport container */}
                <div className="relative w-full overflow-hidden" id="testimonials-list-slider">
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ 
                      transform: `translateX(-${clampedSlide * (100 / visibleCount)}%)`,
                      width: `${(testimonials.length / visibleCount) * 100}%`
                    }}
                  >
                    {testimonials.map((testi: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="flex-shrink-0 px-3"
                        style={{ width: `${100 / testimonials.length}%` }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: (idx % visibleCount) * 0.08 }}
                          className={`p-8 rounded-xl border relative flex flex-col justify-between h-full min-h-[260px] ${
                            darkMode ? "bg-[#131926] border-slate-800" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          {/* Quote Icon Background */}
                          <div className="absolute top-6 right-6 text-slate-500/10 pointer-events-none">
                            <MessageSquare size={44} />
                          </div>
                          
                          <div className="space-y-4">
                            {/* Stars */}
                            <div className="flex gap-0.5 text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill="currentColor" />
                              ))}
                            </div>

                            <p className={`text-xs sm:text-sm italic leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                              "{testi.comment}"
                            </p>
                          </div>

                          <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-500/10">
                            <img
                              src={staticImages[idx % staticImages.length]}
                              alt={testi.name}
                              className="w-10 h-10 rounded-full object-cover border border-amber-500/20"
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
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile & Tablet Slider Controls + Dot Pagination Indicators */}
                <div className="flex items-center justify-between mt-10">
                  {/* Mobile navigation controls */}
                  <div className="flex sm:hidden items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                        darkMode
                          ? "bg-[#131926] border-slate-800 text-slate-400"
                          : "bg-white border-slate-200 text-slate-600 shadow-sm"
                      }`}
                      aria-label="Previous testimonial mobile"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                        darkMode
                          ? "bg-[#131926] border-slate-800 text-slate-400"
                          : "bg-white border-slate-200 text-slate-600 shadow-sm"
                      }`}
                      aria-label="Next testimonial mobile"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Carousel Page Dots */}
                  <div className="flex items-center gap-1.5 mx-auto">
                    {Array.from({ length: maxSlide + 1 }).map((_, dIdx) => (
                      <button
                        key={dIdx}
                        onClick={() => setTestimonialSlide(dIdx)}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          clampedSlide === dIdx
                            ? "w-6 bg-amber-500"
                            : darkMode
                              ? "w-2.5 bg-slate-800 hover:bg-slate-700"
                              : "w-2.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to slide ${dIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Slide index info badge */}
                  <div className={`text-xs font-mono font-extrabold tracking-wider uppercase ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    {clampedSlide + 1} / {maxSlide + 1}
                  </div>
                </div>
              </>
            );
          })()}
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


      {/* --- CAREERS SECTION --- */}
      <section id="karir" className={`py-24 relative z-10 border-b ${darkMode ? "bg-[#0e1422] border-slate-900/50" : "bg-gradient-to-r from-blue-50/20 via-white to-blue-50/10 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4" id="careers-header">
            <span className="text-xs font-black tracking-[0.25em] text-amber-500 uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-full">
              {TRANSLATIONS[lang].careers.sub}
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
                {TRANSLATIONS[lang].careers.title.split("PT. FGI")[0]}
              </span>
              <span className="text-amber-500 dark:text-amber-400">PT. FGI</span>
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Culture Blurb */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4">
                <h3 className={`text-xl font-extrabold tracking-tight ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                  {TRANSLATIONS[lang].careers.cultureTitle}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {TRANSLATIONS[lang].careers.cultureDesc}
                </p>
              </div>

              {/* Culture points list */}
              <div className="space-y-6">
                {TRANSLATIONS[lang].careers.culturePoints.map((point: any, idx: number) => {
                  const icons = [
                    <ShieldCheck className="text-amber-500" size={24} />,
                    <Award className="text-amber-500" size={24} />,
                    <Users className="text-amber-500" size={24} />
                  ];
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className={`p-3 rounded-lg flex-shrink-0 ${darkMode ? "bg-slate-900/85 border border-slate-800" : "bg-amber-50/60 border border-amber-200/50"}`}>
                        {icons[idx]}
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-900"}`}>
                          {point.title}
                        </h4>
                        <p className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Open Positions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {TRANSLATIONS[lang].careers.openPositions}
                </h3>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md">
                  {TRANSLATIONS[lang].careers.positions.length} Positions
                </span>
              </div>

              <div className="space-y-4" id="job-cards-container">
                {TRANSLATIONS[lang].careers.positions.map((job: any, idx: number) => {
                  const isOpen = activeJobDetails === idx;
                  return (
                    <div 
                      key={idx}
                      className={`rounded-xl border transition-all duration-300 p-6 ${
                        isOpen 
                          ? darkMode 
                            ? "bg-[#111726] border-amber-500/50 shadow-lg shadow-amber-500/5" 
                            : "bg-amber-50/40 border-amber-500/40 shadow-md"
                          : darkMode
                            ? "bg-[#0c101d] border-slate-800/80 hover:border-slate-700 hover:bg-[#101526]"
                            : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Job Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Briefcase size={16} className="text-amber-500 flex-shrink-0" />
                            <h4 className={`text-base font-black ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                              {job.title}
                            </h4>
                          </div>
                          
                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                            <span className="flex items-center gap-1 text-slate-400 font-medium">
                              <MapPin size={12} className="text-amber-500" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 font-medium">
                              <Clock size={12} className="text-amber-500" />
                              {job.type}
                            </span>
                          </div>
                        </div>

                        {/* Apply Now Button */}
                        <button
                          onClick={() => {
                            const isId = lang === "id";
                            const subject = isId 
                              ? `Lamar Pekerjaan: ${job.title} - PT. FGI`
                              : `Job Application: ${job.title} - PT. FGI`;
                            
                            const message = isId
                              ? `Halo Tim HRD PT. Foresyndo Global Indonesia,\n\nSaya ingin melamar untuk posisi *${job.title}* di FGI.\n\nBerikut detail singkat saya:\n- Nama Lengkap: \n- No. WhatsApp: \n- Email: \n\nMohon petunjuk lebih lanjut mengenai pengiriman CV dan proses selanjutnya.\n\nTerima kasih.`
                              : `Dear HR Team at PT. Foresyndo Global Indonesia,\n\nI would like to apply for the *${job.title}* position.\n\nHere are my details:\n- Full Name: \n- WhatsApp Number: \n- Email: \n\nPlease guide me on the next steps and CV submission.\n\nThank you.`;

                            setFormSubject(subject);
                            setFormMessage(message);
                            scrollTo("kontak");
                          }}
                          className="sm:self-center px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-lg shadow-md hover:shadow-amber-500/15 cursor-pointer transition-all uppercase tracking-wider flex-shrink-0"
                        >
                          {TRANSLATIONS[lang].careers.applyBtn}
                        </button>
                      </div>

                      {/* Job Description */}
                      <p className={`text-xs leading-relaxed mt-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {job.desc}
                      </p>

                      {/* Toggle Requirements Button */}
                      <div className="mt-4 pt-4 border-t border-slate-200/10 dark:border-slate-800/50 flex justify-between items-center">
                        <button
                          onClick={() => setActiveJobDetails(isOpen ? null : idx)}
                          className={`text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                            isOpen 
                              ? "text-amber-500" 
                              : darkMode 
                                ? "text-slate-400 hover:text-white" 
                                : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <span>{TRANSLATIONS[lang].careers.btnDetails}</span>
                          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>

                      {/* Expanded Requirements List */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-2.5 pl-2 pb-2">
                              {job.reqs.map((req: string, rIdx: number) => (
                                <div key={rIdx} className="flex gap-2 items-start text-xs leading-relaxed">
                                  <Check size={12} className="text-amber-500 mt-1 flex-shrink-0" />
                                  <span className={darkMode ? "text-slate-300" : "text-slate-700"}>{req}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

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

                    {/* Professional Message Live Preview & Format Helper */}
                    <div className={`p-4 rounded-lg border space-y-3 ${
                      darkMode ? "bg-slate-900/35 border-slate-800/80" : "bg-slate-50/70 border-slate-200/80"
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className={`block text-[10px] font-black uppercase tracking-[0.12em] ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                          }`}>
                            {lang === "id" ? "Template Format WhatsApp" : "WhatsApp Format Template"}
                          </label>
                          <p className={`text-[9px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            {lang === "id" ? "Sesuaikan nada bicara pesan otomatis Anda" : "Tailor the tone of your pre-filled inquiry"}
                          </p>
                        </div>

                        {/* Tone Selector Pills */}
                        <div className="flex items-center gap-1.5 self-start sm:self-center">
                          {[
                            { id: "standard", label: lang === "id" ? "Standar" : "Standard" },
                            { id: "formal", label: lang === "id" ? "Formal" : "Formal" },
                            { id: "urgent", label: lang === "id" ? "Mendesak" : "Urgent" }
                          ].map((tone) => (
                            <button
                              key={tone.id}
                              type="button"
                              onClick={() => setFormTone(tone.id as any)}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all cursor-pointer ${
                                formTone === tone.id
                                  ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm"
                                  : darkMode
                                    ? "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                                    : "bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              {tone.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Preview Text Area & Copy Trigger */}
                      <div className="relative group">
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            type="button"
                            onClick={copyFormattedMessage}
                            className={`p-2 rounded-md transition-all flex items-center gap-1.5 cursor-pointer text-[10px] font-black uppercase shadow-sm ${
                              copiedMessage
                                ? "bg-emerald-500 text-white"
                                : darkMode
                                  ? "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                                  : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
                            }`}
                            title={lang === "id" ? "Salin ke clipboard" : "Copy to clipboard"}
                          >
                            {copiedMessage ? (
                              <>
                                <Check size={12} className="text-white animate-bounce" />
                                <span>{lang === "id" ? "Tersalin!" : "Copied!"}</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} className={darkMode ? "text-slate-400" : "text-slate-500"} />
                                <span>{lang === "id" ? "Salin Pesan" : "Copy Message"}</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Readonly preview textarea block */}
                        <div 
                          className={`w-full max-h-[140px] min-h-[100px] overflow-y-auto p-4 rounded font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all pr-28 scrollbar-thin ${
                            darkMode 
                              ? "bg-slate-950/80 text-slate-300 border border-slate-850 animate-pulse-subtle" 
                              : "bg-slate-100/80 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {formattedEnquiryMessage}
                        </div>
                        <div className={`absolute bottom-2 right-2 text-[8px] font-medium pointer-events-none uppercase tracking-wider ${
                          darkMode ? "text-slate-600" : "text-slate-400"
                        }`}>
                          {lang === "id" ? "Pratinjau Real-time" : "Real-time Preview"}
                        </div>
                      </div>
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
                      <a href="https://wa.me/6287797330546" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-500 hover:text-amber-400 hover:underline mt-1 block">
                        0877 9733 0546
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
                    href="https://www.facebook.com/profile.php?id=61577198932542"
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
                  { id: "struktur", label: TRANSLATIONS[lang].nav.struktur },
                  { id: "layanan", label: TRANSLATIONS[lang].nav.layanan },
                  { id: "proyek", label: TRANSLATIONS[lang].projects.sub },
                  { id: "visi-misi", label: TRANSLATIONS[lang].nav["visi-misi"] },
                  { id: "mengapa-kami", label: TRANSLATIONS[lang].nav["mengapa-kami"] },
                  { id: "faq", label: TRANSLATIONS[lang].faq.sub },
                  { id: "karir", label: TRANSLATIONS[lang].nav.karir }
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
                  <a href="https://wa.me/6287797330546" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 hover:underline font-bold">
                    0877 9733 0546
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
              <span onClick={() => setPrivacyModalOpen(true)} className="hover:text-amber-500 cursor-pointer text-amber-500 font-semibold">{lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</span>
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
          href="https://wa.me/6287797330546"
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
              id="project-modal"
              initial={{ opacity: 0, scale: 0.98, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 40 }}
              transition={{ type: "spring", damping: 28, stiffness: 220, mass: 0.9 }}
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

              {/* Tab Selector Bar */}
              <div className="flex border-b border-slate-500/10 flex-shrink-0 bg-slate-950/20">
                <button
                  onClick={() => setVideoTabActive(false)}
                  className={`flex-1 py-3 text-center text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
                    !videoTabActive
                      ? "border-amber-500 text-amber-500 bg-slate-500/5"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Building size={14} />
                  {TRANSLATIONS[lang].videoShowcase.tabGallery}
                </button>
                <button
                  onClick={() => setVideoTabActive(true)}
                  className={`flex-1 py-3 text-center text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
                    videoTabActive
                      ? "border-amber-500 text-amber-500 bg-slate-500/5"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Video size={14} />
                  {TRANSLATIONS[lang].videoShowcase.tabVideo}
                </button>
              </div>

              <div className="overflow-y-auto">
                {videoTabActive ? (
                  <div className="flex flex-col w-full bg-slate-950">
                    <div className="relative w-full bg-slate-950 overflow-hidden flex flex-col min-h-[250px] sm:min-h-[350px]" id="veo-video-panel">
                      {/* Video presentation panel */}
                      {videoMode === "none" && (
                        <div className="p-6 sm:p-8 flex flex-col justify-center items-center text-center space-y-4 h-full bg-gradient-to-b from-slate-900 to-slate-950">
                          <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 animate-pulse">
                            <Sparkles size={28} />
                          </div>
                          <div className="space-y-1 max-w-lg">
                            <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                              {TRANSLATIONS[lang].videoShowcase.introTitle}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                              {TRANSLATIONS[lang].videoShowcase.introDesc}
                            </p>
                          </div>

                          {/* Style Selectors & Controls */}
                          <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-left space-y-3.5">
                            {/* Visual Style Preset */}
                            <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1">
                                <Sliders size={11} className="text-amber-500" />
                                {TRANSLATIONS[lang].videoShowcase.stylePreset}
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                {["Sunset Golden Hour", "Crisp Bright Daylight", "Rainy Cinematic Mood", "Futuristic Neon Accents", "Cozy Warm Evening"].map((style) => (
                                  <button
                                    key={style}
                                    onClick={() => setVideoStyle(style)}
                                    className={`px-2 py-1.5 text-[10px] font-semibold rounded text-center transition-all cursor-pointer border ${
                                      videoStyle === style
                                        ? "bg-amber-500/10 border-amber-500 text-amber-500"
                                        : "bg-slate-950/40 border-slate-800/60 text-slate-400 hover:border-slate-700"
                                    }`}
                                  >
                                    {style}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Custom prompt input */}
                            <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                                <Sparkles size={11} className="text-amber-500" />
                                {TRANSLATIONS[lang].videoShowcase.customPromptLabel}
                              </label>
                              <input
                                type="text"
                                value={videoCustomPrompt}
                                onChange={(e) => setVideoCustomPrompt(e.target.value)}
                                placeholder={TRANSLATIONS[lang].videoShowcase.customPromptPlaceholder}
                                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                              />
                            </div>

                            {/* AI vs Simulation Control */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-1.5 border-t border-slate-800 gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="ai-toggle"
                                  checked={useAIVideo}
                                  disabled={!apiKeyConfigured}
                                  onChange={(e) => setUseAIVideo(e.target.checked)}
                                  className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0 cursor-pointer disabled:opacity-50"
                                />
                                <label htmlFor="ai-toggle" className={`text-[10px] font-semibold cursor-pointer ${!apiKeyConfigured ? "text-slate-500" : "text-slate-300"}`}>
                                  {apiKeyConfigured 
                                    ? TRANSLATIONS[lang].videoShowcase.enableAILabel 
                                    : TRANSLATIONS[lang].videoShowcase.enableAISimulated}
                                </label>
                              </div>
                              
                              {!apiKeyConfigured && (
                                <span className="text-[9px] text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest font-black flex items-center gap-1">
                                  <Info size={10} /> {lang === "en" ? "DEMO ACTIVE" : "SIMULASI AKTIF"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Generate Button */}
                          <button
                            onClick={handleGenerateVideo}
                            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-lg text-xs font-bold tracking-wider uppercase shadow-xl transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Video size={14} />
                            {TRANSLATIONS[lang].videoShowcase.generateBtn}
                          </button>
                        </div>
                      )}

                      {videoMode === "generating" && (
                        <div className="p-8 flex flex-col justify-center items-center text-center space-y-6 h-full min-h-[300px] sm:min-h-[380px] bg-slate-950">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute w-24 h-24 rounded-full border border-amber-500/20 animate-ping" />
                            <div className="absolute w-16 h-16 rounded-full border border-amber-500/40 animate-pulse" />
                            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                              <Loader2 size={24} className="animate-spin" />
                            </div>
                          </div>

                          <div className="space-y-2 max-w-sm">
                            <h4 className="text-sm font-bold tracking-wider uppercase text-amber-500 animate-pulse">
                              {TRANSLATIONS[lang].videoShowcase.renderingTitle}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-mono tracking-wide h-4">
                              {videoProgressText}
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full max-w-xs bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${videoProgressPercent}%` }}
                              transition={{ duration: 0.3 }}
                              className="bg-amber-500 h-full rounded-full"
                            />
                          </div>

                          <div className="text-[10px] font-mono text-slate-500">
                            {videoProgressPercent}% Complete
                          </div>
                        </div>
                      )}

                      {videoMode === "completed" && generatedVideoUrl && (
                        <div className="relative h-[250px] sm:h-[350px] w-full bg-slate-950 flex flex-col justify-center items-center group overflow-hidden">
                          {videoHasError ? (
                            <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden flex flex-col justify-center items-center">
                              {/* Ken Burns Animated Image Slideshow Fallback */}
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key={slideshowIndex}
                                  src={selectedProject.images?.[slideshowIndex] || selectedProject.image}
                                  initial={{ scale: 1.15, opacity: 0 }}
                                  animate={{ scale: 1.0, opacity: 0.85 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              </AnimatePresence>

                              {/* Gradient Overlays */}
                              <div className="absolute inset-0 bg-slate-950/40" />
                              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

                              {/* Captions and Info */}
                              <div className="absolute inset-0 flex flex-col justify-between p-4 z-20 pointer-events-none">
                                <div className="flex justify-between items-start">
                                  <span className="bg-amber-500 text-slate-950 text-[9px] font-black tracking-widest px-2.5 py-1 rounded shadow-md">
                                    CINEMATIC PHOTO TOUR
                                  </span>
                                  <span className="bg-slate-950/80 text-[9px] font-mono text-slate-300 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-sm">
                                    {slideshowIndex + 1} / {selectedProject.images?.length || 1}
                                  </span>
                                </div>
                                <div className="space-y-1 bg-slate-950/80 backdrop-blur-md p-3 rounded-lg border border-slate-800/60 max-w-sm">
                                  <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest flex items-center gap-1">
                                    <Sparkles size={10} /> {lang === "en" ? "ACTIVE PRESENTATION" : "PRESENTASI AKTIF"}
                                  </p>
                                  <p className="text-[11px] text-slate-300 leading-relaxed">
                                    {lang === "en" 
                                      ? "Displaying cinematic high-resolution projection stream for optimal browser performance." 
                                      : "Menampilkan proyeksi sinematik resolusi tinggi untuk performa pemutaran peramban yang optimal."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <video
                                ref={videoRef}
                                src={generatedVideoUrl}
                                className="w-full h-full object-cover animate-fade-in"
                                autoPlay
                                loop
                                playsInline
                                muted={videoMuted}
                                onPlay={() => setVideoPlaying(true)}
                                onPause={() => setVideoPlaying(false)}
                                onError={() => {
                                  console.error("Error loading video stream, playing photo tour fallback");
                                  setVideoHasError(true);
                                }}
                              />

                              {/* Interactive Floating Video Controls */}
                              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                                {/* Play / Pause Toggle */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (videoRef.current) {
                                      if (videoPlaying) {
                                        videoRef.current.pause();
                                      } else {
                                        videoRef.current.play().catch(err => console.error(err));
                                      }
                                    }
                                  }}
                                  className="w-8 h-8 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-slate-800 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                                  title={videoPlaying ? "Pause" : "Play"}
                                >
                                  {videoPlaying ? <Pause size={13} /> : <Play size={13} />}
                                </button>

                                {/* Mute / Unmute Toggle */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (videoRef.current) {
                                      const nextMute = !videoMuted;
                                      videoRef.current.muted = nextMute;
                                      setVideoMuted(nextMute);
                                    }
                                  }}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
                                    videoMuted
                                      ? "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white"
                                      : "bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-950"
                                  }`}
                                  title={videoMuted ? "Unmute" : "Mute"}
                                >
                                  {videoMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                </button>
                              </div>
                            </>
                          )}
                          
                          {/* Overlay tags and watermark */}
                          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
                            <span className="bg-slate-950/80 backdrop-blur-md text-[9px] font-black tracking-widest text-white px-2.5 py-1 rounded border border-slate-800">
                              {useAIVideo ? "GOOGLE VEO 3.1 AI VIDEO" : TRANSLATIONS[lang].videoShowcase.simulationModeActive}
                            </span>
                            <span className="bg-amber-500/90 text-slate-950 text-[9px] font-mono font-black tracking-wider px-2 py-0.5 rounded mr-auto shadow-sm">
                              {videoStyle}
                            </span>
                          </div>

                          {/* Adjust Style Button */}
                          <button
                            onClick={() => setVideoMode("none")}
                            className="absolute bottom-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-[10px] text-slate-300 hover:text-white font-bold tracking-wider uppercase cursor-pointer flex items-center gap-1.5 transition-all shadow-xl backdrop-blur-sm"
                          >
                            <RotateCcw size={11} />
                            {TRANSLATIONS[lang].videoShowcase.backToSetup}
                          </button>
                        </div>
                      )}

                      {videoMode === "error" && (
                        <div className="p-8 flex flex-col justify-center items-center text-center space-y-4 h-full bg-slate-950 min-h-[300px]">
                          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                            <X size={24} />
                          </div>
                          <div className="space-y-1 max-w-sm">
                            <h4 className="text-sm font-bold text-white">Generation Failed</h4>
                            <p className="text-xs text-slate-400">
                              We encountered an issue communicating with the Google Veo service.
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setVideoMode("none")}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                              Try Again
                            </button>
                            <button
                              onClick={() => {
                                setUseAIVideo(false);
                                setVideoMode("none");
                              }}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                              Use Demo Mode
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quota System Warning Notice Banner */}
                    {videoErrorReason && (
                      <div className="bg-amber-950/40 border-t border-b border-amber-500/20 p-4 sm:px-6 flex items-start gap-3 text-amber-200">
                        <Info size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-wider text-amber-500">
                            {lang === "en" ? "QUOTA SYSTEM NOTICE" : "PEMBERITAHUAN SISTEM KUOTA"}
                          </p>
                          <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
                            {TRANSLATIONS[lang].videoShowcase.quotaExceededWarning}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Hero image carousel header */}
                    {(() => {
                      const carouselImages = selectedProject.images || [selectedProject.image];
                      return (
                        <>
                          <div className="relative h-[250px] sm:h-[350px] w-full bg-slate-950 overflow-hidden">
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={activeImageIndex}
                                src={carouselImages[activeImageIndex]}
                                alt={`${lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title} - Image ${activeImageIndex + 1}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover object-center"
                              />
                            </AnimatePresence>

                            {/* Gradient overlays */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/40 to-transparent z-10 pointer-events-none" />

                            {/* Carousel Left/Right Buttons */}
                            {carouselImages.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
                                  }}
                                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  aria-label="Previous image"
                                >
                                  <ChevronLeft size={20} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
                                  }}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  aria-label="Next image"
                                >
                                  <ChevronRight size={20} />
                                </button>
                              </>
                            )}

                            {/* Indicator info badges */}
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                              <span className="bg-slate-950/70 backdrop-blur-md text-[10px] font-black tracking-widest text-white px-2 py-1 rounded">
                                {selectedProject.category === "Perumahan" ? TRANSLATIONS[lang].projects.filterPerumahan :
                                 selectedProject.category === "Komersial" ? TRANSLATIONS[lang].projects.filterKomersial :
                                 TRANSLATIONS[lang].projects.filterInfrastruktur}
                              </span>
                              {carouselImages.length > 1 && (
                                <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-black tracking-wider px-2 py-1 rounded">
                                  {activeImageIndex + 1} / {carouselImages.length}
                                </span>
                              )}
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                                {lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title}
                              </h3>
                            </div>
                          </div>

                          {/* Horizontal scrollable thumbnails row */}
                          {carouselImages.length > 1 && (
                            <div className={`px-6 sm:px-8 pt-4 pb-3 border-b flex gap-3 overflow-x-auto scrollbar-thin ${
                              darkMode ? "border-slate-800 bg-slate-950/20" : "border-slate-100 bg-slate-50/50"
                            }`}>
                              {carouselImages.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveImageIndex(idx)}
                                  className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden flex-shrink-0 transition-all border-2 cursor-pointer ${
                                    activeImageIndex === idx
                                      ? "border-amber-500 scale-105 shadow-sm"
                                      : darkMode
                                      ? "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                                      : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"
                                  }`}
                                >
                                  <img
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover object-center"
                                  />
                                  {activeImageIndex === idx && (
                                    <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </>
                )}

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
                    <div className="flex flex-wrap items-center gap-3 pt-2">
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
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#25D366]/8 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/15 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-[#25D366]/20 cursor-pointer"
                        title={lang === "en" ? "Share via WhatsApp" : "Bagikan lewat WhatsApp"}
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </button>

                      {/* LinkedIn Share Button */}
                      <button
                        onClick={() => {
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0077B5]/8 hover:bg-[#0077B5] text-[#0077B5] hover:text-white border border-[#0077B5]/15 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-[#0077B5]/20 cursor-pointer"
                        title={lang === "en" ? "Share on LinkedIn" : "Bagikan lewat LinkedIn"}
                      >
                        <Linkedin size={18} />
                      </button>

                      {/* Facebook Share Button */}
                      <button
                        onClick={() => {
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#1877F2]/8 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/15 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-[#1877F2]/20 cursor-pointer"
                        title={lang === "en" ? "Share on Facebook" : "Bagikan lewat Facebook"}
                      >
                        <Facebook size={18} />
                      </button>

                      {/* Twitter Share Button */}
                      <button
                        onClick={() => {
                          const projectTitle = lang === "en" && selectedProject.enTitle ? selectedProject.enTitle : selectedProject.title;
                          const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`;
                          const text = lang === "en" 
                            ? `Check out this amazing project: ${projectTitle}`
                            : `Lihat proyek luar biasa ini: ${projectTitle}`;
                          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, "_blank");
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-500/8 hover:bg-sky-500 text-sky-500 hover:text-white border border-sky-500/15 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-sky-500/20 cursor-pointer"
                        title={lang === "en" ? "Share on X (Twitter)" : "Bagikan lewat X (Twitter)"}
                      >
                        <Twitter size={18} />
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
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-500/8 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/15 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-rose-500/20 cursor-pointer"
                        title={lang === "en" ? "Share via Email" : "Bagikan lewat Email"}
                      >
                        <Mail size={18} />
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
                        className={`h-10 rounded-xl flex items-center justify-center gap-2 px-4 text-xs font-bold uppercase tracking-wider border hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer sm:ml-auto w-full sm:w-auto ${
                          shareCopied
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/10"
                            : "bg-amber-500/8 hover:bg-amber-500 text-amber-500 hover:text-slate-950 border-amber-500/15 hover:border-transparent shadow-sm hover:shadow-md hover:shadow-amber-500/20"
                        }`}
                        title={lang === "en" ? "Copy project link" : "Salin tautan proyek"}
                      >
                        {shareCopied ? (
                          <>
                            <CheckCircle2 size={15} className="text-emerald-400 animate-bounce" />
                            <span className="text-emerald-400">{TRANSLATIONS[lang].modal.shareCopied}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>{lang === "en" ? "Copy Link" : "Salin Link"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Dual QR Code Access Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" id="project-qr-section">
                    
                    {/* QR Code 1: Consultation */}
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{ scale: 1.025, y: -2 }}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 cursor-default ${
                        darkMode 
                          ? "bg-slate-900/60 border-slate-800 hover:border-slate-700/80 shadow-md shadow-slate-950/20" 
                          : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="bg-white p-3 rounded-xl shadow-lg shadow-slate-950/5 shrink-0 border border-slate-200 flex items-center justify-center hover:scale-[1.02] transition-transform duration-300">
                        <QRCodeSVG
                          value={`https://wa.me/6287797330546?text=${encodeURIComponent(
                            lang === "en"
                              ? `Hello FGI, I am interested in inquiring about the project: *${selectedProject.enTitle || selectedProject.title}* in *${selectedProject.enLocation || selectedProject.location}*. Please send me more information.`
                              : `Halo FGI, saya tertarik menanyakan tentang proyek: *${selectedProject.title}* di *${selectedProject.location}*. Mohon informasi unit / pelaksanaannya lebih lanjut.`
                          )}`}
                          size={125}
                          level="L"
                          bgColor="#ffffff"
                          fgColor="#000000"
                          includeMargin={false}
                          className="w-[125px] h-[125px] select-none"
                        />
                      </div>
                      <div className="space-y-1.5 text-center sm:text-left flex-1">
                        <h4 className="font-extrabold text-[10px] uppercase tracking-widest text-emerald-500 flex items-center justify-center sm:justify-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          {lang === "en" ? "Consult on WhatsApp" : "Konsultasi WhatsApp"}
                        </h4>
                        <p className={`text-xs font-bold leading-tight ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                          {lang === "en" ? "Direct Expert Chat" : "Tanya Spesialis FGI"}
                        </p>
                        <p className={`text-[10px] leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                          {lang === "en"
                            ? "Scan this QR code with your mobile camera to chat directly about this project."
                            : "Pindai QR code ini menggunakan kamera HP Anda untuk chat langsung mengenai proyek ini."}
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* QR Code 2: Share Link */}
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                      whileHover={{ scale: 1.025, y: -2 }}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 cursor-default ${
                        darkMode 
                          ? "bg-slate-900/60 border-slate-800 hover:border-slate-700/80 shadow-md shadow-slate-950/20" 
                          : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="bg-white p-3 rounded-xl shadow-lg shadow-slate-950/5 shrink-0 border border-slate-200 flex items-center justify-center hover:scale-[1.02] transition-transform duration-300">
                        <QRCodeSVG
                          value={`${window.location.origin}${window.location.pathname}?project=${selectedProject.id}`}
                          size={125}
                          level="L"
                          bgColor="#ffffff"
                          fgColor="#000000"
                          includeMargin={false}
                          className="w-[125px] h-[125px] select-none"
                        />
                      </div>
                      <div className="space-y-1.5 text-center sm:text-left flex-1">
                        <h4 className="font-extrabold text-[10px] uppercase tracking-widest text-amber-500 flex items-center justify-center sm:justify-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          {lang === "en" ? "Share Link" : "Bagikan Tautan"}
                        </h4>
                        <p className={`text-xs font-bold leading-tight ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                          {lang === "en" ? "Instant Mobile Link" : "Pindai Link Cepat"}
                        </p>
                        <p className={`text-[10px] leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                          {lang === "en"
                            ? "Scan to open this specific project description instantly on your mobile phone."
                            : "Pindai untuk membuka deskripsi spesifik proyek ini langsung di smartphone Anda."}
                        </p>
                      </div>
                    </motion.div>
                    
                  </div>

                  {/* Call to action for this specific project */}
                  <div className="pt-6 border-t border-slate-500/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const messageText = lang === "en"
                          ? `Hello FGI, I am interested in inquiring about the project: *${selectedProject.enTitle || selectedProject.title}* in *${selectedProject.enLocation || selectedProject.location}*. Please send me more information.`
                          : `Halo FGI, saya tertarik menanyakan tentang proyek: *${selectedProject.title}* di *${selectedProject.location}*. Mohon informasi unit / pelaksanaannya lebih lanjut.`;
                        window.open(`https://wa.me/6287797330546?text=${encodeURIComponent(messageText)}`, "_blank");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded shadow-sm flex items-center justify-center gap-2 flex-1 cursor-pointer"
                    >
                      {TRANSLATIONS[lang].modal.askCta} <ExternalLink size={14} />
                    </button>

                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className={`font-bold text-xs uppercase tracking-wider px-5 py-3 rounded shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all border ${
                        darkMode
                          ? "bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border-amber-500/20"
                          : "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600/10"
                      }`}
                      id="print-brochure-btn"
                    >
                      <Printer size={14} />
                      <span>{TRANSLATIONS[lang].modal.printBrochure}</span>
                    </button>

                    <button
                      onClick={() => setSelectedProject(null)}
                      className={`text-xs font-bold uppercase tracking-wider px-5 py-3 rounded cursor-pointer ${
                        darkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
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

      {/* --- PRIVACY POLICY MODAL --- */}
      <AnimatePresence>
        {privacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="privacy-policy-modal">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3 }}
              className={`relative max-w-2xl w-full rounded border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] ${
                darkMode ? "bg-[#131926] border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {/* Header */}
              <div className={`p-6 border-b flex items-center justify-between ${
                darkMode ? "border-slate-800 bg-slate-950/30" : "border-slate-100 bg-slate-50/50"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider">
                      {lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                      PT. FORESYNDO GLOBAL INDONESIA
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  className={`p-1.5 rounded-full hover:scale-105 active:scale-95 transition-all ${
                    darkMode ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                  }`}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed scrollbar-thin">
                {lang === "id" ? (
                  <>
                    <section className="space-y-2">
                      <p className="text-slate-400 italic text-xs">Terakhir Diperbarui: 25 Juni 2026</p>
                      <p>
                        Selamat datang di kebijakan privasi PT. Foresyndo Global Indonesia (FGI). Kami berkomitmen penuh untuk melindungi privasi pelanggan, klien, serta pengunjung situs web kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan menjaga informasi pribadi Anda dengan aman.
                      </p>
                    </section>

                    <section className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-2">
                      <h4 className="font-bold text-amber-500 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Check size={14} /> JAMINAN PERLINDUNGAN SUBSKRIPSI NEWSLETTER
                      </h4>
                      <p className="text-xs">
                        Bagi Anda yang mendaftarkan alamat email melalui formulir langganan buletin (newsletter) kami, PT. Foresyndo Global Indonesia menjamin 100% data Anda dilindungi secara penuh:
                      </p>
                      <ul className="list-disc pl-5 text-xs space-y-1 text-slate-300">
                        <li><strong>Kerahasiaan Mutlak:</strong> Kami tidak akan pernah menjual, menyewakan, membagikan, atau memperdagangkan daftar email pelanggan buletin kepada pihak ketiga mana pun di luar grup FGI.</li>
                        <li><strong>Penggunaan Terbatas:</strong> Email Anda hanya akan digunakan untuk mengirimkan pembaruan proyek perumahan, info rilis unit baru, artikel edukatif konstruksi, dan penawaran eksklusif internal FGI.</li>
                        <li><strong>Kontrol Penuh:</strong> Anda dapat berhenti berlangganan (opt-out / unsubscribe) kapan saja dengan mudah melalui tautan yang tertera di bagian bawah setiap email kami atau dengan menghubungi layanan pelanggan kami langsung.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">1. Data yang Kami Kumpulkan</h4>
                      <p>Kami mengumpulkan informasi dari Anda ketika Anda mengisi formulir konsultasi/kontak, mengajukan permohonan karir, atau berlangganan newsletter kami. Informasi ini mencakup:</p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Nama Lengkap</li>
                        <li>Alamat Email</li>
                        <li>Nomor Telepon / WhatsApp</li>
                        <li>Detail pesan, ketertarikan proyek, anggaran kalkulator, atau berkas CV lamaran kerja.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">2. Bagaimana Kami Menggunakan Informasi Anda</h4>
                      <p>Semua data yang kami kumpulkan digunakan secara bertanggung jawab untuk tujuan berikut:</p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Memproses pertanyaan, konsultasi rancangan, dan permintaan pemesanan unit proyek perumahan/komersial.</li>
                        <li>Menghubungi Anda kembali via WhatsApp, telepon, atau email mengenai penawaran proyek yang Anda minati.</li>
                        <li>Mengirimkan informasi berkala dan rilis properti terbaru kepada pelanggan buletin.</li>
                        <li>Mengevaluasi berkas lamaran kerja secara profesional pada modul karir.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">3. Keamanan Data & Server</h4>
                      <p>
                        PT. Foresyndo Global Indonesia menerapkan langkah-langkah keamanan teknis dan organisasi yang ketat untuk mencegah akses tidak sah, pengungkapan, perubahan, atau penghancuran data pribadi Anda. Server penyimpanan kami dilengkapi enkripsi SSL standar industri dan akses terbatas hanya untuk staf internal resmi.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">4. Kontak & Konsultasi Hak</h4>
                      <p>
                        Anda memiliki hak penuh untuk menanyakan data pribadi apa saja yang kami simpan, memperbaruinya, atau meminta penghapusan total informasi Anda dari basis data kami. Hubungi layanan pelanggan resmi FGI via nomor Hotline kami di <strong>0877 9733 0546</strong> untuk bantuan lebih lanjut.
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="space-y-2">
                      <p className="text-slate-400 italic text-xs">Last Updated: June 25, 2026</p>
                      <p>
                        Welcome to the Privacy Policy of PT. Foresyndo Global Indonesia (FGI). We are committed to protecting the privacy of our clients, partners, and website visitors. This policy outlines how we collect, use, store, and secure your personal information.
                      </p>
                    </section>

                    <section className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-2">
                      <h4 className="font-bold text-amber-500 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Check size={14} /> NEWSLETTER SUBSCRIBER PROTECTION GUARANTEE
                      </h4>
                      <p className="text-xs">
                        For users who register their email address through our newsletter subscription form, PT. Foresyndo Global Indonesia guarantees 100% data protection:
                      </p>
                      <ul className="list-disc pl-5 text-xs space-y-1 text-slate-300">
                        <li><strong>Absolute Confidentiality:</strong> We will never sell, rent, lease, share, or trade subscriber email lists with any third party outside the FGI corporate group.</li>
                        <li><strong>Restricted Usage:</strong> Your email will only be used to deliver official project updates, new housing unit releases, civil engineering newsletters, and exclusive internal promotions.</li>
                        <li><strong>Full Control:</strong> You can opt-out or unsubscribe at any time using the link provided at the bottom of our emails, or by directly contacting our support team.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">1. Information We Collect</h4>
                      <p>We collect details from you when you complete our consultation forms, apply for careers, or subscribe to our newsletter. This includes:</p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Phone / WhatsApp Number</li>
                        <li>Message inquiries, project interests, cost calculation results, or uploaded CV files for job vacancies.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">2. How We Use Your Data</h4>
                      <p>Any personal details collected are processed securely for the following scopes:</p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300">
                        <li>Processing your project consultation requests, design inquiries, and housing bookings.</li>
                        <li>Reaching out to you via WhatsApp, telephone, or email to discuss architectural planning or property details.</li>
                        <li>Sending periodic newsletters and news about premium developments to subscribers.</li>
                        <li>Evaluating job applicants' resumes objectively on our career portal.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">3. Information Security & Storage</h4>
                      <p>
                        PT. Foresyndo Global Indonesia deploys robust technical and organizational measures to prevent unauthorized data access, disclosure, alteration, or destruction. Our database servers utilize industry-standard SSL encryption and restricted, audited access policies.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold uppercase tracking-wider text-xs text-slate-300">4. Contact & Your Rights</h4>
                      <p>
                        You maintain full rights to inquire about what personal information we hold, update it, or request complete deletion of your records from our servers. Contact the official FGI customer helpline directly at <strong>0877 9733 0546</strong> for quick assistance.
                      </p>
                    </section>
                  </>
                )}
              </div>

              {/* Footer Controls */}
              <div className={`p-4 border-t flex justify-end gap-3 ${
                darkMode ? "border-slate-800 bg-slate-950/30" : "border-slate-100 bg-slate-50/50"
              }`}>
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider cursor-pointer ${
                    darkMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {lang === "id" ? "Tutup" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
