import { Search, UserCheck, TrendingDown } from 'lucide-react';

export default function Features() {
    const steps = [
        {
            title: 'Analyse gratuite de votre situation',
            description: 'Analyse des contrats et habitudes de consommation pour identifier des économies.',
            icon: Search,
            color: 'text-accent-energy',
        },
        {
            title: 'Un accompagnement personnalisé',
            description: 'Un expert analyse le profil et accompagne dans les choix adaptés.',
            icon: UserCheck,
            color: 'text-accent-solar',
        },
        {
            title: 'Réduisez vos dépenses',
            description: 'Aide à diminuer les factures avec un accompagnement simple, sans démarches complexes.',
            icon: TrendingDown,
            color: 'text-accent-telecom',
        },
    ];

    return (
        <section className="py-20 bg-brand-cream border-t border-brand-dark/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center md:items-start group">
                            <div className={`mb-6 p-4 rounded-full bg-white shadow-sm ${step.color} transition-transform group-hover:scale-110 duration-300`}>
                                <step.icon className="w-10 h-10" />
                            </div>

                            <h3 className="text-xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-brand-dark/70 font-medium leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
