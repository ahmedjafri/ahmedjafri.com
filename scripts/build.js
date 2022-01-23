#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function load(fileName) {
    return fs.readFileSync(fileName, 'utf8');
  }

function renderDir(dir) {
    for (const file of fs.readdirSync(dir)) {
      if (!['.html', '.md', '.txt', '.xml'].includes(path.extname(file))) {
        continue;
      }
  
      const source = path.join(dir, file);
      process.stdout.write(`Building ${source}\n`);
      const content = load(source);
  
      const destination = path.join('build', file);
  
      fs.mkdirSync(path.dirname(destination), {recursive: true});
      fs.writeFileSync(destination, content);
    }
  }

renderDir('./')