
import React, { useEffect } from 'react';

interface RickrollOverlayProps {
  onClose: () => void;
  videoTitle?: string;
  message?: string;
}

const RickrollOverlay: React.FC<RickrollOverlayProps> = ({ 
  onClose, 
  videoTitle = "Rick Astley - Never Gonna Give You Up", 
  message = "You know the rules and so do I!" 
}) => {

  useEffect(() => {
    const timer = setTimeout(onClose, 10000); // Auto-close after 10 seconds
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-8 text-white font-comic-like text-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rickroll-title"
    >
      <div className="bg-red-700 p-6 rounded-lg shadow-2xl border-4 border-yellow-300 max-w-md">
        <img src="https://i.giphy.com/media/Ju7l5y9osyymQ/giphy.gif" alt="Rick Astley dancing" className="w-full max-w-xs mx-auto mb-4 rounded border-2 border-yellow-300"/>
        <h2 id="rickroll-title" className="text-3xl font-bold text-yellow-300 mb-2 animate-pulse">{videoTitle}</h2>
        <p className="text-lg mb-4">{message}</p>
        <p className="text-sm italic">(Click anywhere or press Esc to close)</p>
        <button 
            onClick={onClose} 
            className="mt-4 bg-yellow-400 text-red-800 font-bold px-4 py-2 rounded hover:bg-yellow-300"
        >
            Okay, you got me!
        </button>
      </div>
    </div>
  );
};

export default RickrollOverlay;
