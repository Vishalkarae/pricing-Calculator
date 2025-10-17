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
    tokenConversion: 3.33,
    cIn: 0.002816,
    cOut: 0.005632,
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
    name: "gpt-5",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00010438,
    cOut: 0.00001044,
  },
  {
    name: "gpt-5-mini",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00002088,
    cOut: 0.00000209,
  },
  {
    name: "gpt-5-nano",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00000418,
    cOut: 0.00000042,
  },
  {
    name: "gpt-5-chat-latest",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00010438,
    cOut: 0.00001044,
  },
  {
    name: "gpt-5-codex",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00010438,
    cOut: 0.00001044,
  },
  {
    name: "gpt-4.1",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.000167,
    cOut: 0.00004175,
  },
  {
    name: "gpt-4.1-mini",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.0000334,
    cOut: 0.00000835,
  },
  {
    name: "gpt-4.1-nano",
    provider: "OpenAI",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.00000835,
    cOut: 0.00000209,
  },
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
    cIn: 0.00001253,
    cOut: 0.00000627,
  },
  {
    name: "2.5-pro",
    provider: "Gemini",
    mode: "chat",
    tokenConversion: 1.3,
    cIn: 0.000165,
    cOut: 0.0011,
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
