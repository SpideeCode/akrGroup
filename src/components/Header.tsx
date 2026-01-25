interface HeaderProps {
  onDevisClick: () => void;
}

export default function Header({ onDevisClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            AKR Group
          </h1>
        </div>
        <button
          onClick={onDevisClick}
          className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Devis Gratuit
        </button>
      </div>
    </header>
  );
}
