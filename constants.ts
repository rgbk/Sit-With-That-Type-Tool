import { FontFamily, TextAlign, TextCase, AppState } from './types';

export const DEFAULT_CONTENT_1 = "UNTITLED, 2023\nALESSANDRO FURCHINO CAPRIA";

export const DEFAULT_CONTENT_2 = `As we see it, there's quite a gulf between Saying vs Doing when it comes to "TO PUT YOUR FEET UP".

"TO PUT YOUR FEET UP" (Saying) sort of retains this almost midcentury patriarchal Man's Relaxation energy – it's Tidiness, it's Respectability, it's a Very Nice Ottoman. It's "YOU PUT YOUR FEET UP, LET ME TAKE CARE OF THINGS."

AND YET, the true NEED of PUTTING YOUR FEET UP is because you're probably f*cking drained. It's slouchy-socked, it's a face-first FLOP onto sofa. It's not permitted, it's required. That is the real, honest, putting of one's feet up (the Doing).`;

export const INITIAL_STATE: Omit<AppState, 'setPageConfig' | 'setFrame1Style' | 'setFrame2Style' | 'setContent1' | 'setContent2' | 'setCalibration' | 'setView' | 'toggleCalibration' | 'toggleControlPanel'> = {
  page: {
    widthMm: 160,
    heightMm: 220,
    marginTopMm: 10,
    marginRightMm: 10,
    marginBottomMm: 10,
    marginLeftMm: 10,
    columns: 7,
    gutterMm: 0,
  },
  frame1: {
    fontFamily: FontFamily.MonumentGrotesk,
    fontWeight: '500',
    fontStyle: 'normal',
    fontSizePt: 14,
    leadingPt: 16.8,
    tracking: 0,
    textCase: TextCase.Uppercase,
    alignment: TextAlign.Left,
    heightMm: 25,
  },
  frame2: {
    fontFamily: FontFamily.Marist,
    fontWeight: '400',
    fontStyle: 'normal',
    fontSizePt: 12,
    leadingPt: 14.4,
    tracking: 0,
    textCase: TextCase.Normal,
    alignment: TextAlign.Left,
  },
  content1: DEFAULT_CONTENT_1,
  content2: DEFAULT_CONTENT_2,
  calibration: {
    // 128 is a reasonable guess for high-dpi screens (approx 1.33x standard 96dpi)
    // The user will calibrate this to be exact.
    pixelsPerInch: 128, 
  },
  view: {
    rotated: true,
    showMargins: true,
    showColumns: true,
    showBaseline: false,
    guideColor: '#00FFFF', // Cyan
    backgroundColor: '#808080',
  },
  isCalibrationOpen: false,
  isControlPanelOpen: true,
};