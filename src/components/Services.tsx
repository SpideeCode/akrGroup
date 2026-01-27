import { Zap, Sun, Radio } from 'lucide-react';

interface ServicesProps {
  onServiceClick: (service: 'energie' | 'solaire' | 'telecom') => void;
}

export default function Services({ onServiceClick }: ServicesProps) {
  const services = [
    {
      id: 'energie' as const,
      title: 'ÉNERGIE',
      subtitle: 'Gaz & Électricité',
      icon: Zap,
      accent: 'group-hover:bg-accent-energy',
      border: 'border-accent-energy',
    },
    {
      id: 'solaire' as const,
      title: 'PANNEAUX SOLAIRES',
      subtitle: 'Étude & installation',
      icon: Sun,
      accent: 'group-hover:bg-accent-solar',
      border: 'border-accent-solar',
    },
    {
      id: 'telecom' as const,
      title: 'TÉLÉCOM',
      subtitle: 'Internet – TV – Téléphonie',
      icon: Radio,
      accent: 'group-hover:bg-accent-telecom',
      border: 'border-accent-telecom',
    },
  ];

  return (
    <section className="py-24 bg-brand-cream border-t border-brand-dark/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black font-montserrat uppercase tracking-tighter text-brand-dark mb-4">
              Nos <span className="text-brand-muted">Expertises</span>
            </h2>
            <p className="text-xl text-brand-dark/60 font-medium max-w-xl">
              Des solutions concrètes pour optimiser vos charges fixes et améliorer votre confort thermique et numérique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onServiceClick(service.id)}
              className="group relative p-10 bg-white border-2 border-brand-dark transition-all duration-500 hover:z-10 hover:border-accent-energy cursor-pointer flex flex-col items-start"
            >
              {/* Overlay d'accentuation au survol */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-500 ${service.accent}`} />

              <div className="relative z-10 w-full flex flex-col h-full">
                <div className="w-14 h-14 mb-8 flex items-center justify-center border-2 border-brand-dark transition-transform duration-500 group-hover:-rotate-12 bg-white">
                  <service.icon className="w-6 h-6 text-brand-dark" />
                </div>

                <h3 className="text-2xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-dark/60 font-medium mb-10 leading-relaxed min-h-[3rem]">
                  {service.subtitle}
                </p>

                <div className="mt-auto pt-4">
                  <div className="inline-flex items-center gap-4 px-6 py-4 bg-brand-dark text-white font-montserrat font-black uppercase text-xs tracking-widest transition-all group-hover:bg-accent-energy group-hover:translate-x-2">
                    Démarrer
                    <div className="w-8 h-px bg-white/30 group-hover:w-12 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
