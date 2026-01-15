import React from 'react';
import { PageConfig, ViewConfig, CalibrationConfig, FrameStyle } from '../types';
import { mmToPx, ptToPx } from '../utils';

interface GuidesProps {
  page: PageConfig;
  view: ViewConfig;
  calibration: CalibrationConfig;
  baseLeadingPt: number; 
}

export const Guides: React.FC<GuidesProps> = ({ page, view, calibration, baseLeadingPt }) => {
  const { widthMm, heightMm, marginTopMm, marginRightMm, marginBottomMm, marginLeftMm, columns, gutterMm } = page;
  
  if (!view.showMargins && !view.showColumns && !view.showBaseline) return null;

  const widthPx = mmToPx(widthMm, calibration);
  const heightPx = mmToPx(heightMm, calibration);
  
  const marginTopPx = mmToPx(marginTopMm, calibration);
  const marginRightPx = mmToPx(marginRightMm, calibration);
  const marginBottomPx = mmToPx(marginBottomMm, calibration);
  const marginLeftPx = mmToPx(marginLeftMm, calibration);

  // Column Calculations
  const contentWidthPx = widthPx - marginLeftPx - marginRightPx;
  const gutterPx = mmToPx(gutterMm, calibration);
  const totalGutterWidth = gutterPx * (columns - 1);
  const columnWidthPx = (contentWidthPx - totalGutterWidth) / columns;

  // Baseline Grid
  const baselinePx = ptToPx(baseLeadingPt, calibration);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Margins */}
      {view.showMargins && (
        <>
          {/* Top Line */}
          <div style={{ position: 'absolute', top: marginTopPx, left: 0, right: 0, height: 1, backgroundColor: view.guideColor, opacity: 0.5 }} />
          {/* Bottom Line */}
          <div style={{ position: 'absolute', bottom: marginBottomPx, left: 0, right: 0, height: 1, backgroundColor: view.guideColor, opacity: 0.5 }} />
          {/* Left Line */}
          <div style={{ position: 'absolute', left: marginLeftPx, top: 0, bottom: 0, width: 1, backgroundColor: view.guideColor, opacity: 0.5 }} />
          {/* Right Line */}
          <div style={{ position: 'absolute', right: marginRightPx, top: 0, bottom: 0, width: 1, backgroundColor: view.guideColor, opacity: 0.5 }} />
        </>
      )}

      {/* Columns */}
      {view.showColumns && (
        <div 
          style={{ 
            position: 'absolute', 
            top: marginTopPx, 
            bottom: marginBottomPx, 
            left: marginLeftPx, 
            width: contentWidthPx,
            display: 'flex',
            gap: gutterPx
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                backgroundColor: view.guideColor, 
                opacity: 0.1 
              }} 
            />
          ))}
        </div>
      )}

      {/* Baseline Grid */}
      {view.showBaseline && (
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to bottom, ${view.guideColor} 1px, transparent 1px)`,
            backgroundSize: `100% ${baselinePx}px`,
            backgroundPosition: `0 ${marginTopPx}px`, // Start grid at top margin
            opacity: 0.3
          }} 
        />
      )}
    </div>
  );
};
