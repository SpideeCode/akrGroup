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
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Services souhaités
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
              className={`w-full p-4 border-2 rounded-lg font-medium transition-all text-left ${
                formData.services.includes(service)
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  formData.services.includes(service)
                    ? 'border-blue-900 bg-blue-900'
                    : 'border-gray-300'
                }`}>
                  {formData.services.includes(service) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opérateur actuel *
        </label>
        <input
          type="text"
          value={formData.currentProvider}
          onChange={(e) => updateField('currentProvider', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Ex: Orange, Free, SFR..."
        />
      </div>
    </div>,

    <div key="step2" className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Coordonnées
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="06 12 34 56 78"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Code postal *
        </label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) => updateField('postalCode', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="75001"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
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
      canProceed={validateStep()}
    >
      {steps}
    </FormWizard>
  );
}
