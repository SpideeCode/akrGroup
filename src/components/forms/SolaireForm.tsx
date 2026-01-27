import { useState } from 'react';
import FormWizard from '../FormWizard';
import { supabase } from '../../lib/supabase';

interface SolaireFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  kwh: string;
  phase: string;
  tva: string;
  buildingAge: string;
  roofType: string;
  orientation: string;
  inclination: string;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
}

export default function SolaireForm({ isOpen, onClose, onSuccess }: SolaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    kwh: '',
    phase: '',
    tva: '',
    buildingAge: '',
    roofType: '',
    orientation: '',
    inclination: '',
    name: '',
    phone: '',
    email: '',
    postalCode: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        return formData.kwh && formData.phase && formData.tva;
      case 1:
        return formData.buildingAge && formData.roofType && formData.orientation && formData.inclination;
      case 2:
        return formData.name && formData.phone;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('quote_requests').upsert({
        service_type: 'solaire',
        form_data: formData,
        contact_name: formData.name,
        contact_email: formData.email || null,
        contact_phone: formData.phone,
        contact_postal_code: formData.postalCode || null,
        status: 'pending',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'service_type,contact_phone'
      });

      if (error) throw error;

      onSuccess();
      onClose();
      setCurrentStep(0);
      setFormData({
        kwh: '',
        phase: '',
        tva: '',
        buildingAge: '',
        roofType: '',
        orientation: '',
        inclination: '',
        name: '',
        phone: '',
        email: '',
        postalCode: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const steps = [
    <div key="step1" className="space-y-6">
      <h3 className="text-2xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-6">
        Votre <span className="text-accent-solar">Consommation</span>
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Consommation annuelle (kWh) *
        </label>
        <input
          type="text"
          value={formData.kwh}
          onChange={(e) => updateField('kwh', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Ex: 5000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phase électrique *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Monophasé', 'Triphasé'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('phase', option)}
              className={`btn-option ${formData.phase === option ? 'btn-option-active' : 'btn-option-inactive'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taux de TVA applicable *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['10%', '20%'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('tva', option)}
              className={`btn-option ${formData.tva === option ? 'btn-option-active' : 'btn-option-inactive'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          10% pour les logements de plus de 2 ans, 20% pour les neufs
        </p>
      </div>
    </div>,

    <div key="step2" className="space-y-6">
      <h3 className="text-2xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-6">
        Informations <span className="text-accent-solar">Habitat</span>
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Âge du bâtiment *
        </label>
        <select
          value={formData.buildingAge}
          onChange={(e) => updateField('buildingAge', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez</option>
          <option value="Moins de 2 ans">Moins de 2 ans</option>
          <option value="2 à 15 ans">2 à 15 ans</option>
          <option value="Plus de 15 ans">Plus de 15 ans</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de toiture *
        </label>
        <select
          value={formData.roofType}
          onChange={(e) => updateField('roofType', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez</option>
          <option value="Tuiles">Tuiles</option>
          <option value="Ardoises">Ardoises</option>
          <option value="Tôle">Tôle</option>
          <option value="Bac acier">Bac acier</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Orientation de la toiture *
        </label>
        <select
          value={formData.orientation}
          onChange={(e) => updateField('orientation', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez</option>
          <option value="Sud">Sud</option>
          <option value="Sud-Est">Sud-Est</option>
          <option value="Sud-Ouest">Sud-Ouest</option>
          <option value="Est">Est</option>
          <option value="Ouest">Ouest</option>
          <option value="Nord">Nord</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Inclinaison de la toiture *
        </label>
        <select
          value={formData.inclination}
          onChange={(e) => updateField('inclination', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez</option>
          <option value="0-15°">0-15° (Plate)</option>
          <option value="15-30°">15-30° (Faible)</option>
          <option value="30-45°">30-45° (Moyenne)</option>
          <option value="45°+">45°+ (Forte)</option>
        </select>
      </div>
    </div>,

    <div key="step3" className="space-y-6">
      <h3 className="text-2xl font-black font-montserrat uppercase tracking-tight text-brand-dark mb-6">
        Dernière <span className="text-accent-solar">Étape</span>
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Code postal
        </label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) => updateField('postalCode', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="75001"
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
