import { useState, useMemo } from 'react';
import { CalculatorInputs, CalculatorResults, CalculatorMode, MODEL_PRESETS } from './types';
import { calculateResults } from './utils/calculations';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';

const initialInputs: CalculatorInputs = {
  mode: 'chat',
  // Chat mode
  x: 10,
  a: 20,
  b: 50,
  wordToToken: 1.3,
  // Voice mode
  T: 60,
  z: 0.5,
  audioToToken: 3.33,
  // Common
  y: 1,
  cIn: 0.0000062,
  cOut: 0.0000249,
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

  const handlePresetSelect = (presetIndex: number) => {
    const preset = MODEL_PRESETS[presetIndex];
    if (preset) {
      setInputs(prev => ({
        ...prev,
        mode: preset.mode,
        ...(preset.mode === 'chat' 
          ? { wordToToken: preset.tokenConversion }
          : { audioToToken: preset.tokenConversion }
        ),
        cIn: preset.cIn,
        cOut: preset.cOut,
      }));
    }
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Cost Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Estimate conversation costs for Chat and Voice AI models
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
            onReset={handleReset}
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
              Built with React, TypeScript & Tailwind CSS • 
              Real-time calculations • 
              8 decimal precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;