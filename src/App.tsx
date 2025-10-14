import { useState, useMemo } from 'react';
import { CalculatorInputs, CalculatorResults, CalculatorMode } from './types';
import { calculateResults } from './utils/calculations';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';

const initialInputs: CalculatorInputs = {
  mode: 'chat', // Default to chat mode
  x: 10, // Total messages per conversation
  y: 1,  // Number of conversations
  a: 20, // Average words per user query
  b: 50, // Average words per AI response
  tokenFactor: 1.3, // Word-to-token factor
  tokenFactorAudio: 50, // Audio-to-token factor (1 sec ≈ 50 tokens)
  cIn: 0.000249, // Cost per input token (₹) - GPT-3.5 Turbo default
  cOut: 0.000498, // Cost per output token (₹) - GPT-3.5 Turbo default
};

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);

  const results = useMemo((): CalculatorResults => {
    return calculateResults(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number | CalculatorMode) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePresetSelect = (cIn: number, cOut: number, mode: CalculatorMode) => {
    setInputs(prev => ({
      ...prev,
      mode,
      cIn,
      cOut,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Chat & Voice Cost Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Calculate the cost of chat and voice conversations across different AI models
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Input Section */}
          <InputSection
            inputs={inputs}
            onInputChange={handleInputChange}
            onPresetSelect={handlePresetSelect}
          />

          {/* Results Section */}
          <ResultsSection
            results={results}
            inputs={inputs}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>
              Built with React and TypeScript • 
              Real-time calculations • 
              Export to CSV support
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
