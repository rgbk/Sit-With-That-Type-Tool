import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Canvas } from './components/Canvas';
import { CalibrationModal } from './components/CalibrationModal';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-[#111]">
      <CalibrationModal />
      <ControlPanel />
      <Canvas />
    </div>
  );
};

export default App;
