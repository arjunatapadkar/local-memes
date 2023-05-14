

const imageFileInput = document.querySelector('#img-file-ip');
const topTextInput = document.querySelector('#top-text-ip');
const bottomTextInput = document.querySelector('#bottom-text-ip');
const canvas = document.querySelector('#meme');

let image;

imageFileInput.addEventListener("change", ()=>{

    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", ()=>{

        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);

    }, {once : true});

});

topTextInput.addEventListener("change", ()=>{
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", ()=>{
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});


function updateMemeCanvas(canvas, image, topText, bottomText){
    
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width/10);
    const yOffset = height / 25;


    // update canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize/4);
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;


    // top text
    ctx.textBaseline = "top";
    ctx.strokeText = (topText, width/2, yOffset);
    ctx.fillText(topText, width/2, yOffset);


    // bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText = (bottomText, width/2, height - yOffset);
    ctx.fillText(bottomText, width/2,  height - yOffset);
}


// downloading function
function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("meme").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
   
}


  // Assume that 'memeImage' is a variable containing the URL of the image to be shared

const shareButton = document.createElement('button');
shareButton.innerText = 'Share Image';

shareButton.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this meme!',
      text: 'I made this meme and wanted to share it with you.',
      url:document.getElementById("meme").toDataURL("image/png").replace("image/png", "image/octet-stream").src
    })
      .then(() => console.log('Image shared successfully.'))
      .catch((error) => console.error('Error sharing image:', error));
  } else {
    console.log('Web Share API not supported on this device.');
  }
});

document.body.appendChild(shareButton);














