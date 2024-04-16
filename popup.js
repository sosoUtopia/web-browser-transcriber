document.addEventListener('DOMContentLoaded', function() {
    const takeScreenshotBtn = document.getElementById('takeScreenshotBtn');
    const screenshotContainer = document.getElementById('screenshotContainer');
  
    takeScreenshotBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'takeScreenshot' });
    });
  
    // Listen for the message from background.js indicating that the screenshot has been downloaded
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'screenshotDownloaded') {
        // Update the screenshot container with the downloaded image
        const img = document.createElement('img');
        img.src = message.imageDataUrl;
        screenshotContainer.appendChild(img);
      }
    });
  });
  