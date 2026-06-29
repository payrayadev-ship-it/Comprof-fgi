import { jsPDF } from "jspdf";

interface Opportunity {
  id: number;
  title: string;
  location: string;
  progress: number;
  target: string;
  minTicket: string;
  projectedRoi: string;
  sector: string;
}

/**
 * Utility to format a currency or date string with the current download timestamp.
 */
const getFormattedDate = (lang: "id" | "en"): string => {
  return new Date().toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Draws standard page header with FGI identity.
 */
const drawHeader = (doc: jsPDF, titleText: string, lang: "id" | "en") => {
  const pageWidth = 210;
  
  // Header background banner
  doc.setFillColor(15, 23, 42); // slate-900 (#0f172a)
  doc.rect(15, 12, 180, 22, "F");

  // Left golden accent line
  doc.setFillColor(245, 158, 11); // amber-500 (#f59e0b)
  doc.rect(15, 12, 2.5, 22, "F");

  // Corporate title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text("PT. FORESYNDO GLOBAL INDONESIA", 22, 21);

  // Document Type / Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(245, 158, 11); // amber-500
  doc.text(titleText.toUpperCase(), 22, 28);

  // Date of Issue
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = getFormattedDate(lang);
  doc.text(dateStr, pageWidth - 20, 21, { align: "right" });
};

/**
 * Draws standard page footer.
 */
const drawFooter = (doc: jsPDF, pageNum: number, totalPages: number, lang: "id" | "en") => {
  const pageHeight = 297;
  const pageWidth = 210;
  const footerY = pageHeight - 12;

  // Thin separator
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.3);
  doc.line(15, footerY - 4, pageWidth - 15, footerY - 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400

  const footerText = lang === "en"
    ? "FGI Investor Relations | cs.fgi@zohomail.com | +62 877-9733-0546"
    : "Investor Relations FGI | cs.fgi@zohomail.com | +62 877-9733-0546";
  doc.text(footerText, 15, footerY);

  const pageStr = lang === "en" ? `Page ${pageNum} of ${totalPages}` : `Halaman ${pageNum} dari ${totalPages}`;
  doc.text(pageStr, pageWidth - 15, footerY, { align: "right" });
};

/**
 * 1. Generates and downloads FGI Company Profile & Portfolio PDF
 */
export const downloadCompanyProfilePDF = (lang: "id" | "en") => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const titleText = lang === "en" ? "Company Profile & Portfolio" : "Profil Perusahaan & Portofolio";
  const totalPages = 2;

  // --- PAGE 1: COVER & OVERVIEW ---
  drawHeader(doc, titleText, lang);

  let y = 44;

  // About Company Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(lang === "en" ? "ABOUT PT. FORESYNDO GLOBAL INDONESIA" : "TENTANG PT. FORESYNDO GLOBAL INDONESIA", 15, y);
  
  doc.setFillColor(245, 158, 11); // amber-500 Accent bar
  doc.rect(15, y + 1.5, 12, 1, "F");
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85); // slate-700
  
  const aboutText = lang === "en"
    ? "PT. Foresyndo Global Indonesia (FGI) is a leading development, construction, and general contracting firm based in West Java, Indonesia. We integrate engineering precision, modern architectural aesthetic, and legal transparency to deliver premium housing developments, commercial complexes, and industrial solutions. Our Joint Venture (JV) program invites strategic investors to share in high-yield local opportunities with collateral-backed assets."
    : "PT. Foresyndo Global Indonesia (FGI) adalah perusahaan pengembangan, konstruksi, dan kontraktor umum terkemuka yang berbasis di Jawa Barat, Indonesia. Kami mengintegrasikan presisi teknik, estetika arsitektur modern, dan transparansi hukum untuk menghasilkan kompleks perumahan premium, ruko komersial, dan pergudangan industri. Program Joint Venture (JV) kami mengundang investor strategis untuk berbagi keuntungan dengan jaminan opsi aset fisik nyata.";
  
  const splitAbout = doc.splitTextToSize(aboutText, 180);
  doc.text(splitAbout, 15, y);
  y += (splitAbout.length * 4.5) + 8;

  // Vision & Mission
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "VISION & MISSION" : "VISI & MISI", 15, y);
  doc.rect(15, y + 1.5, 12, 1, "F");
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(lang === "en" ? "Vision:" : "Visi:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  
  const visionText = lang === "en"
    ? "To be Indonesia's most trusted partner in construction and property development, recognized for absolute structural integrity and highly secure investment structures."
    : "Menjadi mitra terpercaya di Indonesia dalam bidang konstruksi dan pengembangan properti, yang dikenal atas integritas struktural mutlak serta struktur investasi yang aman.";
  const splitVision = doc.splitTextToSize(visionText, 160);
  doc.text(splitVision, 30, y);
  y += (splitVision.length * 4.5) + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(217, 119, 6);
  doc.text(lang === "en" ? "Mission:" : "Misi:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const missionBullets = lang === "en"
    ? [
        "Deliver projects on-schedule with standard-setting quality controls.",
        "Provide direct physically backed collateral and notary deed assurance for all equity partners.",
        "Uphold legal, financial, and environmental compliance at all levels of execution."
      ]
    : [
        "Menyelesaikan proyek tepat waktu dengan standar pengendalian kualitas terbaik.",
        "Menyediakan jaminan aset fisik dan akta notaris resmi bagi setiap mitra pemodal.",
        "Menjunjung tinggi kepatuhan hukum, finansial, dan lingkungan pada setiap pelaksanaan proyek."
      ];

  for (const bullet of missionBullets) {
    doc.text("•", 30, y);
    const splitBullet = doc.splitTextToSize(bullet, 145);
    doc.text(splitBullet, 34, y);
    y += (splitBullet.length * 4.5) + 1.5;
  }
  y += 6;

  // Core Strengths Grid Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.rect(15, y, 180, 26, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "CORE VALUE:" : "NILAI INTI PERUSAHAAN:", 20, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  
  const valuesText = lang === "en"
    ? "INTEGRITY (Transparent audits) | TEAMWORK (Professional engineers) | EXCELLENCE (Rigid construction standards)"
    : "INTEGRITAS (Audit yang Transparan) | KERJASAMA (Insinyur Profesional) | KEUNGGULAN (Standar Konstruksi Kaku)";
  doc.text(valuesText, 20, y + 14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(lang === "en" ? "100% Legally Verified & Registered Contractor" : "Kontraktor Resmi Berizin & Terverifikasi Hukum 100%", 20, y + 21);

  drawFooter(doc, 1, totalPages, lang);

  // --- PAGE 2: PORTFOLIO & TRACK RECORD ---
  doc.addPage();
  drawHeader(doc, titleText, lang);

  y = 44;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "OUTSTANDING PORTFOLIO & ONGOING TRACK RECORD" : "PORTOFOLIO UNGGULAN & REKAM JEJAK PROYEK", 15, y);
  doc.rect(15, y + 1.5, 12, 1, "F");
  y += 8;

  // Table header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(15, y, 180, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(lang === "en" ? "Project Name" : "Nama Proyek", 18, y + 5.5);
  doc.text(lang === "en" ? "Location" : "Lokasi", 85, y + 5.5);
  doc.text(lang === "en" ? "Status" : "Status", 145, y + 5.5);
  doc.text(lang === "en" ? "Completion" : "Selesai", 175, y + 5.5);

  y += 8;

  const trackRecord = [
    { name: "Grand Foresyndo Phase 1 & 2", loc: "Grogol, Kediri", status: lang === "en" ? "Completed" : "Selesai", year: "2024" },
    { name: "FGI Office Headquarter", loc: "Kediri Kota", status: lang === "en" ? "Completed" : "Selesai", year: "2024" },
    { name: "Grand Foresyndo Phase 3", loc: "Grogol, Kediri", status: lang === "en" ? "Construction" : "Pembangunan", year: "2026 (Est.)" },
    { name: "FGI Hub Business Park", loc: "Jatitujuh, Majalengka", status: lang === "en" ? "Infrastructure" : "Infrastruktur", year: "2026 (Est.)" },
    { name: "Smart Logistics Warehouse", loc: "Kertajati, Majalengka", status: lang === "en" ? "Earthworks" : "Land-Clearing", year: "2027 (Est.)" },
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  trackRecord.forEach((proj, idx) => {
    // alternating background
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, 180, 8, "F");
    }
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(15, y + 8, 195, y + 8);

    doc.text(proj.name, 18, y + 5.5);
    doc.text(proj.loc, 85, y + 5.5);
    doc.text(proj.status, 145, y + 5.5);
    doc.text(proj.year, 175, y + 5.5);
    y += 8;
  });

  y += 12;

  // Contact & Corporate Details Box
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "CORPORATE TRANSPARENCY & LEGALITIES" : "LEGALITAS & KORPORASI", 15, y);
  doc.rect(15, y + 1.5, 12, 1, "F");
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  const legalBulletPoints = lang === "en"
    ? [
        "Company Deed: Notaris Lia Kumala Dewi, S.H., M.Kn.",
        "NIB (Nomor Induk Berusaha): 2610220060609 (General Contractor & Developer)",
        "Corporate Account: Bank Mandiri - PT. Foresyndo Global Indonesia (IDR Account)",
        "Official Auditor: Kantor Akuntan Publik (KAP) Partner (Annual Financial Reviews)"
      ]
    : [
        "Akta Perusahaan: Notaris Lia Kumala Dewi, S.H., M.Kn.",
        "NIB (Nomor Induk Berusaha): 2610220060609 (Kontraktor Umum & Real Estat)",
        "Rekening Resmi: Bank Mandiri - PT. Foresyndo Global Indonesia (Rupiah)",
        "Kemitraan Audit: Tinjauan Keuangan Berkala Kantor Akuntan Publik (KAP)"
      ];

  for (const bp of legalBulletPoints) {
    doc.setFillColor(245, 158, 11);
    doc.rect(16, y + 0.8, 1.5, 1.5, "F");
    doc.text(bp, 21, y + 2.2);
    y += 5.5;
  }

  y += 8;

  // Signoff stamp box
  doc.setDrawColor(245, 158, 11, 0.4);
  doc.setLineWidth(0.3);
  doc.setFillColor(248, 250, 252);
  doc.rect(15, y, 180, 24, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("PT. FORESYNDO GLOBAL INDONESIA - BOARD OF DIRECTORS", 20, y + 6);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(lang === "en" 
    ? "This document is verified and officially published for public investor relations. Copying without approval is prohibited."
    : "Dokumen ini terverifikasi dan diterbitkan secara resmi untuk kepentingan hubungan investor publik.", 20, y + 12);
  doc.text("FGI ID Stamp: FGI-REL-2026-CO-019", 20, y + 18);

  drawFooter(doc, 2, totalPages, lang);

  // Save PDF
  doc.save(lang === "en" ? "FGI_Company_Profile_and_Portfolio.pdf" : "Profil_Perusahaan_dan_Portofolio_FGI.pdf");
};

