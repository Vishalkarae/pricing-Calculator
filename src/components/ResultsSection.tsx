import React, { useState } from 'react';
import { CalculatorResults } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { exportToCSV, copyToClipboard } from '../utils/export';
import { CalculatorInputs } from '../types';
import { Download, Copy, Check } from 'lucide-react';

interface ResultsSectionProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  inputs,
}) => {
  const [copied, setCopied] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(inputs, results);
  };

  const handleCopyTotalCost = async () => {
    const success = await copyToClipboard(formatCurrency(results.totalCost));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Calculation Results
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopyTotalCost}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Total Cost'}
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Token Counts */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Token Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">Input Tokens</div>
            <div className="text-2xl font-bold text-blue-800">
              {formatNumber(results.inputTokens)}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium">Output Tokens</div>
            <div className="text-2xl font-bold text-green-800">
              {formatNumber(results.outputTokens)}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 font-medium">Total Tokens</div>
            <div className="text-2xl font-bold text-purple-800">
              {formatNumber(results.totalTokens)}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Cost Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-sm text-orange-600 font-medium">Input Cost</div>
            <div className="text-2xl font-bold text-orange-800">
              {formatCurrency(results.inputCost)}
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-sm text-red-600 font-medium">Output Cost</div>
            <div className="text-2xl font-bold text-red-800">
              {formatCurrency(results.outputCost)}
            </div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 ring-2 ring-emerald-400">
            <div className="text-sm text-emerald-600 font-medium">Total Cost</div>
            <div className="text-3xl font-bold text-emerald-800">
              {formatCurrency(results.totalCost)}
            </div>
          </div>
        </div>
      </div>

      {/* Per-Unit Costs */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Per-Unit Costs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 font-medium">Per-Message Cost</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.perMessageCost)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 font-medium">Per-Pair Cost</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.perPairCost)}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200">
        <h3 className="text-lg font-medium text-primary-800 mb-2">Summary</h3>
        <p className="text-primary-700">
          For <strong>{inputs.y}</strong> conversations with <strong>{inputs.x}</strong> messages each 
          (totaling <strong>{formatNumber(inputs.x * inputs.y)}</strong> messages), 
          the estimated cost is <strong className="text-primary-900">{formatCurrency(results.totalCost)}</strong>.
        </p>
      </div>
    </div>
  );
};
