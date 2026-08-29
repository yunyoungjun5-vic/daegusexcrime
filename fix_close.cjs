const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto w-full flex-grow flex items-center justify-center bg-white">`;

const replacement = `        <div className="bg-white flex justify-end p-2 shrink-0">
          <button 
            onClick={closePopup}
            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto w-full flex-grow flex items-center justify-center bg-white">`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Replaced");
} else {
  console.log("Not found");
}
