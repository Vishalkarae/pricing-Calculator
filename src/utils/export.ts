import { CalculatorInputs, CalculatorResults } from '../types';
import { formatCurrency, formatNumber } from './calculations';

export function exportToCSV(inputs: CalculatorInputs, results: CalculatorResults): void {
  const rows: string[][] = [
    ['Parameter', 'Value'],
    ['Mode', inputs.mode],
    ['Number of conversations (y)', inputs.y.toString()],
  ];

  if (inputs.mode === 'chat') {
    rows.push(
      ['Total messages per conversation (x)', inputs.x.toString()],
      ['Average words per user query (a)', inputs.a.toString()],
      ['Average words per AI response (b)', inputs.b.toString()],
      ['Word-to-token factor', inputs.wordToToken.toString()]
    );
  } else {
    rows.push(
      ['Total call duration (T)', inputs.T.toString()],
      ['User:AI speaking ratio (z)', inputs.z.toString()],
      ['Silence factor (s)', inputs.silenceFactor.toString()],
      ['Audio-to-token factor', inputs.audioToToken.toString()]
    );
  }

  rows.push(
    ['Cost per input token (C_in)', formatCurrency(inputs.cIn)],
    ['Cost per output token (C_out)', formatCurrency(inputs.cOut)],
    [''],
    ['Results', ''],
    ['Input tokens', formatNumber(results.inputTokens)],
    ['Output tokens', formatNumber(results.outputTokens)],
    ['Total tokens', formatNumber(results.totalTokens)],
    ['Input cost', formatCurrency(results.inputCost)],
    ['Output cost', formatCurrency(results.outputCost)],
    ['Total cost', formatCurrency(results.totalCost)],
    ['Per-conversation cost', formatCurrency(results.perMessageCost)],
    ['Per-pair cost', formatCurrency(results.perPairCost)]
  );

  const csvContent = rows.map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'chat_cost_calculation.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
