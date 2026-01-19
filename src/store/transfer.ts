import { create } from 'zustand';

export interface TransferFormData {
  // Step 1: Amount
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  
  // Step 2: Recipient
  recipientId: string | null;
  deliveryMethod: 'bank' | 'mobile_money' | 'cash_pickup';
  
  // Step 3: Review
  fee: number;
  totalAmount: number;
  note?: string;
  
  // Meta
  estimatedDelivery: string;
}

interface TransferState {
  // Multi-step wizard
  currentStep: number;
  formData: TransferFormData;
  isSubmitting: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<TransferFormData>) => void;
  resetForm: () => void;
  setSubmitting: (submitting: boolean) => void;
}

const initialFormData: TransferFormData = {
  sendAmount: 0,
  sendCurrency: 'GBP',
  receiveAmount: 0,
  receiveCurrency: 'NGN',
  exchangeRate: 0,
  recipientId: null,
  deliveryMethod: 'bank',
  fee: 0,
  totalAmount: 0,
  estimatedDelivery: '',
};

export const useTransferStore = create<TransferState>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  isSubmitting: false,

  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  
  resetForm: () => set({ currentStep: 1, formData: initialFormData, isSubmitting: false }),
  
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
