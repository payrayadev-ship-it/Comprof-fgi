import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TrendingUp, Shield, Zap, Info, Calendar, DollarSign, ArrowRight } from "lucide-react";

interface InvestorD3ChartProps {
  lang: "id" | "en";
  darkMode: boolean;
  initialAmount: number; // Principal in IDR
  onUpdateDuration: (years: number) => void;
  investorDuration: number;
}

export const InvestorD3Chart: React.FC<InvestorD3ChartProps> = ({
  lang,
  darkMode,
  initialAmount,
  onUpdateDuration,
  investorDuration
}) => {
  const [strategy, setStrategy] = useState<"conservative" | "aggressive">("conservative");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredData, setHoveredData] = useState<{
    year: number;
    conservativeVal: number;
    aggressiveVal: number;
  } | null>(null);

  // Interest Rates (Compounded annually)
  const CONSERVATIVE_RATE = 0.11; // 11% p.a.
  const AGGRESSIVE_RATE = 0.19;   // 19% p.a.

  // Generate data points from year 0 to 5
  const generateData = (amount: number) => {
    const data = [];
    for (let i = 0; i <= 5; i++) {
      data.push({
        year: i,
        conservativeVal: amount * Math.pow(1 + CONSERVATIVE_RATE, i),
        aggressiveVal: amount * Math.pow(1 + AGGRESSIVE_RATE, i),
      });
    }
    return data;
  };

  const data = generateData(initialAmount);

  // D3 Chart Drawing Logic
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawing

    // Dimensions
    const width = 600;
    const height = 300;
    const margin = { top: 30, right: 40, bottom: 40, left: 75 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Filter data based on active duration
    const chartData = data.slice(0, investorDuration + 1);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, investorDuration])
      .range([0, chartWidth]);

    const maxVal = d3.max(chartData, d => Math.max(d.conservativeVal, d.aggressiveVal)) || initialAmount;
    const minVal = initialAmount * 0.95;

    const yScale = d3.scaleLinear()
      .domain([minVal, maxVal * 1.05])
      .range([chartHeight, 0]);

    // Create Main Group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Gradients
    const defs = svg.append("defs");
    
    // Conservative Area Gradient
    const consGrad = defs.append("linearGradient")
      .attr("id", "consGradient")
      .attr("x1", "0").attr("y1", "0")
      .attr("x2", "0").attr("y2", "1");
    consGrad.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.25);
    consGrad.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0);

    // Aggressive Area Gradient
    const aggrGrad = defs.append("linearGradient")
      .attr("id", "aggrGradient")
      .attr("x1", "0").attr("y1", "0")
      .attr("x2", "0").attr("y2", "1");
    aggrGrad.append("stop").attr("offset", "0%").attr("stop-color", "#f59e0b").attr("stop-opacity", 0.25);
    aggrGrad.append("stop").attr("offset", "100%").attr("stop-color", "#f59e0b").attr("stop-opacity", 0);

    // Grid lines (Horizontal)
    const yTicks = 5;
    const gridColor = darkMode ? "#1e293b" : "#f1f5f9";
    const textColor = darkMode ? "#94a3b8" : "#64748b";

    g.append("g")
      .attr("class", "grid")
      .attr("stroke-width", 1)
      .attr("opacity", 0.6)
      .call(
        d3.axisLeft(yScale)
          .ticks(yTicks)
          .tickSize(-chartWidth)
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", gridColor)
      .attr("stroke-dasharray", "3 3");

    // Grid lines (Vertical)
    g.append("g")
      .attr("class", "grid")
      .attr("stroke-width", 1)
      .attr("opacity", 0.6)
      .call(
        d3.axisBottom(xScale)
          .ticks(investorDuration)
          .tickSize(chartHeight)
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", gridColor)
      .attr("stroke-dasharray", "3 3");

    // Line & Area Generators
    const areaGeneratorCons = d3.area<any>()
      .x(d => xScale(d.year))
      .y0(chartHeight)
      .y1(d => yScale(d.conservativeVal))
      .curve(d3.curveMonotoneX);

    const areaGeneratorAggr = d3.area<any>()
      .x(d => xScale(d.year))
      .y0(chartHeight)
      .y1(d => yScale(d.aggressiveVal))
      .curve(d3.curveMonotoneX);

    const lineGeneratorCons = d3.line<any>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.conservativeVal))
      .curve(d3.curveMonotoneX);

    const lineGeneratorAggr = d3.line<any>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.aggressiveVal))
      .curve(d3.curveMonotoneX);

    // Draw Areas under curves
    if (strategy === "conservative") {
      g.append("path")
        .datum(chartData)
        .attr("d", areaGeneratorCons)
        .attr("fill", "url(#consGradient)");
    } else {
      g.append("path")
        .datum(chartData)
        .attr("d", areaGeneratorAggr)
        .attr("fill", "url(#aggrGradient)");
    }

    // Draw Lines
    // Conservative path
    g.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", strategy === "conservative" ? 3.5 : 1.5)
      .attr("opacity", strategy === "conservative" ? 1.0 : 0.4)
      .attr("stroke-dasharray", strategy === "conservative" ? "0" : "4 2")
      .attr("d", lineGeneratorCons);

    // Aggressive path
    g.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#f59e0b")
      .attr("stroke-width", strategy === "aggressive" ? 3.5 : 1.5)
      .attr("opacity", strategy === "aggressive" ? 1.0 : 0.4)
      .attr("stroke-dasharray", strategy === "aggressive" ? "0" : "4 2")
      .attr("d", lineGeneratorAggr);

    // X Axis
    const xAxis = g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(investorDuration)
          .tickFormat(d => (d === 0 ? (lang === "en" ? "Start" : "Mulai") : `${lang === "en" ? "Yr" : "Thn"} ${d}`))
      );
    xAxis.select(".domain").attr("stroke", darkMode ? "#334155" : "#cbd5e1");
    xAxis.selectAll("text")
      .attr("fill", textColor)
      .attr("font-size", "10px")
      .attr("font-weight", "600");
    xAxis.selectAll("line").attr("stroke", darkMode ? "#334155" : "#cbd5e1");

    // Y Axis
    const yAxis = g.append("g")
      .call(
        d3.axisLeft(yScale)
          .ticks(5)
          .tickFormat(d => {
            const formatted = d3.format(".2s")(Number(d));
            return "Rp " + formatted.replace("G", " M").replace("M", " Jt"); // Format to Indonesian millions/billions format
          })
      );
    yAxis.select(".domain").attr("stroke", "none");
    yAxis.selectAll("text")
      .attr("fill", textColor)
      .attr("font-size", "10px")
      .attr("font-weight", "600");
    yAxis.selectAll("line").attr("stroke", "none");

    // Add Highlight Dots on Active Strategy
    const activeValSelector = (d: any) => strategy === "conservative" ? d.conservativeVal : d.aggressiveVal;
    const activeColor = strategy === "conservative" ? "#3b82f6" : "#f59e0b";

    g.selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(activeValSelector(d)))
      .attr("r", 5)
      .attr("fill", activeColor)
      .attr("stroke", darkMode ? "#0b0f19" : "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .append("title")
      .text(d => `Year ${d.year}`);

    // Interactive Hover Tracking Line & Overlay
    const hoverLine = g.append("line")
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .attr("stroke", darkMode ? "#475569" : "#94a3b8")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "2 2")
      .style("display", "none");

    const hoverFocusCircle = g.append("circle")
      .attr("r", 7)
      .attr("fill", activeColor)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2.5)
      .style("display", "none");

    // Hover area rect overlay
    g.append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("fill", "transparent")
      .style("cursor", "crosshair")
      .on("pointermove", (event) => {
        const [mx] = d3.pointer(event);
        // Find closest data point
        const yearFraction = xScale.invert(mx);
        const closestYear = Math.max(0, Math.min(investorDuration, Math.round(yearFraction)));
        
        const d = chartData[closestYear];
        if (d) {
          const cx = xScale(closestYear);
          const cy = yScale(activeValSelector(d));
          
          hoverLine
            .attr("x1", cx)
            .attr("x2", cx)
            .style("display", "block");

          hoverFocusCircle
            .attr("cx", cx)
            .attr("cy", cy)
            .style("display", "block");

          setHoveredData(d);
        }
      })
      .on("pointerleave", () => {
        hoverLine.style("display", "none");
        hoverFocusCircle.style("display", "none");
        setHoveredData(null);
      });

  }, [data, strategy, investorDuration, darkMode, lang]);

  // Helper formats
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const getActiveRatePct = () => {
    return (strategy === "conservative" ? CONSERVATIVE_RATE : AGGRESSIVE_RATE) * 100;
  };

  // Calculations for current duration
  const activeRate = strategy === "conservative" ? CONSERVATIVE_RATE : AGGRESSIVE_RATE;
  const currentTotal = initialAmount * Math.pow(1 + activeRate, investorDuration);
  const totalProfit = currentTotal - initialAmount;
  const growthPct = ((currentTotal - initialAmount) / initialAmount) * 100;

  // Hover or general values
  const displayYear = hoveredData ? hoveredData.year : investorDuration;
  const displayCons = hoveredData ? hoveredData.conservativeVal : initialAmount * Math.pow(1 + CONSERVATIVE_RATE, investorDuration);
  const displayAggr = hoveredData ? hoveredData.aggressiveVal : initialAmount * Math.pow(1 + AGGRESSIVE_RATE, investorDuration);
  const displayVal = strategy === "conservative" ? displayCons : displayAggr;
  const displayProfit = displayVal - initialAmount;
  const displayGrowthPct = ((displayVal - initialAmount) / initialAmount) * 100;

  return (
    <div className="space-y-6" ref={containerRef}>
      
      {/* Strategy Toggle Tabs & Duration Slider */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Toggle Strategies */}
        <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800">
          <button
            onClick={() => setStrategy("conservative")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              strategy === "conservative"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <Shield size={13} />
            {lang === "en" ? "Conservative" : "Konservatif"} (11%)
          </button>
          <button
            onClick={() => setStrategy("aggressive")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              strategy === "aggressive"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <Zap size={13} />
            {lang === "en" ? "Aggressive" : "Agresif"} (19%)
          </button>
        </div>

        {/* Duration selector 1-5 Years */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar size={14} className="text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">
            {lang === "en" ? "Horizon:" : "Tenor:"}
          </span>
          <div className="flex gap-1.5 flex-grow sm:flex-grow-0">
            {([1, 2, 3, 4, 5] as const).map((y) => (
              <button
                key={y}
                onClick={() => onUpdateDuration(y)}
                className={`w-9 h-9 rounded-lg border font-mono font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                  investorDuration === y
                    ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                    : darkMode
                    ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                {y}y
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Description of current Strategy */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 transition-colors ${
        strategy === "conservative"
          ? (darkMode ? "bg-blue-950/20 border-blue-900/30 text-blue-300" : "bg-blue-50/50 border-blue-100 text-blue-800")
          : (darkMode ? "bg-amber-950/20 border-amber-900/30 text-amber-300" : "bg-amber-50/50 border-amber-100 text-amber-800")
      }`}>
        <Info size={16} className={strategy === "conservative" ? "text-blue-500 shrink-0 mt-0.5" : "text-amber-500 shrink-0 mt-0.5"} />
        <div>
          <span className="font-extrabold uppercase tracking-wider block mb-1">
            {strategy === "conservative"
              ? (lang === "en" ? "Conservative Asset Backed Growth Strategy" : "Strategi Pertumbuhan Konservatif Beragun Aset")
              : (lang === "en" ? "Aggressive Co-Investment Project Expansion Strategy" : "Strategi Ekspansi Agresif Penyertaan Proyek Kemitraan")}
          </span>
          {strategy === "conservative"
            ? (lang === "en" 
                ? "Backed by physical land and pre-sold premium residential housing. Focuses on bulletproof legal assurance, stable cash-flow margins, and consistent 11% compounded annual yield."
                : "Didukung oleh jaminan fisik tanah & unit hunian premium yang telah pra-jual. Berfokus pada keamanan hukum mutlak, stabilitas margin arus kas, dan imbal hasil majemuk 11% per tahun.")
            : (lang === "en"
                ? "Co-investment syndication in high-density commercial hubs, logistics centers, and large-scale site infrastructures. Delivers accelerated 19% compounded annual yield for development expansions."
                : "Sindikasi investasi pada kawasan ruko pusat bisnis, pergudangan logistik, dan infrastruktur berskala besar. Memberikan imbal hasil majemuk tinggi 19% per tahun untuk ekspansi pembangunan.")
          }
        </div>
      </div>

      {/* D3 Graphic Canvas with Card Framing */}
      <div className={`p-4 rounded-xl border overflow-hidden ${
        darkMode ? "bg-slate-950/50 border-slate-900" : "bg-slate-50 border-slate-100"
      }`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {lang === "en" ? "D3 Interactive Compound Projections" : "Proyeksi Majemuk Interaktif D3"}
          </span>
          <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {lang === "en" ? "Conservative (11%)" : "Konservatif (11%)"}
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-2"></span> {lang === "en" ? "Aggressive (19%)" : "Agresif (19%)"}
          </span>
        </div>
        
        {/* Render SVG canvas inside a responsive container */}
        <div className="relative">
          <svg viewBox="0 0 600 300" width="100%" height="100%" ref={svgRef} className="overflow-visible select-none" />
        </div>
        
        <p className={`text-[10px] text-center italic mt-2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          {lang === "en" ? "Move your cursor or pointer over the chart area to track compounded year-on-year balances" : "Gerakkan kursor atau sentuh area grafik untuk melacak saldo majemuk tahunan secara presisi"}
        </p>
      </div>

      {/* Projection Highlights Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          darkMode ? "bg-[#131926]/40 border-slate-800" : "bg-white border-slate-150 shadow-sm"
        }`}>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {lang === "en" ? "Timeline Focus" : "Titik Fokus Waktu"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-500 font-mono">
              {displayYear === 0 ? (lang === "en" ? "Initial" : "Awal") : `${lang === "en" ? "Year" : "Tahun"} ${displayYear}`}
            </span>
          </div>
          <span className={`text-[9px] mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            {displayYear === 0 
              ? (lang === "en" ? "Original capital allocation" : "Penempatan modal awal proyek")
              : `${lang === "en" ? "Compounded over" : "Diakumulasi selama"} ${displayYear} ${lang === "en" ? "year(s)" : "tahun"}`
            }
          </span>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          darkMode ? "bg-[#131926]/40 border-slate-800" : "bg-white border-slate-150 shadow-sm"
        }`}>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {lang === "en" ? "Accumulated Balance" : "Akumulasi Saldo Akhir"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-black font-mono transition-colors ${strategy === "conservative" ? "text-blue-400" : "text-amber-500"}`}>
              {formatIDR(displayVal)}
            </span>
          </div>
          <span className="text-[9px] mt-1 text-emerald-400 font-bold font-mono">
            +{displayGrowthPct.toFixed(1)}% {lang === "en" ? "Growth Rate" : "Tingkat Pertumbuhan"}
          </span>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          darkMode ? "bg-[#131926]/40 border-slate-800" : "bg-white border-slate-150 shadow-sm"
        }`}>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {lang === "en" ? "Net Capital Earnings" : "Hasil Keuntungan Bersih"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-emerald-400 font-mono">
              {formatIDR(displayProfit)}
            </span>
          </div>
          <span className={`text-[9px] mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            {lang === "en" ? "Compounded surplus value" : "Nilai surplus bersih setelah bunga majemuk"}
          </span>
        </div>

      </div>

      {/* Comparison Detail Grid Table */}
      <div className={`p-4 rounded-xl border overflow-hidden ${
        darkMode ? "bg-slate-900/40 border-slate-850" : "bg-slate-50/50 border-slate-200/50"
      }`}>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-amber-500" />
          {lang === "en" ? "Side-by-Side Compounded Year-on-Year Growth Overview" : "Tabel Komparasi Saldo Majemuk Kumulatif Tahunan"}
        </h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-[10px] uppercase font-bold tracking-wider ${darkMode ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                <th className="py-2">{lang === "en" ? "Period" : "Periode"}</th>
                <th className="py-2 text-blue-500">{lang === "en" ? "Conservative (11% p.a.)" : "Konservatif (11% thn)"}</th>
                <th className="py-2 text-amber-500">{lang === "en" ? "Aggressive (19% p.a.)" : "Agresif (19% thn)"}</th>
                <th className="py-2 text-right">{lang === "en" ? "Difference" : "Selisih Pertumbuhan"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/10 dark:divide-slate-800/50 font-mono font-medium">
              {data.slice(0, investorDuration + 1).map((row) => {
                const diff = row.aggressiveVal - row.conservativeVal;
                return (
                  <tr key={row.year} className={`hover:bg-amber-500/5 transition-colors ${displayYear === row.year ? "bg-amber-500/10" : ""}`}>
                    <td className="py-2.5 font-sans font-bold">
                      {row.year === 0 ? (lang === "en" ? "Capital" : "Modal") : `${lang === "en" ? "Year" : "Tahun"} ${row.year}`}
                    </td>
                    <td className={`py-2.5 ${strategy === "conservative" ? "text-blue-400 font-bold" : "text-slate-400"}`}>
                      {formatIDR(row.conservativeVal)}
                    </td>
                    <td className={`py-2.5 ${strategy === "aggressive" ? "text-amber-400 font-bold" : "text-slate-400"}`}>
                      {formatIDR(row.aggressiveVal)}
                    </td>
                    <td className="py-2.5 text-right font-black text-emerald-400">
                      {diff === 0 ? "-" : `+${formatIDR(diff)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
