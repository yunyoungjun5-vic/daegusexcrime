const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/const handleKeyDown = \(e\) => {/, 'const handleKeyDown = (e: KeyboardEvent) => {');
fs.writeFileSync('src/App.tsx', code);
