import React, { useState, useEffect } from 'react';
import { X, CalendarCheck, ExternalLink, Tv, ArrowRight, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface LandingPopupProps {
  reservationUrl?: string;
  onOpenReservation?: () => void;
}

const FIRST_POPUP_IMAGE_URL = "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1788071556/ChatGPT_Image_2026%EB%85%84_8%EC%9B%94_30%EC%9D%BC_%EC%98%A4%ED%9B%84_03_32_27_mbwtdh.png";
const SECOND_POPUP_IMAGE_URL = "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1792067983/%EC%A3%BC%EC%9A%94_%EB%B0%A9%EC%86%A1_%EC%96%B8%EB%A1%A0_%EA%B0%95%EC%A1%B0_%EC%83%81%EB%8B%B4%EC%84%BC%ED%84%B0_%ED%8F%AC%EC%8A%A4%ED%84%B0_e6ln84.png";
const THIRD_POPUP_IMAGE_URL = "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1794923092/C%EC%95%88_%EB%8C%80%EA%B5%AC%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%B9%98%EB%A3%8C%EC%84%BC%ED%84%B0_2x_r4igiz.png";

const FIRST_STORAGE_KEY = "daegu_center_popup_hide_date";
const SECOND_STORAGE_KEY = "daegu_center_second_popup_hide_date";
const THIRD_STORAGE_KEY = "daegu_center_third_popup_hide_date";

type PopupStep = 'none' | 'first' | 'second' | 'third';

export default function LandingPopup({
  reservationUrl = "https://map.naver.com/p/entry/place/2033439050?placePath=/home?fromPanelNum=1&additionalHeight=76&timestamp=202603231547&locale=ko&svcName=map_pcv5&fromPanelNum=1&additionalHeight=76&timestamp=202603231041&locale=ko&svcName=map_pcv5&from=map&searchType=place&lng=128.5268783&lat=35.8601957&c=20.00,0,0,2,dh",
  onOpenReservation
}: LandingPopupProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<PopupStep>('none');
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [secondImageLoaded, setSecondImageLoaded] = useState(false);
  const [thirdImageLoaded, setThirdImageLoaded] = useState(false);

  const getTodayString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    try {
      const today = getTodayString();
      const firstHidden = localStorage.getItem(FIRST_STORAGE_KEY) === today;
      const secondHidden = localStorage.getItem(SECOND_STORAGE_KEY) === today;
      const thirdHidden = localStorage.getItem(THIRD_STORAGE_KEY) === today;

      if (!firstHidden) {
        const timer = setTimeout(() => {
          setStep('first');
        }, 150);
        return () => clearTimeout(timer);
      } else if (!secondHidden) {
        const timer = setTimeout(() => {
          setStep('second');
        }, 150);
        return () => clearTimeout(timer);
      } else if (!thirdHidden) {
        const timer = setTimeout(() => {
          setStep('third');
        }, 150);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setStep('first');
    }
  }, []);

  // Handle closing the first popup, then transition to next eligible popup
  const handleFirstClose = (dontShowToday = false) => {
    if (dontShowToday) {
      try {
        localStorage.setItem(FIRST_STORAGE_KEY, getTodayString());
      } catch (e) {
        console.error(e);
      }
    }

    setStep('none');

    // Check if second or third popup is eligible to show
    try {
      const today = getTodayString();
      const secondHidden = localStorage.getItem(SECOND_STORAGE_KEY) === today;
      const thirdHidden = localStorage.getItem(THIRD_STORAGE_KEY) === today;
      if (!secondHidden) {
        setTimeout(() => {
          setStep('second');
        }, 220);
        return;
      }
      if (!thirdHidden) {
        setTimeout(() => {
          setStep('third');
        }, 220);
        return;
      }
    } catch (e) {
      setTimeout(() => {
        setStep('second');
      }, 220);
    }
  };

  // Handle closing the second popup, then transition to third popup if not hidden
  const handleSecondClose = (dontShowToday = false, skipNext = false) => {
    if (dontShowToday) {
      try {
        localStorage.setItem(SECOND_STORAGE_KEY, getTodayString());
      } catch (e) {
        console.error(e);
      }
    }
    setStep('none');

    if (skipNext) return;

    try {
      const today = getTodayString();
      const thirdHidden = localStorage.getItem(THIRD_STORAGE_KEY) === today;
      if (!thirdHidden) {
        setTimeout(() => {
          setStep('third');
        }, 220);
        return;
      }
    } catch (e) {
      setTimeout(() => {
        setStep('third');
      }, 220);
    }
  };

  // Handle closing the third popup
  const handleThirdClose = (dontShowToday = false) => {
    if (dontShowToday) {
      try {
        localStorage.setItem(THIRD_STORAGE_KEY, getTodayString());
      } catch (e) {
        console.error(e);
      }
    }
    setStep('none');
  };

  // Handle reservation click (first popup)
  const handleReservationClick = () => {
    if (onOpenReservation) {
      onOpenReservation();
    } else {
      window.open(reservationUrl, '_blank', 'noopener,noreferrer');
    }
    handleFirstClose(false);
  };

  // Handle media appearance navigation (second popup)
  const handleMediaClick = () => {
    handleSecondClose(false, true);
    navigate('/media/appearance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle experts navigation (third popup)
  const handleExpertsClick = () => {
    handleThirdClose(false);
    navigate('/about/experts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {/* 1st Popup: 상담예약 안내 */}
      {step === 'first' && (
        <div 
          key="first-popup"
          id="landing-popup-container"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            id="landing-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => handleFirstClose(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            aria-label="팝업 닫기 배경"
          />

          {/* Popup Card 1 */}
          <motion.div
            id="landing-popup-card"
            key="first-popup-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", duration: 0.38, bounce: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="landing-popup-title"
            className="relative w-full max-w-[min(720px,calc((92vh-110px)*0.8003),calc(100vw-24px))] bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto"
          >
            {/* Top Bar with Quick Close Icon */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-4 md:right-4 z-20">
              <button
                id="landing-popup-top-close-btn"
                onClick={() => handleFirstClose(false)}
                aria-label="창 닫기"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-900/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-md active:scale-95"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Image Container 1 */}
            <div 
              id="landing-popup-image-wrapper"
              onClick={handleReservationClick}
              className="relative w-full overflow-hidden cursor-pointer group block"
            >
              {!firstImageLoaded && (
                <div className="w-full aspect-[1122/1402] flex items-center justify-center bg-slate-900 animate-pulse text-slate-400 text-xs sm:text-sm font-medium">
                  이미지 로딩 중...
                </div>
              )}
              <img
                id="landing-popup-banner-image"
                src={FIRST_POPUP_IMAGE_URL}
                alt="대구성범죄심리상담치료센터 안내 팝업"
                width={1122}
                height={1402}
                onLoad={() => setFirstImageLoaded(true)}
                className={`w-full h-auto block select-none transition-transform duration-300 group-hover:scale-[1.008] ${firstImageLoaded ? 'block' : 'hidden'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Action Button 1: 상담예약하러 가기 */}
            <a
              id="landing-popup-reservation-btn"
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleReservationClick();
              }}
              className="w-full min-h-[48px] sm:min-h-[52px] md:min-h-[56px] px-4 py-3 sm:py-3.5 bg-[#1565C0] hover:bg-[#0D47A1] active:bg-[#0B3D91] text-white font-black text-[15px] sm:text-[16px] md:text-[18px] flex items-center justify-center gap-2 transition-colors duration-150 tracking-tight text-center select-none"
            >
              <CalendarCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-200 shrink-0" />
              <span>상담예약하러 가기</span>
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-blue-200/80 ml-0.5 shrink-0" />
            </a>

            {/* Bottom Controls 1 */}
            <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-slate-900 text-slate-300 text-xs sm:text-sm md:text-[15px] font-medium select-none border-t border-slate-800">
              <button
                id="landing-popup-do-not-show-today-btn"
                type="button"
                onClick={() => handleFirstClose(true)}
                className="flex items-center gap-2 py-1 px-1.5 rounded text-slate-300 hover:text-white transition-colors"
              >
                <span className="w-4 h-4 md:w-5 md:h-5 rounded border border-slate-500 flex items-center justify-center bg-slate-800 text-white">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm bg-transparent group-hover:bg-slate-400"></span>
                </span>
                <span className="font-medium">오늘 하루 보지 않기</span>
              </button>

              <button
                id="landing-popup-close-btn"
                type="button"
                onClick={() => handleFirstClose(false)}
                className="py-1 px-3 md:px-4 rounded font-bold text-slate-300 hover:text-white transition-colors"
              >
                창 닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2nd Popup: 방송 출연 및 강연 기록 */}
      {step === 'second' && (
        <div 
          key="second-popup"
          id="landing-second-popup-container"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            id="landing-second-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => handleSecondClose(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            aria-label="팝업 닫기 배경"
          />

          {/* Popup Card 2 */}
          <motion.div
            id="landing-second-popup-card"
            key="second-popup-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", duration: 0.38, bounce: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="landing-second-popup-title"
            className="relative w-full max-w-[min(620px,calc((92vh-110px)*0.6667),calc(100vw-24px))] bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto"
          >
            {/* Top Bar with Quick Close Icon */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-4 md:right-4 z-20">
              <button
                id="landing-second-popup-top-close-btn"
                onClick={() => handleSecondClose(false)}
                aria-label="창 닫기"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-900/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-md active:scale-95"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Image Container 2 - Edge-to-edge with NO margin/letterbox */}
            <div 
              id="landing-second-popup-image-wrapper"
              onClick={handleMediaClick}
              className="relative w-full overflow-hidden cursor-pointer group block"
            >
              {!secondImageLoaded && (
                <div className="w-full aspect-[1024/1536] flex items-center justify-center bg-slate-900 animate-pulse text-slate-400 text-xs sm:text-sm font-medium">
                  이미지 로딩 중...
                </div>
              )}
              <img
                id="landing-second-popup-banner-image"
                src={SECOND_POPUP_IMAGE_URL}
                alt="주요 방송 언론 강조 상담센터 포스터"
                width={1024}
                height={1536}
                onLoad={() => setSecondImageLoaded(true)}
                className={`w-full h-auto block select-none transition-transform duration-300 group-hover:scale-[1.008] ${secondImageLoaded ? 'block' : 'hidden'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Action Button 2: 방송 출연 · 강연 기록보기 - Edge-to-edge flush with image */}
            <button
              id="landing-second-popup-media-btn"
              type="button"
              onClick={handleMediaClick}
              className="w-full min-h-[48px] sm:min-h-[52px] md:min-h-[56px] px-4 py-3 sm:py-3.5 bg-[#1565C0] hover:bg-[#0D47A1] active:bg-[#0B3D91] text-white font-black text-[15px] sm:text-[16px] md:text-[18px] flex items-center justify-center gap-2 transition-colors duration-150 tracking-tight text-center select-none"
            >
              <Tv className="w-5 h-5 md:w-6 md:h-6 text-blue-200 shrink-0" />
              <span>방송 출연 · 강연 기록보기</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-blue-200/80 ml-0.5 shrink-0" />
            </button>

            {/* Bottom Controls 2 */}
            <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-slate-900 text-slate-300 text-xs sm:text-sm md:text-[15px] font-medium select-none border-t border-slate-800">
              <button
                id="landing-second-popup-do-not-show-today-btn"
                type="button"
                onClick={() => handleSecondClose(true)}
                className="flex items-center gap-2 py-1 px-1.5 rounded text-slate-300 hover:text-white transition-colors"
              >
                <span className="w-4 h-4 md:w-5 md:h-5 rounded border border-slate-500 flex items-center justify-center bg-slate-800 text-white">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm bg-transparent group-hover:bg-slate-400"></span>
                </span>
                <span className="font-medium">오늘 하루 보지 않기</span>
              </button>

              <button
                id="landing-second-popup-close-btn"
                type="button"
                onClick={() => handleSecondClose(false)}
                className="py-1 px-3 md:px-4 rounded font-bold text-slate-300 hover:text-white transition-colors"
              >
                창 닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 3rd Popup: 전문가와 함께하는 자문체계 */}
      {step === 'third' && (
        <div
          key="third-popup"
          id="landing-third-popup-container"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            id="landing-third-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => handleThirdClose(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            aria-label="팝업 닫기 배경"
          />

          {/* Popup Card 3 */}
          <motion.div
            id="landing-third-popup-card"
            key="third-popup-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", duration: 0.38, bounce: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label="전문가와 함께하는 자문체계 안내 팝업"
            className="relative w-full max-w-[min(620px,calc((92vh-110px)*0.6531),calc(100vw-24px))] bg-slate-950 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto"
          >
            {/* Top Bar with Quick Close Icon */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-4 md:right-4 z-20">
              <button
                id="landing-third-popup-top-close-btn"
                onClick={() => handleThirdClose(false)}
                aria-label="창 닫기"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-900/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-md active:scale-95"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Image Container 3 - Edge-to-edge with NO margin/letterbox */}
            <div
              id="landing-third-popup-image-wrapper"
              onClick={handleExpertsClick}
              className="relative w-full overflow-hidden cursor-pointer group block"
            >
              {!thirdImageLoaded && (
                <div className="w-full aspect-[1280/1960] flex items-center justify-center bg-slate-900 animate-pulse text-slate-400 text-xs sm:text-sm font-medium">
                  이미지 로딩 중...
                </div>
              )}
              <img
                id="landing-third-popup-banner-image"
                src={THIRD_POPUP_IMAGE_URL}
                alt="대구성범죄심리상담치료센터 전문가와 함께하는 자문체계 포스터"
                width={1280}
                height={1960}
                onLoad={() => setThirdImageLoaded(true)}
                className={`w-full h-auto block select-none transition-transform duration-300 group-hover:scale-[1.008] ${thirdImageLoaded ? 'block' : 'hidden'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Action Button 3: 방송 출연 · 상담전문가 보기 - Edge-to-edge flush with image */}
            <button
              id="landing-third-popup-experts-btn"
              type="button"
              onClick={handleExpertsClick}
              className="w-full min-h-[48px] sm:min-h-[52px] md:min-h-[56px] px-4 py-3 sm:py-3.5 bg-[#1565C0] hover:bg-[#0D47A1] active:bg-[#0B3D91] text-white font-black text-[15px] sm:text-[16px] md:text-[18px] flex items-center justify-center gap-2 transition-colors duration-150 tracking-tight text-center select-none"
            >
              <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-200 shrink-0" />
              <span>상담전문가 보기</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-blue-200/80 ml-0.5 shrink-0" />
            </button>

            {/* Bottom Controls 3 */}
            <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-slate-900 text-slate-300 text-xs sm:text-sm md:text-[15px] font-medium select-none border-t border-slate-800">
              <button
                id="landing-third-popup-do-not-show-today-btn"
                type="button"
                onClick={() => handleThirdClose(true)}
                className="flex items-center gap-2 py-1 px-1.5 rounded text-slate-300 hover:text-white transition-colors"
              >
                <span className="w-4 h-4 md:w-5 md:h-5 rounded border border-slate-500 flex items-center justify-center bg-slate-800 text-white">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm bg-transparent group-hover:bg-slate-400"></span>
                </span>
                <span className="font-medium">오늘 하루 보지 않기</span>
              </button>

              <button
                id="landing-third-popup-close-btn"
                type="button"
                onClick={() => handleThirdClose(false)}
                className="py-1 px-3 md:px-4 rounded font-bold text-slate-300 hover:text-white transition-colors"
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

