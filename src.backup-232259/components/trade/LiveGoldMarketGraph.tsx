import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight,
  Coins
} from 'lucide-react';
import { Container } from '../layout/Container';

interface PricePoint {
  time: string;
  price: number;
}

const TIME_DATA: Record<string, { 
  points: PricePoint[]; 
  change: string; 
  changePercent: string;
  isPositive: boolean; 
  high: number; 
  low: number; 
  open: number;
  bid: number;
  ask: number;
}> = {
  '1D': {
    points: [
      { time: '09:00', price: 2634.20 },
      { time: '11:00', price: 2638.50 },
      { time: '13:00', price: 2635.80 },
      { time: '15:00', price: 2642.10 },
      { time: '17:00', price: 2649.30 },
      { time: '19:00', price: 2646.90 },
      { time: '21:00', price: 2654.40 },
    ],
    change: '+$20.20',
    changePercent: '+0.77%',
    isPositive: true,
    high: 2658.10,
    low: 2631.50,
    open: 2634.20,
    bid: 2653.80,
    ask: 2654.60,
  },
  '5D': {
    points: [
      { time: 'Mon', price: 2610.50 },
      { time: 'Tue', price: 2622.00 },
      { time: 'Wed', price: 2618.30 },
      { time: 'Thu', price: 2635.60 },
      { time: 'Fri', price: 2648.90 },
      { time: 'Sat', price: 2652.10 },
      { time: 'Sun', price: 2654.40 },
    ],
    change: '+$43.90',
    changePercent: '+1.68%',
    isPositive: true,
    high: 2660.00,
    low: 2604.20,
    open: 2610.50,
    bid: 2653.80,
    ask: 2654.60,
  },
  '1M': {
    points: [
      { time: 'W1', price: 2540.00 },
      { time: 'W2', price: 2575.20 },
      { time: 'W3', price: 2610.40 },
      { time: 'W4', price: 2654.40 },
    ],
    change: '+$114.40',
    changePercent: '+4.50%',
    isPositive: true,
    high: 2665.00,
    low: 2530.10,
    open: 2540.00,
    bid: 2653.80,
    ask: 2654.60,
  },
  '6M': {
    points: [
      { time: 'Month 1', price: 2320.00 },
      { time: 'Month 2', price: 2385.00 },
      { time: 'Month 3', price: 2450.00 },
      { time: 'Month 4', price: 2510.00 },
      { time: 'Month 5', price: 2590.00 },
      { time: 'Month 6', price: 2654.40 },
    ],
    change: '+$334.40',
    changePercent: '+14.41%',
    isPositive: true,
    high: 2670.00,
    low: 2290.00,
    open: 2320.00,
    bid: 2653.80,
    ask: 2654.60,
  },
  '1Y': {
    points: [
      { time: 'Q1', price: 2150.00 },
      { time: 'Q2', price: 2320.00 },
      { time: 'Q3', price: 2480.00 },
      { time: 'Q4', price: 2654.40 },
    ],
    change: '+$504.40',
    changePercent: '+23.46%',
    isPositive: true,
    high: 2685.00,
    low: 2080.00,
    open: 2150.00,
    bid: 2653.80,
    ask: 2654.60,
  },
  '5Y': {
    points: [
      { time: '2021', price: 1780.00 },
      { time: '2022', price: 1820.00 },
      { time: '2023', price: 1940.00 },
      { time: '2024', price: 2350.00 },
      { time: '2025', price: 2580.00 },
      { time: '2026', price: 2654.40 },
    ],
    change: '+$874.40',
    changePercent: '+49.12%',
    isPositive: true,
    high: 2685.00,
    low: 1680.00,
    open: 1780.00,
    bid: 2653.80,
    ask: 2654.60,
  },
};

type TimeRange = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y';
type Currency = 'INR' | 'USD' | 'AED';

