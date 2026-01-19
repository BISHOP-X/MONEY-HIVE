// Mock Exchange Rate Service
// Replace with live API (Flutterwave/Nium) when ready

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  inverseRate: number;
  timestamp: string;
  source: 'mock' | 'live';
}

// Hardcoded rates - update these periodically or swap with live API
// Last updated: January 2026
const BASE_RATES: Record<string, Record<string, number>> = {
  GBP: {
    NGN: 1950.00,
    GHS: 15.50,
    KES: 165.00,
    USD: 1.27,
    EUR: 1.18,
  },
  USD: {
    NGN: 1550.00,
    GHS: 12.30,
    KES: 131.00,
    GBP: 0.79,
    EUR: 0.93,
  },
  EUR: {
    NGN: 1680.00,
    GHS: 13.20,
    KES: 141.00,
    GBP: 0.85,
    USD: 1.08,
  },
};

// Our margin (profit) - typically 0.5-2% on top of mid-market rate
const MARGIN_PERCENT = 1.5;

function applyMargin(rate: number): number {
  return rate * (1 - MARGIN_PERCENT / 100);
}

export async function getRate(from: string, to: string): Promise<ExchangeRate> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  let rate = BASE_RATES[from]?.[to];
  
  if (!rate) {
    // Try inverse
    const inverseRate = BASE_RATES[to]?.[from];
    if (inverseRate) {
      rate = 1 / inverseRate;
    } else {
      rate = 1; // Fallback
    }
  }
  
  const finalRate = applyMargin(rate);
  
  return {
    from,
    to,
    rate: finalRate,
    inverseRate: 1 / finalRate,
    timestamp: new Date().toISOString(),
    source: 'mock',
  };
}

export async function getAllRates(from: string): Promise<ExchangeRate[]> {
  const destinations = ['NGN', 'GHS', 'KES'];
  const rates = await Promise.all(destinations.map((to) => getRate(from, to)));
  return rates;
}

export function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    NGN: '₦',
    GHS: 'GH₵',
    KES: 'KSh',
  };
  
  const symbol = symbols[currency] ?? currency;
  
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getDestinationCountries(): { code: string; name: string; currency: string; flag: string }[] {
  return [
    { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
    { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪' },
  ];
}

export function getSourceCountries(): { code: string; name: string; currency: string; flag: string }[] {
  return [
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
    { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  ];
}
