const memeContainer = document.querySelector('#meme-container');
const memeCanvas = document.querySelector('#meme-canvas');
const topTextInput = document.querySelector('#top-text-input');
const bottomTextInput = document.querySelector('#bottom-text-input');
const imageInput = document.querySelector('#image-input');
const generateButton = document.querySelector('#generate-btn');
const downloadButton = document.querySelector('#download-btn');
// const shareButton = document.querySelector('#share-btn');

// Draw the meme onto the canvas
function drawMeme(image) {
  const context = memeCanvas.getContext('2d');
  memeCanvas.width = 500;
  memeCanvas.height = 500;
  context.drawImage(image, 0, 0, 500, 500);
  context.font = 'bold 40px Arial';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.textAlign = 'center';
  context.lineWidth = 2;
  context.fillText(topTextInput.value, 250, 50);
  context.strokeText(topTextInput.value, 250, 50);
  context.fillText(bottomTextInput.value, 250, 450);
  context.strokeText(bottomTextInput.value, 250, 450);
}


// Generate meme on click of Generate button
generateButton.addEventListener('click', () => {
  const image = new Image();
  image.src = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : 'https://i.imgflip.com/3g3y0v.jpg';
  image.onload = () => {
    memeCanvas.width = image.width;
    memeCanvas.height = image.height;
    drawMeme(image);
  };
});

// Download meme on click of Download button
downloadButton.addEventListener('click', () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = memeCanvas.toDataURL('image/png');
  downloadLink.download = 'meme.png';
  downloadLink.click();
});

// Share meme on click of Share button
// const memeCanvas = document.getElementById('memeCanvas');
const shareButton = document.getElementById('shareButton');

// Set the canvas dimensions to 500x500
memeCanvas.width = 500;
memeCanvas.height = 500;

// Add an event listener to the share button that generates a data URL for the canvas image and shares it using the navigator.share API
shareButton.addEventListener('click', async function() {
  const dataUrl = memeCanvas.toDataURL();
  
  // Check if the navigator.share API is supported
  if (navigator.share) {
    try {
      // Share the image using the navigator.share API
      await navigator.share({
        title: 'Meme',
        text: 'Check out this awesome meme I made!',
        url: '',
        files: [new File([dataUrl], 'meme.png', { type: 'image/png' })]
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    // If the navigator.share API is not supported, display an error message
    alert('Sharing is not supported on your browser.');
  }
});


