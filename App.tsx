
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Year, EraData, PopupContent as PopupContentType, TransitionEffectType, AdvancedEasterEggType, CustomizableColors } from './types';
import { ERAS_DATA, AVAILABLE_YEARS } from './constants';
import YearSelector from './components/YearSelector';
import EraContentRenderer from './components/EraContentRenderer';
import Popup from './components/Popup';
import TransitionOverlay from './components/TransitionOverlay';
import MatrixEffectOverlay from './components/MatrixEffectOverlay'; 
import RickrollOverlay from './components/RickrollOverlay'; 
import AboutOverlay from './components/AboutOverlay';


const getInitialYear = (): Year => {
  const savedYear = localStorage.getItem('timeTravelerSelectedYear');
  if (savedYear && AVAILABLE_YEARS.includes(Number(savedYear) as Year)) {
    return Number(savedYear) as Year;
  }
  return AVAILABLE_YEARS[0];
};

const getInitialReduceMotion = (): boolean => {
  const savedReduceMotion = localStorage.getItem('timeTravelerReduceMotion');
  if (savedReduceMotion) {
    return savedReduceMotion === 'true';
  }
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
};

const getInitialMySpaceColors = (): CustomizableColors => {
  const savedColors = localStorage.getItem('timeTravelerMySpaceColors');
  if (savedColors) {
    try {
      return JSON.parse(savedColors);
    } catch (e) {
      console.error("Failed to parse saved MySpace colors", e);
    }
  }
  return ERAS_DATA[2005].theme.customizableProfileColors || {};
}

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<Year>(getInitialYear());
  const [currentEraData, setCurrentEraData] = useState<EraData>(ERAS_DATA[getInitialYear()]);
  const [activePopups, setActivePopups] = useState<PopupContentType[]>([]);
  const [nextPopupId, setNextPopupId] = useState(0);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState<TransitionEffectType>('none');
  const transitionTimeoutRef = useRef<number | null>(null);

  const [reduceMotion, setReduceMotion] = useState<boolean>(getInitialReduceMotion());
  const [activeAdvancedEgg, setActiveAdvancedEgg] = useState<AdvancedEasterEggType | null>(null);
  const [advancedEggData, setAdvancedEggData] = useState<unknown>(null);

  const [mySpaceColors, setMySpaceColors] = useState<CustomizableColors>(getInitialMySpaceColors());

  useEffect(() => {
    document.body.classList.toggle('reduce-motion-enabled', reduceMotion);
    localStorage.setItem('timeTravelerReduceMotion', String(reduceMotion));
  }, [reduceMotion]);

  useEffect(() => {
    localStorage.setItem('timeTravelerSelectedYear', String(selectedYear));
    const newEraData = { ...ERAS_DATA[selectedYear] };
    if (selectedYear === 2005) {
      newEraData.theme = {
        ...newEraData.theme,
        customizableProfileColors: mySpaceColors,
      };
    }
    setCurrentEraData(newEraData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]); 

  useEffect(() => {
    if (selectedYear === 2005) {
      localStorage.setItem('timeTravelerMySpaceColors', JSON.stringify(mySpaceColors));
       setCurrentEraData(prev => ({
        ...prev,
        theme: {
          ...prev.theme,
          customizableProfileColors: mySpaceColors,
        }
      }));
    }
  }, [mySpaceColors, selectedYear]);


  const updateEraSpecificBodyStyles = useCallback((era: EraData) => {
    document.body.classList.toggle('crt-effect', !!era.theme.crtEffect && !reduceMotion);
    if (era.tiledBackgroundUrl) {
      document.body.style.backgroundImage = `url(${era.tiledBackgroundUrl})`;
      document.body.style.backgroundRepeat = 'repeat';
    } else {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
    }
    if (era.customCursorUrl) {
      document.body.style.cursor = `url(${era.customCursorUrl}), auto`;
    } else {
      document.body.style.cursor = 'default';
    }
  }, [reduceMotion]);

  useEffect(() => {
    updateEraSpecificBodyStyles(currentEraData);
  }, [currentEraData, updateEraSpecificBodyStyles]);

  const handleYearChange = useCallback((year: Year) => {
    if (year === selectedYear || isTransitioning) return;

    setIsTransitioning(true);
    const newEra = {...ERAS_DATA[year]}; 
    
    if (year === 2005) {
        const savedColors = localStorage.getItem('timeTravelerMySpaceColors');
        const currentCustomColors = savedColors ? JSON.parse(savedColors) : (newEra.theme.customizableProfileColors || {});
        setMySpaceColors(currentCustomColors); 
        newEra.theme = { ...newEra.theme, customizableProfileColors: currentCustomColors };
    }

    let effect: TransitionEffectType;
    if (year === 1985) {
      effect = 'static';
    } else if (year === 1991) {
      effect = 'fade';
    } else {
      effect = 'glitch';
    }
    setTransitionEffect(effect);
    
    const transitionDuration = effect === 'static' ? 2000 : 1500;
    
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setSelectedYear(year);
      setActivePopups([]);
      updateEraSpecificBodyStyles(newEra); 
      setIsTransitioning(false);
      setTransitionEffect('none');
      setActiveAdvancedEgg(null);

      const adsForPopup = newEra.ads.filter(a => a.type === 'popup');
      if (adsForPopup.length > 0) {
        adsForPopup.forEach((ad, index) => {
          if (ad.popupTitle) {
            setTimeout(() => triggerPopup(ad.popupTitle!, ad.text), index * (reduceMotion ? 50 : 500));
          }
        });
      } else if (year === 2000 || year === 1996 || year === 2005) {
         triggerPopup("Welcome!", `You've traveled to ${year}! Prepare for the experience!`);
      }
    }, reduceMotion ? 50 : transitionDuration);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, reduceMotion, updateEraSpecificBodyStyles, isTransitioning]);

  const triggerPopup = useCallback((title: string, message: string, isOverlay: boolean = false) => {
    const newPopup: PopupContentType = {
      id: `popup-${nextPopupId}`, title, message, isOpen: true, isOverlay
    };
    setNextPopupId(prev => prev + 1);
    const maxPopups = currentEraData.year === 2000 ? 5 : 3;
    setActivePopups(prev => [newPopup, ...prev].slice(0, maxPopups)); 
  }, [nextPopupId, currentEraData.year]);

  const closePopup = (id: string) => {
    setActivePopups(prev => prev.filter(p => p.id !== id));
  };

  const handleAdvancedEasterEgg = useCallback((eggType: AdvancedEasterEggType, data?: unknown) => {
    setActiveAdvancedEgg(eggType);
    setAdvancedEggData(data);
  }, []);

  const closeAdvancedEgg = () => {
    setActiveAdvancedEgg(null);
    setAdvancedEggData(null);
  };

  const toggleReduceMotion = () => setReduceMotion(!reduceMotion);

  const handleMySpaceColorChange = (colors: CustomizableColors) => {
    if (selectedYear === 2005) {
      setMySpaceColors(colors); 
    }
  };

  useEffect(() => {
    return () => { if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current); };
  }, []);

  const handleOpenAbout = () => setIsAboutOpen(true);
  const handleCloseAbout = () => setIsAboutOpen(false);

  const theme = currentEraData.theme;

  if (activeAdvancedEgg === 'matrix') {
    return <MatrixEffectOverlay onClose={closeAdvancedEgg} message={(advancedEggData as { message?: string })?.message || "The Matrix has you..."} />;
  }
  if (activeAdvancedEgg === 'rickroll') {
    return <RickrollOverlay onClose={closeAdvancedEgg} videoTitle={(advancedEggData as { videoTitle?: string })?.videoTitle || "Never Gonna Give You Up"} message={(advancedEggData as { message?: string })?.message || "You've been Rickroll'd (kinda!)"} />;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-700 ease-in-out ${theme.mainContainerClasses}`}>
      {isTransitioning && <TransitionOverlay effect={transitionEffect} eraData={currentEraData} reduceMotion={reduceMotion} />}
      
      <header className={`sticky top-0 z-40 shadow-md ${theme.headerClasses} ${theme.font} ${theme.textColor}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-2 sm:mb-0 ${theme.pixelFontFamily ? theme.pixelFontFamily : ''} ${theme.useGlitterTextForHeaders ? 'glitter-text' : ''}`}>Time Traveler's Web</h1>
          <YearSelector selectedYear={selectedYear} onYearChange={handleYearChange} theme={theme} disabled={isTransitioning} />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-2 sm:px-0 relative z-0">
        {!isTransitioning && 
          <EraContentRenderer 
            era={currentEraData} 
            onTriggerPopup={triggerPopup}
            onTriggerAdvancedEasterEgg={handleAdvancedEasterEgg}
            onMySpaceColorChange={selectedYear === 2005 ? handleMySpaceColorChange : undefined}
            mySpaceColors={selectedYear === 2005 ? mySpaceColors : undefined}
            reduceMotion={reduceMotion}
          />
        }
      </main>

      <footer className={`py-4 text-center text-sm border-t ${theme.accentColor} ${theme.font} ${theme.textColor} relative z-10`}>
        <div className="mt-2 space-x-2">
            <button onClick={toggleReduceMotion} className={`px-3 py-1 rounded text-xs ${theme.buttonClasses} ${theme.buttonHoverClasses}`} aria-pressed={reduceMotion} aria-label={reduceMotion ? "Disable reduce motion" : "Enable reduce motion"}>
                {reduceMotion ? 'Enable Motion' : 'Reduce Motion'}
            </button>
            <button onClick={handleOpenAbout} className={`px-3 py-1 rounded text-xs ${theme.buttonClasses} ${theme.buttonHoverClasses}`}>
                About This Site
            </button>
        </div>
        <p className="mt-2">&copy; {new Date().getFullYear()} Dhaatrik Chowdhury. Time Traveler's Web.</p>
        {currentEraData.footerNote && <p className="text-xs italic mt-1">{currentEraData.footerNote}</p>}
        <p>Currently experiencing the web of {selectedYear}.</p>
      </footer>

      {!isTransitioning && activePopups.map(popup => (
         <Popup key={popup.id} title={popup.title} message={popup.message} isOpen={popup.isOpen} onClose={() => closePopup(popup.id)} eraTheme={theme} isOverlay={popup.isOverlay} reduceMotion={reduceMotion} />
      ))}
      {!isTransitioning && <AboutOverlay isOpen={isAboutOpen} onClose={handleCloseAbout} eraTheme={theme} reduceMotion={reduceMotion} />}
    </div>
  );
};

export default App;
