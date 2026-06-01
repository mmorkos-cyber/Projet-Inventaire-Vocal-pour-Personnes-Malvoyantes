// Preparation bouton analyser
const analyser = document.getElementById("analyse_btn");
analyser.addEventListener("click", GoCoco);

// On charge l'image et on l'affiche avec possibilité de la remplacer
const image = document.getElementById("image");

    upload.addEventListener("change", function () {

      const file = this.files[0];

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

function afficherInventaire(inventaire){
  const ul = document.querySelector("#listInventaire");
  ul.innerHTML = "";
  for (i in inventaire){
    const li = document.createElement("li");
    li.textContent = `Vous avez : ${inventaire[i]} ${i}`;
    ul.appendChild(li);
  }
}


// Text to speech
let button = document.getElementById("analyse_btn");
let buttonStop = document.getElementById("stop_tts")
let content = document.getElementById("listInventaire");

button.addEventListener("click", function(){
  let text = content.textContent;

  let speech = new SpeechSynthesisUtterance(`J'ai détecté : ${text}`);
  speechSynthesis.speak(speech)

})

buttonStop.addEventListener("click", function(){
  speechSynthesis.cancel()
})
