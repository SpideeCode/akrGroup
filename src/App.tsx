import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import EnergieForm from './components/forms/EnergieForm';
import SolaireForm from './components/forms/SolaireForm';
import TelecomForm from './components/forms/TelecomForm';
import SuccessScreen from './components/SuccessScreen';

type ServiceType = 'energie' | 'solaire' | 'telecom' | null;

function App() {
  const [activeForm, setActiveForm] = useState<ServiceType>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleServiceClick = (service: ServiceType) => {
    setActiveForm(service);
  };

  const handleFormClose = () => {
    setActiveForm(null);
  };

  const handleFormSuccess = () => {
    setShowSuccess(true);
  };

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Header onDevisClick={scrollToServices} />
      <Hero onDevisClick={scrollToServices} />
      <div id="services">
        <Services onServiceClick={handleServiceClick} />
      </div>
      <Footer />

      <EnergieForm
        isOpen={activeForm === 'energie'}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <SolaireForm
        isOpen={activeForm === 'solaire'}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <TelecomForm
        isOpen={activeForm === 'telecom'}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <SuccessScreen
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}

export default App;
