import { create } from 'zustand';
import { LabelDashboard } from '../types/label.types';

interface LabelStoreState {
  dashboard: LabelDashboard | null;
  setDashboard: (dashboard: LabelDashboard) => void;
}

export const useLabelStore = create<LabelStoreState>((set) => ({
  dashboard: null,
  setDashboard: (dashboard) => set({ dashboard }),
}));
