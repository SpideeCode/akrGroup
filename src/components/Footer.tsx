import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="text-3xl font-black font-montserrat uppercase tracking-tighter text-white mb-6 block leading-none">
              AKR<span className="text-accent-energy">Group</span>
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-energy to-accent-solar mb-6 rounded-full" />
            <p className="text-white/60 font-medium leading-relaxed mb-6">
              Votre partenaire de confiance pour optimiser vos charges domestiques et améliorer votre confort quotidien.
            </p>
            <p className="font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🇧🇪</span> Actif partout en Belgique
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-black uppercase tracking-widest text-sm text-white/40 mb-8">
              Contact
            </h4>
            <div className="space-y-6">
              <a href="tel:+32484430083" className="flex items-center gap-4 text-white/80 hover:text-accent-energy transition-colors group">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-energy group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-bold">+32 484 43 00 83</span>
              </a>
              <a href="mailto:abdel.akachar12@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-accent-energy transition-colors group">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-energy group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-bold break-all">abdel.akachar12@gmail.com</span>
              </a>
            </div>
          </div>

          {/* ServicesLinks */}
          <div>
            <h4 className="font-montserrat font-black uppercase tracking-widest text-sm text-white/40 mb-8">
              Services
            </h4>
            <ul className="space-y-4 font-medium text-white/70">
              <li><a href="#energie" className="hover:text-accent-energy transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-energy" /> Énergie</a></li>
              <li><a href="#solaire" className="hover:text-accent-solar transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-solar" /> Panneaux Solaires</a></li>
              <li><a href="#telecom" className="hover:text-accent-telecom transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-telecom" /> Télécom</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-montserrat font-black uppercase tracking-widest text-sm text-white/40 mb-8">
              Suivez-nous
            </h4>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all text-white rounded-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-white/40">
          <p>© {new Date().getFullYear()} AKR Group. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
