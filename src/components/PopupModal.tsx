import React, { useState, useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';

interface PopupModalProps {
  imageUrl?: string;
  consultUrl?: string;
}

const DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788071556/ChatGPT_Image_2026%EB%85%84_8%EC%9B%94_30%EC%9D%BC_%EC%98%A4%ED%9B%84_03_32_27_mbwtdh.png';

const DEFAULT_CONSULT_URL =
  'https://map.naver.com/p/entry/place/2033439050?placePath=/home?fromPanelNum=1&additionalHeight=76&timestamp=202603231547&locale=ko&svcName=map_pcv5&fromPanelNum=1&additionalHeight=76&timestamp=202603231041&locale=ko&svcName=map_pcv5&from=map&searchType=place&lng=128.5268783&lat=35.8601957&c=20.00,0,0,2,dh';

const STORAGE_KEY = 'hide_notice_popup_until';

export const PopupModal: React.FC<PopupModalProps> = ({
  imageUrl = DEFAULT_IMAGE_URL,
  consultUrl = DEFAULT_CONSULT_URL,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShowToday, setDoNotShowToday] = useState(false);

  // 1. Initial check using localStorage inside useEffect (SSR / Hydration safe)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const hideUntilStr = window.localStorage.getItem(STORAGE_KEY);
        if (hideUntilStr) {
          const hideUntil = parseInt(hideUntilStr, 10);
          if (!isNaN(hideUntil) && Date.now() < hideUntil) {
            // Still within 24 hours suppression period
            return;
          }
        }
      }
      setIsOpen(true);
    } catch {
      // In case localStorage is blocked by private browsing settings
      setIsOpen(true);
    }
  }, []);

  // 2. Close modal handler
  const handleClose = useCallback(
    (forceSave24h = false) => {
      if (forceSave24h || doNotShowToday) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            const expireTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
            window.localStorage.setItem(STORAGE_KEY, expireTime.toString());
          }
        } catch {
          // ignore error
        }
      }
      setIsOpen(false);
    },
    [doNotShowToday]
  );

  // 3. Close on ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // 4. Consultation reservation button click
  const handleConsultClick = () => {
    if (doNotShowToday) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const expireTime = Date.now() + 24 * 60 * 60 * 1000;
          window.localStorage.setItem(STORAGE_KEY, expireTime.toString());
        }
      } catch {
        // ignore error
      }
    }
    window.location.href = consultUrl;
  };

  if (!isOpen) return null;

  return (
    <div
      id="inpage-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-[2px] transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        id="inpage-popup-container"
        className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button (X) */}
        <button
          type="button"
          id="popup-close-x-btn"
          aria-label="팝업 닫기"
          onClick={() => handleClose()}
          className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white transition-colors cursor-pointer backdrop-blur-xs shadow-sm"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Popup Image Content Area */}
        <div
          id="popup-image-wrapper"
          className="w-full overflow-y-auto max-h-[64vh] sm:max-h-[68vh] overscroll-contain bg-slate-50 flex items-center justify-center"
        >
          <img
            id="popup-banner-image"
            src={imageUrl}
            alt="안내 팝업"
            className="w-full h-auto object-contain block select-none"
            loading="eager"
          />
        </div>

        {/* Popup Bottom Action Area */}
        <div
          id="popup-actions-wrapper"
          className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex flex-col gap-2.5 flex-shrink-0"
        >
          {/* Reservation Button */}
          <button
            type="button"
            id="popup-consult-btn"
            onClick={handleConsultClick}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-150 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>상담 예약하기</span>
          </button>

          {/* Do not show today & Close controls */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 pt-0.5 px-0.5 select-none">
            <label
              htmlFor="popup-do-not-show-checkbox"
              className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors py-1"
            >
              <span
                id="popup-checkbox-custom"
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  doNotShowToday
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {doNotShowToday && <Check className="w-3 h-3 stroke-[3]" />}
              </span>
              <input
                type="checkbox"
                id="popup-do-not-show-checkbox"
                checked={doNotShowToday}
                onChange={(e) => setDoNotShowToday(e.target.checked)}
                className="sr-only"
              />
              <span className="text-xs sm:text-sm font-medium">오늘 하루 보지 않기</span>
            </label>

            <button
              type="button"
              id="popup-close-text-btn"
              onClick={() => handleClose()}
              className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 font-medium py-1 px-1.5 rounded transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
