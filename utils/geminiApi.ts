import { GoogleGenAI } from "@google/genai";
import { ERAS_DATA } from '../constants';
import { AdContent } from '../types';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI with API_KEY:", e);
    // ai remains null, features requiring it will be disabled
  }
} else {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled globally.");
}

/**
 * Fetches era-specific news headlines from the Gemini API.
 * @param year The year for which to fetch news.
 * @returns A promise that resolves to an array of news headline strings.
 * @throws Error if API is unavailable, fails, or returns unexpected data.
 */
export const fetchEraNews = async (year: number): Promise<string[]> => {
  if (!ai) {
    throw new Error("API_UNAVAILABLE"); // Indicates API key missing or client initialization failed
  }

  const prompt = `Generate 3-4 distinct, brief, and engaging tech, internet, or computing related news headlines for the year ${year}.
Focus on significant events or trends of that year.
Return them as a JSON array of strings. For example: ["Headline 1", "Headline 2", "Headline 3"]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr);
    
    if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'string') && parsedData.length > 0) {
      return parsedData;
    } else {
      console.error("Unexpected JSON structure or empty array from Gemini API:", parsedData);
      throw new Error("INVALID_NEWS_FORMAT");
    }

  } catch (error: any) {
    console.error(`Error fetching news for ${year} from Gemini API:`, error);
    if (error.message && (error.message.includes("API key not valid") || error.message.includes("permission"))) {
        throw new Error("API_KEY_INVALID");
    }
    if (error.message === "INVALID_NEWS_FORMAT") { // rethrow specific error
        throw error;
    }
    // Catch other errors from API call or JSON.parse
    throw new Error("GEMINI_API_ERROR"); 
  }
};


/**
 * Fetches era-specific ad content from the Gemini API.
 * @param year The year for which to fetch ads.
 * @returns A promise that resolves to an array of objects with text and optional popupTitle.
 * @throws Error if API is unavailable, fails, or returns unexpected data.
 */
export const fetchEraAds = async (year: number): Promise<Array<{ text: string; popupTitle?: string }>> => {
  if (!ai) {
    throw new Error("API_UNAVAILABLE");
  }

  const staticAds: AdContent[] = (ERAS_DATA as any)[year]?.ads || [];
  if (staticAds.length === 0) return [];

  const adCount = staticAds.length;
  const popupCount = staticAds.filter(ad => ad.type === 'popup').length;

  let toneDescription = "";
  switch (year) {
    case 1985:
      toneDescription = "Reflect the simple, text-based, and technical tone of the mid-80s command-line and BBS era. Think about RAM, floppy disks, and learning BASIC.";
      break;
    case 1991:
      toneDescription = "Reflect the formal, informational, and slightly academic tone of the very early web. Think 'Information Superhighway', Gopher, and getting businesses online.";
      break;
    case 1996:
      toneDescription = "Reflect the chaotic, excited, and slang-heavy tone of the mid-90s GeoCities era. Use symbols like tildes and asterisks, and words like 'cyberspace', 'cool sitez', and 'free stuff'.";
      break;
    case 2000:
      toneDescription = "Reflect the optimistic, corporate, and slightly bubbly tone of the Dot Com boom. Think e-commerce, free offers (like AOL CDs), and stock investments.";
      break;
    case 2005:
      toneDescription = "Reflect the social, customizable, and youth-focused tone of the early social media (MySpace) era. Think 'pimp your profile', glitter graphics, iPods, and digital cameras.";
      break;
  }

  const prompt = `Generate exactly ${adCount} distinct, brief, and engaging advertisement texts for the year ${year}.
The ads must be related to technology, internet culture, or common products of that time.
${toneDescription}
${popupCount > 0 ? `Exactly ${popupCount} of these ads should be for popup windows.` : 'None of these ads should be for popup windows.'}
Return them as a JSON array of objects. Each object must have a "text" property. For any popup ad, also include a "popupTitle" property.
Example for a year with one popup ad: [{"text": "Ad text 1", "popupTitle": "Popup Title!"}, {"text": "Ad text 2"}]
Example for a year with no popup ads: [{"text": "Ad text 1"}, {"text": "Ad text 2"}]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData.every(item => typeof item === 'object' && item.text)) {
      return parsedData;
    } else {
      console.error("Unexpected JSON structure for ads from Gemini API:", parsedData);
      throw new Error("INVALID_AD_FORMAT");
    }
  } catch (error: any) {
    console.error(`Error fetching ads for ${year} from Gemini API:`, error);
     if (error.message && (error.message.includes("API key not valid") || error.message.includes("permission"))) {
        throw new Error("API_KEY_INVALID");
    }
    if (error.message === "INVALID_AD_FORMAT") {
        throw error;
    }
    throw new Error("GEMINI_API_ERROR");
  }
};
