
import React, { useEffect } from 'react';
import { EraTheme } from '../types';

interface PopupProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  eraTheme: EraTheme;
  isOverlay?: boolean; // For full-screen type popups like easter egg triggers
  reduceMotion: boolean;
}

const Popup: React.FC<PopupProps> = ({ title, message, isOpen, onClose, eraTheme, isOverlay, reduceMotion }) => {
  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      const focusableElements = Array.from(
        (document.querySelector('[role="dialog"]') as HTMLElement)?.querySelectorAll(
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
        if (event.key === 'Tab') {
          if (focusableElements.length === 0) return;
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
  const popupContentClasses = `p-6 rounded-lg shadow-2xl border-4 ${mainBgClass} ${eraTheme.textColor} ${eraTheme.accentColor} ${reduceMotion ? '' : 'transform transition-all duration-300 ease-out'}`;
  
  let positionStyle: React.CSSProperties = {};
  if (!isOverlay) {
    const positionVariance = eraTheme.name === "Dot Com Boom" ? 0.5 : 0.3;
    const randomTop = Math.random() * (positionVariance * 60) + 5;
    const randomLeft = Math.random() * (positionVariance * 70) + 5;
    positionStyle = { marginTop: `${randomTop}vh`, marginLeft: `${randomLeft}vw` };
  }


  const closeButtonBase = "p-1 rounded-full focus:outline-none focus:ring-2";
  const closeButtonXColor = eraTheme.textColor.includes("text-white") || eraTheme.textColor.includes("text-yellow-300") || eraTheme.textColor.includes("text-pink-300") || eraTheme.textColor.includes("text-green-400")
    ? "text-black bg-white hover:bg-gray-300"
    : "text-white bg-black hover:bg-gray-700";
  
  const primaryButtonClasses = `mt-6 w-full py-2 px-4 rounded font-semibold focus:outline-none focus:ring-2
    ${eraTheme.buttonClasses || (mainBgClass.includes("bg-black") ? "bg-green-500 text-black" : "bg-blue-500 text-white")}
    ${eraTheme.buttonHoverClasses || (mainBgClass.includes("bg-black") ? "hover:bg-green-400" : "hover:bg-blue-400")}
    ${eraTheme.accentColor.replace('border-','focus:ring-')}
  `;
  
  const titleClass = `text-2xl font-bold ${eraTheme.pixelFontFamily && eraTheme.name === "Terminal Green" ? eraTheme.pixelFontFamily : ''} ${eraTheme.useGlitterTextForHeaders && eraTheme.name === "MySpace Era" && !reduceMotion ? 'glitter-text' : ''}`;

  const containerClasses = isOverlay
    ? "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    : `fixed inset-0 bg-black bg-opacity-30 flex items-start justify-start z-50 p-2 sm:p-4 ${reduceMotion ? '' : 'animate-pulse'}`;
  
  const dialogWidth = isOverlay ? "max-w-lg" : "max-w-xs sm:max-w-md";

  return (
    <div 
        className={containerClasses}
        onClick={!isOverlay ? onClose : undefined} // Only close on overlay click if not an 'isOverlay' type popup
    >
      <div 
        className={`${popupContentClasses} w-full ${dialogWidth} ${eraTheme.font}`}
        style={positionStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="popup-title" className={titleClass}>{title}</h2>
          <button
            onClick={onClose}
            className={`${closeButtonBase} ${closeButtonXColor}`}
            aria-label="Close popup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm sm:text-md whitespace-pre-wrap">{message}</p>
        <button 
          onClick={onClose} 
          className={primaryButtonClasses}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
