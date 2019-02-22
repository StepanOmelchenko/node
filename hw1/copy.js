const fs = require('fs');
const path = require('path');

const base = './hw1/source';
const destination = './hw1/dest';
const createDir = (dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
}

createDir(destination);

const readDir = (base) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);

    if (state.isDirectory()) {
      readDir(localBase);
    } else {
      const firstChar = item.charAt(0);

      createDir(path.join(destination, firstChar));
      fs.copyFile(path.join(base, item), path.join(destination, firstChar, item), (err) => {
        if (err) throw err;
      });
    }
  })
}

readDir(base, 0);
