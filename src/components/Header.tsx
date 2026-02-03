import { useState } from 'react';

interface HeaderProps {
  onDevisClick: () => void; // Keeping this if we need to wire CONTACT to it, or I'll just use href
}

export default function Header({ onDevisClick }: HeaderProps) {
  const [lang, setLang] = useState('FR');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-brand-dark/10 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex flex-col items-start cursor-pointer" onClick={() => scrollToSection('home')}>
          <span className="text-3xl font-black font-montserrat uppercase tracking-tighter text-brand-dark leading-none">
            AKR<span className="text-accent-energy">Group</span>
          </span>
          <div className="w-full h-1 bg-gradient-to-r from-accent-energy via-accent-solar to-accent-telecom mt-1 rounded-full opactiy-80" />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Accueil', id: 'home' },
            { label: 'Services', id: 'services' },
            { label: 'Job', id: 'job' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="font-montserrat font-bold text-sm uppercase tracking-wide text-brand-dark/70 hover:text-brand-dark transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action: Language + CTA */}
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="flex items-center gap-3 font-montserrat font-bold text-sm">
            <button
              onClick={() => setLang('FR')}
              className={`${lang === 'FR' ? 'text-brand-dark' : 'text-brand-dark/40'} transition-colors`}
            >
              FR
            </button>
            <span className="text-brand-dark/20">|</span>
            <button
              onClick={() => setLang('NL')}
              className={`${lang === 'NL' ? 'text-brand-dark' : 'text-brand-dark/40'} transition-colors`}
            >
              NL
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={onDevisClick}
            className="hidden md:block px-6 py-2 bg-brand-dark text-white font-montserrat font-bold uppercase text-xs tracking-widest hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20"
          >
            Devis Gratuit
          </button>
        </div>
      </div>
    </header>
  );
}
