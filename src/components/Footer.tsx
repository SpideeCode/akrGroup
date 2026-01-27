import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase.from('quote_requests').upsert({
        service_type: 'telecom',
        form_data: { type: 'quick_contact', ...formData },
        contact_name: formData.name,
        contact_email: formData.email || null,
        contact_phone: formData.phone,
        contact_postal_code: null,
        status: 'pending',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'service_type,contact_phone'
      });

      if (error) throw error;

      setMessage('Merci ! Nous vous recontacterons rapidement.');
      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-dark text-white py-24 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 text-[20vw] font-black font-montserrat text-white/[0.02] leading-none select-none translate-y-1/4">
        AKR GROUP
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Logo and About */}
          <div className="lg:col-span-5">
            <h3 className="text-4xl md:text-5xl font-black font-montserrat uppercase tracking-tighter mb-8 italic">
              AKR<span className="text-accent-energy">.</span>Group
            </h3>
            <p className="text-xl text-white/50 font-medium mb-12 max-w-md leading-relaxed">
              Nous redéfinissons la gestion de vos charges fixes avec une approche directe, transparente et axée sur la performance.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-accent-energy transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+33123456789" className="text-lg font-montserrat font-bold hover:text-accent-energy transition-colors">
                  01 23 45 67 89
                </a>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-accent-energy transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:contact@akr-group.fr" className="text-lg font-montserrat font-bold hover:text-accent-energy transition-colors">
                  contact@akr-group.fr
                </a>
              </div>
            </div>
          </div>

          {/* Rapid Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-energy/10 -mr-16 -mt-16 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

              <h4 className="text-2xl font-black font-montserrat uppercase tracking-tight mb-8">
                Un expert vous <span className="text-accent-energy">rappelle</span>
              </h4>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Nom Complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean Dupont"
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent-energy transition-colors font-medium"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Numéro de Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent-energy transition-colors font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Adresse Email (Optionnel)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean.dupont@email.com"
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent-energy transition-colors font-medium"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-4 bg-white text-brand-dark font-montserrat font-black uppercase tracking-widest text-sm hover:bg-accent-energy hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
                  </button>
                </div>

                {message && (
                  <div className="md:col-span-2">
                    <p className={`text-sm font-bold uppercase tracking-wider ${message.includes('erreur') ? 'text-red-500' : 'text-green-400'}`}>
                      {message}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">
          <p>&copy; {new Date().getFullYear()} AKR GROUP // TOUS DROITS RÉSERVÉS</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors underline decoration-accent-energy/30 underline-offset-4">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors underline decoration-accent-energy/30 underline-offset-4">Confidentialité</a>
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
