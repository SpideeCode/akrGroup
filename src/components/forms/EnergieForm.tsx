import { useState } from 'react';
import FormWizard from '../FormWizard';
import { supabase } from '../../lib/supabase';

interface EnergieFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  address: string;
  status: string;
  energie: string;
  meterType: string;
  meterBrand: string;
  hasSolar: string;
  consumption: string;
  housingType: string;
  buildingType: string;
  heating: string;
  persons: string;
  hasCar: string;
  hasHeatPump: string;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
}

export default function EnergieForm({ isOpen, onClose, onSuccess }: EnergieFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    address: '',
    status: '',
    energie: '',
    meterType: '',
    meterBrand: '',
    hasSolar: '',
    consumption: '',
    housingType: '',
    buildingType: '',
    heating: '',
    persons: '',
    hasCar: '',
    hasHeatPump: '',
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
        return formData.address && formData.status;
      case 1:
        return formData.energie && formData.meterType && formData.meterBrand;
      case 2:
        return formData.hasSolar && formData.consumption;
      case 3:
        return formData.housingType && formData.buildingType && formData.heating && formData.persons;
      case 4:
        return formData.hasCar && formData.hasHeatPump;
      case 5:
        return formData.name && formData.phone;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('quote_requests').insert({
        service_type: 'energie',
        form_data: formData,
        contact_name: formData.name,
        contact_email: formData.email || null,
        contact_phone: formData.phone,
        contact_postal_code: formData.postalCode || null,
      });

      if (error) throw error;

      onSuccess();
      onClose();
      setCurrentStep(0);
      setFormData({
        address: '',
        status: '',
        energie: '',
        meterType: '',
        meterBrand: '',
        hasSolar: '',
        consumption: '',
        housingType: '',
        buildingType: '',
        heating: '',
        persons: '',
        hasCar: '',
        hasHeatPump: '',
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
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Adresse et Statut
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse complète *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Rue, numéro, code postal, ville"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Statut *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Propriétaire', 'Locataire'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('status', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.status === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>,

    <div key="step2" className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Énergie et Compteur
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type d'énergie *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Électricité', 'Gaz', 'Électricité + Gaz'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('energie', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.energie === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de compteur *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Digital', 'Analogique'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('meterType', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.meterType === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Marque du compteur *
        </label>
        <select
          value={formData.meterBrand}
          onChange={(e) => updateField('meterBrand', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez une marque</option>
          <option value="Linky">Linky</option>
          <option value="Gazpar">Gazpar</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
    </div>,

    <div key="step3" className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Situation
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avez-vous des panneaux solaires ? *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Oui', 'Non'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('hasSolar', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.hasSolar === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Consommation annuelle estimée (kWh) *
        </label>
        <input
          type="text"
          value={formData.consumption}
          onChange={(e) => updateField('consumption', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Ex: 3000"
        />
      </div>
    </div>,

    <div key="step4" className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Habitation
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type d'habitation *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Maison', 'Appartement'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('housingType', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.housingType === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de bâtiment *
        </label>
        <select
          value={formData.buildingType}
          onChange={(e) => updateField('buildingType', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez</option>
          <option value="Ancien">Ancien</option>
          <option value="Neuf">Neuf</option>
          <option value="Rénové">Rénové</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de chauffage *
        </label>
        <select
          value={formData.heating}
          onChange={(e) => updateField('heating', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        >
          <option value="">Sélectionnez</option>
          <option value="Électrique">Électrique</option>
          <option value="Gaz">Gaz</option>
          <option value="Pompe à chaleur">Pompe à chaleur</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de personnes dans le foyer *
        </label>
        <input
          type="number"
          value={formData.persons}
          onChange={(e) => updateField('persons', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Ex: 4"
          min="1"
        />
      </div>
    </div>,

    <div key="step5" className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Options
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avez-vous une voiture électrique ? *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Oui', 'Non'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('hasCar', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.hasCar === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avez-vous une pompe à chaleur ? *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Oui', 'Non'].map((option) => (
            <button
              key={option}
              onClick={() => updateField('hasHeatPump', option)}
              className={`p-4 border-2 rounded-lg font-medium transition-all ${
                formData.hasHeatPump === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>,

    <div key="step6" className="space-y-6">
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
      canProceed={validateStep()}
    >
      {steps}
    </FormWizard>
  );
}
