import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onDevisClick: () => void;
}

export default function Hero({ onDevisClick }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Optimisez vos dépenses,<br />vivez mieux
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Obtenez votre devis gratuit et trouvez les meilleures offres adaptées à vos besoins.
        </p>
        <button
          onClick={onDevisClick}
          className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Obtenir mon devis gratuit
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
