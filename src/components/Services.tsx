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
      color: 'text-blue-900',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'solaire' as const,
      title: 'PANNEAUX SOLAIRES',
      subtitle: 'Étude & installation',
      icon: Sun,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      id: 'telecom' as const,
      title: 'TÉLÉCOM',
      subtitle: 'Internet – TV – Téléphonie',
      icon: Radio,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Nos Services
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Découvrez nos solutions sur mesure pour réduire vos factures
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:scale-105"
            >
              <div className={`${service.bgColor} ${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.subtitle}
              </p>
              <button
                onClick={() => onServiceClick(service.id)}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200"
              >
                Demander un devis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
