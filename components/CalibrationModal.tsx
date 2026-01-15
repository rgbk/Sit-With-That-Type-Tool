import React from 'react';
import { useStore } from '../store';
import { mmToPx } from '../utils';

export const CalibrationModal: React.FC = () => {
  const { isCalibrationOpen, calibration, setCalibration, toggleCalibration, page } = useStore();

  if (!isCalibrationOpen) return null;

  // Credit Card ISO 7810 ID-1 size
  const CARD_WIDTH_MM = 85.6;
  const CARD_HEIGHT_MM = 53.98;

  const cardWidthPx = mmToPx(CARD_WIDTH_MM, calibration);
  const cardHeightPx = mmToPx(CARD_HEIGHT_MM, calibration);

  const pageWidthPx = mmToPx(page.widthMm, calibration);
  const pageHeightPx = mmToPx(page.heightMm, calibration);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalibration({ pixelsPerInch: parseFloat(e.target.value) });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-8 text-white">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Screen Calibration</h2>
        <p className="text-gray-400 mb-8 text-center max-w-lg">
          To view your design at 1:1 true scale, please hold a standard Credit Card or your physical paper against the screen and adjust the slider below until they match perfectly.
        </p>

        {/* Controls */}
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg mb-10 shadow-lg border border-gray-700">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
             <span>Scale (PPI)</span>
             <span>{Math.round(calibration.pixelsPerInch)} px/in</span>
          </div>
          <input 
            type="range" 
            min="72" 
            max="300" 
            step="0.5"
            value={calibration.pixelsPerInch}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-2">
            <span>Low Res (72)</span>
            <span>Standard (96)</span>
            <span>Retina (~220)</span>
            <span>High Density (300)</span>
          </div>
        </div>

        {/* Reference Objects */}
        <div className="flex gap-16 items-end mb-12">
          
          {/* Credit Card Ref */}
          <div className="flex flex-col items-center gap-2">
            <div 
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-xl relative border border-white/20"
              style={{ width: cardWidthPx, height: cardHeightPx }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-red-900 font-bold opacity-30 text-lg uppercase tracking-widest rotate-[-15deg]">
                Credit Card
              </div>
            </div>
            <span className="text-xs text-red-400 font-mono">85.6mm</span>
          </div>

          {/* Page Width Ref */}
          <div className="flex flex-col items-center gap-2">
             <div 
                className="border-2 border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                style={{ width: pageWidthPx, height: Math.min(pageHeightPx, 400) /* Cap height for modal */ }}
             >
                <div className="w-full h-full flex items-center justify-center text-blue-300 font-mono text-xs">
                   Current Page Width
                </div>
             </div>
             <span className="text-xs text-blue-400 font-mono">{page.widthMm}mm</span>
          </div>

        </div>

        <button 
          onClick={() => toggleCalibration(false)}
          className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition active:scale-95"
        >
          Calibration Complete
        </button>
      </div>
    </div>
  );
};
