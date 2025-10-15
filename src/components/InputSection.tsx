import React from 'react';
import { CalculatorInputs, MODEL_PRESETS, CalculatorMode } from '../types';

interface InputSectionProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: number | CalculatorMode) => void;
  onPresetSelect: (presetIndex: number) => void;
  onReset: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputs,
  onInputChange,
  onPresetSelect,
  onReset,
}) => {
  const handleInputChange = (field: keyof CalculatorInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    onInputChange(field, Math.max(0, value)); // Prevent negative values
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange('mode', e.target.value as CalculatorMode);
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    if (index >= 0) {
      onPresetSelect(index);
    }
  };

  // Filter presets by current mode
  const availablePresets = MODEL_PRESETS.filter(p => p.mode === inputs.mode);
  
  // Group presets by provider
  const geminiPresets = availablePresets.filter(p => p.provider === 'Gemini');
  const openAIPresets = availablePresets.filter(p => p.provider === 'OpenAI');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Input Parameters
        </h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        >
          Reset
        </button>
      </div>
      
      {/* Mode Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Mode Selection
        </label>
        <div className="flex gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="chat"
              checked={inputs.mode === 'chat'}
              onChange={handleModeChange}
              className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Chat</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="voice"
              checked={inputs.mode === 'voice'}
              onChange={handleModeChange}
              className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Voice</span>
          </label>
        </div>
      </div>

      {/* Model Preset Dropdown */}
      <div className="space-y-3">
        <label htmlFor="modelPreset" className="block text-sm font-medium text-gray-700">
          Model Preset
        </label>
        <select
          id="modelPreset"
          onChange={handlePresetChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          defaultValue="-1"
        >
          <option value="-1">-- Select a model --</option>
          <optgroup label="🔵 OpenAI">
            {openAIPresets.map((preset) => (
              <option key={preset.name} value={MODEL_PRESETS.indexOf(preset)}>
                {preset.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="🟢 Gemini">
            {geminiPresets.map((preset) => (
              <option key={preset.name} value={MODEL_PRESETS.indexOf(preset)}>
                {preset.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
          {inputs.mode === 'chat' ? 'Chat Parameters' : 'Voice Parameters'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputs.mode === 'chat' ? (
            <>
              {/* Chat Mode Inputs */}
              <div>
                <label htmlFor="x" className="block text-sm font-medium text-gray-700 mb-1">
                  x — Total messages per conversation
                </label>
                <input
                  type="number"
                  id="x"
                  value={inputs.x || ''}
                  onChange={handleInputChange('x')}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="a" className="block text-sm font-medium text-gray-700 mb-1">
                  a — Avg words per user query
                </label>
                <input
                  type="number"
                  id="a"
                  value={inputs.a || ''}
                  onChange={handleInputChange('a')}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="b" className="block text-sm font-medium text-gray-700 mb-1">
                  b — Avg words per AI response
                </label>
                <input
                  type="number"
                  id="b"
                  value={inputs.b || ''}
                  onChange={handleInputChange('b')}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="wordToToken" className="block text-sm font-medium text-gray-700 mb-1">
                  wordToToken — Word-to-token factor
                </label>
                <input
                  type="number"
                  id="wordToToken"
                  value={inputs.wordToToken || ''}
                  onChange={handleInputChange('wordToToken')}
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </>
          ) : (
            <>
              {/* Voice Mode Inputs */}
              <div>
                <label htmlFor="T" className="block text-sm font-medium text-gray-700 mb-1">
                  T — Total call duration (seconds)
                </label>
                <input
                  type="number"
                  id="T"
                  value={inputs.T || ''}
                  onChange={handleInputChange('T')}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="z" className="block text-sm font-medium text-gray-700 mb-1">
                  z — User:AI speaking ratio (user/AI)
                </label>
                <input
                  type="number"
                  id="z"
                  value={inputs.z || ''}
                  onChange={handleInputChange('z')}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 0.5 for 1:2 ratio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="audioToToken" className="block text-sm font-medium text-gray-700 mb-1">
                  audioToToken — Tokens per second
                </label>
                <input
                  type="number"
                  id="audioToToken"
                  value={inputs.audioToToken || ''}
                  onChange={handleInputChange('audioToToken')}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </>
          )}

          {/* Common Inputs */}
          <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Common Parameters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="y" className="block text-sm font-medium text-gray-700 mb-1">
                  y — Number of conversations
                </label>
                <input
                  type="number"
                  id="y"
                  value={inputs.y || ''}
                  onChange={handleInputChange('y')}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="cIn" className="block text-sm font-medium text-gray-700 mb-1">
                  C<sub>in</sub> — Cost per input token (₹)
                </label>
                <input
                  type="number"
                  id="cIn"
                  value={inputs.cIn || ''}
                  onChange={handleInputChange('cIn')}
                  min="0"
                  step="0.00000001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="cOut" className="block text-sm font-medium text-gray-700 mb-1">
                  C<sub>out</sub> — Cost per output token (₹)
                </label>
                <input
                  type="number"
                  id="cOut"
                  value={inputs.cOut || ''}
                  onChange={handleInputChange('cOut')}
                  min="0"
                  step="0.00000001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};