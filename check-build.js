const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const required = ['src/server.js', 'src/db.js', 'src/ai.js', 'public/index.html', 'public/styles.css', 'public/app.js', 'package.json'];
const missing = required.filter(file => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Build check failed. Missing required files:', missing.join(', '));
  process.exit(1);
}
console.log('Build check passed: required application files are present.');
