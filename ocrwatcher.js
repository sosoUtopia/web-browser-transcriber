const fs = require('fs');
const chokidar = require('chokidar');
const { extractTextFromImage } = require('./read-text');

// Replace this with the path to your downloads folder
const downloadsFolder = 'C:/Users/jayle/Downloads/screenshots';

// Watch the downloads folder for added files
const watcher = chokidar.watch(downloadsFolder, {
  ignored: /^\./,
  persistent: true,
  ignoreInitial: true,
});

watcher.on('add', (filePath) => {
  console.log('File added:', filePath);
  // Check if the added file is an image (you may want to adjust this check based on the types of images you expect)
  if (filePath.match(/\.(jpg|jpeg|png)$/i)) {
    // Pass the file path to the extractTextFromImage function
    extractTextFromImage(filePath);
  }
});
 

console.log('Watching for new files in:', downloadsFolder);
