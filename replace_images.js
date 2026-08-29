const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const unsplashImages = [
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1629853904555-5f073289ab74?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606821389422-793db5f86616?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800',
];

let index = 0;
const replaced = content.replace(/https:\/\/9tsiiw6i9140\.edge\.naverncp\.com\/files\/sgrsoft\/202603\/[a-z0-9]+\.(png|jpg)/g, (match) => {
  const replacement = unsplashImages[index % unsplashImages.length];
  index++;
  return replacement;
});

fs.writeFileSync('src/App.tsx', replaced);
console.log(`Replaced ${index} images.`);
