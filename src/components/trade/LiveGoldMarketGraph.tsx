import React, { useEffect, useState, useRef } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ArrowUpRight, 
  Clock, 
  Scale, 
  Coins,
  Zap,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Container } from '../layout/Container';
import { useLiveMetals, GRAMS_PER_TROY_OUNCE } from '../../hooks/useLiveMetals';
import { useTheme } from '../../contexts/ThemeContext';
import { Flag } from '../ui/Flag';
import goldIcon from '../../assets/images/sectors/gold-icon.png';
import { ThreeGoldAccent } from '../ui/ThreeGoldAccent';

type ActiveTab = 'live-gold' | 'all-time' | 'silver';

/** Mark for each price card, in card order: spot gold, UAE, India. */
const MARKET_LOGOS: React.ReactNode[] = [
  <img key="gold" src={goldIcon} alt="" className="h-6 w-6 shrink-0 object-contain" />,
  <Flag key="uae" country="uae" className="h-4" />,
  <Flag key="india" country="india" className="h-4" />,
];

interface MarketDataPoint {
  label: string;
  sub: string;
  value: string;
  /** Badge text: a price change (with `trend`) or a neutral note (without). Hidden when null. */
  change: string | null;
  trend?: 'up' | 'down';
  changeTitle?: string;
}

/**
 * Dedicated TradingView Advanced Real-Time Chart widget wrapper
 * Uses the exact official embed script architecture from goldcharts.org
 * (https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js)
 */
