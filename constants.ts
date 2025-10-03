
import { Year, EraData, MemeContent } from './types';

export const AVAILABLE_YEARS: Year[] = [1985, 1991, 1996, 2000, 2005];

// SOUNDS constant removed

const IMAGES = {
  mosaicBadge: "https://via.placeholder.com/88x31.png?text=Mosaic+2.0",
  html2Badge: "https://via.placeholder.com/88x31.png?text=HTML+2.0",
  hitCounter: "https://via.placeholder.com/120x50.png?text=Hits:+12345",
  constructionGif: "https://i.giphy.com/media/V Chord/construction-sign-gif-CaSWXqLhr05sA/giphy.gif",
  sparkleGif: "https://i.giphy.com/media/3o6Zt0T1c09q0n3f2w/giphy.gif",
  flamingLineGif: "https://i.giphy.com/media/3o7TKDkDb2ajQnI4Vy/giphy.gif",
  dancingBabyGif: "https://i.giphy.com/media/o7W02DkTlqhnG/giphy.gif",
  hamsterDanceGif: "https://i.giphy.com/media/10hDCVo7l696Eg/giphy.gif",
  allYourBaseGif: "https://i.giphy.com/media/PXibmH0x2yS6C6u08/giphy.gif",
  numaNumaGif: "https://i.giphy.com/media/f9S2zKoJ7G3e0/giphy.gif",
  myspacePlayer: "https://via.placeholder.com/200x100.png?text=MyMusicPlayer",
  tiledBg1996: "https://www.transparenttextures.com/patterns/stardust.png",
  customCursor2005: "https://ani.cursors-4u.net/cursors/cur-11/cur1054.png",
  defaultGif: "https://picsum.photos/seed/defaultGif/80/60",
  memePlaceholder: (text: string) => `https://via.placeholder.com/150x100.png?text=${encodeURIComponent(text)}`
};


