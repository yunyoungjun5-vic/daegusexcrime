const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const popupCode = fs.readFileSync('patch.txt', 'utf8');

const target1 = `const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero />`;

const replacement1 = `
${popupCode}

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <MainPopup />
    <Hero />`;

if (code.includes('const Home = () => (')) {
  code = code.replace(`const Home = () => (\n  <motion.div \n    initial={{ opacity: 0 }}\n    animate={{ opacity: 1 }}\n    exit={{ opacity: 0 }}\n  >\n    <Hero />`, replacement1);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Failed to find target");
}
