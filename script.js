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


}

function genererInventaire(predictions){
  const ul = document.querySelector("#listInventaire");
  ul.innerHTML = "";
  predictions.forEach(inventaire =>{
    const li = document.createElement("li");
    li.textContent = ``;
    ul.appendChild(li);
  })
}


// Text to speech
let button = document.getElementById("analyse_btn");
let content = document.getElementById("listInventaire");

button.addEventListener("click", function(){
  let text = content.textContent;

  let speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech)

})
