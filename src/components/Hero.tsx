import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onDevisClick: () => void;
}

export default function Hero({ onDevisClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-cream">
      {/* Éléments décoratifs minimalistes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-dark/[0.02] -skew-x-12 transform origin-top" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black font-montserrat leading-[0.9] tracking-tighter text-brand-dark mb-8 uppercase">
            Moins de <span className="text-accent-energy">frais</span>.<br />
            Plus de <span className="text-brand-muted">vie</span>.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-8 mt-12">
            <p className="text-xl md:text-2xl text-brand-dark/70 font-medium max-w-xl leading-snug">
              Nous optimisons vos factures d'énergie, de télécom et vos installations solaires pour un quotidien libéré.
            </p>

            <button
              onClick={onDevisClick}
              className="flex-shrink-0 group relative px-8 py-5 bg-brand-dark text-white font-montserrat font-black uppercase tracking-widest text-lg transition-transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-3">
                Commencer
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
