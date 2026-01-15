import { CalibrationConfig } from './types';

export const getPixelsPerMM = (calibration: CalibrationConfig) => {
  return calibration.pixelsPerInch / 25.4;
};

export const getPixelsPerPt = (calibration: CalibrationConfig) => {
  return calibration.pixelsPerInch / 72;
};

export const mmToPx = (mm: number, calibration: CalibrationConfig): number => {
  return mm * getPixelsPerMM(calibration);
};

export const ptToPx = (pt: number, calibration: CalibrationConfig): number => {
  return pt * getPixelsPerPt(calibration);
};

export const trackingToEm = (tracking: number): number => {
  return tracking / 1000;
};
