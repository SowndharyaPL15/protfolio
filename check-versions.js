const fs = require('fs');
const content = fs.readFileSync('./package-lock.json', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('"version"')) {
    const m = l.match(/"version":\s*"([^"]+)"/);
    if (m && !/^\d+\.\d+/.test(m[1])) {
      console.log('Line ' + (i+1) + ':', m[1]);
    }
  }
});
console.log('Scan complete');
