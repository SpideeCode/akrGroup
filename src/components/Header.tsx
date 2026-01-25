interface HeaderProps {
  onDevisClick: () => void;
}

export default function Header({ onDevisClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-brand-dark/10 bg-brand-cream/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-black font-montserrat uppercase tracking-tighter text-brand-dark">
            AKR<span className="text-accent-energy">.</span>Group
          </span>
        </div>
        <button
          onClick={onDevisClick}
          className="group relative px-6 py-2 overflow-hidden border-2 border-brand-dark font-montserrat font-bold uppercase text-sm tracking-widest transition-all duration-300 hover:text-white"
        >
          <span className="relative z-10">Devis Gratuit</span>
          <div className="absolute inset-0 z-0 h-full w-0 bg-brand-dark transition-all duration-300 group-hover:w-full" />
        </button>
      </div>
    </header>
  );
}
