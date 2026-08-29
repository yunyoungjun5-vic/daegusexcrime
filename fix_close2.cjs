const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"',
  'className="w-8 h-8 flex items-center justify-center text-slate-900 hover:text-indigo-900 transition-colors"'
);
fs.writeFileSync('src/App.tsx', code);
