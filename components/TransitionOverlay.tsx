
import React from 'react';
import { TransitionEffectType, EraData } from '../types';

interface TransitionOverlayProps {
  effect: TransitionEffectType;
  eraData: EraData;
  reduceMotion: boolean;
}

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ effect, eraData, reduceMotion }) => {
  if (effect === 'none' || reduceMotion) { // Skip effect if reduceMotion is true
    return null;
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: eraData.theme.mainContainerClasses.split(' ').find(c => c.startsWith('bg-')) || 'black',
    color: eraData.theme.textColor || 'white',
  };

  switch (effect) {
    case 'static':
      return (
        <div style={overlayStyle} className="transition-static-overlay" aria-live="assertive" role="alert">
          <p className={`text-2xl ${eraData.theme.pixelFontFamily || eraData.theme.font} animate-pulse`}>Re-calibrating Time Circuits...</p>
        </div>
      );
    case 'fade':
      return (
        <div style={overlayStyle} className="transition-fade-overlay" aria-live="assertive" role="alert">
          <p className={`text-2xl ${eraData.theme.font} animate-pulse`}>Synchronizing Timelines...</p>
        </div>
      );
    case 'glitch':
      const glitchText = `LOADING ${eraData.year}...`;
      return (
        <div style={overlayStyle} className={`transition-glitch-overlay ${eraData.theme.font}`} data-text={glitchText} aria-live="assertive" role="alert">
           <span className={`text-4xl font-bold ${eraData.theme.pixelFontFamily || ''}`}>{glitchText}</span>
        </div>
      );
    default:
      return null;
  }
};

export default TransitionOverlay;