

import React, { useState, useEffect, useCallback } from 'react';
import { EraData, AdContent, EraTheme, GuestbookEntry as GuestbookEntryType, MemeContent, AdvancedEasterEggType, CustomizableColors, Year } from '../types';
import MarqueeText from './MarqueeText';

const LOCAL_STORAGE_GUESTBOOK_PREFIX = 'timeTravelerGuestbook_';

const BootUpSequence: React.FC<{ sequence: string[], onFinished: () => void, theme: EraTheme, reduceMotion: boolean }> = ({ sequence, onFinished, theme, reduceMotion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < sequence.length) {
      const delay = reduceMotion ? 50 : 300 + Math.random() * 300;
      const timer = setTimeout(() => setCurrentIndex(prev => prev + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(onFinished, reduceMotion ? 50 : 500);
      return () => clearTimeout(finishTimer);
    }
  }, [currentIndex, sequence, onFinished, reduceMotion]);

  return (
    <div className={`my-8 p-4 ${theme.pixelFontFamily || theme.font} ${theme.textColor} text-left text-lg md:text-xl`}>
      {sequence.slice(0, currentIndex + 1).map((line, index) => (
        <div key={index} className="whitespace-pre">{line}</div>
      ))}
      {currentIndex < sequence.length && !reduceMotion && <div className="blinking-block-cursor blinking-block-cursor-green inline-block h-6"></div>}
    </div>
  );
};

const AsciiArtDisplay: React.FC<{ art: string[], clickable?: boolean, onClick?: () => void, theme: EraTheme }> = ({ art, clickable, onClick, theme }) => (
  <pre 
    className={`whitespace-pre-wrap overflow-x-auto text-xs sm:text-sm leading-tight my-4 p-2 border border-dashed ${theme.accentColor} ${theme.pixelFontFamily || theme.font} ${clickable ? 'cursor-pointer hover:opacity-75' : ''}`}
    onClick={clickable ? onClick : undefined}
    role={clickable ? "button" : undefined}
    tabIndex={clickable ? 0 : undefined}
    aria-label={clickable ? "Clickable ASCII art" : "ASCII art display"}
  >
    {art.join('\n')}
  </pre>
);

const AnimatedGifDisplay: React.FC<{ gifs: string[], eraName: string, reduceMotion: boolean }> = ({ gifs, eraName, reduceMotion }) => (
  <div className="flex flex-wrap gap-2 sm:gap-4 my-4 justify-center items-center">
    {gifs.map((gifSrc, index) => (
      <img key={index} src={gifSrc} alt={`${eraName} era ${ reduceMotion ? 'image' : 'gif'} ${index + 1}`} className="h-16 sm:h-20 md:h-24 border-2 border-dashed p-1 object-contain" />
    ))}
  </div>
);

const UnderConstructionSign: React.FC<{ eraTheme: EraTheme, reduceMotion: boolean }> = ({ eraTheme, reduceMotion }) => (
  <div className={`my-6 p-4 border-4 border-dashed ${eraTheme.accentColor} text-center ${eraTheme.font}`}>
    <img src="https://i.giphy.com/media/V Chord/construction-sign-gif-CaSWXqLhr05sA/giphy.gif" alt="Under Construction" className="mx-auto mb-2 h-20 sm:h-24" />
    <p className={`text-xl font-bold ${!reduceMotion ? 'animate-pulse' : ''} ${eraTheme.pixelFontFamily || ''}`}>SITE UNDER CONSTRUCTION</p>
    <p className="text-sm">Come back soon!</p>
  </div>
);

