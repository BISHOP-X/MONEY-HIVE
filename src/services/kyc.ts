// Mock KYC Service
// Replace with ComplyCube or Didit integration when approved

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type KYCTier = 'none' | 'basic' | 'enhanced';

export interface KYCProfile {
  userId: string;
  status: KYCStatus;
  tier: KYCTier;
  dailyLimit: number;
  monthlyLimit: number;
  documentsSubmitted: boolean;
  selfieSubmitted: boolean;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface DocumentUpload {
  type: 'passport' | 'driving_license' | 'national_id';
  frontImage: File;
  backImage?: File; // Not needed for passport
}

// Tier limits in GBP
const TIER_LIMITS = {
  none: { daily: 0, monthly: 0 },
  basic: { daily: 500, monthly: 2000 },
  enhanced: { daily: 5000, monthly: 20000 },
};

export async function getKYCStatus(userId: string): Promise<KYCProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Mock: return unverified status for demo
  return {
    userId,
    status: 'unverified',
    tier: 'none',
    dailyLimit: TIER_LIMITS.none.daily,
    monthlyLimit: TIER_LIMITS.none.monthly,
    documentsSubmitted: false,
    selfieSubmitted: false,
  };
}

export async function submitDocuments(
  _userId: string,
  _document: DocumentUpload
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Mock: always succeed
  return {
    success: true,
    message: 'Documents uploaded successfully. Verification in progress.',
  };
}

export async function submitSelfie(
  _userId: string,
  _selfie: File
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  return {
    success: true,
    message: 'Selfie uploaded successfully.',
  };
}

export async function checkVerification(userId: string): Promise<KYCProfile> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In dev mode, auto-approve after documents are submitted
  // In production, this checks ComplyCube/Didit API
  return {
    userId,
    status: 'verified',
    tier: 'basic',
    dailyLimit: TIER_LIMITS.basic.daily,
    monthlyLimit: TIER_LIMITS.basic.monthly,
    documentsSubmitted: true,
    selfieSubmitted: true,
    verifiedAt: new Date().toISOString(),
  };
}

export function getLimitsForTier(tier: KYCTier): { daily: number; monthly: number } {
  return TIER_LIMITS[tier];
}

export function canTransfer(
  amount: number,
  kycProfile: KYCProfile,
  todayTotal: number,
  monthTotal: number
): { allowed: boolean; reason?: string } {
  if (kycProfile.status !== 'verified') {
    return { allowed: false, reason: 'Please complete identity verification first.' };
  }
  
  if (todayTotal + amount > kycProfile.dailyLimit) {
    return { allowed: false, reason: `This would exceed your daily limit of £${kycProfile.dailyLimit}.` };
  }
  
  if (monthTotal + amount > kycProfile.monthlyLimit) {
    return { allowed: false, reason: `This would exceed your monthly limit of £${kycProfile.monthlyLimit}.` };
  }
  
  return { allowed: true };
}
