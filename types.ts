export type Year = 1985 | 1991 | 1996 | 2000 | 2005;
export type TransitionEffectType = 'static' | 'glitch' | 'fade' | 'none';
export type AdvancedEasterEggType = 'matrix' | 'rickroll' | 'bsod' | 'text';


export interface CustomizableColors {
  profileBgColor?: string;
  profileTextColor?: string;
  profileAccentColor?: string;
}

export interface EraTheme {
  name: string;
  mainContainerClasses: string;
  font: string; // General font family
  pixelFontFamily?: string; // Specific pixel font for elements like ASCII art or headers
  textColor: string;
  linkColor: string;
  linkHoverColor?: string;
  linkActiveColor?: string;
  accentColor: string;
  buttonClasses?: string; // Base classes for buttons
  buttonHoverClasses?: string;
  buttonActiveClasses?: string;
  headerClasses: string;
  crtEffect?: boolean;
  applyInputBlinkingCursor?: boolean; // For 1985 inputs
  guestbookHeaderSparkly?: boolean; // For 1996 guestbook
  useGlitterTextForHeaders?: boolean; // For 2005 headers
  customizableProfileColors?: CustomizableColors; // For 2005 MySpace customization
}

export interface AdContent {
  id: string;
  text: string;
  type: 'blinking' | 'bouncing' | 'static' | 'popup';
  popupTitle?: string;
}

export interface MiniToolContent {
  id: string;
  name: string;
  type: 'Guestbook' | 'HtmlTutorial' | 'FlashDemo' | 'UnderConstruction' | 'ProfileSection' | 'EmbeddedMediaPlayer';
}

export interface MemeContent {
  id: string;
  imageUrl: string;
  caption: string;
  yearContext?: string; // Small note about its relevance in that year
}

export interface AdvancedEasterEgg {
  type: AdvancedEasterEggType;
  triggerMessage?: string; // Text for simple popup before advanced egg
  data?: any; // e.g., videoId for rickroll, specific text for BSOD
}

export interface EraData {
  year: Year;
  theme: EraTheme;
  tagline: string;
  newsHeadlines: string[];
  ads: AdContent[];
  miniTools: MiniToolContent[];
  
  memes?: MemeContent[];
  culturalReferences?: string[]; // Short notable cultural points
  
  marqueeTexts?: string[];
  asciiArt?: string[];
  asciiArtClickable?: boolean;
  asciiArtClickMessage?: string;

  gifs?: string[];
  tiledBackgroundUrl?: string;
  customCursorUrl?: string;

  enableUnderConstruction?: boolean;
  enableGuestbook?: boolean;
  enableHtmlTutorial?: boolean;
  enableFlashDemo?: boolean;
  enableProfileSection?: boolean;
  enableEmbeddedMediaPlayer?: boolean;

  bestViewedWithBadges?: string[];
  showHitCounter?: boolean;
  footerNote?: string;

  basicEasterEggText?: string; // Fallback or simple text easter egg
  advancedEasterEgg?: AdvancedEasterEgg;
  easterEggButtonSymbol?: string;
  easterEggButtonContainerClasses?: string;

  bootUpSequence?: string[];
}

export interface PopupContent {
  id: string;
  title: string;
  message: string;
  isOpen: boolean;
  isOverlay?: boolean; // For full-screen easter egg type popups
}

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  timestamp: number;
}