export enum FontFamily {
  MonumentGrotesk = 'ABC Monument Grotesk',
  Marist = 'ABC Marist',
  MaristBook = 'ABC Marist Book',
}

export enum TextCase {
  Normal = 'normal',
  Uppercase = 'uppercase',
  Lowercase = 'lowercase',
  TitleCase = 'capitalize',
}

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
  Justify = 'justify',
}

export interface FrameStyle {
  fontFamily: FontFamily;
  fontWeight: string; // 'Regular', 'Medium', etc.
  fontStyle: 'normal' | 'italic';
  fontSizePt: number;
  leadingPt: number | 'auto'; // 'auto' or explicit pt
  tracking: number; // 1/1000 em
  textCase: TextCase;
  alignment: TextAlign;
  heightMm?: number; // Only for Frame 1
}

export interface PageConfig {
  widthMm: number;
  heightMm: number;
  marginTopMm: number;
  marginRightMm: number;
  marginBottomMm: number;
  marginLeftMm: number;
  columns: number;
  gutterMm: number;
}

export interface CalibrationConfig {
  pixelsPerInch: number; // CSS pixels per inch
}

export interface ViewConfig {
  rotated: boolean;
  showMargins: boolean;
  showColumns: boolean;
  showBaseline: boolean;
  guideColor: string;
  backgroundColor: string;
}

export interface AppState {
  page: PageConfig;
  frame1: FrameStyle;
  frame2: FrameStyle;
  content1: string;
  content2: string;
  calibration: CalibrationConfig;
  view: ViewConfig;
  isCalibrationOpen: boolean;
  isControlPanelOpen: boolean;
  
  // Actions
  setPageConfig: (config: Partial<PageConfig>) => void;
  setFrame1Style: (style: Partial<FrameStyle>) => void;
  setFrame2Style: (style: Partial<FrameStyle>) => void;
  setContent1: (text: string) => void;
  setContent2: (text: string) => void;
  setCalibration: (config: Partial<CalibrationConfig>) => void;
  setView: (config: Partial<ViewConfig>) => void;
  toggleCalibration: (isOpen: boolean) => void;
  toggleControlPanel: (isOpen?: boolean) => void;
}