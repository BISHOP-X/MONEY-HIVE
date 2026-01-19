// Mock Transfer Service
// Replace with Flutterwave integration when API keys arrive

export interface TransferRequest {
  recipientId: string;
  amount: number;
  currency: string;
  destinationCurrency: string;
  deliveryMethod: 'bank' | 'mobile_money' | 'cash_pickup';
  note?: string;
}

export interface TransferResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  reference: string;
  amount: number;
  fee: number;
  exchangeRate: number;
  destinationAmount: number;
  estimatedDelivery: string;
  createdAt: string;
}

// Mock exchange rates (hardcoded for now)
const MOCK_RATES: Record<string, Record<string, number>> = {
  GBP: { NGN: 1950, GHS: 15.5, KES: 165 },
  USD: { NGN: 1550, GHS: 12.3, KES: 131 },
};

// Mock fee structure
const MOCK_FEES: Record<string, number> = {
  bank: 2.99,
  mobile_money: 1.99,
  cash_pickup: 4.99,
};

export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<{ rate: number; timestamp: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const rate = MOCK_RATES[fromCurrency]?.[toCurrency] ?? 1;
  
  return {
    rate,
    timestamp: new Date().toISOString(),
  };
}

export async function calculateFee(
  _amount: number,
  deliveryMethod: TransferRequest['deliveryMethod']
): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_FEES[deliveryMethod] ?? 2.99;
}

export async function initiateTransfer(
  request: TransferRequest
): Promise<TransferResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const rate = MOCK_RATES[request.currency]?.[request.destinationCurrency] ?? 1;
  const fee = MOCK_FEES[request.deliveryMethod] ?? 2.99;
  const destinationAmount = request.amount * rate;

  // Mock successful transfer
  return {
    id: `TRF-${Date.now()}`,
    status: 'pending',
    reference: `MH${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    amount: request.amount,
    fee,
    exchangeRate: rate,
    destinationAmount,
    estimatedDelivery: '15-30 minutes',
    createdAt: new Date().toISOString(),
  };
}

export async function getTransferStatus(_transferId: string): Promise<TransferResponse['status']> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Mock: randomly return different statuses for demo
  const statuses: TransferResponse['status'][] = ['pending', 'processing', 'completed'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}
