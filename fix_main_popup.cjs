const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('createPortal')) {
  if (code.includes("from 'react-dom'")) {
     code = code.replace(/import {([^}]+)} from 'react-dom';/, "import { $1, createPortal } from 'react-dom';");
  } else {
     code = code.replace(/import React, {([^}]+)} from 'react';/, "import React, { $1 } from 'react';\nimport { createPortal } from 'react-dom';");
  }
}

const replacement = `const MainPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Use a new key to force it to show up if the old one was buggy
    const hideUntil = localStorage.getItem('hidePopupUntil_v2');
    if (hideUntil && new Date().getTime() < parseInt(hideUntil, 10)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closePopup = () => setIsOpen(false);

  const hideForToday = () => {
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const hideUntil = new Date().getTime() + twentyFourHours;
    localStorage.setItem('hidePopupUntil_v2', hideUntil.toString());
    setIsOpen(false);
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 lg:p-6" 
      style={{ zIndex: 999999, position: 'fixed' }} 
      onClick={closePopup}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-[520px] max-h-[90vh] overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white flex justify-end p-2 shrink-0">
          <button 
            onClick={closePopup}
            className="w-8 h-8 flex items-center justify-center text-slate-900 hover:text-indigo-900 transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto w-full flex-grow flex items-center justify-center bg-white">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1787966113/ChatGPT_Image_2026%EB%85%84_8%EC%9B%94_29%EC%9D%BC_%EC%98%A4%EC%A0%84_10_10_01_kt4rmd.png" 
            alt="안내 팝업" 
            className="w-full h-auto object-contain block m-0 p-0"
          />
        </div>
        <div className="bg-white border-t border-slate-100 flex items-center justify-between px-5 py-4 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
              onChange={hideForToday}
            />
            <span className="text-[13px] lg:text-sm font-medium">오늘 하루 보지 않기</span>
          </label>
          <button 
            onClick={closePopup}
            className="text-[13px] lg:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            닫기
          </button>
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};`;

if (code.includes('const MainPopup = () => {')) {
  const startIdx = code.indexOf('const MainPopup = () => {');
  const endIdx = code.indexOf('const Home = () => (', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    const oldPopup = code.substring(startIdx, endIdx);
    code = code.replace(oldPopup, replacement + '\n\n');
    fs.writeFileSync('src/App.tsx', code);
    console.log("Replaced via index");
  } else {
    console.log("Failed to find boundaries");
  }
}
