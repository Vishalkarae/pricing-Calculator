# AI Cost Calculator

A responsive web application for estimating AI conversation costs across Chat and Voice modes. Built with React, TypeScript, and TailwindCSS.

## Features

### Mode Selection
- **Chat Mode**: Calculate costs for text-based conversations
- **Voice Mode**: Calculate costs for real-time voice/audio conversations
- Easy toggle between modes with radio buttons

### Model Presets
Grouped dropdown with presets for:
- **🔵 OpenAI**: gpt-4o, gpt-4o-mini, gpt-realtime, gpt-realtime-mini
- **🟢 Gemini**: 1.5-flash, 2.0-flash, 2.5-flash, 2.5-flash-live, 2.0-flash-live-001, 2.5-flash-native-audio-latest

Selecting a preset auto-fills:
- Token conversion factors (wordToToken or audioToToken)
- Cost per input token (C_in)
- Cost per output token (C_out)

### Input Parameters

**Chat Mode**
- `x` — Total messages per conversation
- `a` — Average words per user query
- `b` — Average words per AI response
- `y` — Number of conversations
- `wordToToken` — Word-to-token conversion factor
- `C_in` — Cost per input token (₹)
- `C_out` — Cost per output token (₹)

**Voice Mode**
- `T` — Total call duration (seconds)
- `z` — User:AI speaking ratio (user/AI, e.g., 0.5 for 1:2 ratio)
- `y` — Number of conversations
- `audioToToken` — Tokens per second
- `C_in` — Cost per input token (₹)
- `C_out` — Cost per output token (₹)

### Calculation Formulas

**Chat Mode**
```
Win = a × (x / 2)
Wout = b × (x / 2)
Tin = wordToToken × Win
Tout = wordToToken × Wout
TotalCost = y × ((Tin × Cin) + (Tout × Cout))
```

**Voice Mode**
```
UserDuration = T × (z / (1 + z))
AIDuration = T × (1 / (1 + z))
Tin = audioToToken × UserDuration
Tout = audioToToken × AIDuration
TotalCost = y × ((Tin × Cin) + (Tout × Cout))
```

### Results Display
- Input Tokens
- Output Tokens
- Total Tokens
- Input Cost (₹)
- Output Cost (₹)
- Total Cost (₹)
- Per-conversation Cost
- Per-pair Cost

All values displayed with **8 decimal precision**.

### Additional Features
- **CSV Export**: Download complete calculation results
- **Copy Total Cost**: Quick copy to clipboard
- **Reset Button**: Restore default values
- **Responsive Design**: Works on mobile and desktop
- **Real-time Updates**: Calculations update as you type
- **Manual Override**: All auto-filled values can be edited

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Model Presets

### Chat Models

| Provider | Model | wordToToken | C_in (₹) | C_out (₹) |
|----------|-------|-------------|----------|-----------|
| OpenAI   | gpt-4o | 1.3 | 0.0000249 | 0.000096 |
| OpenAI   | gpt-4o-mini | 1.3 | 0.0000062 | 0.0000249 |
| Gemini   | 2.5-flash | 1.3 | 0.000025 | 0.0001 |
| Gemini   | 2.0-flash | 1.3 | 0.000022 | 0.00009 |
| Gemini   | 1.5-flash | 1.3 | 0.00002 | 0.00008 |

### Voice Models

| Provider | Model | audioToToken | C_in (₹) | C_out (₹) |
|----------|-------|--------------|----------|-----------|
| OpenAI   | gpt-realtime | 3.33 | 0.00016 | 0.00064 |
| OpenAI   | gpt-realtime-mini | 3.33 | 0.000048 | 0.000192 |
| Gemini   | 2.5-flash-native-audio-latest | 32 | 0.000031 | 0.000125 |
| Gemini   | 2.0-flash-live-001 | 32 | 0.000028 | 0.000115 |
| Gemini   | 2.5-flash-live | 32 | 0.000030 | 0.000120 |

## Technologies Used

- **React 18** — UI framework
- **TypeScript** — Type safety
- **TailwindCSS** — Styling
- **Vite** — Build tool
- **Lucide React** — Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.