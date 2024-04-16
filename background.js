let globalDownloadId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'takeScreenshot') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs && tabs.length > 0) {
        const tab = tabs[0];
        const tabId = tab.id;
        
        // Ensure the tab is still active
        if (tabId !== chrome.tabs.TAB_ID_NONE) {
          const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' });
          const blob = await fetch(dataUrl).then(response => response.blob());

          const reader = new FileReader();
          reader.onload = function(event) {
            const imageDataUrl = event.target.result;
            chrome.downloads.download({
              url: imageDataUrl,
              filename: 'screenshots/screenshot.png'
            }, (downloadId) => {
              if (chrome.runtime.lastError) {
                console.error('Failed to download screenshot:', chrome.runtime.lastError.message);
              } else {
                // Store the downloadId for later reference
                globalDownloadId = downloadId;
              }
            });

            // Send a message to the popup with the downloaded screenshot data
            chrome.runtime.sendMessage({
              action: 'screenshotDownloaded',
              imageDataUrl: imageDataUrl
            });
          };
          reader.readAsDataURL(blob);
        } else {
          console.error('Cannot capture screenshot: The tab is no longer available.');
        }
      } else {
        console.error('Cannot capture screenshot: No active tab found.');
      }
    });
  }
});

// Listener to track the completion of the download
chrome.downloads.onChanged.addListener(function(delta) {
  if (delta.state && delta.state.current === "complete" && delta.id === globalDownloadId) {
    // No need to do anything here since the message with the downloaded screenshot data
    // is already sent to the popup in the onMessage listener above
  }
});
