const fs = require('fs');
const content = fs.readFileSync('E:/AIwork/mimocode/ai-pm-handbook/prompts/index.html', 'utf-8');
const idx = content.indexOf('"64":{');
const sub = content.slice(idx, idx+4000);
console.log(sub);
