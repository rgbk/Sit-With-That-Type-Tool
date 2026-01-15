import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { Page } from './Page';

// Simple drag hook to avoid external dependencies in preview
const usePan = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;
    
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return { offset, bind: { onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseLeave }, isDragging, reset };
};

export const Canvas: React.FC = () => {
  const { view, isControlPanelOpen, toggleControlPanel } = useStore();
  const { offset, bind, isDragging, reset } = usePan();
  const containerRef = useRef<HTMLDivElement>(null);

  // Center button handler
  const handleCenter = () => {
    reset();
  };

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col h-full" style={{ backgroundColor: view.backgroundColor }}>
      {/* Toolbar overlay */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        {!isControlPanelOpen && (
          <button 
            onClick={() => toggleControlPanel(true)}
            className="bg-black/80 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-black transition shadow-sm border border-white/10 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
            Settings
          </button>
        )}
        <button 
          onClick={handleCenter}
          className="bg-black/80 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-black transition shadow-sm border border-white/10"
        >
          Center Page
        </button>
      </div>

      <div 
        ref={containerRef}
        className={`w-full h-full flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        {...bind}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) rotate(${view.rotated ? 90 : 0}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            transformOrigin: 'center center',
          }}
        >
          <Page />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 pointer-events-none text-xs text-white/50">
        Drag to pan • 1:1 Scale
      </div>
    </div>
  );
};