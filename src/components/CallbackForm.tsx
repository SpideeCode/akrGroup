import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone } from 'lucide-react';

export default function CallbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const { error } = await supabase.from('callback_requests').upsert({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: 'pending',
                created_at: new Date().toISOString(),
            });

            if (error) throw error;
            setStatus('success');
            setFormData({ name: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    return (
        <section className="py-20 bg-white border-t border-brand-dark/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-4">
                    Un expert vous <span className="text-brand-primary">rappelle</span>
                </h2>

                <p className="text-lg text-brand-dark/70 font-medium mb-12 max-w-2xl mx-auto">
                    Vous souhaitez simplement être contacté pour plus d’informations ?<br />
                    Laissez vos coordonnées, un expert vous rappelle.
                </p>

                <form onSubmit={handleSubmit} className="bg-brand-cream p-8 md:p-12 border-2 border-brand-dark max-w-2xl mx-auto relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                        <div className="text-left">
                            <label className="block text-xs font-black uppercase tracking-widest text-brand-muted mb-2">Nom</label>
                            <input
                                type="text"
                                required
                                placeholder="Votre nom"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white border-2 border-brand-dark/10 p-4 font-medium focus:border-brand-primary focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="text-left">
                            <label className="block text-xs font-black uppercase tracking-widest text-brand-muted mb-2">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white border-2 border-brand-dark/10 p-4 font-medium focus:border-brand-primary focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="text-left md:col-span-2">
                            <label className="block text-xs font-black uppercase tracking-widest text-brand-muted mb-2">Téléphone</label>
                            <input
                                type="tel"
                                required
                                placeholder="0470 12 34 56"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white border-2 border-brand-dark/10 p-4 font-medium focus:border-brand-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full py-5 bg-brand-dark text-white font-montserrat font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {status === 'loading' ? (
                            'Envoi...'
                        ) : status === 'success' ? (
                            'Demande envoyée !'
                        ) : (
                            <>
                                Être rappelé
                                <Phone className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <div className="mt-8 pt-8 border-t border-brand-dark/5 flex flex-col md:flex-row items-center justify-center gap-4 text-brand-muted text-sm font-medium">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Rappel gratuit
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span>Sans engagement</span>
                        <span className="hidden md:inline">•</span>
                        <span>Données confidentielles</span>
                    </div>
                </form>
            </div>
        </section>
    );
}
