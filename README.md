# Chat Cost Calculator

A responsive web application for calculating the cost of chat conversations across different AI models. Built with React, TypeScript, and TailwindCSS.

## Features

### Input Parameters
- **x** — Total messages per conversation
- **y** — Number of conversations (multiplies all costs)
- **a** — Average words per user query
- **b** — Average words per AI response
- **tokenFactor** — Word-to-token factor (default: 1.3)
- **C_in** — Cost per input token (₹)
- **C_out** — Cost per output token (₹)

### Model Presets
Quick-select buttons for popular AI models:
- Gemini Flash
- Gemini 2.5 Pro
- OpenAI GPT-3.5 Turbo
- OpenAI GPT-4

### Real-time Calculations
- Input tokens = tokenFactor × a × (x / 2) × y
- Output tokens = tokenFactor × b × (x / 2) × y
- Total tokens = input tokens + output tokens
- Input cost = input tokens × C_in
- Output cost = output tokens × C_out
- Total cost = input cost + output cost
- Per-message cost and per-pair cost

### Export Features
- **CSV Export** — Download complete calculation results
- **Copy Total Cost** — Quick copy of total cost to clipboard

### Design Features
- Responsive design for mobile and desktop
- Clean, minimal UI with TailwindCSS
- Color-coded result cards
- Highlighted total cost
- Input validation (no negative values)
- Real-time updates as inputs change

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

## Usage

1. **Set Parameters**: Enter your conversation parameters in the input section
2. **Select Model**: Click a preset button to auto-fill pricing for popular models
3. **View Results**: See real-time calculations in the results section
4. **Export Data**: Use the CSV export or copy total cost buttons as needed

## Formula Details

The calculator uses the following formulas:

```
Input tokens = tokenFactor × a × (x / 2) × y
Output tokens = tokenFactor × b × (x / 2) × y
Total tokens = input tokens + output tokens
Input cost = input tokens × C_in
Output cost = output tokens × C_out
Total cost = input cost + output cost
Per-message cost = total cost / (x × y)
Per-pair cost = total cost / ((x × y) / 2)
```

Where:
- `x/2` represents the average number of user queries per conversation
- Each query-response pair is counted separately
- `y` multiplies the entire calculation for multiple conversations

## Technologies Used

- **React 18** — UI framework
- **TypeScript** — Type safety and developer experience
- **TailwindCSS** — Utility-first CSS framework
- **Vite** — Fast build tool and development server
- **Lucide React** — Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
