// Preparation bouton analyser
const analyser = document.getElementById("analyse_btn");
analyser.addEventListener("click", GoCoco);

//Declaration canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// On charge l'image et on l'affiche avec possibilité de la remplacer
const image = document.getElementById("image");

    upload.addEventListener("change", function () {

      const file = this.files[0];
      // Taille canvas = taille image
      canvas.width = image.width;
      canvas.height = image.height;

          
      // nettoyage canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (file) {

        // Création d'une URL temporaire
        const imageUrl = URL.createObjectURL(file);

        // Fonction exécutée seulement quand l'image est chargée
        image.onload = () => {
        console.log("Image chargée !");
       
        };

        image.src = imageUrl;
        image.style.display = "block";
      }
      
    });
    
async function GoCoco(){
 // Load the model.
  let model = await cocoSsd.load();
  
// Predictions et Detection
  const predictions = await model.detect(image);
  console.log("Predictions:", predictions);
  //let result = predictions
 genererInventaire(predictions)
 dessinerBoundingBoxes(predictions)
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
  canvas.width = image.width;
  canvas.height = image.height;

  // nettoyage canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  predictions.forEach(prediction => {

    const [x, y, width, height] = prediction.bbox;

    // Rectangle
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.strokeRect(x, y, width, height);

    // Texte
    const texte = prediction.class + " (" + Math.round(prediction.score * 100) + "%)";
    ctx.font = "16px Arial";

    const textWidth = ctx.measureText(texte).width;

    // Fond du texte
    ctx.fillStyle = "red";
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
