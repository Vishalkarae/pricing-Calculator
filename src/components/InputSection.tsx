import React, { useState } from 'react';
import { CalculatorInputs, MODEL_PROVIDERS, CalculatorMode } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface InputSectionProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: number | CalculatorMode) => void;
  onPresetSelect: (cIn: number, cOut: number, mode: CalculatorMode) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputs,
  onInputChange,
  onPresetSelect,
}) => {
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set(['Gemini', 'OpenAI']));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Gemini-Chat', 'OpenAI-Chat']));

  const handleInputChange = (field: keyof CalculatorInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    onInputChange(field, Math.max(0, value)); // Prevent negative values
  };

  const handleModeChange = (mode: CalculatorMode) => {
    onInputChange('mode', mode);
  };

  const toggleProvider = (providerName: string) => {
    const newExpanded = new Set(expandedProviders);
    if (newExpanded.has(providerName)) {
      newExpanded.delete(providerName);
    } else {
      newExpanded.add(providerName);
    }
    setExpandedProviders(newExpanded);
  };

  const toggleCategory = (providerName: string, categoryName: string) => {
    const categoryKey = `${providerName}-${categoryName}`;
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
        Input Parameters
      </h2>
      
      {/* Mode Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Mode Selection
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="chat"
              checked={inputs.mode === 'chat'}
              onChange={(e) => handleModeChange(e.target.value as CalculatorMode)}
              className="mr-2 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Chat</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="voice"
              checked={inputs.mode === 'voice'}
              onChange={(e) => handleModeChange(e.target.value as CalculatorMode)}
              className="mr-2 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Voice</span>
          </label>
        </div>
      </div>

      {/* Model Presets */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Model Presets
        </label>
        <div className="space-y-3">
          {MODEL_PROVIDERS.map((provider) => {
            // Filter categories by current mode
            const filteredCategories = provider.categories.filter(cat => cat.mode === inputs.mode);
            
            if (filteredCategories.length === 0) return null;
            
            return (
              <div key={provider.name} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Provider Header */}
                <button
                  onClick={() => toggleProvider(provider.name)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {provider.name === 'Gemini' ? '🟢' : '🔵'} {provider.name}
                    </span>
                  </div>
                  {expandedProviders.has(provider.name) ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  )}
                </button>

                {/* Categories */}
                {expandedProviders.has(provider.name) && (
                  <div className="bg-white">
                    {filteredCategories.map((category) => (
                      <div key={category.name} className="border-b border-gray-100 last:border-b-0">
                        {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(provider.name, category.name)}
                          className="w-full px-6 py-2 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-gray-600">
                            {category.name}
                          </span>
                          {expandedCategories.has(`${provider.name}-${category.name}`) ? (
                            <ChevronDown size={14} className="text-gray-400" />
                          ) : (
                            <ChevronRight size={14} className="text-gray-400" />
                          )}
                        </button>

                        {/* Presets */}
                        {expandedCategories.has(`${provider.name}-${category.name}`) && (
                          <div className="px-6 pb-3 pt-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {category.presets.map((preset) => (
                                <button
                                  key={preset.name}
                                  onClick={() => onPresetSelect(preset.cIn, preset.cOut, category.mode)}
                                  className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left"
                                >
                                  <div className="font-medium">{preset.name}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    ₹{preset.cIn.toFixed(8)} / ₹{preset.cOut.toFixed(8)}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 mb-1">
            x — {inputs.mode === 'chat' ? 'Total messages per conversation' : 'Total seconds per conversation'}
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
          <label htmlFor="a" className="block text-sm font-medium text-gray-700 mb-1">
            a — {inputs.mode === 'chat' ? 'Average words per user query' : 'Average audio input per user message (seconds)'}
          </label>
          <input
            type="number"
            id="a"
            value={inputs.a || ''}
            onChange={handleInputChange('a')}
            min="0"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="b" className="block text-sm font-medium text-gray-700 mb-1">
            b — {inputs.mode === 'chat' ? 'Average words per AI response' : 'Average audio output per agent message (seconds)'}
          </label>
          <input
            type="number"
            id="b"
            value={inputs.b || ''}
            onChange={handleInputChange('b')}
            min="0"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {inputs.mode === 'chat' && (
          <div>
            <label htmlFor="tokenFactor" className="block text-sm font-medium text-gray-700 mb-1">
              Token Factor — Word-to-token factor
            </label>
            <input
              type="number"
              id="tokenFactor"
              value={inputs.tokenFactor || ''}
              onChange={handleInputChange('tokenFactor')}
              min="0"
              step="0.0001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}

        {inputs.mode === 'voice' && (
          <div>
            <label htmlFor="tokenFactorAudio" className="block text-sm font-medium text-gray-700 mb-1">
              Audio Token Factor — Seconds-to-token factor (e.g., 1 sec ≈ 50 tokens)
            </label>
            <input
              type="number"
              id="tokenFactorAudio"
              value={inputs.tokenFactorAudio || ''}
              onChange={handleInputChange('tokenFactorAudio')}
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="cIn" className="block text-sm font-medium text-gray-700 mb-1">
            C_in — Cost per input token (₹)
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
            C_out — Cost per output token (₹)
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
  );
};
