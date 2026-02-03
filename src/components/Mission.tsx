export default function Mission() {
    return (
        <section className="py-20 bg-white text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-sm font-black text-accent-energy uppercase tracking-[0.2em] mb-6">
                    Notre Mission
                </h2>
                <p className="text-3xl md:text-4xl font-montserrat font-bold text-brand-dark leading-snug mb-16">
                    Vous aider à réduire vos dépenses en vous accompagnant vers des solutions adaptées à votre situation, simplement et en toute transparence.
                </p>

                <div className="relative inline-block">
                    <h3 className="text-4xl md:text-5xl font-black text-brand-primary uppercase tracking-tight transform -rotate-2">
                        Vos meilleures économies au quotidien
                    </h3>
                    <div className="absolute -bottom-2 left-0 w-full h-3 bg-accent-solar/30 -skew-x-12 -z-10" />
                </div>
            </div>
        </section>
    );
}
