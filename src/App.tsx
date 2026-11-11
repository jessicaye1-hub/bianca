/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  Grid,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

export default function App() {
  // Page state: 1 or 2
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Presentation settings for the wireframe canvas
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showDeviceChassis, setShowDeviceChassis] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(0.9);

  // Navigate forward to Page 2
  const handleAvanti = () => {
    setDirection('forward');
    setCurrentPage(2);
  };

  // Navigate backward to Page 1
  const handleIndietro = () => {
    setDirection('backward');
    setCurrentPage(1);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentPage === 1) handleAvanti();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'Escape') {
        if (currentPage === 2) handleIndietro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Page slide animations (push/pop effect)
  const variants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? 390 : -390,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? -390 : 390,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans select-none overflow-x-hidden">
      {/* Wireframe Canvas Top Header */}
      <header className="border-b-2 border-black bg-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 z-30">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-black flex items-center justify-center font-mono font-bold text-xs bg-black text-white">
            W
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider uppercase font-mono">
              Wireframe Prototype · iPhone 14
            </h1>
            <p className="text-xs text-neutral-500 font-mono">
              Dimensioni: 390 × 844 px · Monocromatico B&amp;W
            </p>
          </div>
        </div>

        {/* Status indicator & Controls */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
          <div className="border border-black px-2.5 py-1 bg-neutral-100 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
            <span>PAGINA {currentPage} DI 2</span>
          </div>

          <div className="hidden md:flex items-center border border-black divide-x divide-black bg-white">
            <button
              onClick={() => setScale(0.75)}
              className={`px-2 py-1 transition-colors ${scale === 0.75 ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
              title="Scala 75%"
            >
              75%
            </button>
            <button
              onClick={() => setScale(0.9)}
              className={`px-2 py-1 transition-colors ${scale === 0.9 ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
              title="Scala 90%"
            >
              90%
            </button>
            <button
              onClick={() => setScale(1.0)}
              className={`px-2 py-1 transition-colors ${scale === 1.0 ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
              title="Scala 100%"
            >
              100%
            </button>
          </div>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`border border-black px-2.5 py-1 flex items-center gap-1.5 transition-colors ${
              showGrid ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
            }`}
            title="Mostra/Nascondi griglia di layout wireframe"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Griglia</span>
          </button>

          <button
            onClick={() => setShowDeviceChassis(!showDeviceChassis)}
            className={`border border-black px-2.5 py-1 flex items-center gap-1.5 transition-colors ${
              showDeviceChassis ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
            }`}
            title="Alterna cornice iPhone 14"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chassis</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Workspace */}
      <main
        className={`flex-1 flex items-center justify-center p-4 sm:p-8 relative overflow-auto ${
          showGrid ? 'bg-wireframe-grid' : 'bg-neutral-50'
        }`}
      >
        {/* Subtle Canvas Wireframe Ruler Markings */}
        <div className="absolute top-2 left-4 text-[10px] font-mono text-neutral-400 pointer-events-none hidden lg:block">
          (X: 0, Y: 0) · Viewport Target: iPhone 14 [390 × 844 pt]
        </div>

        {/* Outer Phone Container with scaling */}
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          className="transition-transform duration-200 my-auto py-2"
        >
          {/* Wireframe iPhone 14 Device */}
          <div
            className={`relative mx-auto transition-all duration-300 ${
              showDeviceChassis
                ? 'w-[416px] h-[870px] bg-white border-4 border-black rounded-[54px] shadow-[12px_12px_0px_0px_#000000] p-[10px]'
                : 'w-[390px] h-[844px] bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000000]'
            }`}
          >
            {/* Physical Hardware details (Buttons on Chassis) */}
            {showDeviceChassis && (
              <>
                {/* Left Side Buttons: Mute Switch & Volume */}
                <div className="absolute -left-[9px] top-[115px] w-[6px] h-[26px] bg-black rounded-l-sm" />
                <div className="absolute -left-[9px] top-[160px] w-[6px] h-[50px] bg-black rounded-l-sm" />
                <div className="absolute -left-[9px] top-[225px] w-[6px] h-[50px] bg-black rounded-l-sm" />

                {/* Right Side Button: Power / Lock */}
                <div className="absolute -right-[9px] top-[180px] w-[6px] h-[75px] bg-black rounded-r-sm" />

                {/* Subtle speaker slit top */}
                <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-black rounded-full z-30" />
              </>
            )}

            {/* iPhone 14 Screen (Exact 390px × 844px) */}
            <div
              className={`w-[390px] h-[844px] bg-white overflow-hidden relative flex flex-col ${
                showDeviceChassis ? 'border-2 border-black rounded-[44px]' : ''
              }`}
            >
              {/* iPhone 14 Top Notch (Classic Wireframe Notch) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-[20px] z-30 flex items-center justify-center">
                {/* Camera lens & sensor wireframe hints */}
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full border border-neutral-600 bg-neutral-900" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                </div>
              </div>

              {/* Status Bar */}
              <div className="w-full h-[48px] px-7 pt-3.5 flex items-center justify-between text-black font-semibold text-xs tracking-tight z-20 shrink-0">
                <span className="font-mono">9:41</span>
                <div className="flex items-center gap-2">
                  <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
                  <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                  <div className="flex items-center gap-0.5">
                    <Battery className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Wireframe Screen Content Area (Empty pages with single button each) */}
              <div className="flex-1 relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  {currentPage === 1 ? (
                    /* PAGINA 1: completamente vuota, solo un bottone con scritto "avanti" */
                    <motion.div
                      key="page-1"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-6"
                    >
                      {/* Only button with text "avanti" */}
                      <button
                        onClick={handleAvanti}
                        className="group relative px-10 py-4 bg-white text-black font-mono font-bold text-lg tracking-wider uppercase border-2 border-black wireframe-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center gap-3"
                        aria-label="Vai a Pagina 2"
                      >
                        <span>avanti</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  ) : (
                    /* PAGINA 2: completamente vuota, solo un bottone con scritto "indietro" */
                    <motion.div
                      key="page-2"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-6"
                    >
                      {/* Only button with text "indietro" */}
                      <button
                        onClick={handleIndietro}
                        className="group relative px-10 py-4 bg-white text-black font-mono font-bold text-lg tracking-wider uppercase border-2 border-black wireframe-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center gap-3"
                        aria-label="Torna a Pagina 1"
                      >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span>indietro</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* iPhone 14 Bottom Home Indicator */}
              <div className="w-full pb-3 flex justify-center z-20 shrink-0">
                <div className="w-36 h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Wireframe Bottom Toolbar / Flow Guide */}
      <footer className="border-t-2 border-black bg-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-600 gap-2 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-black">FLUSSO NAVIGAZIONE:</span>
            <span className={currentPage === 1 ? 'font-bold text-black underline' : 'text-neutral-400'}>
              [Pagina 1: avanti]
            </span>
            <span>⇄</span>
            <span className={currentPage === 2 ? 'font-bold text-black underline' : 'text-neutral-400'}>
              [Pagina 2: indietro]
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-neutral-500">
          <span>Scorciatoie: [→ / Invio] = Avanti · [← / Esc] = Indietro</span>
          <button
            onClick={() => {
              setCurrentPage(1);
              setDirection('backward');
            }}
            className="hover:text-black flex items-center gap-1 border border-neutral-300 px-2 py-0.5 rounded-none"
            title="Reimposta a Pagina 1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
