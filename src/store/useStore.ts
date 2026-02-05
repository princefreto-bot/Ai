import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  plan: 'none' | 'pro' | 'enterprise';
  subscriptionStatus: 'inactive' | 'active' | 'cancelled';
  subscriptionEndDate?: string;
  isSubscribed: boolean;
}

export interface AnalysisResult {
  id: string;
  signal: 'BUY' | 'SELL' | 'WAIT';
  entryZone: { min: number; max: number };
  stopLoss: number;
  takeProfit: { tp1: number; tp2: number; tp3: number };
  confidenceLevel: number;
  setupGrade: 'A+' | 'A' | 'B' | 'C';
  detectedPatterns: string[];
  explanation: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  momentum: 'strong' | 'moderate' | 'weak';
  timestamp: Date;
  imageUrl?: string;
}

export interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // Analyses
  analyses: AnalysisResult[];
  currentAnalysis: AnalysisResult | null;
  isAnalyzing: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  register: (user: User, token: string) => void;
  logout: () => void;
  
  setAnalyses: (analyses: AnalysisResult[]) => void;
  addAnalysis: (analysis: AnalysisResult) => void;
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      token: null,
      analyses: [],
      currentAnalysis: null,
      isAnalyzing: false,
      
      // Actions
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setToken: (token) => {
        if (token) {
          localStorage.setItem('auth_token', token);
        } else {
          localStorage.removeItem('auth_token');
        }
        set({ token });
      },
      
      login: (user, token) => {
        localStorage.setItem('auth_token', token);
        set({ 
          user, 
          token,
          isAuthenticated: true 
        });
      },
      
      register: (user, token) => {
        localStorage.setItem('auth_token', token);
        set({ 
          user, 
          token,
          isAuthenticated: true 
        });
      },
      
      logout: () => {
        localStorage.removeItem('auth_token');
        set({ 
          user: null, 
          token: null,
          isAuthenticated: false,
          analyses: [],
          currentAnalysis: null,
        });
      },
      
      setAnalyses: (analyses) => set({ analyses }),
      
      addAnalysis: (analysis) => set((state) => ({ 
        analyses: [analysis, ...state.analyses] 
      })),
      
      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
      
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
    }),
    {
      name: 'tradescalpsnip-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
