import { Search, PenTool, TrendingDown } from 'lucide-react';

export default function Features() {
    const steps = [
        {
            title: 'Audit Gratuit',
            description: 'Nous analysons en détail vos contrats actuels et vos habitudes de consommation pour identifier les leviers d\'économies.',
            icon: Search,
            number: '01',
        },
        {
            title: 'Expertise Dédiée',
            description: 'Nos conseillers sélectionnent les offres les plus compétitives du marché, adaptées à votre profil et à vos besoins réels.',
            icon: PenTool,
            number: '02',
        },
        {
            title: 'Économies Réelles',
            description: 'Bénéficiez d\'une réduction immédiate sur vos factures. Nous gérons toute la transition administrative pour vous.',
            icon: TrendingDown,
            number: '03',
        },
    ];

    return (
        <section className="py-24 bg-brand-cream border-t border-brand-dark/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-16 max-w-2xl">
                    <span className="text-accent-energy text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Notre Mission</span>
                    <h2 className="text-3xl md:text-4xl font-black font-montserrat uppercase tracking-tighter text-brand-dark leading-tight">
                        Notre objectif est de mettre les clients en relation avec nos <span className="text-brand-muted italic">partenaires</span>.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-brand-dark">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`group p-10 bg-white hover:bg-brand-dark transition-all duration-500 ${index !== steps.length - 1 ? 'md:border-r border-b md:border-b-0 border-brand-dark' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="w-12 h-12 flex items-center justify-center border-2 border-brand-dark group-hover:border-accent-solar group-hover:bg-accent-solar transition-colors duration-500">
                                    <step.icon className="w-5 h-5 text-brand-dark group-hover:text-white" />
                                </div>
                                <span className="text-4xl font-black font-montserrat text-brand-dark/10 group-hover:text-white/10 transition-colors duration-500">
                                    {step.number}
                                </span>
                            </div>

                            <h3 className="text-xl font-black font-montserrat uppercase tracking-tight text-brand-dark group-hover:text-white mb-4 transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-brand-dark/60 group-hover:text-white/60 font-medium leading-relaxed transition-colors">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
