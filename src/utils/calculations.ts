import { CalculatorInputs, CalculatorResults } from '../types';

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  let inputTokens: number;
  let outputTokens: number;
  let totalCost: number;
  
  if (inputs.mode === 'chat') {
    // Chat Mode Cumulative Equations:
    // Tin  = p × (x/2) × (a⋅(x/2) + b⋅(x/2))
    // Tout = p × b × (x/2)
    // Cost = (Tin × Cin) + (Tout × Cout)
    // TotalCost = y × Cost
    
    const p = inputs.wordToToken;
    const x = inputs.x;
    const a = inputs.a;
    const b = inputs.b;
    
    const Tin = p * (x / 2) * (a * (x / 2) + b * (x / 2));
    const Tout = p * b * (x / 2);
    
    inputTokens = Tin;
    outputTokens = Tout;
    const costPerConversation = (Tin * inputs.cIn) + (Tout * inputs.cOut);
    totalCost = inputs.y * costPerConversation;
  } else {
    // Voice Mode Equations:
    // Ts = T × (1 - s)  [effective duration after removing silence]
    // Tu = Ts × z / (1 + z)  [user duration]
    // Tai = Ts - Tu  [AI duration]
    // Tin  = Faudio × Tu
    // Tout = Faudio × Tai
    // Cost = (Tin × Cin) + (Tout × Cout)
    // TotalCost = y × Cost
    
    const T = inputs.T;
    const z = inputs.z;
    const s = inputs.silenceFactor;
    const Faudio = inputs.audioToToken;
    
    const Ts = T * (1 - s);
    const Tu = Ts * z / (1 + z);
    const Tai = Ts - Tu;
    
    const Tin = Faudio * Tu;
    const Tout = Faudio * Tai;
    
    inputTokens = Tin;
    outputTokens = Tout;
    const costPerConversation = (Tin * inputs.cIn) + (Tout * inputs.cOut);
    totalCost = inputs.y * costPerConversation;
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
