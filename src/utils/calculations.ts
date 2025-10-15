import { CalculatorInputs, CalculatorResults } from '../types';

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  let inputTokens: number;
  let outputTokens: number;
  let totalCost: number;
  
  if (inputs.mode === 'chat') {
    // Chat Mode Equations:
    // Win  = a * (x / 2)
    // Wout = b * (x / 2)
    // Tin  = wordToToken * Win
    // Tout = wordToToken * Wout
    // TotalCost = y * ((Tin * Cin) + (Tout * Cout))
    
    const Win = inputs.a * (inputs.x / 2);
    const Wout = inputs.b * (inputs.x / 2);
    const Tin = inputs.wordToToken * Win;
    const Tout = inputs.wordToToken * Wout;
    
    inputTokens = Tin;
    outputTokens = Tout;
    totalCost = inputs.y * ((Tin * inputs.cIn) + (Tout * inputs.cOut));
  } else {
    // Voice Mode Equations:
    // UserDuration = T * (z / (1 + z))
    // AIDuration   = T * (1 / (1 + z))
    // Tin  = audioToToken * UserDuration
    // Tout = audioToToken * AIDuration
    // TotalCost = y * ((Tin * Cin) + (Tout * Cout))
    
    const userDuration = inputs.T * (inputs.z / (1 + inputs.z));
    const aiDuration = inputs.T * (1 / (1 + inputs.z));
    const Tin = inputs.audioToToken * userDuration;
    const Tout = inputs.audioToToken * aiDuration;
    
    inputTokens = Tin;
    outputTokens = Tout;
    totalCost = inputs.y * ((Tin * inputs.cIn) + (Tout * inputs.cOut));
  }
  
  // Total tokens = input tokens + output tokens
  const totalTokens = inputTokens + outputTokens;
  
  // Input cost = input tokens × C_in × y
  const inputCost = inputTokens * inputs.cIn * inputs.y;
  
  // Output cost = output tokens × C_out × y
  const outputCost = outputTokens * inputs.cOut * inputs.y;
  
  // Per-conversation cost
  const perMessageCost = inputs.y > 0 ? totalCost / inputs.y : 0;
  
  // Per-pair cost (for chat mode)
  const totalPairs = inputs.mode === 'chat' ? (inputs.x * inputs.y) / 2 : inputs.y;
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
