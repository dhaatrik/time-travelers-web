
import React, { useEffect } from 'react';
import { EraTheme } from '../types';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  eraTheme: EraTheme;
  reduceMotion: boolean;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose, eraTheme, reduceMotion }) => {
  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      const focusableElements = Array.from(
        (document.querySelector('[role="dialog"][aria-labelledby="about-title"]') as HTMLElement)?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || []
      ) as HTMLElement[];
      
      const firstFocusableElement = focusableElements[0];
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
        if (event.key === 'Tab' && focusableElements.length > 0) {
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];
          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === first) {
              last.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === last) {
              first.focus();
              event.preventDefault();
            }
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (previouslyFocusedElement) {
          previouslyFocusedElement.focus();
        }
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  const mainBgClass = eraTheme.mainContainerClasses.split(' ').find(c => c.startsWith('bg-')) || 'bg-gray-700';
  const overlayContentClasses = `p-6 rounded-lg shadow-2xl border-4 ${mainBgClass} ${eraTheme.textColor} ${eraTheme.accentColor} w-full max-w-3xl max-h-[90vh] overflow-y-auto relative`;
  
  const closeButtonBase = "absolute top-2 right-2 p-1 rounded-full focus:outline-none focus:ring-2";
  const closeButtonXColor = eraTheme.textColor.includes("text-white") || eraTheme.textColor.includes("text-yellow-300") || eraTheme.textColor.includes("text-pink-300") || eraTheme.textColor.includes("text-green-400")
    ? "text-black bg-white hover:bg-gray-300"
    : "text-white bg-black hover:bg-gray-700";
  
  const titleClass = `text-3xl font-bold mb-4 border-b-2 pb-2 ${eraTheme.accentColor} ${eraTheme.pixelFontFamily ? eraTheme.pixelFontFamily : ''} ${eraTheme.useGlitterTextForHeaders && !reduceMotion ? 'glitter-text' : ''}`;
  const sectionTitleClass = `text-xl font-semibold mt-4 mb-2 ${eraTheme.linkColor}`;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
    >
      <div 
        className={`${overlayContentClasses} ${eraTheme.font}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="about-title" className={titleClass}>About Time Traveler’s Web</h2>
        
        <button
          onClick={onClose}
          className={`${closeButtonBase} ${closeButtonXColor}`}
          aria-label="Close about overlay"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-sm md:text-base space-y-3">
          <p>
            Welcome to Time Traveler’s Web, an interactive journey through the internet's most iconic eras. This application is a tribute to the quirky, creative, and sometimes chaotic evolution of web design and digital culture.
          </p>
          
          <h3 className={sectionTitleClass}>How It Works</h3>
          <p>
            Simply use the "Travel to:" dropdown to select a year. The entire website will instantly transform, adopting the aesthetics, content, and common features of that time. From the stark command-line interfaces of 1985 to the glitter-bombed profiles of 2005, each era is a unique snapshot of the past.
          </p>

          <h3 className={sectionTitleClass}>Technology Used</h3>
          <p>This digital time machine was built with a blend of modern and retro-inspired tech:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>React & TypeScript:</strong> For a robust and modern application structure.</li>
            <li><strong>Tailwind CSS:</strong> To rapidly style components while allowing for deep, era-specific customization.</li>
            <li><strong>Google Gemini API:</strong> The news headlines for each era are dynamically generated by Gemini to provide fresh, relevant content for each visit.</li>
            <li><strong>Local Storage:</strong> To remember your last visited era, guestbook entries, and other customizations.</li>
          </ul>

          <h3 className={sectionTitleClass}>A Note on Authenticity</h3>
          <p>
            While we've tried to capture the spirit of each era, this is a modern simulation. Features like popups, animations, and interactive elements are re-creations. For a better experience, we recommend exploring with your browser's developer tools to see how the sausage is made!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutOverlay;
