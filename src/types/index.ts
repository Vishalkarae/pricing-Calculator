export type CalculatorMode = 'chat' | 'voice';

export interface CalculatorInputs {
  mode: CalculatorMode; // Chat or Voice mode
  
  // Chat mode inputs
  x: number; // Total messages per conversation (Chat only)
  a: number; // Average words per user query (Chat only)
  b: number; // Average words per AI response (Chat only)
  wordToToken: number; // Word-to-token factor (Chat mode)
  
  // Voice mode inputs
  T: number; // Total call duration in seconds (Voice only)
  z: number; // User:AI speaking ratio (Voice only, e.g., 1:2 → 0.5)
  silenceFactor: number; // Fraction of silent time (0-1, Voice only)
  audioToToken: number; // Tokens per second (Voice mode)
  
  // Common inputs
  y: number; // Number of conversations
  cIn: number; // Cost per input token (₹)
  cOut: number; // Cost per output token (₹)
}

export interface CalculatorResults {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  perMessageCost: number;
  perPairCost: number;
}

export interface ModelPreset {
  name: string;
  provider: string;
  mode: CalculatorMode;
  tokenConversion: number; // wordToToken for chat, audioToToken for voice
  cIn: number;
  cOut: number;
}

export const MODEL_PRESETS: ModelPreset[] = [
  // Voice Models
  {
    name: "gpt-realtime",
    provider: "OpenAI",
    mode: "voice",
    tokenConversion: 3.33, // audioToToken
    cIn: 0.00016,
    cOut: 0.00064,
  },
  {
    name: "gpt-realtime-mini",
    provider: "OpenAI",
    mode: "voice",
    tokenConversion: 3.33,
    cIn: 0.00088,
    cOut: 0.00176,
  },
  {
    name: "2.5-flash-native-audio-latest",
    provider: "Gemini",
    mode: "voice",
    tokenConversion: 32,
    cIn: 0.000264,
    cOut: 0.001056,
  },
  {
    name: "2.0-flash-live-001",
    provider: "Gemini",
    mode: "voice",
    tokenConversion: 32,
    cIn: 0.000264,
    cOut: 0.001056,
  },
  {
    name: "2.5-flash-live",
    provider: "Gemini",
    mode: "voice",
    tokenConversion: 32,
    cIn: 0.0001848,
    cOut: 0.000748,
  },

  // Chat Models
  {
    name: "gpt-4o",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00020875,
    cOut: 0.00010438,
  },
  {
    name: "gpt-4o-mini",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000062,
    cOut: 0.0000249,
  },
  {
    name: "2.5-flash",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000264,
    cOut: 0.00022,
  },
  {
    name: "2.5-flash-preview",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000264,
    cOut: 0.00022,
  },
  {
    name: "2.5-flash-lite/preview",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000088,
    cOut: 0.0000352,
  },
  {
    name: "2.0-flash",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000088,
    cOut: 0.0000352,
  },
  {
    name: "2.0-flash-lite",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000066,
    cOut: 0.0000264,
  },
];
