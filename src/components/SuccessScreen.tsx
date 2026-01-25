import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface SuccessScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessScreen({ isOpen, onClose }: SuccessScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Merci !
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Votre demande de devis gratuit a bien été envoyée. Un conseiller AKR Group vous recontactera rapidement.
          </p>

          <button
            onClick={onClose}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
