import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';
import type { KYCStatus } from '@/services/kyc';

interface AuthState {
  // User data
  user: User | null;
  isLoading: boolean;
  
  // KYC status
  kycStatus: KYCStatus;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setKYCStatus: (status: KYCStatus) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      kycStatus: 'unverified',

      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      setKYCStatus: (kycStatus) => set({ kycStatus }),
      
      logout: () => set({ 
        user: null, 
        kycStatus: 'unverified',
        isLoading: false 
      }),
    }),
    {
      name: 'moneyhive-auth',
      partialize: (state) => ({ 
        // Only persist KYC status, not the user object (Supabase handles that)
        kycStatus: state.kycStatus 
      }),
    }
  )
);
