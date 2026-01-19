// Mock Bill Payment Service
// Replace with Flutterwave Bills API when ready

export type BillCategory = 'airtime' | 'electricity' | 'tv' | 'internet' | 'water';

export interface BillProvider {
  id: string;
  name: string;
  logo?: string;
  category: BillCategory;
  country: string;
}

export interface BillPaymentRequest {
  providerId: string;
  accountNumber: string;
  amount: number;
  category: BillCategory;
}

export interface BillPaymentResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  amount: number;
  fee: number;
  provider: string;
  accountNumber: string;
  createdAt: string;
}

// Mock providers by country
const MOCK_PROVIDERS: BillProvider[] = [
  // Nigeria - Airtime
  { id: 'mtn-ng', name: 'MTN Nigeria', category: 'airtime', country: 'NG' },
  { id: 'glo-ng', name: 'Glo', category: 'airtime', country: 'NG' },
  { id: 'airtel-ng', name: 'Airtel Nigeria', category: 'airtime', country: 'NG' },
  { id: '9mobile-ng', name: '9mobile', category: 'airtime', country: 'NG' },
  
  // Nigeria - Electricity
  { id: 'ikedc', name: 'Ikeja Electric (IKEDC)', category: 'electricity', country: 'NG' },
  { id: 'ekedc', name: 'Eko Electric (EKEDC)', category: 'electricity', country: 'NG' },
  { id: 'aedc', name: 'Abuja Electric (AEDC)', category: 'electricity', country: 'NG' },
  { id: 'phedc', name: 'Port Harcourt Electric', category: 'electricity', country: 'NG' },
  
  // Nigeria - TV
  { id: 'dstv-ng', name: 'DSTV', category: 'tv', country: 'NG' },
  { id: 'gotv-ng', name: 'GOtv', category: 'tv', country: 'NG' },
  { id: 'startimes-ng', name: 'StarTimes', category: 'tv', country: 'NG' },
  
  // Ghana - Airtime
  { id: 'mtn-gh', name: 'MTN Ghana', category: 'airtime', country: 'GH' },
  { id: 'vodafone-gh', name: 'Vodafone Ghana', category: 'airtime', country: 'GH' },
  { id: 'airteltigo-gh', name: 'AirtelTigo', category: 'airtime', country: 'GH' },
  
  // Kenya - Airtime
  { id: 'safaricom-ke', name: 'Safaricom', category: 'airtime', country: 'KE' },
  { id: 'airtel-ke', name: 'Airtel Kenya', category: 'airtime', country: 'KE' },
  { id: 'telkom-ke', name: 'Telkom Kenya', category: 'airtime', country: 'KE' },
];

export async function getProviders(
  country: string,
  category?: BillCategory
): Promise<BillProvider[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  let providers = MOCK_PROVIDERS.filter((p) => p.country === country);
  if (category) {
    providers = providers.filter((p) => p.category === category);
  }
  return providers;
}

export async function validateAccount(
  _providerId: string,
  _accountNumber: string
): Promise<{ valid: boolean; accountName?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Mock validation - always succeeds with a fake name
  return {
    valid: true,
    accountName: 'John Doe', // In production, this comes from the provider
  };
}

export async function payBill(
  request: BillPaymentRequest
): Promise<BillPaymentResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const provider = MOCK_PROVIDERS.find((p) => p.id === request.providerId);
  
  return {
    id: `BILL-${Date.now()}`,
    status: 'completed',
    reference: `MHB${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    amount: request.amount,
    fee: 0, // Bills typically have no fee
    provider: provider?.name ?? 'Unknown',
    accountNumber: request.accountNumber,
    createdAt: new Date().toISOString(),
  };
}

export async function getBillCategories(): Promise<{ id: BillCategory; name: string; icon: string }[]> {
  return [
    { id: 'airtime', name: 'Airtime & Data', icon: 'smartphone' },
    { id: 'electricity', name: 'Electricity', icon: 'zap' },
    { id: 'tv', name: 'Cable TV', icon: 'tv' },
    { id: 'internet', name: 'Internet', icon: 'wifi' },
    { id: 'water', name: 'Water', icon: 'droplet' },
  ];
}
