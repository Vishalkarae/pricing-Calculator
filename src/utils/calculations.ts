import { CalculatorInputs, CalculatorResults } from '../types';

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  // Input tokens = tokenFactor × a × (x / 2) × y
  const inputTokens = inputs.tokenFactor * inputs.a * (inputs.x / 2) * inputs.y;
  
  // Output tokens = tokenFactor × b × (x / 2) × y
  const outputTokens = inputs.tokenFactor * inputs.b * (inputs.x / 2) * inputs.y;
  
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
    inputTokens: Math.round(inputTokens * 10000) / 10000,
    outputTokens: Math.round(outputTokens * 10000) / 10000,
    totalTokens: Math.round(totalTokens * 10000) / 10000,
    inputCost: Math.round(inputCost * 10000) / 10000,
    outputCost: Math.round(outputCost * 10000) / 10000,
    totalCost: Math.round(totalCost * 10000) / 10000,
    perMessageCost: Math.round(perMessageCost * 10000) / 10000,
    perPairCost: Math.round(perPairCost * 10000) / 10000,
  };
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`;
}

export function formatNumber(num: number, decimals: number = 4): string {
  return num.toLocaleString('en-IN', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
}
