// Import Tesseract.js library
const Tesseract = require('tesseract.js');

const fs = require('fs');

// File path where you want to save the text file
const filePath = 'textFile.txt';

// Function to extract text from an image
function extractTextFromImage(imagePath) {
  // Use Tesseract.js to recognize text from the image
  Tesseract.recognize(
    imagePath, // Path to the image file
    'eng',     // Language for text recognition (you can change it to other languages if needed)
    { logger: info => console.log(info) } // Logger function to log progress
  ).then(({ data: { text } }) => {
    console.log('Extracted Text:');
    console.log(text); // Print the extracted text to the console
    writeText(text);
  }).catch(error => {
    console.error('Error during text extraction:', error);
  });
}


// Export the function to make it accessible in other files
module.exports = { extractTextFromImage };


function writeText(text){
  // Write text to the file
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error('Error saving the file:', err);
      return;
    }
    console.log('Text saved to textFile.txt');
  });
}