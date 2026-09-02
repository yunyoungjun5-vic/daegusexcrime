import React, { useState, useEffect } from 'react';
import { X, CalendarCheck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPopupProps {
  reservationUrl?: string;
  onOpenReservation?: () => void;
}

const POPUP_IMAGE_URL = "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788071556/ChatGPT_Image_2026%EB%85%84_8%EC%9B%94_30%EC%9D%BC_%EC%98%A4%ED%9B%84_03_32_27_mbwtdh.png";
const STORAGE_KEY = "daegu_center_popup_hide_date";

export default function LandingPopup({
  reservationUrl = "https://map.naver.com/p/entry/place/2033439050?placePath=/home?fromPanelNum=1&additionalHeight=76&timestamp=202603231547&locale=ko&svcName=map_pcv5&fromPanelNum=1&additionalHeight=76&timestamp=202603231041&locale=ko&svcName=map_pcv5&from=map&searchType=place&lng=128.5268783&lat=35.8601957&c=20.00,0,0,2,dh",
  onOpenReservation
}: LandingPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTodayString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    try {
      const hiddenDate = localStorage.getItem(STORAGE_KEY);
      const today = getTodayString();
      
      // If not hidden for today, open the popup after slight delay for smooth mounting
      if (hiddenDate !== today) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 150);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // In case localStorage is disabled/restricted, default to showing
      setIsOpen(true);
    }
  }, []);

  // Handle standard close
  const handleClose = () => {
    setIsOpen(false);
  };

  // Handle "오늘 하루 보지 않기"
  const handleDoNotShowToday = () => {
    try {
      localStorage.setItem(STORAGE_KEY, getTodayString());
    } catch (e) {
      console.error(e);
    }
    setIsOpen(false);
  };

  // Handle reservation navigation
  const handleReservationClick = () => {
    if (onOpenReservation) {
      onOpenReservation();
    } else {
      window.open(reservationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="landing-popup-container"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            id="landing-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            aria-label="팝업 닫기 배경"
          />

          {/* Popup Card */}
          <motion.div
            id="landing-popup-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="landing-popup-title"
            className="relative w-full max-w-[380px] sm:max-w-[440px] md:max-w-[480px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col z-10 max-h-[90vh] my-auto"
          >
            {/* Top Bar with Quick Close Icon */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
              <button
                id="landing-popup-top-close-btn"
                onClick={handleClose}
                aria-label="창 닫기"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md active:scale-95"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Image Container - Clickable to go to reservation */}
            <div 
              id="landing-popup-image-wrapper"
              onClick={handleReservationClick}
              className="relative w-full overflow-hidden bg-slate-100 cursor-pointer group flex items-center justify-center"
            >
              {!imageLoaded && (
                <div className="w-full aspect-[4/5] flex items-center justify-center bg-slate-100 animate-pulse text-slate-400 text-xs font-medium">
                  이미지 로딩 중...
                </div>
              )}
              <img
                id="landing-popup-banner-image"
                src={POPUP_IMAGE_URL}
                alt="대구성범죄심리상담치료센터 안내 팝업"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-auto max-h-[58vh] sm:max-h-[60vh] object-contain transition-transform duration-500 group-hover:scale-[1.01] ${imageLoaded ? 'block' : 'hidden'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Action Button: 상담예약하러 가기 */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
              <a
                id="landing-popup-reservation-btn"
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onOpenReservation) {
                    e.preventDefault();
                    onOpenReservation();
                  }
                }}
                className="w-full min-h-[48px] sm:min-h-[52px] px-4 py-3 bg-[#1565C0] hover:bg-[#0D47A1] active:bg-[#0B3D91] text-white font-black text-[15px] sm:text-[16px] rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.98] tracking-tight text-center"
              >
                <CalendarCheck className="w-5 h-5 text-blue-200 shrink-0" />
                <span>상담예약하러 가기</span>
                <ExternalLink className="w-4 h-4 text-blue-200/80 ml-0.5 shrink-0" />
              </a>
            </div>

            {/* Bottom Controls: 오늘 하루 보지 않기 & 창 닫기 */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-50 border-t border-slate-200/80 text-xs sm:text-sm font-medium text-slate-600 select-none">
              <button
                id="landing-popup-do-not-show-today-btn"
                type="button"
                onClick={handleDoNotShowToday}
                className="flex items-center gap-2 py-1.5 px-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 active:bg-slate-200 transition-colors"
              >
                <span className="w-4 h-4 rounded border border-slate-400 flex items-center justify-center bg-white text-slate-600">
                  <span className="w-2 h-2 rounded-sm bg-transparent group-hover:bg-slate-400"></span>
                </span>
                <span className="font-medium text-slate-700">오늘 하루 보지 않기</span>
              </button>

              <button
                id="landing-popup-close-btn"
                type="button"
                onClick={handleClose}
                className="py-1.5 px-3 rounded-lg font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 active:bg-slate-200 transition-colors"
              >
                창 닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
