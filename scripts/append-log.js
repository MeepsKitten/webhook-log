const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'log.json');
const raw = process.env.PAYLOAD || '{}';
let payload;
try { payload = JSON.parse(raw); } catch { payload = { raw }; }

let entries = [];
try { entries = JSON.parse(fs.readFileSync(file, 'utf8')); } catch {}

const entry = {
  t: new Date().toISOString(),
  payload
};

entries.unshift(entry);
entries = entries.slice(0, 200);

fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n');
console.log('Appended entry at', entry.t);


