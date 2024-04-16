chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureVisibleTab") {
      const { pixelRatio } = message;
      chrome.tabs.captureVisibleTab({ format: "png", quality: 100 }, (dataUrl) => {
          // Send screenshot data to Python server
          sendDataToPythonServer(dataUrl);
      });
      return true;
  }
});

function sendDataToPythonServer(dataUrl) {
  // Make an HTTP POST request to Python server
  fetch('http://localhost:5000/process_screenshot', {
      method: 'POST',
      body: JSON.stringify({ screenshot: dataUrl }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log('Data received from Python server:', data);
      // Handle the response data from Python server
  })
  .catch(error => {
      console.error('Error sending data to Python server:', error);
  });
}
