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
    cIn: 0.000048,
    cOut: 0.000192,
  },
  {
    name: "2.5-flash-native-audio-latest",
    provider: "Gemini",
    mode: "voice",
    tokenConversion: 32,
    cIn: 0.000031,
    cOut: 0.000125,
  },
  {
    name: "2.0-flash-live-001",
    provider: "Gemini",
    mode: "voice",
    tokenConversion: 32,
    cIn: 0.000028,
    cOut: 0.000115,
  },
  {
    name: "2.5-flash-live",
    provider: "Gemini",
    mode: "voice",
    tokenConversion: 32,
    cIn: 0.000030,
    cOut: 0.000120,
  },
  
  // Chat Models
  {
    name: "gpt-4o",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3, // wordToToken
    cIn: 0.0000249,
    cOut: 0.000096,
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
    cIn: 0.000025,
    cOut: 0.0001,
  },
  {
    name: "2.0-flash",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.000022,
    cOut: 0.00009,
  },
  {
    name: "1.5-flash",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00002,
    cOut: 0.00008,
  },
];
