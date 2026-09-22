import React, { useState } from 'react';
import { mediaData } from '../../data/media';
import { FileText, Download, CheckCircle2, ShieldCheck, Eye } from 'lucide-react';

export const MediaKitDownloadCard: React.FC = () => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');

  const handleDownload = () => {
    setDownloadState('downloading');
    setTimeout(() => {
      setDownloadState('completed');
      // Create a simulated PDF download blob
      const element = document.createElement('a');
      const file = new Blob([
        `OFFICIAL MEDIA KIT - ZEENAT KURESHI\n=========================================\nGCC-India Trade Commissioner | Film Producer | National President\n\nContact: press@zeenatkureshi.com\nWebsite: https://zeenatkureshi.com\n\nContents:\n- Official High Resolution Portraits & Monograms\n- Executive Biography Briefs (50, 150 & 500 words)\n- Standard Stage Introduction Protocols\n- Bilateral Trade Factsheets (GCC-India CEPA)\n- Speaking Calendar & Contact Information\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'Zeenat_Kureshi_Official_Media_Kit_2024.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadState('idle'), 4000);
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border-2 border-gold-500/40 rounded-3xl p-8 sm:p-12 text-ivory-500 shadow-luxury-lg relative overflow-hidden">
      {/* Subtle gold ornamentation */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-gold-500/15 border border-gold-500/30 rounded-full text-2xs uppercase tracking-[0.2em] font-bold text-gold-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Press Assets
            </span>
            <span className="text-xs text-ivory-800">• Updated {mediaData.mediaKit.lastUpdated}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory-500 leading-tight mb-4">
            {mediaData.mediaKit.title}
          </h3>

          <p className="text-sm text-ivory-700 leading-relaxed mb-6 max-w-2xl">
            {mediaData.mediaKit.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-ivory-600">
            {mediaData.mediaKit.contents.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gold-400/90 font-label">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              Format: {mediaData.mediaKit.format}
            </span>
            <span>•</span>
            <span>Archive Size: {mediaData.mediaKit.fileSize}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Authenticity
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gold-500/20 pt-6 lg:pt-0 lg:pl-8">
          <div className="w-20 h-24 bg-emerald-900 border-2 border-gold-500/40 rounded-xl shadow-lg flex flex-col items-center justify-center mb-6 relative group">
            <FileText className="w-10 h-10 text-gold-400 mb-1" />
            <span className="text-2xs font-label uppercase font-bold text-gold-400">PDF KIT</span>
            <div className="absolute inset-0 bg-gold-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloadState === 'downloading'}
            className="w-full sm:w-auto px-8 py-4 bg-gold-600 hover:bg-gold-500 text-emerald-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-gold-glow hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
          >
            {downloadState === 'downloading' ? (
              <>
                <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                <span>Packaging Assets...</span>
              </>
            ) : downloadState === 'completed' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Downloaded Successfully</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Media Kit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
