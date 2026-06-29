import { jsPDF } from "jspdf";

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

/**
 * Gracefully converts an image URL to a base64 string.
 * Falls back to rejection if CORS or network error occurs.
 */
const getBase64ImageFromUrl = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    
    // Set a timeout to prevent hanging the PDF generation
    const timeout = setTimeout(() => {
      reject(new Error("Image request timed out"));
    }, 4000);

    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not create 2D canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg", 0.75); // Compress for performance and smaller PDF size
        resolve(dataURL);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => {
      clearTimeout(timeout);
      reject(err);
    };

    img.src = url;
  });
};

export const generateProjectBrochure = async (project: Project, lang: "id" | "en") => {
  // Create a new A4 document (default is portrait, mm, a4)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 15;
  const contentWidth = pageWidth - (marginX * 2); // 180mm
  let y = 15; // Vertical cursor position

  // Helper for drawing text with automatic page overflow checking
  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      drawPageFooter(doc, lang, true);
      y = 20; // reset y to top margin on new page
      drawPageHeader(doc);
    }
  };

  const drawPageHeader = (pdf: jsPDF) => {
    // Elegant small running header for subsequent pages
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139); // slate-500
    pdf.text("PT. FORESYNDO GLOBAL INDONESIA", marginX, y);
    pdf.setFont("helvetica", "normal");
    pdf.text("OFFICIAL PROJECT BROCHURE", pageWidth - marginX, y, { align: "right" });
    
    // Thin line under running header
    pdf.setDrawColor(226, 232, 240); // slate-200
    pdf.setLineWidth(0.3);
    pdf.line(marginX, y + 2, pageWidth - marginX, y + 2);
    y += 8;
  };

  const drawPageFooter = (pdf: jsPDF, language: "id" | "en", isMultiPage = false) => {
    const footerY = pageHeight - 15;
    
    // Thin divider line
    pdf.setDrawColor(226, 232, 240); // slate-200
    pdf.setLineWidth(0.3);
    pdf.line(marginX, footerY - 4, pageWidth - marginX, footerY - 4);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184); // slate-400
    
    const contactText = language === "en"
      ? "PT. Foresyndo Global Indonesia | WhatsApp Inquiry: +62 823-3809-4205"
      : "PT. Foresyndo Global Indonesia | Informasi WA: +62 823-3809-4205";
    
    pdf.text(contactText, marginX, footerY);

    const pageInfo = isMultiPage ? `Page ${pdf.getNumberOfPages()}` : "Page 1 of 1";
    pdf.text(pageInfo, pageWidth - marginX, footerY, { align: "right" });
  };

  // --- PAGE 1 HEADER BANNER ---
  // Large corporate header block
  doc.setFillColor(19, 25, 38); // slate-900 (#131926)
  doc.rect(marginX, y, contentWidth, 24, "F");

  // Yellow/Amber Left Border Accent Bar
  doc.setFillColor(245, 158, 11); // amber-500 (#f59e0b)
  doc.rect(marginX, y, 2.5, 24, "F");

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("PT. FORESYNDO GLOBAL INDONESIA", marginX + 6, y + 10);

  // Header Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11); // amber-500
  const headerSubtitle = lang === "en"
    ? "GENERAL CONTRACTOR & INDUSTRIAL ENGINEERING SOLUTIONS"
    : "KONTRAKTOR UMUM & SOLUSI REKAYASA INDUSTRI";
  doc.text(headerSubtitle, marginX + 6, y + 17);

  // Download timestamp on top-right of header banner
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = new Date().toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(dateStr, pageWidth - marginX - 6, y + 10, { align: "right" });

  y += 34;

  // --- PROJECT TITLE & CATEGORY ---
  const projectTitle = lang === "en" && project.enTitle ? project.enTitle : project.title;
  const projectCategory = project.category;
  const projectLocation = lang === "en" && project.enLocation ? project.enLocation : project.location;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42); // slate-900

  // Split title if it is too long
  const splitTitle = doc.splitTextToSize(projectTitle, contentWidth);
  doc.text(splitTitle, marginX, y);
  y += (splitTitle.length * 6) + 1;

  // Subtitle / Location
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(projectCategory.toUpperCase(), marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`  |   ${projectLocation}`, marginX + doc.getTextWidth(projectCategory.toUpperCase()) + 2, y);

  y += 8;

  // --- HERO IMAGE ---
  // We fetch the main image and display it. If it fails, we render an elegant vector schematic box
  let heroImageLoaded = false;
  const imageHeight = 75; // Aspect ratio ~2.4:1 (wider for elegance)
  
  try {
    const base64Img = await getBase64ImageFromUrl(project.image);
    doc.addImage(base64Img, "JPEG", marginX, y, contentWidth, imageHeight, undefined, "FAST");
    heroImageLoaded = true;
  } catch (error) {
    console.warn("Could not render hero image in brochure PDF, rendering luxury placeholder:", error);
  }

  if (!heroImageLoaded) {
    // Draw a premium textured fallback grid container
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.rect(marginX, y, contentWidth, imageHeight, "FD");

    // Decorative architectural schematic grid lines inside fallback container
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.setLineWidth(0.2);
    for (let offset = 10; offset < contentWidth; offset += 15) {
      doc.line(marginX + offset, y, marginX + offset, y + imageHeight);
    }
    for (let offset = 8; offset < imageHeight; offset += 12) {
      doc.line(marginX, y + offset, marginX + contentWidth, y + offset);
    }

    // Outer accent borders
    doc.setDrawColor(245, 158, 11, 0.4); // Amber border hint
    doc.setLineWidth(0.3);
    doc.rect(marginX + 2, y + 2, contentWidth - 4, imageHeight - 4);

    // Text in fallback
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(projectTitle.toUpperCase(), marginX + (contentWidth / 2), y + (imageHeight / 2) - 4, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184); // slate-400
    const viewLabel = lang === "en" 
      ? "PT. Foresyndo Global Indonesia - Official Architectural Rendering" 
      : "PT. Foresyndo Global Indonesia - Visualisasi Rendering Resmi";
    doc.text(viewLabel, marginX + (contentWidth / 2), y + (imageHeight / 2) + 3, { align: "center" });
  }

  y += imageHeight + 8;

  // --- KEY SPECIFICATIONS BLOCK ---
  // Draw a sleek grid table
  checkPageOverflow(30);
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.rect(marginX, y, contentWidth, 24, "FD");

  // Grid vertical separator lines
  doc.line(marginX + (contentWidth / 3), y, marginX + (contentWidth / 3), y + 24);
  doc.line(marginX + (contentWidth * 2 / 3), y, marginX + (contentWidth * 2 / 3), y + 24);

  // Column labels
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400

  // Box 1
  doc.text(lang === "en" ? "PROJECT LOCATION" : "LOKASI PROYEK", marginX + 5, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85); // slate-700
  const shortLocation = projectLocation.length > 25 ? `${projectLocation.slice(0, 23)}...` : projectLocation;
  doc.text(shortLocation, marginX + 5, y + 14);

  // Box 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(lang === "en" ? "SIZE / CAPACITY" : "UKURAN / KAPASITAS", marginX + (contentWidth / 3) + 5, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const sizeVal = lang === "en" && project.enSize ? project.enSize : project.size;
  doc.text(sizeVal, marginX + (contentWidth / 3) + 5, y + 14);

  // Box 3
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(lang === "en" ? "YEAR COMPLETED" : "TAHUN PENGERJAAN", marginX + (contentWidth * 2 / 3) + 5, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const yearVal = lang === "en" && project.enYear ? project.enYear : project.year;
  doc.text(yearVal, marginX + (contentWidth * 2 / 3) + 5, y + 14);

  y += 32;

  // --- DESCRIPTION SECTION ---
  const projectDesc = lang === "en" && project.enDesc ? project.enDesc : project.desc;
  
  checkPageOverflow(25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(lang === "en" ? "PROJECT DESCRIPTION" : "DESKRIPSI PROYEK", marginX, y);

  // Decorative small underline bar
  doc.setFillColor(245, 158, 11); // amber-500
  doc.rect(marginX, y + 1.8, 15, 1.2, "F");
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85); // slate-700
  
  const splitDesc = doc.splitTextToSize(projectDesc, contentWidth);
  checkPageOverflow(splitDesc.length * 5.2);
  doc.text(splitDesc, marginX, y);
  y += (splitDesc.length * 5.2) + 10;

  // --- HIGHLIGHTS SECTION ---
  const projectHighlights = lang === "en" && project.enHighlights ? project.enHighlights : project.highlights;
  
  if (projectHighlights && projectHighlights.length > 0) {
    checkPageOverflow(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(lang === "en" ? "KEY SPECIFICATIONS & HIGHLIGHTS" : "SPESIFIKASI & KEUNGGULAN UTAMA", marginX, y);

    // Decorative small underline bar
    doc.setFillColor(245, 158, 11); // amber-500
    doc.rect(marginX, y + 1.8, 15, 1.2, "F");
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85); // slate-700

    for (const highlight of projectHighlights) {
      const splitHighlight = doc.splitTextToSize(highlight, contentWidth - 8);
      const rowHeight = splitHighlight.length * 5.2;
      checkPageOverflow(rowHeight + 2);

      // Render custom square bullet point
      doc.setFillColor(245, 158, 11); // amber-500
      doc.rect(marginX + 1, y + 1, 1.8, 1.8, "F");

      // Draw text
      doc.text(splitHighlight, marginX + 6, y + 2.5);
      y += rowHeight + 3;
    }
  }

  // --- FOOTER AND METADATA ---
  // Ensure we place the footer on the first page or multi pages correctly
  const hasMultiplePages = doc.getNumberOfPages() > 1;
  if (!hasMultiplePages) {
    drawPageFooter(doc, lang, false);
  } else {
    // Add footers on preceding pages retrospectively if needed,
    // but our checkPageOverflow hook automatically drew them on older pages.
    // We just write on the final page here
    drawPageFooter(doc, lang, true);
  }

  // Save the document!
  const sanitizedTitle = projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`fgi-project-${sanitizedTitle}.pdf`);
};