export const LiveGoldMarketGraph: React.FC = () => {
  const [activeRange, setActiveRange] = useState<TimeRange>('1D');
  const [activeCurrency, setActiveCurrency] = useState<Currency>('INR');
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; price: number } | null>(null);
  
  // Real-time micro-fluctuations simulation
  const [liveDelta, setLiveDelta] = useState<number>(0.35);
  const [tickSignal, setTickSignal] = useState<'up' | 'down'>('up');
  const [dubaiTime, setDubaiTime] = useState<string>('');
  const [mumbaiTime, setMumbaiTime] = useState<string>('');
  const [londonTime, setLondonTime] = useState<string>('');

  // Interactive client scenario simulator (in Crores INR & equivalent USD)
  const [selectedTicketCr, setSelectedTicketCr] = useState<number>(200);
  const [clientOutlook, setClientOutlook] = useState<'Bullish' | 'Sovereign Hedge' | 'Capital Expansion'>('Bullish');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setDubaiTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setMumbaiTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setLondonTime(now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClocks();
    const clockInterval = setInterval(updateClocks, 1000);

    // Micro-tick simulation every 3.5s like live financial terminals
    const tickInterval = setInterval(() => {
      const delta = (Math.random() * 0.9 - 0.4);
      setLiveDelta((prev) => {
        const next = parseFloat((prev + delta).toFixed(2));
        setTickSignal(delta >= 0 ? 'up' : 'down');
        return next;
      });
    }, 3500);

    return () => {
      clearInterval(clockInterval);
      clearInterval(tickInterval);
    };
  }, []);

  const currentData = TIME_DATA[activeRange];
  const points = currentData.points;
  const minPrice = Math.min(...points.map((p) => p.price)) * 0.998;
  const maxPrice = Math.max(...points.map((p) => p.price)) * 1.002;

  const currentSpotUsd = points[points.length - 1].price + liveDelta;

  // Currency Formatter functions
  const formatCurrency = (usdVal: number, curr: Currency = activeCurrency): string => {
    if (curr === 'INR') {
      const inrPerOz = usdVal * 84.20;
      return `₹${Math.round(inrPerOz).toLocaleString('en-IN')}`;
    }
    if (curr === 'AED') {
      const aedPerOz = usdVal * 3.6725;
      return `AED ${aedPerOz.toFixed(2)}`;
    }
    return `$${usdVal.toFixed(2)}`;
  };

  // Weight denomination rates (Goldprice.org & Goldcharts.org standard rate breakdown)
  const getWeightRates = (spotUsd: number) => {
    // 1 Troy Ounce = 31.1034768 grams
    const gramUsd = spotUsd / 31.1034768;
    const gram10Usd = gramUsd * 10;
    const tolaUsd = gramUsd * 11.6638; // 1 Tola = 11.6638 grams
    const kiloUsd = gramUsd * 1000;

    const convert = (usd: number) => {
      if (activeCurrency === 'INR') {
        const inr = usd * 84.20;
        return `₹${Math.round(inr).toLocaleString('en-IN')}`;
      }
      if (activeCurrency === 'AED') {
        const aed = usd * 3.6725;
        return `AED ${aed.toFixed(2)}`;
      }
      return `$${usd.toFixed(2)}`;
    };

    return [
      { weight: '1 Gram (24K)', rate: convert(gramUsd), purity: '99.9% Fine Gold' },
      { weight: '10 Grams', rate: convert(gram10Usd), purity: 'Indian Standard 24K' },
      { weight: '1 Troy Ounce', rate: convert(spotUsd), purity: '31.1035g International' },
      { weight: '1 Tola', rate: convert(tolaUsd), purity: '11.6638g Traditional' },
      { weight: '1 Kilogram Bar', rate: convert(kiloUsd), purity: '1,000g Sovereign Bar' },
    ];
  };

  const weightRates = getWeightRates(hoveredPoint ? hoveredPoint.price : currentSpotUsd);

  // Spot display headline
  const getHeroSpotDisplay = (usdPrice: number) => {
    if (activeCurrency === 'INR') {
      const inrPer10g = ((usdPrice * 84.20) / 31.1034768) * 10;
      return { value: `₹${Math.round(inrPer10g).toLocaleString('en-IN')}`, unit: 'per 10 Grams (24K Spot)' };
    }
    if (activeCurrency === 'AED') {
      const aedPerGram = (usdPrice * 3.6725) / 31.1034768;
      return { value: `AED ${aedPerGram.toFixed(2)}`, unit: 'per Gram (24K Spot)' };
    }
    return { value: `$${usdPrice.toFixed(2)}`, unit: 'per Troy Ounce (XAU/USD)' };
  };

  const heroSpot = getHeroSpotDisplay(hoveredPoint ? hoveredPoint.price : currentSpotUsd);

  // SVG Chart path calculation
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;

  const getCoordinates = (index: number, price: number) => {
    const x = paddingX + (index / (points.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((price - minPrice) / (maxPrice - minPrice)) * (svgHeight - paddingY * 2);
    return { x, y };
  };

  const pathD = points.reduce((acc, point, index) => {
    const pPrice = index === points.length - 1 ? point.price + liveDelta : point.price;
    const { x, y } = getCoordinates(index, pPrice);
    if (index === 0) return `M ${x},${y}`;
    const prevPrice = index - 1 === points.length - 1 ? points[index - 1].price + liveDelta : points[index - 1].price;
    const prev = getCoordinates(index - 1, prevPrice);
    const cpX1 = prev.x + (x - prev.x) / 2;
    const cpX2 = cpX1;
    return `${acc} C ${cpX1},${prev.y} ${cpX2},${y} ${x},${y}`;
  }, '');

  const areaD = `${pathD} L ${svgWidth - paddingX},${svgHeight - paddingY} L ${paddingX},${svgHeight - paddingY} Z`;

  // Calculated estimates for user scenario in Indian Rupees
  const estimatedSavingsCr = (selectedTicketCr * 0.01).toFixed(2);
  const estimatedSavingsLakhs = Math.round(selectedTicketCr * 0.01 * 100);
  const fxEfficiencyLakhs = Math.round(selectedTicketCr * 0.0045 * 100);

  return (
    <section id="gold-terminal" className="relative overflow-hidden bg-gradient-to-b from-[#071913] via-[#0C221C] to-[#081B15] text-ivory-500 py-16 sm:py-20 lg:py-24 border-b border-gold-600/30">
      {/* Architectural grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(199,154,61,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,154,61,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gold ambient radial glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Terminal Header & Multi-Market Clocks */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8 pb-6 border-b border-gold-600/25">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-emerald-950/80 px-3.5 py-1 text-2xs font-label font-bold uppercase tracking-[0.18em] text-gold-400 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Live Gold Intelligence &amp; CEPA Bullion Terminal</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Real-Time Spot Gold &amp; Bilateral Sovereign Matrix
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-ivory-700 max-w-2xl font-sans">
              Precision spot bullion prices, CEPA 1% tariff arbitrage indicators, and INR&ndash;AED settlement analytics.
            </p>
          </div>

          {/* Tri-Sovereign Financial Clocks */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="bg-emerald-950/90 border border-gold-600/30 px-3 py-1.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[0.6rem] font-label font-bold uppercase tracking-wider text-gold-400 block">
                Dubai (GST)
              </span>
              <span className="font-mono text-xs font-bold text-white">{dubaiTime || '04:00 PM'}</span>
            </div>
            <div className="bg-emerald-950/90 border border-gold-600/30 px-3 py-1.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[0.6rem] font-label font-bold uppercase tracking-wider text-gold-400 block">
                Mumbai (IST)
              </span>
              <span className="font-mono text-xs font-bold text-white">{mumbaiTime || '05:30 PM'}</span>
            </div>
            <div className="bg-emerald-950/90 border border-gold-600/30 px-3 py-1.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[0.6rem] font-label font-bold uppercase tracking-wider text-gold-400 block">
                London (GMT)
              </span>
              <span className="font-mono text-xs font-bold text-white">{londonTime || '12:00 PM'}</span>
            </div>
          </div>
        </div>

        {/* Main Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Spot Ticker, Interactive Graph & Weight Table (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Main Live Spot Card & Interactive SVG Graph */}
            <div className="bg-[#091F18]/95 border border-gold-500/35 rounded-3xl p-6 sm:p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
              
              {/* Terminal Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xs font-label font-bold uppercase tracking-[0.18em] text-gold-400">
                      Live Spot Gold Price (XAU / {activeCurrency})
                    </span>
                    <span className={`inline-flex items-center text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${
                      tickSignal === 'up' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {tickSignal === 'up' ? '▲ REAL-TIME TICK' : '▼ REAL-TIME TICK'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {heroSpot.value}
                    </span>
                    <span className="font-label text-xs text-gold-400 font-semibold">
                      {heroSpot.unit}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {currentData.changePercent} ({currentData.change})
                    </span>
                  </div>
                </div>

                {/* Currency & Horizon Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center rounded-xl bg-emerald-950/90 p-1 border border-gold-600/30">
                    {(['INR', 'USD', 'AED'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setActiveCurrency(curr)}
                        className={`px-3 py-1 rounded-lg text-2xs font-label font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeCurrency === curr
                            ? 'bg-gold-600 text-emerald-950 shadow-xs'
                            : 'text-ivory-700 hover:text-ivory-500'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>

                  <div className="inline-flex items-center rounded-xl bg-emerald-950/90 p-1 border border-gold-600/30">
                    {(['1D', '5D', '1M', '6M', '1Y', '5Y'] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setActiveRange(range);
                          setHoveredPoint(null);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-2xs font-label font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeRange === range
                            ? 'bg-gold-500/25 text-gold-300 border border-gold-500/50'
                            : 'text-ivory-700 hover:text-ivory-500'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive SVG Chart Canvas */}
              <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] bg-emerald-950/50 rounded-2xl border border-gold-600/25 p-2 overflow-hidden">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-full overflow-visible select-none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C79A3D" stopOpacity="0.38" />
                      <stop offset="60%" stopColor="#C79A3D" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#0C221C" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="goldLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E6BD65" />
                      <stop offset="50%" stopColor="#D4A359" />
                      <stop offset="100%" stopColor="#F9E2A8" />
                    </linearGradient>
                  </defs>

                  {/* Grid guidelines */}
                  {[0.25, 0.5, 0.75].map((ratio) => (
                    <line
                      key={ratio}
                      x1={paddingX}
                      y1={paddingY + ratio * (svgHeight - paddingY * 2)}
                      x2={svgWidth - paddingX}
                      y2={paddingY + ratio * (svgHeight - paddingY * 2)}
                      stroke="rgba(199,154,61,0.14)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Filled gradient area */}
                  <path d={areaD} fill="url(#goldAreaGrad)" />

                  {/* Smooth trend curve */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#goldLineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Points & Tooltips */}
                  {points.map((pt, idx) => {
                    const pPrice = idx === points.length - 1 ? pt.price + liveDelta : pt.price;
                    const { x, y } = getCoordinates(idx, pPrice);
                    const isHovered = hoveredPoint?.time === pt.time;
                    return (
                      <g key={pt.time}>
                        <circle
                          cx={x}
                          cy={y}
                          r={isHovered ? 7 : (idx === points.length - 1 ? 5 : 3.5)}
                          fill="#FAF6F0"
                          stroke="#9C701B"
                          strokeWidth={isHovered ? 3 : 2}
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHoveredPoint({ time: pt.time, price: pPrice })}
                        />
                        {/* X-axis labels */}
                        <text
                          x={x}
                          y={svgHeight - 6}
                          textAnchor="middle"
                          fill="rgba(245,237,224,0.6)"
                          fontSize="11"
                          fontFamily="sans-serif"
                        >
                          {pt.time}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Financial Metrics Summary Bar (Bid / Ask / High / Low / CEPA) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gold-600/20 text-center sm:text-left">
                <div className="bg-emerald-950/60 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[0.62rem] font-label font-bold uppercase tracking-wider text-ivory-800 block">
                    Bid (Oz)
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-white">
                    {formatCurrency(currentData.bid + liveDelta)}
                  </span>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[0.62rem] font-label font-bold uppercase tracking-wider text-ivory-800 block">
                    Ask (Oz)
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-white">
                    {formatCurrency(currentData.ask + liveDelta)}
                  </span>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[0.62rem] font-label font-bold uppercase tracking-wider text-ivory-800 block">
                    Period High / Low
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-white">
                    {formatCurrency(currentData.high)} / {formatCurrency(currentData.low)}
                  </span>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-xl border border-gold-600/15">
                  <span className="text-[0.62rem] font-label font-bold uppercase tracking-wider text-gold-400 block">
                    CEPA TRQ Tariff
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-emerald-400">
                    1.0% (Duty Concession)
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Professional Gold Weight Breakdown Table (goldprice.org standard) */}
            <div className="bg-[#091F18]/95 border border-gold-500/35 rounded-3xl p-6 sm:p-7 shadow-luxury relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gold-600/20">
                <div className="flex items-center gap-2">
                  <Coins className="h-4.5 w-4.5 text-gold-400" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Live Gold Bullion Rates by Weight ({activeCurrency})
                  </h3>
                </div>
                <span className="font-label text-2xs uppercase tracking-wider text-gold-400 font-bold">
                  24K 999 Fine Bullion
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gold-600/20 text-ivory-800 font-label uppercase text-[0.65rem] tracking-wider">
                      <th className="py-2.5 px-3">Weight Denomination</th>
                      <th className="py-2.5 px-3">Spot Rate ({activeCurrency})</th>
                      <th className="py-2.5 px-3">Standard Purity</th>
                      <th className="py-2.5 px-3 text-right">Settlement Corridor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-600/10">
                    {weightRates.map((item, idx) => (
                      <tr key={idx} className="hover:bg-emerald-950/40 transition-colors">
                        <td className="py-3 px-3 font-serif font-bold text-white">
                          {item.weight}
                        </td>
                        <td className="py-3 px-3 font-serif font-bold text-gold-400">
                          {item.rate}
                        </td>
                        <td className="py-3 px-3 text-ivory-700 text-xs">
                          {item.purity}
                        </td>
                        <td className="py-3 px-3 text-right text-xs text-emerald-400 font-medium">
                          DMCC &middot; IIBX GIFT City
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Scenario Modeler & Commissioner Macro Insights (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bilateral Allocation & Yield Calculator */}
            <div className="bg-gradient-to-br from-emerald-950 to-[#071913] border border-gold-500/40 rounded-3xl p-6 sm:p-7 shadow-luxury-lg relative overflow-hidden">
              <div className="mb-3">
                <span className="font-label text-2xs uppercase tracking-[0.2em] font-bold text-gold-400 block">
                  Bilateral Allocation &amp; Yield Modeler
                </span>
              </div>

              <p className="text-xs text-ivory-700 mb-4 font-sans leading-relaxed">
                Simulate your bilateral allocation to calculate CEPA tariff savings and INR&ndash;AED settlement yields.
              </p>

              {/* Strategy Outlook Selector */}
              <div className="mb-4">
                <label className="text-[0.65rem] font-label uppercase font-bold tracking-wider text-gold-400 block mb-1.5">
                  Strategic Objective
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Bullish', 'Sovereign Hedge', 'Capital Expansion'] as const).map((strat) => (
                    <button
                      key={strat}
                      onClick={() => setClientOutlook(strat)}
                      className={`py-1.5 px-2 rounded-lg text-[0.62rem] font-bold tracking-tight text-center transition-all cursor-pointer ${
                        clientOutlook === strat
                          ? 'bg-gold-600 text-emerald-950 font-bold shadow-xs'
                          : 'bg-emerald-900/60 text-ivory-700 hover:text-white border border-gold-600/20'
                      }`}
                    >
                      {strat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deal Size Slider / Pills */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[0.65rem] font-label uppercase font-bold tracking-wider text-gold-400">
                    Deal / Allocation Volume
                  </span>
                  <span className="font-serif font-bold text-white">₹{selectedTicketCr} Crores</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { cr: 40, label: '₹40 Cr' },
                    { cr: 200, label: '₹200 Cr' },
                    { cr: 400, label: '₹400 Cr' },
                    { cr: 800, label: '₹800 Cr' }
                  ].map((ticket) => (
                    <button
                      key={ticket.cr}
                      onClick={() => setSelectedTicketCr(ticket.cr)}
                      className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedTicketCr === ticket.cr
                          ? 'bg-gold-500/30 text-gold-300 border border-gold-400'
                          : 'bg-emerald-950 text-ivory-700 border border-gold-600/20 hover:text-white'
                      }`}
                    >
                      {ticket.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Modeled Output */}
              <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-gold-600/30 space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ivory-700">Estimated CEPA Tariff Savings:</span>
                  <span className="font-serif font-bold text-emerald-400">+₹{estimatedSavingsCr} Cr (₹{estimatedSavingsLakhs} L)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ivory-700">LCS FX Settlement Advantage:</span>
                  <span className="font-serif font-bold text-gold-400">+₹{fxEfficiencyLakhs} Lakhs</span>
                </div>
              </div>

              {/* Action Direct to Investment Form */}
              <a
                href="#inquiry"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gold-600 hover:bg-gold-500 text-emerald-950 font-label text-xs font-bold uppercase tracking-wider shadow-gold-glow transition-all duration-300 hover:scale-[1.01]"
              >
                <span>Discuss This Allocation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Macro Outlook Note from Commissioner */}
            <div className="bg-[#091F18]/80 border border-gold-600/25 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-gold-400">
                <span className="text-2xs font-label font-bold uppercase tracking-[0.16em]">
                  Executive Trade Commentary
                </span>
              </div>
              <p className="text-xs text-ivory-700 leading-relaxed font-sans">
                &quot;The ₹8.3 Lakh Crore ($100B) India&ndash;GCC trade corridor is shifting to sovereign bilateral settlements. Enterprises structuring bullion and capital operations through Dubai (DMCC) and Mumbai / GIFT City (IIBX) unlock unprecedented tariff efficiencies.&quot;
              </p>
              <div className="pt-2 border-t border-gold-600/15 flex items-center justify-between text-[0.68rem] font-label text-gold-300 font-semibold">
                <span>H.E. Zeenat Kureshi</span>
                <span className="text-emerald-400">Active Trade Corridors</span>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};
