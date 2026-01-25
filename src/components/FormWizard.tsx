import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode[];
  onSubmit: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canProceed?: boolean;
}

export default function FormWizard({
  isOpen,
  onClose,
  children,
  onSubmit,
  currentStep,
  setCurrentStep,
  canProceed = true,
}: FormWizardProps) {
  const totalSteps = children.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-dark/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-brand-cream border-2 border-brand-dark max-w-2xl w-full my-8 relative"
      >
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-dark/10">
          <motion.div
            className="bg-accent-energy h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>

        <div className="p-8 md:p-12 border-b border-brand-dark/10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted mb-2 block">
                Questionnaire — Étape {currentStep + 1}/{totalSteps}
              </span>
              <h2 className="text-3xl font-black font-montserrat uppercase tracking-tighter text-brand-dark">
                Demande de <span className="text-accent-energy">Devis</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-brand-dark/10 hover:border-brand-dark transition-colors group"
            >
              <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-8 md:p-12 bg-brand-dark/5 flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-3 px-8 py-4 font-montserrat font-bold uppercase text-xs tracking-widest text-brand-dark border-2 border-brand-dark transition-all hover:bg-brand-dark hover:text-white disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-3 px-8 py-4 font-montserrat font-black uppercase text-xs tracking-widest bg-brand-dark text-white border-2 border-brand-dark transition-all hover:bg-accent-energy hover:border-accent-energy disabled:opacity-20 disabled:pointer-events-none"
          >
            {currentStep === totalSteps - 1 ? 'Soumettre' : 'Continuer'}
            {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
