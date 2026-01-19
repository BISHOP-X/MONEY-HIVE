import { create } from 'zustand';

export interface Recipient {
  id: string;
  userId: string;
  name: string;
  country: string;
  deliveryMethod: 'bank' | 'mobile_money' | 'cash_pickup';
  // Bank details
  bankName?: string;
  accountNumber?: string;
  // Mobile money details
  mobileProvider?: string;
  mobileNumber?: string;
  // Meta
  isFavorite: boolean;
  lastUsed?: string;
  createdAt: string;
}

interface RecipientsState {
  recipients: Recipient[];
  isLoading: boolean;
  selectedRecipientId: string | null;
  
  // Actions
  setRecipients: (recipients: Recipient[]) => void;
  addRecipient: (recipient: Recipient) => void;
  updateRecipient: (id: string, updates: Partial<Recipient>) => void;
  removeRecipient: (id: string) => void;
  selectRecipient: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useRecipientsStore = create<RecipientsState>((set) => ({
  recipients: [],
  isLoading: false,
  selectedRecipientId: null,

  setRecipients: (recipients) => set({ recipients }),
  
  addRecipient: (recipient) => 
    set((state) => ({ recipients: [...state.recipients, recipient] })),
  
  updateRecipient: (id, updates) =>
    set((state) => ({
      recipients: state.recipients.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
  
  removeRecipient: (id) =>
    set((state) => ({
      recipients: state.recipients.filter((r) => r.id !== id),
      selectedRecipientId: state.selectedRecipientId === id ? null : state.selectedRecipientId,
    })),
  
  selectRecipient: (id) => set({ selectedRecipientId: id }),
  
  toggleFavorite: (id) =>
    set((state) => ({
      recipients: state.recipients.map((r) =>
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
      ),
    })),
  
  setLoading: (isLoading) => set({ isLoading }),
}));
