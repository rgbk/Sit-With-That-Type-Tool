import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { FontFamily, TextCase, TextAlign, FrameStyle } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 border-b border-gray-700 pb-1 mt-6 first:mt-0">
    {children}
  </h3>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs text-gray-300 mb-1">{children}</label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props} 
    className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none" 
  />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select 
    {...props} 
    className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none"
  />
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea 
    {...props} 
    className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none resize-y min-h-[80px]" 
  />
);

const FrameControls: React.FC<{ 
  label: string; 
  frame: FrameStyle; 
  onChange: (s: Partial<FrameStyle>) => void; 
  showHeight?: boolean; 
}> = ({ label, frame, onChange, showHeight }) => {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold text-blue-400 mb-2">{label}</div>
      
      <div className="grid grid-cols-1 gap-2 mb-2">
        <div>
          <Label>Font Family</Label>
          <Select 
            value={frame.fontFamily} 
            onChange={(e) => onChange({ fontFamily: e.target.value as FontFamily })}
          >
            <option value={FontFamily.MonumentGrotesk}>ABC Monument Grotesk</option>
            <option value={FontFamily.Marist}>ABC Marist</option>
            <option value={FontFamily.MaristBook}>ABC Marist Book</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <Label>Weight</Label>
          <Select 
            value={frame.fontWeight} 
            onChange={(e) => onChange({ fontWeight: e.target.value })}
          >
            <option value="400">Regular / Book</option>
            <option value="500">Medium</option>
          </Select>
        </div>
        <div>
          <Label>Style</Label>
          <Select 
            value={frame.fontStyle} 
            onChange={(e) => onChange({ fontStyle: e.target.value as 'normal' | 'italic' })}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <Label>Size (pt)</Label>
          <Input 
            type="number" 
            step="0.1"
            value={frame.fontSizePt} 
            onChange={(e) => onChange({ fontSizePt: parseFloat(e.target.value) })} 
          />
        </div>
        <div>
          <Label>Leading (pt)</Label>
          <div className="flex">
            <Input 
              type="text" 
              value={frame.leadingPt === 'auto' ? 'Auto' : frame.leadingPt} 
              onChange={(e) => {
                const val = e.target.value;
                if (val.toLowerCase() === 'auto') onChange({ leadingPt: 'auto' });
                else onChange({ leadingPt: parseFloat(val) || 'auto' });
              }} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <Label>Tracking (1/1000 em)</Label>
          <Input 
            type="number" 
            value={frame.tracking} 
            onChange={(e) => onChange({ tracking: parseFloat(e.target.value) })} 
          />
        </div>
        <div>
           <Label>Case</Label>
           <Select value={frame.textCase} onChange={(e) => onChange({ textCase: e.target.value as TextCase })}>
             <option value={TextCase.Normal}>Normal</option>
             <option value={TextCase.Uppercase}>UPPERCASE</option>
             <option value={TextCase.Lowercase}>lowercase</option>
             <option value={TextCase.TitleCase}>Title Case</option>
           </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
           <Label>Alignment</Label>
           <Select value={frame.alignment} onChange={(e) => onChange({ alignment: e.target.value as TextAlign })}>
             <option value={TextAlign.Left}>Left</option>
             <option value={TextAlign.Center}>Center</option>
             <option value={TextAlign.Right}>Right</option>
             <option value={TextAlign.Justify}>Justified</option>
           </Select>
        </div>
        {showHeight && (
          <div>
            <Label>Height (mm)</Label>
            <Input 
              type="number" 
              value={frame.heightMm} 
              onChange={(e) => onChange({ heightMm: parseFloat(e.target.value) })} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const ControlPanel: React.FC = () => {
  const store = useStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error("Fullscreen error:", e);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  const handleExport = () => {
    const exportData = {
      pageSize: { width: `${store.page.widthMm}mm`, height: `${store.page.heightMm}mm` },
      margins: { 
        top: `${store.page.marginTopMm}mm`, 
        right: `${store.page.marginRightMm}mm`, 
        bottom: `${store.page.marginBottomMm}mm`, 
        left: `${store.page.marginLeftMm}mm` 
      },
      columns: store.page.columns,
      gutter: `${store.page.gutterMm}mm`,
      frame1: store.frame1,
      frame2: store.frame2
    };
    
    // Create a blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sit-with-that-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyInDesign = () => {
    const text = `
=== FRAME 1 (Header) ===
Font: ${store.frame1.fontFamily} ${store.frame1.fontWeight}${store.frame1.fontStyle === 'italic' ? ' Italic' : ''}
Size: ${store.frame1.fontSizePt}pt
Leading: ${store.frame1.leadingPt}pt
Tracking: ${store.frame1.tracking}
Case: ${store.frame1.textCase}
Alignment: ${store.frame1.alignment}
Height: ${store.frame1.heightMm}mm

=== FRAME 2 (Body) ===
Font: ${store.frame2.fontFamily} ${store.frame2.fontWeight}${store.frame2.fontStyle === 'italic' ? ' Italic' : ''}
Size: ${store.frame2.fontSizePt}pt
Leading: ${store.frame2.leadingPt}pt
Tracking: ${store.frame2.tracking}
Case: ${store.frame2.textCase}
Alignment: ${store.frame2.alignment}

=== LAYOUT ===
Page: ${store.page.widthMm} × ${store.page.heightMm}mm
Margins: T${store.page.marginTopMm} R${store.page.marginRightMm} B${store.page.marginBottomMm} L${store.page.marginLeftMm} mm
Columns: ${store.page.columns}, Gutter: ${store.page.gutterMm}mm
`.trim();

    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
  };

  return (
    <div 
      className={`h-full bg-[#222] border-r border-[#333] overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out ${
        store.isControlPanelOpen ? 'w-[320px] p-4' : 'w-0 p-0 overflow-hidden border-none'
      }`}
    >
      <div className={`${store.isControlPanelOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 delay-100 min-w-[280px]`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-sm font-bold text-white tracking-wide">SIT WITH THAT — TYPE TOOL</h1>
          <button 
            onClick={() => store.toggleControlPanel(false)} 
            className="text-gray-500 hover:text-white p-1 rounded hover:bg-white/10 transition"
            title="Hide Controls"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        </div>
        
        <SectionTitle>View & Calibration</SectionTitle>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="col-span-2 flex gap-2">
            <div className="flex-1 flex items-center justify-between bg-[#1a1a1a] p-2 rounded border border-gray-700">
              <span className="text-xs text-white">Rotate 90°</span>
              <input 
                type="checkbox" 
                checked={store.view.rotated} 
                onChange={(e) => store.setView({ rotated: e.target.checked })} 
                className="cursor-pointer"
              />
            </div>
            <button 
              onClick={toggleFullscreen}
              className={`flex-1 flex items-center justify-center p-2 rounded border transition text-xs ${
                isFullscreen 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-[#1a1a1a] border-gray-700 text-gray-300 hover:text-white'
              }`}
              title="Toggle Fullscreen"
            >
              {isFullscreen ? 'Exit Full' : 'Fullscreen'}
            </button>
          </div>
          
          <div className="col-span-2">
            <Label>Screen Calibration</Label>
            <button 
              onClick={() => store.toggleCalibration(true)}
              className="w-full bg-[#333] hover:bg-[#444] text-white text-xs py-2 rounded border border-gray-600 transition flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Calibrate Scale ({Math.round(store.calibration.pixelsPerInch)} PPI)
            </button>
          </div>

          <div className="col-span-2 mt-1">
            <Label>Background</Label>
            <div className="flex h-[26px]">
                <input 
                  type="color" 
                  value={store.view.backgroundColor}
                  onChange={(e) => store.setView({ backgroundColor: e.target.value })}
                  className="w-full h-full p-0 border-0 rounded"
                />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 text-[10px] text-gray-500 mb-6">
          <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={store.view.showMargins} onChange={e => store.setView({ showMargins: e.target.checked})} /> Margins
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={store.view.showColumns} onChange={e => store.setView({ showColumns: e.target.checked})} /> Cols
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={store.view.showBaseline} onChange={e => store.setView({ showBaseline: e.target.checked})} /> Baseline
          </label>
        </div>

        <SectionTitle>Layout (mm)</SectionTitle>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
              <Label>Page W</Label>
              <Input type="number" value={store.page.widthMm} onChange={(e) => store.setPageConfig({ widthMm: parseFloat(e.target.value) })} />
          </div>
          <div>
              <Label>Page H</Label>
              <Input type="number" value={store.page.heightMm} onChange={(e) => store.setPageConfig({ heightMm: parseFloat(e.target.value) })} />
          </div>
          <div className="col-span-2 mt-2">
              <Label>Margins (T / R / B / L)</Label>
              <div className="grid grid-cols-4 gap-1">
                <Input value={store.page.marginTopMm} onChange={(e) => store.setPageConfig({ marginTopMm: parseFloat(e.target.value) })} />
                <Input value={store.page.marginRightMm} onChange={(e) => store.setPageConfig({ marginRightMm: parseFloat(e.target.value) })} />
                <Input value={store.page.marginBottomMm} onChange={(e) => store.setPageConfig({ marginBottomMm: parseFloat(e.target.value) })} />
                <Input value={store.page.marginLeftMm} onChange={(e) => store.setPageConfig({ marginLeftMm: parseFloat(e.target.value) })} />
              </div>
          </div>
          <div className="mt-2">
              <Label>Columns</Label>
              <Input type="number" value={store.page.columns} onChange={(e) => store.setPageConfig({ columns: parseInt(e.target.value) })} />
          </div>
          <div className="mt-2">
              <Label>Gutter</Label>
              <Input type="number" value={store.page.gutterMm} onChange={(e) => store.setPageConfig({ gutterMm: parseFloat(e.target.value) })} />
          </div>
        </div>

        <SectionTitle>Typography</SectionTitle>
        
        <FrameControls 
          label="Frame 1: Header" 
          frame={store.frame1} 
          onChange={store.setFrame1Style} 
          showHeight
        />
        
        <div className="mb-6">
          <Label>Header Text</Label>
          <TextArea value={store.content1} onChange={(e) => store.setContent1(e.target.value)} />
        </div>

        <hr className="border-gray-700 my-6" />

        <FrameControls 
          label="Frame 2: Body" 
          frame={store.frame2} 
          onChange={store.setFrame2Style} 
        />

        <div className="mb-6">
          <Label>Body Text</Label>
          <TextArea 
            value={store.content2} 
            onChange={(e) => store.setContent2(e.target.value)} 
            rows={6}
          />
        </div>

        <SectionTitle>Export</SectionTitle>
        <div className="flex gap-2 mt-2 mb-8">
          <button onClick={handleExport} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded transition">
              Export JSON
          </button>
          <button onClick={handleCopyInDesign} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs py-2 rounded transition">
              Copy InDesign
          </button>
        </div>
      </div>
    </div>
  );
};