const Guestbook: React.FC<{ eraTheme: EraTheme, eraYear: Year, reduceMotion: boolean }> = ({ eraTheme, eraYear, reduceMotion }) => {
  const guestbookStorageKey = `${LOCAL_STORAGE_GUESTBOOK_PREFIX}${eraYear}`;
  const [entries, setEntries] = useState<GuestbookEntryType[]>(() => {
    const savedEntries = localStorage.getItem(guestbookStorageKey);
    if (savedEntries) {
      try {
        return JSON.parse(savedEntries);
      } catch (e) {
        console.error("Failed to parse guestbook entries from localStorage", e);
      }
    }
    return [
      { id: 1, name: "RetroFan", message: "Cool page! Takes me back!", timestamp: Date.now() - 100000 },
      { id: 2, name: "TimeTravelerX", message: "Totally rad! Luv the vibes <3", timestamp: Date.now() - 50000 },
    ];
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(guestbookStorageKey, JSON.stringify(entries));
  }, [entries, guestbookStorageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setEntries(prevEntries => [...prevEntries, { id: Date.now(), name: name.trim(), message: message.trim(), timestamp: Date.now() }]);
      setName("");
      setMessage("");
    }
  };
  
  const inputBaseClasses = `w-full p-2 border ${eraTheme.accentColor} bg-transparent focus:ring-2 ${eraTheme.accentColor.replace('border-','focus:ring-')}`;
  const inputCursorClass = eraTheme.applyInputBlinkingCursor && !reduceMotion ? 'blinking-block-cursor blinking-block-cursor-green' : '';

  return (
    <div className={`my-6 p-4 border-2 ${eraTheme.accentColor} ${eraTheme.font}`}>
      <h3 className={`text-2xl font-bold mb-3 ${eraTheme.textColor} ${eraTheme.guestbookHeaderSparkly && !reduceMotion ? 'sparkly-text' : ''} ${eraTheme.pixelFontFamily && eraTheme.name === "GeoCities Sparkle" ? eraTheme.pixelFontFamily : ''}`}>
        Sign My Guestbook!
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div>
          <label htmlFor={`guestbook-name-${eraYear}`} className="sr-only">Your Name</label>
          <input 
            id={`guestbook-name-${eraYear}`}
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className={`${inputBaseClasses} ${inputCursorClass}`} />
        </div>
        <div>
          <label htmlFor={`guestbook-message-${eraYear}`} className="sr-only">Your Message</label>
          <textarea 
            id={`guestbook-message-${eraYear}`}
            placeholder="Your Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={`${inputBaseClasses} ${inputCursorClass} h-20`} />
        </div>
        <button type="submit" 
          className={`py-2 px-4 rounded ${eraTheme.buttonClasses} ${eraTheme.buttonHoverClasses} ${eraTheme.buttonActiveClasses}`}
        >
          Sign!
        </button>
      </form>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {entries.slice().sort((a,b) => b.timestamp - a.timestamp).map(entry => (
          <div key={entry.id} className={`p-2 border-b ${eraTheme.accentColor}`}>
            <p className={`font-semibold ${eraTheme.linkHoverColor || eraTheme.linkColor}`}>{entry.name} <span className="text-xs opacity-70">({new Date(entry.timestamp).toLocaleDateString()})</span> wrote:</p>
            <p className="whitespace-pre-wrap break-words">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const HtmlTutorial: React.FC<{ eraTheme: EraTheme }> = ({ eraTheme }) => (
  <div className={`my-6 p-4 border-2 ${eraTheme.accentColor} ${eraTheme.font}`}>
    <h3 className={`text-2xl font-bold mb-3 ${eraTheme.textColor}`}>HTML Basics!</h3>
    <pre className="text-sm sm:text-base">
      <code>&lt;H1&gt;Big Heading&lt;/H1&gt;</code> - Makes text big!<br/>
      <code>&lt;P&gt;Paragraph&lt;/P&gt;</code> - For your text.<br/>
      <code>&lt;A HREF="url"&gt;Click Me!&lt;/A&gt;</code> - Link to other pages!<br/>
      <code>&lt;IMG SRC="image.gif"&gt;</code> - Show a picture!<br/>
      <code>&lt;HR&gt;</code> - Draws a line!
    </pre>
  </div>
);

const FlashDemo: React.FC<{ eraTheme: EraTheme, reduceMotion: boolean }> = ({ eraTheme, reduceMotion }) => (
   <div className={`my-6 p-4 border-2 ${eraTheme.accentColor} text-center ${eraTheme.font}`}>
    <h3 className={`text-2xl font-bold mb-3 ${eraTheme.textColor} ${eraTheme.pixelFontFamily && eraTheme.name === "GeoCities Sparkle" ? eraTheme.pixelFontFamily : ''}`}>Totally Awesome Animation!</h3>
    <img src="https://i.giphy.com/media/cGEASD6ua34d2/giphy.gif" alt="Fake Flash Animation" className={`mx-auto border-4 p-1 ${!reduceMotion ? 'animate-pulse' : ''} h-32 sm:h-40`} />
    <p className="mt-2 text-sm italic">(Imagine this is a cool Macromedia Flash movie)</p>
  </div>
);

const BestViewedWithBadges: React.FC<{ badges: string[], eraTheme: EraTheme }> = ({ badges, eraTheme }) => (
  <div className={`my-4 py-2 border-y-2 ${eraTheme.accentColor} flex flex-wrap justify-center items-center gap-2`}>
    {badges.map((badgeSrc, index) => (
      <img key={index} src={badgeSrc} alt={`Best viewed with badge ${index + 1}`} className="h-8 md:h-10" />
    ))}
  </div>
);

const HitCounter: React.FC<{ eraTheme: EraTheme }> = ({ eraTheme }) => (
  <div className={`my-4 p-2 ${eraTheme.accentColor} border text-center ${eraTheme.font}`}>
    <img src="https://web.archive.org/web/20091027002109im_/http://www.geocities.com/digitown/counter.gif" alt="Hit Counter" className="mx-auto h-10 md:h-12" />
    <p className={`text-xs ${eraTheme.textColor} ${eraTheme.pixelFontFamily || ''}`}>You are visitor #{Math.floor(Date.now() / 100000)}</p>
  </div>
);

const MySpaceColorCustomizer: React.FC<{
  currentColors: CustomizableColors;
  onChange: (newColors: CustomizableColors) => void;
  eraTheme: EraTheme;
}> = ({ currentColors, onChange, eraTheme }) => {
  const handleColorChange = (type: keyof CustomizableColors, value: string) => {
    onChange({ ...currentColors, [type]: value });
  };

  const inputLabelClasses = `mr-2 ${eraTheme.textColor}`;

  return (
    <div className={`p-2 my-2 border rounded ${eraTheme.accentColor} bg-black bg-opacity-50`}>
      <h5 className={`text-sm font-semibold mb-1 ${eraTheme.textColor}`}>Customize Profile Colors:</h5>
      <div className="flex flex-col sm:flex-row gap-2 items-center text-xs">
        <div>
          <label htmlFor="myspace-bg-color" className={inputLabelClasses}>BG:</label>
          <input id="myspace-bg-color" type="color" value={currentColors.profileBgColor || '#000000'} onChange={(e) => handleColorChange('profileBgColor', e.target.value)} className="simple-color-input" />
        </div>
        <div>
          <label htmlFor="myspace-text-color" className={inputLabelClasses}>Text:</label>
          <input id="myspace-text-color" type="color" value={currentColors.profileTextColor || '#FF00FF'} onChange={(e) => handleColorChange('profileTextColor', e.target.value)} className="simple-color-input" />
        </div>
        <div>
          <label htmlFor="myspace-accent-color" className={inputLabelClasses}>Accent:</label>
          <input id="myspace-accent-color" type="color" value={currentColors.profileAccentColor || '#00FFFF'} onChange={(e) => handleColorChange('profileAccentColor', e.target.value)} className="simple-color-input" />
        </div>
      </div>
    </div>
  );
};


const ProfileSection: React.FC<{ eraTheme: EraTheme; mySpaceColors?: CustomizableColors; onMySpaceColorChange?: (colors: CustomizableColors) => void;}> = ({ eraTheme, mySpaceColors, onMySpaceColorChange }) => {
  const bgColor = mySpaceColors?.profileBgColor || eraTheme.customizableProfileColors?.profileBgColor || '#1a1a1a';
  const textColor = mySpaceColors?.profileTextColor || eraTheme.customizableProfileColors?.profileTextColor || '#ff69b4';
  const accentColor = mySpaceColors?.profileAccentColor || eraTheme.customizableProfileColors?.profileAccentColor || '#00ffff';

  return (
    <div className={`my-6 p-4 border-2 ${eraTheme.accentColor} ${eraTheme.font}`} style={{ backgroundColor: bgColor, color: textColor }}>
      <h3 className={`text-2xl font-bold mb-3 ${eraTheme.useGlitterTextForHeaders ? 'glitter-text' : ''} ${eraTheme.pixelFontFamily || ''}`} style={{ color: textColor }}>xX_My_Aw3s0m3_Pr0f1l3_Xx</h3>
      
      {onMySpaceColorChange && mySpaceColors && (
        <MySpaceColorCustomizer currentColors={mySpaceColors} onChange={onMySpaceColorChange} eraTheme={eraTheme} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <img src="https://picsum.photos/seed/profilepic/150/150" alt="MySpace Profile Pic" style={{ borderColor: accentColor }} className={`border-4 rounded-full mx-auto`} />
          <p className={`text-center mt-2 font-semibold`} style={{ color: accentColor }}>Xx_Sk8erBoi_420_xX</p>
          <p className="text-center text-xs">"rawr means i love you in dinosaur xD"</p>
        </div>
        <div className="md:col-span-2">
          <h4 className={`font-semibold text-lg`}>About Me:</h4>
          <p className="text-sm mb-2">Just a kid tryin 2 make it in this crazy w0rld. Luv music, sk8boarding, and hangin w/ my top 8!!1!</p>
          <h4 className={`font-semibold text-lg`}>My Top 8 Friendz:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {["Tom (from MySpace)", "UrMom69", "SceneQueen_xO", "BandObsessed", "GlitterGurl", "ShadowNinja", "PikachuFan", "Xx_CoolDude_xX"].map(friend => (
              <li key={friend} style={{ color: accentColor, textDecorationColor: accentColor }} className={`hover:opacity-75`}>{friend}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


const EmbeddedMediaPlayer: React.FC<{ eraTheme: EraTheme }> = ({ eraTheme }) => (
  <div className={`my-6 p-4 border-2 ${eraTheme.accentColor} text-center ${eraTheme.font} bg-black bg-opacity-20`}>
     <h3 className={`text-xl font-bold mb-3 ${eraTheme.textColor} ${eraTheme.pixelFontFamily || ''}`}>Now Playing: My Chemical Romance - Welcome to the Black Parade</h3>
    <img src="https://via.placeholder.com/300x80.png?text=Fake+MySpace+Music+Player" alt="MySpace Music Player" className={`mx-auto border-2 ${eraTheme.accentColor} p-1`} />
    <p className="mt-2 text-xs italic">(Click to play... if this was real!)</p>
  </div>
);

const MemesDisplay: React.FC<{ memes: MemeContent[], eraTheme: EraTheme, reduceMotion: boolean, culturalReferences?: string[] }> = ({ memes, eraTheme, reduceMotion, culturalReferences }) => (
  <div className={`my-8 p-4 border-t-4 ${eraTheme.accentColor}`}>
    <h3 className={`text-2xl font-semibold mb-4 text-center ${eraTheme.textColor} ${eraTheme.pixelFontFamily ? eraTheme.pixelFontFamily : ''} ${eraTheme.useGlitterTextForHeaders ? 'glitter-text' : ''}`}>Memes & Culture of {eraTheme.name === "MySpace Era" ? "2005" : eraTheme.name === "Dot Com Boom" ? "2000" : eraTheme.name}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {memes.map(meme => (
        <div key={meme.id} className={`p-3 border rounded ${eraTheme.accentColor} ${eraTheme.font}`}>
          <img src={meme.imageUrl} alt={meme.caption} className={`w-full h-32 object-contain mb-2 border ${eraTheme.accentColor}`} />
          <p className={`font-semibold text-sm ${eraTheme.linkColor}`}>{meme.caption}</p>
          {meme.yearContext && <p className="text-xs italic opacity-80 mt-1">{meme.yearContext}</p>}
        </div>
      ))}
    </div>
    {/* Cultural References */}
    {eraTheme.name && culturalReferences && culturalReferences.length > 0 && (
        <div className="mt-6">
            <h4 className={`text-lg font-semibold mb-2 ${eraTheme.textColor}`}>Also happening:</h4>
            <ul className={`list-disc list-inside text-sm space-y-1 ${eraTheme.textColor} opacity-90`}>
                {culturalReferences.map((ref, idx) => <li key={idx}>{ref}</li>)}
            </ul>
        </div>
    )}
  </div>
);


interface EraContentRendererProps {
  era: EraData;
  onTriggerPopup: (title: string, message: string, isOverlay?: boolean) => void;
  onTriggerAdvancedEasterEgg: (eggType: AdvancedEasterEggType, data?: unknown) => void;
  mySpaceColors?: CustomizableColors;
  onMySpaceColorChange?: (colors: CustomizableColors) => void;
  reduceMotion: boolean;
}

const EraContentRenderer: React.FC<EraContentRendererProps> = (props) => {
  const { 
    era, 
    onTriggerPopup, 
    onTriggerAdvancedEasterEgg, 
    mySpaceColors, 
    onMySpaceColorChange, 
    reduceMotion,
  } = props;
  const [showFullContent, setShowFullContent] = useState(!era.bootUpSequence || reduceMotion);


  useEffect(() => {
    setShowFullContent(!era.bootUpSequence || reduceMotion);
  }, [era, reduceMotion]);

  const handleBootUpFinished = () => {
    setShowFullContent(true);
  };

  const handleAdClick = (ad: AdContent) => {
    if (ad.type === 'popup' && ad.popupTitle) {
      onTriggerPopup(ad.popupTitle, ad.text);
    }
  };

  const handleAsciiArtClick = () => {
    if (era.asciiArtClickable && era.asciiArtClickMessage) {
      onTriggerPopup("ASCII Interaction!", era.asciiArtClickMessage);
    }
  };
  
  const handleEasterEggClick = () => {
    if (era.advancedEasterEgg) {
      if (era.advancedEasterEgg.triggerMessage) {
        onTriggerPopup("Secret Found!", era.advancedEasterEgg.triggerMessage, true); 
        setTimeout(() => {
          onTriggerAdvancedEasterEgg(era.advancedEasterEgg!.type, era.advancedEasterEgg!.data);
        }, reduceMotion ? 50: 2000);
      } else {
        onTriggerAdvancedEasterEgg(era.advancedEasterEgg.type, era.advancedEasterEgg.data);
      }
    } else if (era.basicEasterEggText) {
      onTriggerPopup("Secret Found!", era.basicEasterEggText);
    }
  };

  if (era.bootUpSequence && !showFullContent) {
    return <BootUpSequence sequence={era.bootUpSequence} onFinished={handleBootUpFinished} theme={era.theme} reduceMotion={reduceMotion} />;
  }
  
  const { theme, miniTools, marqueeTexts, asciiArt, gifs, memes, culturalReferences } = era;
  const adLinkClasses = `cursor-pointer ${theme.linkColor} ${theme.linkHoverColor ? `hover:${theme.linkHoverColor}` : ''} ${theme.linkActiveColor ? `active:${theme.linkActiveColor}` : ''}`;

  return (
    <div className={`p-4 md:p-6 lg:p-8 ${theme.font} ${theme.textColor}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-2 text-center ${theme.pixelFontFamily ? theme.pixelFontFamily : ''} ${theme.textColor} ${theme.useGlitterTextForHeaders && !reduceMotion ? 'glitter-text' : ''}`}>{era.year}</h2>
      <p className={`text-center text-lg italic mb-6 ${theme.textColor}`}>{era.tagline}</p>

      {marqueeTexts && marqueeTexts.length > 0 && (
        <MarqueeText texts={marqueeTexts} className={`${theme.accentColor.replace('border-','bg-')} ${theme.textColor.includes('black') || theme.textColor.includes('text-blue-700') ? 'text-white': 'text-black'} my-4 ${theme.pixelFontFamily && era.year === 1996 ? theme.pixelFontFamily : ''}`} />
      )}
      
      {era.bestViewedWithBadges && era.bestViewedWithBadges.length > 0 && (
        <BestViewedWithBadges badges={era.bestViewedWithBadges} eraTheme={theme} />
      )}
      {era.showHitCounter && <HitCounter eraTheme={theme} />}

      {asciiArt && asciiArt.length > 0 && <AsciiArtDisplay art={asciiArt} clickable={era.asciiArtClickable} onClick={handleAsciiArtClick} theme={theme}/>}
      {gifs && gifs.length > 0 && <AnimatedGifDisplay gifs={gifs} eraName={theme.name} reduceMotion={reduceMotion} />}


      <div className={`grid grid-cols-1 ${era.year === 1991 ? '' : 'md:grid-cols-3'} gap-6 my-8`}>
        <div className={`p-4 border-2 ${theme.accentColor} rounded-md ${era.year === 1991 ? 'col-span-1' : 'md:col-span-2'}`}>
          <h3 className={`text-2xl font-semibold mb-3 border-b-2 pb-2 ${theme.accentColor} ${theme.pixelFontFamily && (era.year === 1985 || era.year === 1996) ? theme.pixelFontFamily : ''}`}>{era.year === 1991 ? 'News:' : `Headlines from ${era.year}`}</h3>
          <ul className="space-y-2 list-disc list-inside">
            {era.newsHeadlines.map((headline, index) => ( <li key={index}>{headline}</li> ))}
          </ul>
        </div>
        <div className={`p-4 border-2 ${theme.accentColor} rounded-md`}>
          <h3 className={`text-2xl font-semibold mb-3 border-b-2 pb-2 ${theme.accentColor} ${theme.pixelFontFamily && (era.year === 1985 || era.year === 1996) ? theme.pixelFontFamily : ''}`}>Sponsored Links!</h3>
          <div className="space-y-3">
            {era.ads.map((ad) => (
              <div key={ad.id} className={`p-2 border ${theme.accentColor} rounded 
                  ${ad.type === 'blinking' && !reduceMotion ? 'animate-blink-custom' : ''}
                  ${ad.type === 'popup' ? adLinkClasses : ''} `}
                onClick={() => handleAdClick(ad)} role={ad.type === 'popup' ? 'button' : undefined} tabIndex={ad.type === 'popup' ? 0 : undefined} >
                {ad.text}
                {ad.type === 'popup' && <span className="text-xs block italic">(Click for details!)</span>}
              </div> ))}
          </div>
        </div>
      </div>
      
      {memes && memes.length > 0 && <MemesDisplay memes={memes} eraTheme={theme} reduceMotion={reduceMotion} culturalReferences={culturalReferences} />}


      {(miniTools.length > 0 || era.enableUnderConstruction || era.enableGuestbook || era.enableHtmlTutorial || era.enableFlashDemo || era.enableProfileSection || era.enableEmbeddedMediaPlayer) && (
        <div className={`my-8 p-4 border-t-4 ${theme.accentColor}`}>
          <h3 className={`text-2xl font-semibold mb-4 ${theme.textColor} ${theme.pixelFontFamily ? theme.pixelFontFamily : ''} ${theme.useGlitterTextForHeaders && era.year === 2005 && !reduceMotion ? 'glitter-text' : ''}`}>Interactive Zone!</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {era.enableGuestbook && <Guestbook eraTheme={theme} eraYear={era.year} reduceMotion={reduceMotion} />}
             {era.enableHtmlTutorial && <HtmlTutorial eraTheme={theme} />}
             {era.enableFlashDemo && <FlashDemo eraTheme={theme} reduceMotion={reduceMotion} />}
             {era.enableProfileSection && <ProfileSection eraTheme={theme} mySpaceColors={mySpaceColors} onMySpaceColorChange={onMySpaceColorChange} />}
             {era.enableEmbeddedMediaPlayer && <EmbeddedMediaPlayer eraTheme={theme} />}
             {(era.enableUnderConstruction || miniTools.some(tool => tool.type === 'UnderConstruction' && !Object.keys(era).some(key => key === `enable${tool.type}` && era[key as keyof EraData]))) && 
                miniTools.filter(tool => tool.type === 'UnderConstruction').map(tool => <UnderConstructionSign key={tool.id} eraTheme={theme} reduceMotion={reduceMotion} />)
             }
             {era.enableUnderConstruction && miniTools.length === 0 && (era.year === 1985 || era.year === 2000) &&
                 <UnderConstructionSign eraTheme={theme} reduceMotion={reduceMotion} />
             }
          </div>
        </div>
      )}

      <div className={era.easterEggButtonContainerClasses || "mt-10 text-center"}>
        <span 
          className={`p-2 opacity-50 hover:opacity-100 cursor-pointer text-sm font-mono ${theme.textColor}`}
          onClick={handleEasterEggClick} 
          role="button" 
          tabIndex={0} 
          aria-label="Secret clickable spot for an easter egg"
        >
          {era.easterEggButtonSymbol || ".shh."}
        </span>
      </div>
    </div>
  );
};

export default EraContentRenderer;