export const ERAS_DATA: Record<Year, EraData> = {
  1985: {
    year: 1985,
    theme: {
      name: "Terminal Green",
      mainContainerClasses: "bg-black text-green-400 selection:bg-green-700 selection:text-black",
      font: "font-pixel-vt323",
      pixelFontFamily: "font-pixel-vt323",
      textColor: "text-green-400",
      linkColor: "text-green-300 hover:text-green-100 underline",
      linkHoverColor: "text-green-100",
      accentColor: "border-green-500",
      buttonClasses: "border border-green-500 px-2 py-1 hover:bg-green-700 hover:text-black",
      headerClasses: "bg-black border-b-2 border-green-500 py-3 px-4", // Added bg-black
      crtEffect: true,
      applyInputBlinkingCursor: true,
    },
    tagline: "Welcome to the Command Line Era! MS-DOS Awaits!",
    newsHeadlines: [
      "Microsoft releases Windows 1.0",
      "Nintendo Entertainment System launches in North America",
      "First .com domain registered: symbolics.com",
    ],
    ads: [
      { id: 'ad85-1', text: "Buy more RAM! 640K ought to be enough for anybody.", type: 'static' },
      { id: 'ad85-2', text: "LEARN BASIC! THE LANGUAGE OF THE FUTURE!", type: 'blinking' },
    ],
    miniTools: [{ id: 'tool85-1', name: "ASCII Art Viewer", type: 'UnderConstruction' }],
    memes: [
      { id: 'meme85-1', imageUrl: IMAGES.memePlaceholder("No Internet Memes Yet!"), caption: "The concept of 'internet memes' didn't exist. Offline jokes reigned!"}
    ],
    culturalReferences: [
      "BBS (Bulletin Board Systems) were popular for online communities.",
      "Text-based adventure games like Zork were cutting edge.",
      "The Home Computer boom: Commodore 64, Apple II."
    ],
    asciiArt: [
      " $$$$$$\\  $$\\                 $$\\      $$\\ ",
      "$$  __$$\\ $$ |                $$ | $\\  $$ |",
      "$$ /  $$ |$$ |$$$$$$\\   $$$$$$$ |$$\\$$\\ $$ |",
      "$$$$$$$$ |$$ |\\____$$\\ $$  __$$ |$$ \\$$$$ |",
      "$$  __$$ |$$ |$$$$$$$ |$$ /  $$ |$$ |\\$$$ |",
      "$$ |  $$ |$$ |$$  __$$ |$$ |  $$ |$$ | \\$$ |",
      "$$ |  $$ |$$ |\\$$$$$$$ |\\$$$$$$$ |$$ |  $$ |",
      "\\__|  \\__|\\__| \\_______| \\_______|\\__|  \\__|",
      "",
      "Type 'help' for commands (not really)"
    ],
    asciiArtClickable: true,
    asciiArtClickMessage: "Executing 'easter_egg.exe'... Beep boop!",
    enableUnderConstruction: true,
    basicEasterEggText: "Found a hidden sector on the floppy disk! Content: 0xDEADBEEF",
    bootUpSequence: ["SYSTEM CHECK...", "MEMORY TEST: 640K OK", "LOADING MS-DOS V3.1...", "COMMAND.COM LOADED.", "READY."],
    easterEggButtonSymbol: "■",
    easterEggButtonContainerClasses: "mt-10 text-left ml-5",
  },
  1991: {
    year: 1991,
    theme: {
      name: "Early HTML",
      mainContainerClasses: "bg-gray-200 text-black selection:bg-blue-700 selection:text-white",
      font: "font-serif",
      textColor: "text-black",
      linkColor: "text-blue-700 hover:text-red-700 underline",
      linkHoverColor: "text-red-700",
      accentColor: "border-gray-500",
      buttonClasses: "border border-gray-600 bg-gray-300 px-2 py-1 hover:bg-gray-400",
      headerClasses: "bg-gray-300 border-b-2 border-gray-500 py-3 px-4",
    },
    tagline: "The Web is Born! Hyperlinks Everywhere!",
    newsHeadlines: ["World Wide Web goes public!", "First web server at CERN online", "Linux kernel first released"],
    ads: [
      { id: 'ad91-1', text: "Get your business on the Information Superhighway!", type: 'static' },
      { id: 'ad91-2', text: "Learn HTML! Build your own homepage!", type: 'static' },
    ],
    miniTools: [{ id: 'tool91-1', name: "Basic HTML Tag Guide", type: 'HtmlTutorial' }],
    memes: [
        { id: 'meme91-1', imageUrl: IMAGES.memePlaceholder("First Web Page!"), caption: "The first web pages were purely informational.", yearContext: "CERN, 1991" }
    ],
    culturalReferences: [
        "Gopher and WAIS were alternative hypertext systems.",
        "The concept of a 'website' was brand new.",
        "Dial-up internet access started to become more common."
    ],
    enableHtmlTutorial: false, // Changed to false
    enableUnderConstruction: true,
    bestViewedWithBadges: [IMAGES.mosaicBadge, IMAGES.html2Badge],
    basicEasterEggText: "You found an unlinked <!A HREF> tag pointing to 'void.html'!",
    easterEggButtonSymbol: "§",
    easterEggButtonContainerClasses: "mt-8 text-right mr-5",
  },
  1996: {
    year: 1996,
    theme: {
      name: "GeoCities Sparkle",
      mainContainerClasses: "bg-purple-800 text-yellow-300 selection:bg-pink-500 selection:text-white",
      font: "font-comic-like",
      pixelFontFamily: "font-pixel-press-start",
      textColor: "text-yellow-300",
      linkColor: "text-cyan-400 hover:text-pink-400 underline animate-blink-custom",
      linkHoverColor: "text-pink-400",
      accentColor: "border-pink-500",
      buttonClasses: "bg-pink-600 text-white px-3 py-1 rounded-none border-2 border-yellow-300 hover:bg-pink-700",
      headerClasses: "bg-indigo-900 border-b-4 border-pink-500 py-3 px-4",
      guestbookHeaderSparkly: true,
    },
    tagline: "Under Construction! Animated GIFs Galore!",
    newsHeadlines: ["Hotmail launches", "Ask Jeeves search engine debuts", "Nintendo 64 released"],
    ads: [
      { id: 'ad96-1', text: "!!!~*~*~* CLICK HERE TO WIN A FREE CD-ROM! ~*~*~*!!!", type: 'popup', popupTitle: "CONGRATULATIONS!" },
      { id: 'ad96-2', text: "Your Cool Site Name Here! Get a Domain!", type: 'popup', popupTitle: "Get a Domain!" },
    ],
    miniTools: [
      { id: 'tool96-1', name: "Sign My Guestbook!", type: 'Guestbook'},
      { id: 'tool96-2', name: "Awesome Animated Hamster", type: 'FlashDemo' }
    ],
    memes: [
        { id: 'meme96-1', imageUrl: IMAGES.dancingBabyGif, caption: "Dancing Baby (Baby Cha-Cha)", yearContext:"One of the first viral sensations." },
        { id: 'meme96-2', imageUrl: IMAGES.hamsterDanceGif, caption: "Hampster Dance", yearContext:"Rows of animated hamsters dancing to a sped-up jingle."}
    ],
    culturalReferences: [
        "GeoCities and Angelfire for free homepages.",
        "Netscape Navigator vs. Internet Explorer browser wars begin.",
        "ICQ and AIM for instant messaging."
    ],
    marqueeTexts: ["Welcome to my HoMePaGe!!!", "This page is BEST VIEWED with Netscape Navigator 3.0!", "<blink>COOL SITEZ!</blink>"],
    gifs: [IMAGES.constructionGif, IMAGES.sparkleGif, IMAGES.flamingLineGif, IMAGES.dancingBabyGif],
    tiledBackgroundUrl: IMAGES.tiledBg1996,
    enableGuestbook: true,
    enableFlashDemo: true,
    enableUnderConstruction: true,
    showHitCounter: true,
    basicEasterEggText: "You clicked the invisible pixel! Congrats!",
    advancedEasterEgg: { type: 'rickroll', triggerMessage: "You found a hidden link to a 'secret' music video!"},
    easterEggButtonSymbol: "~*✨*~",
    easterEggButtonContainerClasses: "mt-12 text-center",
  },
  2000: {
    year: 2000,
    theme: {
      name: "Dot Com Boom",
      mainContainerClasses: "bg-blue-700 text-white selection:bg-yellow-400 selection:text-black",
      font: "font-sans",
      textColor: "text-white",
      linkColor: "text-yellow-300 hover:text-yellow-100",
      linkHoverColor: "text-yellow-100",
      accentColor: "border-yellow-400",
      buttonClasses: "bg-yellow-400 text-blue-800 font-semibold px-3 py-1 rounded hover:bg-yellow-300 shadow-md",
      headerClasses: "bg-blue-800 border-b-2 border-yellow-400 py-4 px-5",
    },
    tagline: "E-commerce & Pop-ups! The Future is Now (and a little bubbly)!",
    newsHeadlines: ["Dot-com bubble peak and burst", "PlayStation 2 released", "Napster faces lawsuits"],
    ads: [
      { id: 'ad00-1', text: "Get 1,000 FREE AOL Hours! Click NOW!", type: 'popup', popupTitle: "FREE INTERNET!"},
      { id: 'ad00-2', text: "Invest in WebVan! Guaranteed Returns! (Offer not valid)", type: 'blinking'},
    ],
    miniTools: [{ id: 'tool00-1', name: "My First E-Shop (Demo)", type: 'UnderConstruction' }],
    memes: [
        { id: 'meme00-1', imageUrl: IMAGES.allYourBaseGif, caption: "All Your Base Are Belong to Us", yearContext:"From the game Zero Wing, became a huge internet phenomenon." },
        { id: 'meme00-2', imageUrl: IMAGES.memePlaceholder("Mahir Cagri - I Kiss You!"), caption: "Mahir Cagri's personal homepage went viral.", yearContext:"Early example of accidental internet fame."}
    ],
    culturalReferences: [
        "Flash animations and games were everywhere.",
        "Early blogging platforms like Blogger emerge.",
        "The Y2K bug scare (which mostly didn't happen)."
    ],
    enableUnderConstruction: true,
    footerNote: "This site is optimized for 800x600 resolution and Internet Explorer 5.0.",
    basicEasterEggText: "Y2K Bug Found! System compromised... (Just kidding).",
    advancedEasterEgg: { type: 'matrix', triggerMessage: "Wake up, Neo... The Matrix has you."},
    easterEggButtonSymbol: "<?>",
    easterEggButtonContainerClasses: "mt-6 text-left ml-10",
  },
  2005: {
    year: 2005,
    theme: {
      name: "MySpace Era",
      mainContainerClasses: "bg-gray-900 text-pink-400 selection:bg-pink-600 selection:text-white",
      font: "font-sans",
      pixelFontFamily: "font-pixel-press-start",
      textColor: "text-pink-400",
      linkColor: "text-teal-300 hover:text-orange-400",
      linkHoverColor: "text-orange-400",
      accentColor: "border-pink-500",
      buttonClasses: "bg-black border-2 border-pink-500 text-pink-300 px-3 py-1 hover:bg-pink-700 hover:text-black",
      headerClasses: "bg-black border-b-2 border-pink-500 py-3 px-4",
      useGlitterTextForHeaders: true,
      customizableProfileColors: { // Default customizable colors
        profileBgColor: '#1a1a1a', // Dark grey
        profileTextColor: '#ff69b4', // Hot pink
        profileAccentColor: '#00ffff', // Cyan
      },
    },
    tagline: "Friend Me! Blogging, Bling, and Social Overload! R.I.P. Tom.",
    newsHeadlines: ["YouTube launches", "Facebook expands to high schools", "First video on YouTube: 'Me at the zoo'"],
    ads: [
      { id: 'ad05-1', text: "Pimp Your Profile! Glitter Graphics Here!", type: 'blinking' },
      { id: 'ad05-2', text: "Win a FREE iPod Nano! You are the 1,000,000th visitor!", type: 'popup', popupTitle: "CONGRATULATIONS!"},
    ],
    miniTools: [
      { id: 'tool05-1', name: "My Top 8 Friends (Demo)", type: 'ProfileSection' },
      { id: 'tool05-2', name: "MySpace Music Player", type: 'EmbeddedMediaPlayer' },
      { id: 'tool05-3', name: "Blog About Your Feelings", type: 'Guestbook' },
    ],
    memes: [
        { id: 'meme05-1', imageUrl: IMAGES.numaNumaGif, caption: "Numa Numa Dance", yearContext:"Gary Brolsma's webcam dance to a Romanian pop song."},
        { id: 'meme05-2', imageUrl: IMAGES.memePlaceholder("Chuck Norris Facts"), caption: "Chuck Norris Facts", yearContext:"Exaggerated, humorous 'facts' about Chuck Norris's toughness."}
    ],
    culturalReferences: [
        "MySpace customization (HTML/CSS in profiles).",
        "Rise of social networking.",
        "Early viral videos on sites like eBaum's World before YouTube dominated."
    ],
    customCursorUrl: IMAGES.customCursor2005,
    enableGuestbook: true,
    enableProfileSection: true,
    enableEmbeddedMediaPlayer: true,
    gifs: [IMAGES.sparkleGif, "https://i.giphy.com/media/l41lH4mS2Ck7bJf0c/giphy.gif"],
    basicEasterEggText: "Your Top 8 has been reordered by Tom! Drama!",
    easterEggButtonSymbol: "xD",
    easterEggButtonContainerClasses: "mt-10 text-right mr-8",
  },
};
