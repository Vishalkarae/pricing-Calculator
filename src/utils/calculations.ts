import { CalculatorInputs, CalculatorResults } from '../types';

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  // Determine which token factor to use based on mode
  const tokenFactor = inputs.mode === 'chat' ? inputs.tokenFactor : inputs.tokenFactorAudio;
  
  // Chat Mode: Input tokens = a × (x / 2) × y × tokenFactor
  // Voice Mode: Input tokens = a × (x / 2) × y × tokenFactor_audio
  const inputTokens = inputs.a * (inputs.x / 2) * inputs.y * tokenFactor;
  
  // Chat Mode: Output tokens = b × (x / 2) × y × tokenFactor
  // Voice Mode: Output tokens = b × (x / 2) × y × tokenFactor_audio
  const outputTokens = inputs.b * (inputs.x / 2) * inputs.y * tokenFactor;
  
  // Total tokens = input tokens + output tokens
  const totalTokens = inputTokens + outputTokens;
  
  // Input cost = input tokens × C_in
  const inputCost = inputTokens * inputs.cIn;
  
  // Output cost = output tokens × C_out
  const outputCost = outputTokens * inputs.cOut;
  
  // Total cost = input cost + output cost
  const totalCost = inputCost + outputCost;
  
  // Per-message cost = total cost / (x × y)
  const perMessageCost = inputs.x * inputs.y > 0 ? totalCost / (inputs.x * inputs.y) : 0;
  
  // Per-pair cost = total cost / (x × y / 2) = total cost / total pairs
  const totalPairs = (inputs.x * inputs.y) / 2;
  const perPairCost = totalPairs > 0 ? totalCost / totalPairs : 0;
  
  return {
    inputTokens: Math.round(inputTokens * 100000000) / 100000000,
    outputTokens: Math.round(outputTokens * 100000000) / 100000000,
    totalTokens: Math.round(totalTokens * 100000000) / 100000000,
    inputCost: Math.round(inputCost * 100000000) / 100000000,
    outputCost: Math.round(outputCost * 100000000) / 100000000,
    totalCost: Math.round(totalCost * 100000000) / 100000000,
    perMessageCost: Math.round(perMessageCost * 100000000) / 100000000,
    perPairCost: Math.round(perPairCost * 100000000) / 100000000,
  };
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 8, maximumFractionDigits: 8 })}`;
}

export function formatNumber(num: number, decimals: number = 8): string {
  return num.toLocaleString('en-IN', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
}