const TradingViewAdvancedChart: React.FC<{
  symbol: string;
  interval: string;
  theme: string;
  heightClass?: string;
}> = ({ symbol, interval, theme, heightClass = 'h-[440px] xs:h-[500px] sm:h-[560px] md:h-[620px] lg:h-[660px]' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const container = containerRef.current;
    if (!container) return;

    // Clean previous widget
    container.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';

    const widgetSlot = document.createElement('div');
    widgetSlot.className = 'tradingview-widget-container__widget';
    widgetSlot.style.height = 'calc(100% - 32px)';
    widgetSlot.style.width = '100%';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.setAttribute('fetchpriority', 'high');

    const isDark = theme === 'dark';
    const config = {
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: isDark ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      backgroundColor: isDark ? 'rgba(7, 25, 20, 1)' : 'rgba(255, 255, 255, 1)',
      gridColor: isDark ? 'rgba(199, 154, 61, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    };

    script.innerHTML = JSON.stringify(config);

    widgetContainer.appendChild(widgetSlot);
    widgetContainer.appendChild(script);
    container.appendChild(widgetContainer);

    // Timeout fallback to ensure skeleton clears smoothly
    const timer = setTimeout(() => setIsLoaded(true), 800);

    return () => {
      clearTimeout(timer);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden bg-[#071914]`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#071914] p-6 text-center">
          <div className="relative mb-3">
            <div className="h-10 w-10 rounded-2xl border-2 border-gold-500/30 border-t-gold-400 animate-spin" />
            <Coins className="h-4 w-4 text-gold-400 absolute inset-0 m-auto" />
          </div>
          <p className="font-heading text-xs font-bold text-gold-300">
            Initializing Real-Time Stream ({symbol})…
          </p>
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};

export const LiveGoldMarketGraph: React.FC = () => {
  const { metals, fx, reference, status } = useLiveMetals();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('live-gold');

  // Timekeeper to detect feed stall
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => window.clearInterval(t);
  }, []);

  const isSilver = activeTab === 'silver';
  const currentMetal = isSilver ? metals.XAG : metals.XAU;
  const updatedAt = currentMetal.updatedAt;
  const stale = updatedAt !== null && now - updatedAt > 120_000;

  // Real-time spot metrics. Nothing is shown until the feed answers -- no placeholder
  // figures that could be read as a live quote.
  const spot = currentMetal.price;
  const PENDING = status === 'error' ? 'Unavailable' : '—';

  const fmt = (v: number, digits = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const perGram = spot !== null ? spot / GRAMS_PER_TROY_OUNCE : null;
  const aedPerGram = perGram !== null && fx.AED !== null ? perGram * fx.AED : null;
  const inrValue = perGram !== null && fx.INR !== null 
    ? (isSilver ? perGram * 1000 * fx.INR : perGram * 10 * fx.INR) 
    : null;

  // Day change against the dataset's start-of-day (UTC) reference price (for Gold).
  const todayUtc = new Date().toISOString().slice(0, 10);
  const dayChange =
    !isSilver && spot !== null && reference
      ? {
          delta: spot - reference.price,
          pct: ((spot - reference.price) / reference.price) * 100,
          since:
            reference.date === todayUtc
              ? 'today'
              : `since ${new Date(`${reference.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}`,
        }
      : null;

  // Dynamic market highlight cards linked to activeTab
  const marketHighlights: MarketDataPoint[] = isSilver
    ? [
        {
          label: 'Silver Spot (XAG/USD)',
          sub: 'Live international benchmark',
          value: spot !== null ? `$${fmt(spot)} / oz` : PENDING,
          change: 'Spot in USD',
        },
        {
          label: 'Silver in UAE (AED)',
          sub: 'Spot-derived · 999 Fine Silver per gram',
          value: aedPerGram !== null ? `AED ${fmt(aedPerGram)} / g` : PENDING,
          change: 'Dubai Souk Basis',
        },
        {
          label: 'Silver in India (INR)',
          sub: '999 Fine Silver per 1 kg · excl. import duty & GST',
          value: inrValue !== null ? `₹${fmt(inrValue, 0)} / kg` : PENDING,
          change: 'Spot in INR (1 kg)',
        },
      ]
    : [
        {
          label: 'Gold Spot (XAU/USD)',
          sub: activeTab === 'all-time' ? 'Macro historical & live benchmark' : 'Live international benchmark',
          value: spot !== null ? `$${fmt(spot)} / oz` : PENDING,
          change: dayChange
            ? `${dayChange.delta >= 0 ? '+' : '−'}${fmt(Math.abs(dayChange.pct))}% (${dayChange.delta >= 0 ? '+' : '−'}$${fmt(Math.abs(dayChange.delta))}) ${dayChange.since}`
            : null,
          trend: dayChange ? (dayChange.delta >= 0 ? 'up' : 'down') : undefined,
          changeTitle: dayChange
            ? `Change against the ${reference!.date} 00:00 UTC reference price of $${fmt(reference!.price)}`
            : undefined,
        },
        {
          label: 'Gold in UAE (AED)',
          sub: 'Spot-derived · 24K per gram',
          value: aedPerGram !== null ? `AED ${fmt(aedPerGram)} / g` : PENDING,
          change: 'Dubai Souk Basis',
        },
        {
          label: 'Gold in India (INR)',
          sub: '24K per 10g · excl. import duty & GST',
          value: inrValue !== null ? `₹${fmt(inrValue, 0)} / 10g` : PENDING,
          change: 'Spot in INR (10g)',
        },
      ];

  return (
    <section id="terminal" className="relative overflow-hidden bg-surface-sunken py-12 sm:py-16 lg:py-20 text-ink-heading">
      {/* Background Architectural Grid Accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(199,154,61,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,154,61,0.15) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-gold-600/15 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Section Masthead */}
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto px-2">
          <div className="flex justify-center mb-2">
            <ThreeGoldAccent size={110} className="drop-shadow-[0_12px_24px_rgba(212,175,55,0.25)]" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/15 px-3.5 py-1.5 text-2xs font-label font-bold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-300 mb-3 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Real-Time Market Intelligence</span>
          </div>

          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-ink-heading mb-3">
            Live Gold Price Chart — 24 Hours a Day
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ink leading-relaxed max-w-2xl mx-auto">
            Real-time streaming tick-by-tick precious metals market data, bilateral CEPA tariff arbitrage, and sovereign commodity flows powered by global institutional feeds.
          </p>
        </div>

        {/* 3 Metric Market Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-8">
          {marketHighlights.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl border border-gold-600/30 bg-surface-raised p-4 sm:p-6 shadow-luxury transition-all duration-300 hover:border-gold-500/60 hover:shadow-luxury-lg hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex min-w-0 items-center gap-2">
                    {idx === 0 ? (
                      isSilver ? (
                        <span key="silver" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-400/40 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900 text-slate-800 dark:text-slate-200 font-label font-bold text-[0.62rem] shadow-sm">
                          Ag
                        </span>
                      ) : (
                        <img key="gold" src={goldIcon} alt="" className="h-6 w-6 shrink-0 object-contain" />
                      )
                    ) : (
                      MARKET_LOGOS[idx]
                    )}
                    <span className="font-label text-2xs sm:text-[0.72rem] font-bold uppercase tracking-wider text-gold-800 dark:text-gold-400 truncate">
                      {m.label}
                    </span>
                  </span>
                  {m.change && (
                    <span
                      title={m.changeTitle}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-3xs sm:text-2xs font-bold shrink-0 ${
                        m.trend === 'up'
                          ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                          : m.trend === 'down'
                            ? 'border-rose-500/25 bg-rose-500/10 text-rose-800 dark:text-rose-300'
                            : 'border-gold-600/25 bg-gold-500/10 text-gold-800 dark:text-gold-300'
                      }`}
                    >
                      {m.trend === 'up' && <TrendingUp className="h-3 w-3" aria-hidden />}
                      {m.trend === 'down' && <TrendingDown className="h-3 w-3" aria-hidden />}
                      <span>{m.change}</span>
                    </span>
                  )}
                </div>
                <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-ink-heading tracking-tight mt-2">
                  {m.value}
                </p>
              </div>
              <p className="mt-3 pt-2.5 border-t border-hairline/80 text-[0.65rem] sm:text-[0.68rem] text-ink-soft uppercase tracking-wider font-label">
                {m.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Live Chart Container - GoldCharts.org Advanced Pro Embed */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold-500/40 bg-gradient-to-b from-[#071914] via-[#051410] to-[#030D0A] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_40px_rgba(199,154,61,0.15)]">
          {/* Chart Header Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-gold-500/25 bg-surface-raised px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/15 text-gold-400">
                <Coins className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-ink-heading">
                    {activeTab === 'silver' 
                      ? 'Silver Spot Price — Live (XAG/USD)' 
                      : activeTab === 'all-time' 
                        ? 'Gold Price History — All-Time Chart (1970 to Today)' 
                        : 'Gold Spot Price — Live 24-Hour (XAU/USD)'}
                  </span>
                  {!stale ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-surface-raised px-2 py-0.5 text-[0.62rem] font-label font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>24H Real-Time</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/50 bg-amber-500/10 px-2 py-0.5 text-[0.62rem] font-label font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Feed Syncing</span>
                    </span>
                  )}
                </div>
                <p className="text-2xs text-ink-soft font-sans truncate">
                  {updatedAt
                    ? `Tick updated ${new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · Streaming institutional tick-by-tick market data`
                    : status === 'error'
                      ? 'Price cards are offline right now; the chart below streams independently'
                      : 'Connecting to sovereign trade feed…'}
                </p>
              </div>
            </div>

            {/* Tab Navigation Buttons */}
            <div className="inline-flex rounded-full border border-gold-500/30 bg-surface-sunken p-1 self-start lg:self-center">
              <button
                type="button"
                onClick={() => setActiveTab('live-gold')}
                className={`rounded-full px-3.5 py-1.5 text-2xs font-label font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'live-gold'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 shadow-sm'
                    : 'text-ink hover:text-ink-heading'
                }`}
              >
                Live Gold (24H)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('all-time')}
                className={`rounded-full px-3.5 py-1.5 text-2xs font-label font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'all-time'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 shadow-sm'
                    : 'text-ink hover:text-ink-heading'
                }`}
              >
                All-Time History
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('silver')}
                className={`rounded-full px-3.5 py-1.5 text-2xs font-label font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'silver'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 shadow-sm'
                    : 'text-ink hover:text-ink-heading'
                }`}
              >
                Silver
              </button>
            </div>
          </div>

          {/* Active Chart Rendering Area */}
          <div className="p-2 sm:p-4 bg-surface-raised">
            {activeTab === 'live-gold' && (
              <TradingViewAdvancedChart
                key="live-gold"
                symbol="OANDA:XAUUSD"
                interval="15"
                theme={theme}
              />
            )}

            {activeTab === 'all-time' && (
              <TradingViewAdvancedChart
                key="all-time"
                symbol="TVC:GOLD"
                interval="M"
                theme={theme}
              />
            )}

            {activeTab === 'silver' && (
              <TradingViewAdvancedChart
                key="silver"
                symbol="OANDA:XAGUSD"
                interval="15"
                theme={theme}
              />
            )}
          </div>

          {/* Footer Bar with Trade Desk SLA & Bilateral Dossier Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gold-500/20 bg-surface-raised px-4 py-3.5 sm:px-6 text-2xs font-sans text-ink">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
              <span>
                <strong>CEPA Sovereign Corridor:</strong> Concessional zero duty on bullion &amp; value-added precious metals between UAE &amp; India desks.
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-investment-modal'))}
                className="inline-flex items-center gap-1.5 font-label font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors cursor-pointer underline underline-offset-4"
              >
                <span>Request Bilateral Dossier</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Insightful Editorial Intelligence Cards from GoldCharts.org Architecture */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-gold-500/25 bg-surface-raised p-5 sm:p-6 shadow-luxury">
            <div className="flex items-center gap-2.5 mb-2.5">
              <Clock className="h-4 w-4 text-gold-400" />
              <h3 className="font-heading text-base font-bold text-ink-heading">
                When Gold Trades (24/5 Cycle)
              </h3>
            </div>
            <p className="font-sans text-xs text-ink leading-relaxed">
              Spot gold trades continuously 24 hours a day from Sunday evening (~6pm ET) to Friday afternoon (~5pm ET), rotating through Tokyo, Dubai (DIFC), London (LBMA), and New York (COMEX).
            </p>
          </div>

          <div className="rounded-2xl border border-gold-500/25 bg-surface-raised p-5 sm:p-6 shadow-luxury">
            <div className="flex items-center gap-2.5 mb-2.5">
              <Zap className="h-4 w-4 text-gold-400" />
              <h3 className="font-heading text-base font-bold text-ink-heading">
                Intraday Drivers &amp; Liquidity
              </h3>
            </div>
            <p className="font-sans text-xs text-ink leading-relaxed">
              Short-term movements are driven by real bond yields, Federal Reserve monetary policy, and US macro data releases, supported by uninterrupted institutional streaming feeds.
            </p>
          </div>

          <div className="rounded-2xl border border-gold-500/25 bg-surface-raised p-5 sm:p-6 shadow-luxury">
            <div className="flex items-center gap-2.5 mb-2.5">
              <Scale className="h-4 w-4 text-gold-400" />
              <h3 className="font-heading text-base font-bold text-ink-heading">
                CEPA 0% Duty Arbitrage
              </h3>
            </div>
            <p className="font-sans text-xs text-ink leading-relaxed">
              Under the India–UAE Comprehensive Economic Partnership Agreement (CEPA), qualifying precious metal flows and gold bullion receive concessional tariff arbitrage between sovereign desks.
            </p>
          </div>
        </div>

        {/* FAQ Section matching GoldCharts.org */}
        <div className="mt-8 rounded-2xl border border-gold-500/25 bg-surface-raised p-6 sm:p-8 shadow-luxury">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-ink-heading mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-gold-400" />
            <span>Precious Metals &amp; Live Trading FAQ</span>
          </h3>

          <div className="space-y-4 text-xs font-sans">
            <details className="group rounded-xl border border-gold-500/20 bg-surface-sunken p-4 open:border-gold-500/40">
              <summary className="font-heading font-semibold text-ink-heading cursor-pointer list-none flex items-center justify-between">
                <span>Is the gold market open right now?</span>
                <ChevronDown className="h-4 w-4 text-gold-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-ink leading-relaxed pt-2 border-t border-hairline/60">
                If the live chart above is printing new candles, the market is open. Spot gold trades continuously from Sunday ~6pm to Friday ~5pm US Eastern time, with a brief daily settlement pause around 5pm ET. It is closed on weekends.
              </p>
            </details>

            <details className="group rounded-xl border border-gold-500/20 bg-surface-sunken p-4 open:border-gold-500/40">
              <summary className="font-heading font-semibold text-ink-heading cursor-pointer list-none flex items-center justify-between">
                <span>How far back does the All-Time gold price history go?</span>
                <ChevronDown className="h-4 w-4 text-gold-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-ink leading-relaxed pt-2 border-t border-hairline/60">
                The All-Time History chart shows gold prices back to 1970, when the Bretton Woods dollar convertibility ended and gold began to float freely on global exchanges, capturing every major economic cycle.
              </p>
            </details>

            <details className="group rounded-xl border border-gold-500/20 bg-surface-sunken p-4 open:border-gold-500/40">
              <summary className="font-heading font-semibold text-ink-heading cursor-pointer list-none flex items-center justify-between">
                <span>Can I switch timeframes and examine technical indicators?</span>
                <ChevronDown className="h-4 w-4 text-gold-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-ink leading-relaxed pt-2 border-t border-hairline/60">
                Yes. The embedded advanced terminal includes full indicator libraries (RSI, Moving Averages, MACD), custom candle intervals (1M, 5M, 15M, 1H, 1D, 1W), and interactive drawing tools.
              </p>
            </details>
          </div>
        </div>
      </Container>
    </section>
  );
};
