import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import EnergieForm from './components/forms/EnergieForm';
import SolaireForm from './components/forms/SolaireForm';
import TelecomForm from './components/forms/TelecomForm';
import SuccessScreen from './components/SuccessScreen';
import Features from './components/Features';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

type ServiceType = 'energie' | 'solaire' | 'telecom' | null;

function LandingPage() {
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
      <Features />
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

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/admin/login"
        element={session ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => { }} onBack={() => navigate('/')} />}
      />
      <Route
        path="/admin/dashboard"
        element={session ? <AdminDashboard onLogout={() => supabase.auth.signOut()} /> : <Navigate to="/admin/login" />}
      />
      {/* Catch all redirect to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
