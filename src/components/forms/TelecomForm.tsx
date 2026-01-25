import { useState } from 'react';
import FormWizard from '../FormWizard';
import { supabase } from '../../lib/supabase';

interface TelecomFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  services: string[];
  currentProvider: string;
}

export default function TelecomForm({ isOpen, onClose, onSuccess }: TelecomFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    postalCode: '',
    services: [],
    currentProvider: '',
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleService = (service: string) => {
    const services = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];
    updateField('services', services);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        return formData.services.length > 0 && formData.currentProvider;
      case 1:
        return formData.name && formData.phone && formData.postalCode;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('quote_requests').insert({
        service_type: 'telecom',
        form_data: formData,
        contact_name: formData.name,
        contact_email: formData.email || null,
        contact_phone: formData.phone,
        contact_postal_code: formData.postalCode,
      });

      if (error) throw error;

      onSuccess();
      onClose();
      setCurrentStep(0);
      setFormData({
        name: '',
        phone: '',
        email: '',
        postalCode: '',
        services: [],
        currentProvider: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const steps = [
    <div key="step1" className="space-y-6">
      <h3 className="text-2xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-6">
        Besoin <span className="text-accent-telecom">Télécom</span>
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quels services vous intéressent ? *
        </label>
        <div className="space-y-3">
          {['Internet', 'TV', 'Téléphonie fixe', 'Mobile'].map((service) => (
            <button
              key={service}
              onClick={() => toggleService(service)}
              className={`w-full p-4 border-2 font-montserrat font-bold uppercase text-xs tracking-widest transition-all text-left ${formData.services.includes(service)
                  ? 'border-brand-dark bg-brand-dark text-white'
                  : 'border-brand-dark/10 hover:border-brand-dark/30 text-brand-dark/60'
                }`}
            >
              <span className="flex items-center gap-4">
                <span className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${formData.services.includes(service)
                    ? 'border-white bg-white'
                    : 'border-brand-dark/20'
                  }`}>
                  {formData.services.includes(service) && (
                    <svg className="w-3 h-3 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                {service}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Opérateur actuel *</label>
        <input
          type="text"
          value={formData.currentProvider}
          onChange={(e) => updateField('currentProvider', e.target.value)}
          placeholder="Ex: Orange, Free, SFR..."
        />
      </div>
    </div>,

    <div key="step2" className="space-y-6">
      <h3 className="text-2xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-6">
        Dernière <span className="text-accent-telecom">Étape</span>
      </h3>
      <div>
        <label>Nom complet *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label>Téléphone *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="06 12 34 56 78"
        />
      </div>
      <div>
        <label>Code postal *</label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) => updateField('postalCode', e.target.value)}
          placeholder="75001"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="votre@email.com"
        />
      </div>
    </div>,
  ];

  return (
    <FormWizard
      isOpen={isOpen}
      onClose={onClose}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      onSubmit={handleSubmit}
      canProceed={!!validateStep()}
    >
      {steps}
    </FormWizard>
  );
}