/**
 * 2. Generates and downloads the Standard Joint Venture Agreement Draft PDF
 */
export const downloadJVAgreementDraftPDF = (lang: "id" | "en") => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const titleText = lang === "en" ? "JV Agreement Standard Draft" : "Draf Perjanjian Kerjasama JV";
  const totalPages = 3;

  // --- PAGE 1: PREAMBLE & ARTICLES 1-2 ---
  drawHeader(doc, titleText, lang);

  let y = 44;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  const jvTitle = lang === "en"
    ? "JOINT VENTURE PARTNERSHIP AGREEMENT"
    : "SURAT PERJANJIAN KERJASAMA / JOINT VENTURE AGREEMENT";
  doc.text(jvTitle, 105, y, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(lang === "en" ? "Document Code: FGI-JV-DRAFT-2026-REV3" : "Kode Dokumen: FGI-JV-DRAFT-2026-REV3", 105, y + 5, { align: "center" });

  y += 12;

  const preamble = lang === "en"
    ? "This Joint Venture Agreement (hereinafter referred to as the 'Agreement') is made and entered into on this day [DATE] by and between the following parties:"
    : "Surat Perjanjian Kerjasama Joint Venture ini (selanjutnya disebut 'Perjanjian') dibuat dan disepakati pada hari ini [TANGGAL] oleh dan di antara pihak-pihak di bawah ini:";
  
  const splitPreamble = doc.splitTextToSize(preamble, 180);
  doc.text(splitPreamble, 15, y);
  y += (splitPreamble.length * 4.5) + 6;

  // Party 1
  doc.setFont("helvetica", "bold");
  doc.text(lang === "en" ? "1. FIRST PARTY (Developer & Contractor):" : "1. PIHAK PERTAMA (Pengembang & Pelaksana):", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text("   PT. Foresyndo Global Indonesia (FGI), represented by Board of Directors,", 15, y + 4.5);
  doc.text("   Official Address: Jalan Banjaran Raya KM 13 Langonsari, Pameungpeuk, Kabupaten Bandung, Jawa Barat, Indonesia.", 15, y + 9);
  y += 14;

  // Party 2
  doc.setFont("helvetica", "bold");
  doc.text(lang === "en" ? "2. SECOND PARTY (Mitra Investor / Equity Partner):" : "2. PIHAK KEDUA (Mitra Pemodal / Investor):", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text(lang === "en" 
    ? "   Individual or Legal Entity signing below, whose capital is placed into selected FGI projects."
    : "   Perorangan atau Badan Hukum yang menandatangani perjanjian ini, yang menyertakan modal pada proyek pilihan.", 15, y + 4.5);
  y += 9;

  const preamble2 = lang === "en"
    ? "Both parties agree to cooperate under a Joint Venture profit-sharing model for construction development under the following terms and articles:"
    : "Kedua belah pihak sepakat untuk melakukan kerjasama kemitraan modal dengan bagi hasil (Joint Venture) konstruksi dengan syarat-syarat dan pasal-pasal berikut:";
  const splitPreamble2 = doc.splitTextToSize(preamble2, 180);
  doc.text(splitPreamble2, 15, y);
  y += (splitPreamble2.length * 4.5) + 8;

  // PASAL 1
  doc.setFont("helvetica", "bold");
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(lang === "en" ? "ARTICLE 1: SCOPE OF COOPERATION" : "PASAL 1: RUANG LINGKUP KERJASAMA", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const p1Text = lang === "en"
    ? "The First Party as the official developer of the property projects commits to construct, market, and manage the designated property development. The Second Party commits to provide active capital placement designated exclusively for purchasing raw materials and labor operations of the selected project."
    : "Pihak Pertama selaku pengembang proyek properti berkewajiban merencanakan, melaksanakan pembangunan fisik, serta memasarkan unit properti. Pihak Kedua menyediakan penyertaan modal kerja aktif yang digunakan khusus untuk operasional konstruksi dan pengadaan material proyek terpilih.";
  const splitP1 = doc.splitTextToSize(p1Text, 180);
  doc.text(splitP1, 15, y + 4.5);
  y += (splitP1.length * 4.5) + 8;

  // PASAL 2
  doc.setFont("helvetica", "bold");
  doc.setTextColor(217, 119, 6);
  doc.text(lang === "en" ? "ARTICLE 2: CAPITAL CONTRIBUTION & PLACEMENT" : "PASAL 2: BESARAN MODAL & PENYETORAN", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const p2Text = lang === "en"
    ? "Capital from the Second Party shall be wired to the official bank account of PT. Foresyndo Global Indonesia in full upon signing. Minimum capital placement is subject to the project type, start from IDR 250,000,000 up to IDR 1,000,000,000. No cash payment is permitted."
    : "Penyertaan modal kerja oleh Pihak Kedua ditransfer penuh ke rekening bank resmi PT. Foresyndo Global Indonesia setelah penandatanganan akta perjanjian. Batas modal kerja proporsional minimum bergantung jenis proyek, dimulai dari Rp 250.000.000 hingga Rp 1.000.000.000. Tidak diperkenankan pembayaran tunai.";
  const splitP2 = doc.splitTextToSize(p2Text, 180);
  doc.text(splitP2, 15, y + 4.5);

  drawFooter(doc, 1, totalPages, lang);

  // --- PAGE 2: ARTICLES 3-5 ---
  doc.addPage();
  drawHeader(doc, titleText, lang);

  y = 44;

  // PASAL 3
  doc.setFont("helvetica", "bold");
  doc.setTextColor(217, 119, 6);
  doc.text(lang === "en" ? "ARTICLE 3: PROFIT DISTRIBUTION & ROI" : "PASAL 3: BAGI HASIL KEUNTUNGAN & ROI", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const p3Text = lang === "en"
    ? "The Second Party is entitled to receive an annual return (ROI) ranging from 12% to 17% per annum of the capital contribution. Profit yields are paid out at the end of each development phase, or on a monthly/quarterly schedule as defined specifically in the project annex."
    : "Pihak Kedua berhak mendapatkan bagi hasil (ROI) tahunan tetap berkisar antara 12% hingga 17% per tahun dari modal yang ditempatkan. Hasil keuntungan akan dibagikan pada akhir periode pengembangan atau secara berkala bulanan/triwulanan sesuai dengan amandemen detail proyek.";
  const splitP3 = doc.splitTextToSize(p3Text, 180);
  doc.text(splitP3, 15, y + 4.5);
  y += (splitP3.length * 4.5) + 10;

  // PASAL 4
  doc.setFont("helvetica", "bold");
  doc.setTextColor(217, 119, 6);
  doc.text(lang === "en" ? "ARTICLE 4: COLLATERAL & SECURITY ASSURANCE" : "PASAL 4: JAMINAN KEAMANAN & KOLATERAL", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const p4Text = lang === "en"
    ? "To guarantee investment safety, the First Party covenants that all placements are backed by physical land or building certificates of equivalent value held under a provisional ownership option deed. In the event of default, the Second Party has the legal priority right to liquidate or transfer ownership of the pledged physical assets."
    : "Untuk memberikan keamanan modal secara mutlak, Pihak Pertama memberikan jaminan berupa aset fisik (tanah atau bangunan sertifikat Hak Milik/HGB) milik proyek FGI yang nilainya proporsional dengan modal investasi. Jika terjadi wanprestasi, Pihak Kedua memiliki hak prioritas untuk mengeksekusi jaminan tersebut.";
  const splitP4 = doc.splitTextToSize(p4Text, 180);
  doc.text(splitP4, 15, y + 4.5);
  y += (splitP4.length * 4.5) + 10;

  // PASAL 5
  doc.setFont("helvetica", "bold");
  doc.setTextColor(217, 119, 6);
  doc.text(lang === "en" ? "ARTICLE 5: AUDITING & PROGRESS REPORTING" : "PASAL 5: AUDIT & LAPORAN PERKEMBANGAN", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const p5Text = lang === "en"
    ? "The First Party commits to issue monthly construction audit reports, including high-definition progress photos, ledger sheets, and cost tracking sheets. The Second Party has the right to schedule structural site visits with our civil engineer on-duty at any reasonable time."
    : "Pihak Pertama berkewajiban memberikan laporan audit konstruksi bulanan secara berkala kepada Pihak Kedua, mencakup foto progres lapangan, rincian buku besar, dan persentase fisik pembangunan. Pihak Kedua berhak menjadwalkan inspeksi lapangan ke lokasi proyek bersama insinyur lapangan kami.";
  const splitP5 = doc.splitTextToSize(p5Text, 180);
  doc.text(splitP5, 15, y + 4.5);

  drawFooter(doc, 2, totalPages, lang);

  // --- PAGE 3: ARTICLES 6 & SIGNATURES ---
  doc.addPage();
  drawHeader(doc, titleText, lang);

  y = 44;

  // PASAL 6
  doc.setFont("helvetica", "bold");
  doc.setTextColor(217, 119, 6);
  doc.text(lang === "en" ? "ARTICLE 6: DISPUTE RESOLUTION" : "PASAL 6: PENYELESAIAN PERSELISIHAN", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  const p6Text = lang === "en"
    ? "Any dispute or interpretation issue arising out of this Agreement shall be resolved through friendly consultations. If no resolution is reached within thirty (30) days, the dispute shall be referred to the District Court (Pengadilan Negeri) of Kediri, East Java, Indonesia."
    : "Segala perbedaan penafsiran atau sengketa yang timbul akibat pelaksanaan perjanjian ini akan diselesaikan secara musyawarah mufakat. Apabila kesepakatan tidak tercapai dalam tiga puluh (30) hari, sengketa akan diselesaikan melalui jalur hukum di Pengadilan Negeri Kediri, Jawa Timur.";
  const splitP6 = doc.splitTextToSize(p6Text, 180);
  doc.text(splitP6, 15, y + 4.5);
  y += (splitP6.length * 4.5) + 16;

  // Signatures Header
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "IN WITNESS WHEREOF, the parties hereto have executed this agreement:" : "Demikian Perjanjian ini dibuat dan disepakati secara sadar tanpa paksaan:", 15, y);
  y += 15;

  // Dual signature column layout
  doc.setFont("helvetica", "bold");
  doc.text(lang === "en" ? "FIRST PARTY," : "PIHAK PERTAMA,", 15, y);
  doc.text(lang === "en" ? "SECOND PARTY," : "PIHAK KEDUA,", 120, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("PT. FORESYNDO GLOBAL INDONESIA", 15, y + 5);
  doc.text(lang === "en" ? "[MITRA INVESTOR / PARTNER]" : "[MITRA PEMODAL INDIVIDUAL]", 120, y + 5);

  // Spacing for hand signatures
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.1);
  doc.line(15, y + 25, 65, y + 25);
  doc.line(120, y + 25, 170, y + 25);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Board of Directors, PT. FGI", 15, y + 29);
  doc.text(lang === "en" ? "[FullName & Stamp]" : "[Nama Lengkap & Meterai]", 120, y + 29);

  drawFooter(doc, 3, totalPages, lang);

  doc.save(lang === "en" ? "FGI_Standard_JV_Agreement_Draft.pdf" : "Draft_Standar_Perjanjian_JV_FGI.pdf");
};

/**
 * 3. Generates and downloads specific project prospectus offering PDF
 */
export const downloadOpportunityProspectusPDF = (opp: Opportunity, lang: "id" | "en") => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const titleText = lang === "en" ? "Offering Prospectus" : "Prospektus Penawaran Proyek";
  const totalPages = 2;

  // --- PAGE 1: OFFER & FINANCIAL DETAILS ---
  drawHeader(doc, titleText, lang);

  let y = 44;

  // Project title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  const splitTitle = doc.splitTextToSize(opp.title, 180);
  doc.text(splitTitle, 15, y);
  y += (splitTitle.length * 6) + 1;

  // Location and tag
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(opp.sector.toUpperCase(), 15, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`  |   ${opp.location}`, 15 + doc.getTextWidth(opp.sector.toUpperCase()) + 2, y);
  y += 10;

  // Executive summary
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "1. PROJECT INVESTMENT OVERVIEW" : "1. RINGKASAN INVESTASI PROYEK", 15, y);
  doc.setFillColor(245, 158, 11);
  doc.rect(15, y + 1.2, 10, 0.8, "F");
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const introText = lang === "en"
    ? `PT. Foresyndo Global Indonesia releases this official project prospectus for funding cooperation. Our project target is ${opp.target} with development progress sitting at ${opp.progress}%. The funding structure operates under a strict, notary-notarized Joint Venture deed with physical building collateral option provided directly to our equity partners.`
    : `PT. Foresyndo Global Indonesia menerbitkan lembar prospektus resmi ini untuk skema modal kemitraan kerja konstruksi. Proyek ini memiliki target pendanaan ${opp.target} dengan perkembangan progres saat ini berada pada angka ${opp.progress}%. Seluruh pembiayaan diikat secara Notariil dan dijaminkan melalui jaminan aset bangunan fisik resmi dari FGI.`;
  
  const splitIntro = doc.splitTextToSize(introText, 180);
  doc.text(splitIntro, 15, y);
  y += (splitIntro.length * 4.5) + 8;

  // Key stats box (3 grid)
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.rect(15, y, 180, 24, "FD");

  // Grid vertical lines
  doc.line(15 + 60, y, 15 + 60, y + 24);
  doc.line(15 + 120, y, 15 + 120, y + 24);

  // Box 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(lang === "en" ? "TARGET CAPITAL" : "TARGET MODAL", 20, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(opp.target, 20, y + 15);

  // Box 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(lang === "en" ? "MINIMUM TICKET" : "PARTISIPASI MINIMAL", 15 + 65, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(opp.minTicket, 15 + 65, y + 15);

  // Box 3
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(lang === "en" ? "PROJECTED ROI" : "ESTIMASI BAGI HASIL", 15 + 125, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(opp.projectedRoi, 15 + 125, y + 15);

  y += 32;

  // Business Sector details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "2. SECTOR SPECIFIC HIGHLIGHTS" : "2. KEUNGGULAN SEKTOR SPESIFIK", 15, y);
  doc.setFillColor(245, 158, 11);
  doc.rect(15, y + 1.2, 10, 0.8, "F");
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  let sectorHighlights = [];
  if (opp.sector === "residential") {
    sectorHighlights = lang === "en"
      ? [
          "High Demand: Kediri airport construction drives aggressive suburban residential demand.",
          "Phase 3 expansion builds on complete utilities (concrete roads, drainage, water) of Phase 1 & 2.",
          "Extremely low risk with pre-construction bookings already at 35%."
        ]
      : [
          "Permintaan Tinggi: Bandara baru Dhoho Kediri mendorong peningkatan hunian suburban yang agresif.",
          "Perluasan Tahap 3 memanfaatkan utilitas siap pakai (jalan beton, drainase, listrik) dari Tahap 1 & 2.",
          "Risiko sangat rendah dengan pendaftaran unit pre-konstruksi telah melampaui 35%."
        ];
  } else if (opp.sector === "commercial") {
    sectorHighlights = lang === "en"
      ? [
          "Strategic Location: Positioned right along Majalengka high-traffic provincial road networks.",
          "Dual-income stream: Land value appreciation combined with robust tenant rental demands.",
          "Complete building permit (PBG) and land allocation certificate are 100% cleared."
        ]
      : [
          "Lokasi Strategis: Berada langsung di jalur arteri utama provinsi Majalengka yang padat.",
          "Aliran pendapatan ganda: Apresiasi nilai tanah disertai potensi sewa ruko yang sangat tinggi.",
          "Persetujuan Bangunan Gedung (PBG) serta sertifikat alokasi lahan telah selesai 100%."
        ];
  } else {
    sectorHighlights = lang === "en"
      ? [
          "Kertajati Airport Link: Smart logistics warehouses designed for modern shipping operators.",
          "High-tech smart infrastructure: fiber optics, heavy-duty concrete load bearing (up to 40 tons).",
          "Includes automated CCTV, 24/7 security gate system, and fully compliant fire suppression systems."
        ]
      : [
          "Koneksi Bandara Kertajati: Kompleks pergudangan pintar yang dirancang untuk operator kargo logistik.",
          "Infrastruktur modern: serat optik siap pakai, struktur beton berkekuatan tinggi (beban hingga 40 ton).",
          "Dilengkapi CCTV otomatis, gerbang keamanan 24 jam, serta instalasi pemadam kebakaran modern."
        ];
  }

  for (const bullet of sectorHighlights) {
    doc.text("•", 18, y);
    doc.text(bullet, 23, y);
    y += 5;
  }

  drawFooter(doc, 1, totalPages, lang);

  // --- PAGE 2: RISK, COLLATERAL, SIGN OFF ---
  doc.addPage();
  drawHeader(doc, titleText, lang);

  y = 44;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "3. RISK MITIGATION & PHYSICAL COLLATERAL" : "3. MITIGASI RISIKO & JAMINAN KOLATERAL", 15, y);
  doc.setFillColor(245, 158, 11);
  doc.rect(15, y + 1.2, 10, 0.8, "F");
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const riskText = lang === "en"
    ? "PT. Foresyndo Global Indonesia implements a three-tier risk reduction protocol. Every project has a dedicated backup fund holding up to 15% of construction budget for cost fluctuation mitigation. More importantly, every individual investor receives real physical collateral under a notary option deed. The legal valuation of the collateral land/building is appraised independently to match at least 120% of your placed investment capital value."
    : "PT. Foresyndo Global Indonesia menerapkan protokol perlindungan investasi berlapis. Setiap proyek memiliki alokasi dana cadangan (backup fund) sebesar 15% untuk mengatasi fluktuasi biaya material. Setiap investor akan diikat dengan akta jaminan hak opsi atas kepemilikan aset fisik tanah/bangunan proyek yang ditaksir secara independen senilai minimal 120% dari nilai modal Anda.";

  const splitRisk = doc.splitTextToSize(riskText, 180);
  doc.text(splitRisk, 15, y);
  y += (splitRisk.length * 4.5) + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(lang === "en" ? "4. FUNDING PHASING & DISBURSEMENT TIMELINE" : "4. ALUR TAHAPAN INVESTASI & PENCAIRAN", 15, y);
  doc.setFillColor(245, 158, 11);
  doc.rect(15, y + 1.2, 10, 0.8, "F");
  y += 6;

  // Timeline table
  doc.setFillColor(248, 250, 252);
  doc.rect(15, y, 180, 26, "F");
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y + 8, 195, y + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(lang === "en" ? "Phase" : "Tahap", 18, y + 5.5);
  doc.text(lang === "en" ? "Action & Progress" : "Kegiatan & Kemajuan", 45, y + 5.5);
  doc.text(lang === "en" ? "Payout / Target Date" : "Bagi Hasil / Tanggal Target", 130, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.text("Phase 1", 18, y + 14);
  doc.text(lang === "en" ? "Capital Deposit & Deed Notary" : "Penyetoran Modal & Akta Notaris", 45, y + 14);
  doc.text(lang === "en" ? "Within 7 Working Days" : "Dalam 7 Hari Kerja", 130, y + 14);

  doc.text("Phase 2", 18, y + 21);
  doc.text(lang === "en" ? "Quarterly Audit & Payout Yields" : "Audit Kuartal & Pencairan Hasil", 45, y + 21);
  doc.text(lang === "en" ? "Every 3 Months Scheduled" : "Terjadwal Setiap 3 Bulan", 130, y + 21);

  y += 34;

  // Footer seal / inquiry block
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(15, y, 180, 26, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11); // amber-500
  doc.text(lang === "en" ? "INTERESTED IN THIS ACTIVE INVESTMENT COLLABORATION?" : "TERTARIK BERKOLABORASI PADA INVESTASI AKTIF INI?", 20, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  const promptContact = lang === "en"
    ? "Submit the FGI Inquiry form in the portal, or scan the WhatsApp QR code to consult with our Relationship Manager immediately."
    : "Kirim formulir kemitraan FGI di portal, atau pangkas waktu dengan memindai WhatsApp QR code untuk chat dengan Manager Hubungan Investor kami.";
  const splitPrompt = doc.splitTextToSize(promptContact, 170);
  doc.text(splitPrompt, 20, y + 13);

  drawFooter(doc, 2, totalPages, lang);

  doc.save(`FGI_Prospectus_${opp.id}_${opp.sector}.pdf`);
};
