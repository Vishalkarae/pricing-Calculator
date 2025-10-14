export interface CalculatorInputs {
  x: number; // Total messages per conversation
  y: number; // Number of conversations
  a: number; // Average words per user query
  b: number; // Average words per AI response
  tokenFactor: number; // Word-to-token factor
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
  cIn: number;
  cOut: number;
}

export interface ModelCategory {
  name: string;
  presets: ModelPreset[];
}

export interface ModelProvider {
  name: string;
  categories: ModelCategory[];
}

export const MODEL_PROVIDERS: ModelProvider[] = [
  {
    name: "Gemini",
    categories: [
      {
        name: "Chat",
        presets: [
          {
            name: "Gemini Flash",
            cIn: 0.0000062,
            cOut: 0.0000249,
          },
          {
            name: "Gemini 1.5 Pro",
            cIn: 0.0001038,
            cOut: 0.00083,
          },
        ],
      },
      {
        name: "Voice / Multimodal",
        presets: [
          {
            name: "Gemini Voice (Low)",
            cIn: 0.0000145,
            cOut: 0.00003,
          },
          {
            name: "Gemini Voice (High)",
            cIn: 0.000058,
            cOut: 0.00012,
          },
        ],
      },
    ],
  },
  {
    name: "OpenAI",
    categories: [
      {
        name: "Chat",
        presets: [
          {
            name: "GPT-3.5 Turbo",
            cIn: 0.000249,
            cOut: 0.000498,
          },
          {
            name: "GPT-4-Mini",
            cIn: 0.000415,
            cOut: 0.00083,
          },
          {
            name: "GPT-4-Turbo",
            cIn: 0.00249,
            cOut: 0.00498,
          },
        ],
      },
      {
        name: "Voice / Realtime",
        presets: [
          {
            name: "GPT-4o-Mini-TTS",
            cIn: 0.0006,
            cOut: 0.0012,
          },
          {
            name: "GPT-4o Realtime (High)",
            cIn: 0.009,
            cOut: 0.018,
          },
        ],
      },
    ],
  },
];
