

interface HeroProps {
  onDevisClick: () => void;
}

export default function Hero({ onDevisClick }: HeroProps) {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2940&auto=format&fit=crop"
          alt="Nature et enérgie"
          className="w-full h-full object-cover"
        />
        {/* Light Overlay for readability */}
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-montserrat leading-[1.1] tracking-tight text-brand-dark mb-8 uppercase drop-shadow-sm">
            Optimisez vos <span className="text-accent-energy">dépenses</span>,<br />
            vivez <span className="text-brand-primary">mieux</span>.
          </h1>

          <p className="text-xl md:text-2xl text-brand-dark/80 font-medium max-w-2xl leading-relaxed mb-10">
            Nous accompagnons les particuliers et les professionnels partout en Belgique dans la recherche des meilleures offres en énergie, télécom et panneaux solaires grâce à un devis gratuit et personnalisé.
          </p>

          <button
            onClick={onDevisClick}
            className="group relative px-8 py-5 bg-brand-dark text-white font-montserrat font-bold uppercase tracking-widest text-lg shadow-xl shadow-brand-dark/20 transition-all hover:scale-105 active:scale-95 hover:bg-brand-primary rounded-sm"
          >
            <div className="flex items-center gap-3">
              👉 Obtenir mon devis gratuit
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
