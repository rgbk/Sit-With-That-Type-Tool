import React from 'react';
import { useStore } from '../store';
import { mmToPx, ptToPx, trackingToEm } from '../utils';
import { Guides } from './Guides';
import { FrameStyle } from '../types';

export const Page: React.FC = () => {
  const { page, frame1, frame2, content1, content2, calibration, view } = useStore();

  const widthPx = mmToPx(page.widthMm, calibration);
  const heightPx = mmToPx(page.heightMm, calibration);
  
  const marginTopPx = mmToPx(page.marginTopMm, calibration);
  const marginLeftPx = mmToPx(page.marginLeftMm, calibration);
  const marginRightPx = mmToPx(page.marginRightMm, calibration);
  const marginBottomPx = mmToPx(page.marginBottomMm, calibration);

  const contentWidthPx = widthPx - marginLeftPx - marginRightPx;
  const frame1HeightPx = mmToPx(frame1.heightMm || 0, calibration);
  
  // Calculate remaining height for frame 2
  const contentHeightPx = heightPx - marginTopPx - marginBottomPx;
  const frame2HeightPx = contentHeightPx - frame1HeightPx;

  const getTextStyle = (style: FrameStyle) => {
    const fontSizePx = ptToPx(style.fontSizePt, calibration);
    
    // Calculate leading in pixels or unitless
    let lineHeight: string | number;
    if (style.leadingPt === 'auto') {
      lineHeight = 1.2;
    } else {
      lineHeight = `${ptToPx(style.leadingPt, calibration)}px`;
    }

    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontStyle: style.fontStyle,
      fontSize: `${fontSizePx}px`,
      lineHeight: lineHeight,
      letterSpacing: `${trackingToEm(style.tracking)}em`,
      textTransform: style.textCase,
      textAlign: style.alignment,
      color: 'black', // Print is typically black
    } as React.CSSProperties;
  };

  return (
    <div 
      className="bg-white relative shadow-2xl origin-center"
      style={{
        width: widthPx,
        height: heightPx,
        // If rotated, we rotate the container in the Canvas, not here, 
        // to maintain logical coordinate systems for text flow.
      }}
    >
      <Guides 
        page={page} 
        view={view} 
        calibration={calibration} 
        baseLeadingPt={typeof frame2.leadingPt === 'number' ? frame2.leadingPt : frame2.fontSizePt * 1.2}
      />

      {/* Content Container respecting margins */}
      <div 
        style={{
          position: 'absolute',
          top: marginTopPx,
          left: marginLeftPx,
          width: contentWidthPx,
          height: contentHeightPx,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Frame 1: Header */}
        <div 
          style={{
            height: frame1HeightPx,
            width: '100%',
            overflow: 'hidden', // Text shouldn't visually spill out of its allocated area
            ...getTextStyle(frame1)
          }}
        >
          <div style={{ whiteSpace: 'pre-wrap' }}>{content1}</div>
        </div>

        {/* Frame 2: Body */}
        <div 
          style={{
            height: frame2HeightPx,
            width: '100%',
            overflow: 'hidden',
            ...getTextStyle(frame2)
          }}
        >
           <div style={{ whiteSpace: 'pre-wrap' }}>{content2}</div>
        </div>
      </div>
    </div>
  );
};
