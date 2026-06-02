// Preparation bouton analyser
const analyser = document.getElementById("analyse_btn");
analyser.addEventListener("click", GoCoco);

let model;
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
});


//Declaration canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton'); 

// Check if webcam access is supported.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}



// Enable the live webcam view and start classification.
async function enableCam(event) {

  // Only continue if the COCO-SSD has finished loading.
  if (!model) {
    return;
  } 
  // Hide the button once clicked.
  event.target.classList.add('removed');  

  
  
  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam); 
        
  });
}




  var children = []; 

async function predictWebcam() {
 
  // Predictions et Detection
  const predictions = await model.detect(video);
   
  //genererInventaire(predictions)
  dessinerBoundingBoxes(predictions);
  
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);

}

// Pretend model has loaded so we can try out the webcam code.
//var model = true;
demosSection.classList.remove('invisible');

async function GoCoco(){
  // Predictions et Detection
  const predictions = await model.detect(video);
  console.log("Predictions:", predictions);
 
  genererInventaire(predictions)
  
}

async function genererInventaire(result){
    let inventaire = {};
    result.forEach(objet => {
    if (inventaire[objet.class] === undefined){
      inventaire[objet.class] = 1;
    }else {
      inventaire[objet.class] +=1
    }
    console.log(inventaire)
    })
    afficherInventaire(inventaire)
    genererPhrase(inventaire)
}

async function afficherInventaire(inventaire){
  const response = await fetch('semantic.json');
  const json = await response.json();
  
  
  const ul = document.querySelector("#listInventaire");
  ul.innerHTML = "";
  const content = []
  for (i in inventaire){
    console.log(i)
    for (let j = 0; j < json["Produits"].length; j++){
    if (i == json["Produits"][j]["nom"]){
      const li = document.createElement("li");
      li.textContent = `${inventaire[i]} ${json["Produits"][j]["TraductionFR"]} -- ${json["Produits"][j]["definition"]}`;
      ul.appendChild(li);
      content.push(`${inventaire[i]}, ${json["Produits"][j]["TraductionFR"]}, ${json["Produits"][j]["definition"]}`)
    }
  }
  }
  lirePhrase(content)
}

// Text to speech
let buttonStop = document.getElementById("stop_tts")
let buttonPause = document.getElementById("pause_tts")
let buttonResume = document.getElementById("reprendre_tts")


function lirePhrase(content){
  
    const speech = new SpeechSynthesisUtterance(`J'ai détecté : ${content}`);
    speech.lang = "fr-FR";
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech)
  }
  
  buttonStop.addEventListener("click", function(){
    speechSynthesis.cancel()
  })
  
  buttonPause.addEventListener("click", function(){
    speechSynthesis.pause()
  })
  
  buttonResume.addEventListener("click", function(){
    speechSynthesis.resume()
  })

  //stockage dans un fichier json => historique.json

  function saveToJson(imageUrl, inventaire){
    let dates = new Date(year,month,day,hours,minutes);
    const save = {
      date: dates,
      nomImage: imageUrl,
      inv: inventaire,
    };
  }
function dessinerBoundingBoxes(predictions) {
  // Taille canvas = taille image
  canvas.width = video.width;
  canvas.height = video.height;

  // nettoyage canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  predictions.forEach(prediction => {

    const [x, y, width, height] = prediction.bbox;

    // Rectangle
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 5;
    ctx.strokeRect(x, y, width, height);

    // Texte
    const texte = prediction.class + " (" + Math.round(prediction.score * 100) + "%)";
    ctx.font = "22px Arial";

    const textWidth = ctx.measureText(texte).width;

    // Fond du texte
    ctx.fillStyle = "blue";
    ctx.fillRect(
      x, y > 25 ? y - 25 : y, textWidth + 10, 25
    );

    // Texte blanc
    ctx.fillStyle = "white";
    ctx.fillText(
      texte, x + 5, y > 25 ? y - 8 : y + 17
    );
  });
}