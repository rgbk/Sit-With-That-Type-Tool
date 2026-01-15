import { create } from 'zustand';
import { AppState } from './types';
import { INITIAL_STATE } from './constants';

export const useStore = create<AppState>((set) => ({
  ...INITIAL_STATE,

  setPageConfig: (config) =>
    set((state) => ({ page: { ...state.page, ...config } })),

  setFrame1Style: (style) =>
    set((state) => ({ frame1: { ...state.frame1, ...style } })),

  setFrame2Style: (style) =>
    set((state) => ({ frame2: { ...state.frame2, ...style } })),

  setContent1: (text) => set(() => ({ content1: text })),
  setContent2: (text) => set(() => ({ content2: text })),

  setCalibration: (config) =>
    set((state) => ({ calibration: { ...state.calibration, ...config } })),

  setView: (config) =>
    set((state) => ({ view: { ...state.view, ...config } })),
    
  toggleCalibration: (isOpen) => set(() => ({ isCalibrationOpen: isOpen })),

  toggleControlPanel: (isOpen) => set((state) => ({ 
    isControlPanelOpen: isOpen !== undefined ? isOpen : !state.isControlPanelOpen 
  })),
}));