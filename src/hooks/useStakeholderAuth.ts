import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Mock Stakeholder Auth System
 * 
 * For stakeholder testing only - simulates a logged-in user session.
 * When we go live, this will be replaced with real Supabase auth.
 * 
 * Features:
 * - Mock login/signup (no real auth, just sets session)
 * - Persists across page refreshes
 * - Stores mock user data for display
 * - Tracks intended redirect destination
 */

interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface StakeholderAuthState {
  // Session state
  isAuthenticated: boolean;
  mockUser: MockUser | null;
  
  // Redirect handling
  intendedDestination: string | null;
  
  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  
  // Actions
  login: (email: string, firstName?: string, lastName?: string) => void;
  signup: (email: string, firstName: string, lastName: string) => void;
  logout: () => void;
  setIntendedDestination: (path: string | null) => void;
}

// Generate a mock user ID
const generateMockId = () => `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useStakeholderAuth = create<StakeholderAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      mockUser: null,
      intendedDestination: null,
      _hasHydrated: false,
      
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      login: (email, firstName = 'Demo', lastName = 'User') => {
        const mockUser: MockUser = {
          id: generateMockId(),
          email,
          firstName,
          lastName,
          createdAt: new Date().toISOString(),
        };
        set({ 
          isAuthenticated: true, 
          mockUser,
        });
      },

      signup: (email, firstName, lastName) => {
        const mockUser: MockUser = {
          id: generateMockId(),
          email,
          firstName,
          lastName,
          createdAt: new Date().toISOString(),
        };
        set({ 
          isAuthenticated: true, 
          mockUser,
        });
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          mockUser: null,
          intendedDestination: null,
        });
      },

      setIntendedDestination: (path) => {
        set({ intendedDestination: path });
      },
    }),
    {
      name: 'moneyhive-stakeholder-auth',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Helper hook to get display name
export const useStakeholderDisplayName = () => {
  const { mockUser } = useStakeholderAuth();
  if (!mockUser) return 'Guest';
  return `${mockUser.firstName} ${mockUser.lastName.charAt(0)}.`;
};
