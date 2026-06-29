import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Users, 
  Award, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  CircleDollarSign, 
  Phone,
  CheckCircle2,
  Lock
} from "lucide-react";

interface HeroCarouselProps {
  lang: "id" | "en";
  darkMode: boolean;
  scrollTo: (id: string) => void;
}

export default function HeroCarousel({ lang, darkMode, scrollTo }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Touch coordinates for swipe navigation
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Stats count state for Banner 3
  const [statsCount, setStatsCount] = useState({ investors: 0, projects: 0, satisfaction: 0 });

  // Live Countdown state for Banner 4 (Dynamic 2-day countdown)
  const [countdown, setCountdown] = useState({ days: "02", hours: "14", minutes: "32", seconds: "10" });

  const TOTAL_BANNERS = 8;
  const AUTOPLAY_TIME = 5000; // 5 seconds
  const PROGRESS_TICK = 50; // Progress bar updates every 50ms

  // Handle Autoplay and Progress Bar
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % TOTAL_BANNERS);
          return 0;
        }
        return prev + (PROGRESS_TICK / AUTOPLAY_TIME) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Reset progress bar on slide change
  useEffect(() => {
    setProgress(0);

    // Reset and trigger stats counter animation if we enter Banner 3 (index 2)
    if (currentIndex === 2) {
      setStatsCount({ investors: 0, projects: 0, satisfaction: 0 });
      const duration = 1200; // 1.2s animation
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;

      const statsInterval = setInterval(() => {
        step++;
        setStatsCount({
          investors: Math.min(Math.round((500 / steps) * step), 500),
          projects: Math.min(Math.round((120 / steps) * step), 120),
          satisfaction: Math.min(Math.round((99 / steps) * step), 99),
        });

        if (step >= steps) {
          clearInterval(statsInterval);
        }
      }, stepTime);

      return () => clearInterval(statsInterval);
    }
  }, [currentIndex]);

  // Live countdown timer for Banner 4 (index 3)
  useEffect(() => {
    // Generate a fixed target time (e.g. always 2 days, 14 hours ahead from user's current session or standard weekly reset)
    // To keep it permanently fresh and ticking, we save a target timestamp in sessionStorage or generate a stable future reset
    const now = new Date().getTime();
    let targetTime = localStorage.getItem("fgi_promo_countdown_target");
    
    if (!targetTime || parseInt(targetTime) < now) {
      const stableFuture = now + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (32 * 60 * 1000);
      localStorage.setItem("fgi_promo_countdown_target", stableFuture.toString());
      targetTime = stableFuture.toString();
    }

    const targetTimestamp = parseInt(targetTime);

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = targetTimestamp - currentTime;

      if (difference <= 0) {
        // Reset countdown to a new 2 days
        const freshFuture = currentTime + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (32 * 60 * 1000);
        localStorage.setItem("fgi_promo_countdown_target", freshFuture.toString());
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0")
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_BANNERS) % TOTAL_BANNERS);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_BANNERS);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // min swipe distance in px

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Banner data definition
  const banners = [
    // Banner 1
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
      titleId: "Investasi Properti Masa Depan Dimulai Hari Ini",
      titleEn: "Future Property Investment Starts Today",
      subId: "Bersama PT. FORESYNDO GLOBAL INDONESIA bangun aset yang terus bertumbuh.",
      subEn: "Build ever-growing assets together with PT. FORESYNDO GLOBAL INDONESIA.",
      btn1Id: "Pelajari Sekarang",
      btn1En: "Learn More",
      btn2Id: "Hubungi Kami",
      btn2En: "Contact Us",
      badgeId: "PREMIUM ADVISORY",
      badgeEn: "PREMIUM ADVISORY",
      extra: (
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/40 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
            <TrendingUp size={12} />
            <span>Growth</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/40 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck size={12} />
            <span>Shield</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/40 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <Building2 size={12} />
            <span>Building</span>
          </div>
        </div>
      )
    },
    // Banner 2
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      titleId: "Hunian Strategis Nilai Investasi Tinggi",
      titleEn: "Strategic Housing with High Investment Value",
      subId: "Lokasi pilihan dengan potensi kenaikan nilai yang terus meningkat.",
      subEn: "Choice locations with potential for ever-increasing value appreciation.",
      btn1Id: "Mulai Hubungi",
      btn1En: "Get in Touch",
      badgeId: "HOT INVESTMENT",
      badgeEn: "HOT INVESTMENT",
      badgeColor: "bg-red-500 text-white animate-pulse"
    },
    // Banner 3
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
      titleId: "Bangun Masa Depan Bersama FORESYNDO GLOBAL INDONESIA",
      titleEn: "Build the Future with FORESYNDO GLOBAL INDONESIA",
      subId: "Investasi aman, legal, transparan, dan profesional.",
      subEn: "Secure, legal, transparent, and professional investment.",
      btn1Id: "Lihat Kemitraan",
      btn1En: "View Partnership",
      badgeId: "PARTNERSHIP MATRIX",
      badgeEn: "PARTNERSHIP MATRIX",
      extra: (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 max-w-md">
          <div className="bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
            <div className="text-sm sm:text-lg font-black text-amber-400">{statsCount.investors}+</div>
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-300 font-bold">Investor</div>
          </div>
          <div className="bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
            <div className="text-sm sm:text-lg font-black text-amber-400">{statsCount.projects}+</div>
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-300 font-bold">Project</div>
          </div>
          <div className="bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
            <div className="text-sm sm:text-lg font-black text-emerald-400">{statsCount.satisfaction}%</div>
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-300 font-bold">Satisfaction</div>
          </div>
        </div>
      )
    },
    // Banner 4
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
      titleId: "Peluang Investasi Terbaik Tahun Ini",
      titleEn: "The Best Investment Opportunity This Year",
      subId: "Jangan lewatkan kesempatan eksklusif kepemilikan unit premium.",
      subEn: "Don't miss out on this exclusive premium unit ownership opportunity.",
      btn1Id: "Ambil Promo",
      btn1En: "Claim Promo",
      badgeId: "LIMITED UNIT",
      badgeEn: "LIMITED UNIT",
      badgeColor: "bg-amber-500 text-slate-950 font-black",
      extra: (
        <div className="mt-2.5 sm:mt-4 p-2.5 sm:p-3 bg-red-500/10 border border-red-500/30 rounded-xl max-w-sm flex items-center gap-3">
          <Clock size={16} className="text-red-400 animate-spin" />
          <div>
            <div className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Promo Berakhir :</div>
            <div className="flex gap-1.5 text-xs font-black text-white mt-0.5 font-mono">
              <span className="bg-slate-950/80 px-1.5 py-0.5 rounded">{countdown.days}d</span>:
              <span className="bg-slate-950/80 px-1.5 py-0.5 rounded">{countdown.hours}h</span>:
              <span className="bg-slate-950/80 px-1.5 py-0.5 rounded">{countdown.minutes}m</span>:
              <span className="bg-slate-950/80 px-1.5 py-0.5 rounded text-red-400">{countdown.seconds}s</span>
            </div>
          </div>
        </div>
      )
    },
    // Banner 5
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop",
      titleId: "Kemitraan Properti Untuk Investor",
      titleEn: "Property Partnership for Investors",
      subId: "Skema Joint Venture profesional dengan bagi hasil transparan.",
      subEn: "Professional Joint Venture schemes with transparent profit sharing.",
      btn1Id: "Gabung Mitra",
      btn1En: "Join Partner",
      badgeId: "JOINT VENTURE",
      badgeEn: "JOINT VENTURE",
      extra: (
        <div className="flex gap-2.5 mt-3">
          <div className="w-8 h-8 rounded-lg bg-slate-950/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-amber-400" title="Handshake">
            <Users size={16} />
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-950/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-amber-400" title="Secure Finance">
            <CircleDollarSign size={16} />
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-950/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-amber-400" title="Consistent Return">
            <TrendingUp size={16} />
          </div>
        </div>
      )
    },
    // Banner 6
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
      titleId: "Legalitas Lengkap dan Terpercaya",
      titleEn: "Complete & Trusted Legality",
      subId: "Semua proyek bersertifikat resmi demi kenyamanan dan keamanan hukum Anda.",
      subEn: "All projects are officially certified for your convenience and legal security.",
      btn1Id: "Periksa Dokumen",
      btn1En: "Check Documents",
      badgeId: "100% LEGAL",
      badgeEn: "100% LEGAL",
      badgeColor: "bg-emerald-600 text-white"
    },
    // Banner 7
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop",
      titleId: "Return Investasi Lebih Menjanjikan",
      titleEn: "More Promising Investment Returns",
      subId: "Struktur finansial terencana untuk menjamin pertumbuhan modal yang optimal.",
      subEn: "Planned financial structures to guarantee optimal capital growth.",
      btn1Id: "Lihat Proyeksi",
      btn1En: "View Projection",
      badgeId: "HIGH APPRECIATION",
      badgeEn: "HIGH APPRECIATION",
      extra: (
        <div className="mt-2.5 flex items-center gap-2 text-[10px] text-amber-400 uppercase font-black tracking-widest bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg max-w-xs animate-bounce">
          <Sparkles size={12} />
          <span>Optimal Return Guaranteed</span>
        </div>
      )
    },
    // Banner 8
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
      titleId: "Selamat Datang di PT. FORESYNDO GLOBAL INDONESIA",
      titleEn: "Welcome to PT. FORESYNDO GLOBAL INDONESIA",
      subId: "Partner terpercaya untuk investasi properti dan pengembangan kawasan masa depan.",
      subEn: "Trusted partner for property investment and future regional development.",
      btn1Id: "Mulai Investasi",
      btn1En: "Start Investing",
      badgeId: "FGI CORPORATE GATEWAY",
      badgeEn: "FGI CORPORATE GATEWAY",
    }
  ];

  const currentBanner = banners[currentIndex];

  return (
    <div 
      id="hero-carousel-root"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer wrapper with 24px Rounded Corner and Premium Shadow */}
      <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[620px] rounded-[24px] overflow-hidden bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(244,180,0,0.05)] border border-amber-500/20">
        
        {/* Ambient top-left gradient light */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#F4B400]/20 blur-3xl pointer-events-none z-10" />
        
        {/* Background Images with Zoom Transition */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/75 to-slate-950/40 z-10 mix-blend-multiply" />
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={currentBanner.image}
              alt="PT Foresyndo Global Indonesia Premium Property Showcase"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        {/* Floating background decorative shape for high fidelity */}
        <div className="absolute right-12 top-12 w-48 h-48 rounded-full bg-[#F4B400]/10 blur-2xl pointer-events-none animate-pulse z-10" />

        {/* Content Glass Card Panel */}
        <div className="absolute inset-0 flex items-center justify-start z-20 px-6 sm:px-12 lg:px-20">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
            
            {/* Slide Badge Category / Indicator */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${currentBanner.badgeColor || "bg-gradient-to-r from-amber-500/15 to-yellow-500/10 text-amber-400 border border-amber-400/40 shadow-[0_2px_15px_rgba(244,180,0,0.15)]"}`}>
                  <Sparkles size={10} className="mr-1.5 animate-spin text-[#F4B400]" />
                  {lang === "en" ? currentBanner.badgeEn : currentBanner.badgeId}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Slide Main Heading with Slide-Up Transition */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg"
              >
                {lang === "en" ? currentBanner.titleEn : currentBanner.titleId}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle / Description */}
            <AnimatePresence mode="wait">
              { (currentBanner.subId || currentBanner.subEn) && (
                <motion.p
                  key={`sub-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-xs sm:text-sm lg:text-base text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow border-l-4 border-[#F4B400] pl-3.5"
                >
                  {lang === "en" ? currentBanner.subEn : currentBanner.subId}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Extra Dynamic Blocks (Stats, countdowns, feature badges) */}
            <AnimatePresence mode="wait">
              {currentBanner.extra && (
                <motion.div
                  key={`extra-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {currentBanner.extra}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions CTA buttons */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`actions-${currentIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-3 sm:gap-4 pt-2"
              >
                <button
                  onClick={() => scrollTo("kontak")}
                  className="group relative px-5 py-3 sm:px-6 sm:py-3.5 overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-[#F4B400] to-yellow-500 hover:from-amber-300 hover:via-amber-400 hover:to-yellow-400 text-slate-950 text-[11px] font-black uppercase tracking-widest shadow-[0_4px_20px_rgba(244,180,0,0.3)] hover:shadow-[0_8px_30px_rgba(244,180,0,0.5)] transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-amber-200/50"
                >
                  {/* Subtle shine light effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
                  <span>{lang === "en" ? currentBanner.btn1En : currentBanner.btn1Id}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {currentBanner.btn2Id && (
                  <button
                    onClick={() => scrollTo("kontak")}
                    className="group px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl border border-amber-500/40 hover:border-amber-300 bg-amber-500/5 hover:bg-amber-500/15 text-amber-200 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_20px_rgba(244,180,0,0.25)]"
                  >
                    <span>{lang === "en" ? currentBanner.btn2En : currentBanner.btn2Id}</span>
                    <Phone size={13} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-slate-950/60 hover:bg-gradient-to-br hover:from-amber-400 hover:to-[#F4B400] text-amber-400 hover:text-slate-950 border border-amber-500/30 hover:border-amber-300 transition-all duration-300 transform hover:scale-110 active:scale-90 cursor-pointer backdrop-blur-md hover:shadow-[0_0_20px_rgba(244,180,0,0.5)]"
          title="Previous Banner"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-slate-950/60 hover:bg-gradient-to-br hover:from-amber-400 hover:to-[#F4B400] text-amber-400 hover:text-slate-950 border border-amber-500/30 hover:border-amber-300 transition-all duration-300 transform hover:scale-110 active:scale-90 cursor-pointer backdrop-blur-md hover:shadow-[0_0_20px_rgba(244,180,0,0.5)]"
          title="Next Banner"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot Indicators at Bottom Panel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5">
          <div className="flex gap-2.5 px-4 py-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-amber-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(244,180,0,0.1)]">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentIndex === index 
                    ? "w-10 bg-gradient-to-r from-amber-400 via-[#F4B400] to-yellow-500 shadow-[0_0_15px_rgba(244,180,0,0.8)] border border-amber-300/35" 
                    : "w-2.5 bg-slate-600 hover:bg-[#F4B400]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Autoplay Progress Bar at Top of Slider */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-30">
          <div 
            className="h-full bg-gradient-to-r from-amber-300 via-[#F4B400] to-yellow-500 shadow-[0_0_8px_rgba(244,180,0,0.8)] transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: `${PROGRESS_TICK}ms` }}
          />
        </div>

      </div>
    </div>
  );
}
