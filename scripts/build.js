#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {Liquid} = require('../templates/lib/liquid.browser.min.js');

const liquid = new Liquid({
    fs: {
      readFileSync: (file) => fs.readFileSync(file, 'utf8'),
      existsSync: (file) => fs.existsSync(file),
      resolve: (root, file, ext) => path.resolve(root, ext ? file + ext : file),
    },
    root: path.resolve(__dirname, '..', 'templates/'),
    dynamicPartials: false,
  });

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
      const body = liquid.parseAndRenderSync(content, {});
  
      fs.mkdirSync(path.dirname(destination), {recursive: true});
      fs.writeFileSync(destination, body);
    }
}

async function copyDir(dir) {
    for (const file of fs.readdirSync(dir)) {
        const source = path.join(dir, file);
        process.stdout.write(`Building ${source}\n`);
        const content = fs.readFileSync(source);
    
        const destination = path.join('build', dir, file);
    
        fs.mkdirSync(path.dirname(destination), {recursive: true});
        fs.writeFileSync(destination, content);
      }
}

renderDir('pages')
copyDir('assets')
copyDir('lib')