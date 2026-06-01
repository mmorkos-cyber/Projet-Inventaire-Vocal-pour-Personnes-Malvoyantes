//-- Load TensorFlow.js. This is required to use coco-ssd model. -->
const srctf="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs" ;
//-- Load the coco-ssd model. -->
const srccoco="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd";


// On charge l'image et on l'affiche avec possibilité de la remplacer
const upload = document.getElementById("upload");
const preview = document.getElementById("preview");

    upload.addEventListener("change", function () {

      const file = this.files[0];

      if (file) {

        // Création d'une URL temporaire
        const imageUrl = URL.createObjectURL(file);

        // Fonction exécutée seulement quand l'image est chargée
        preview.onload = () => {
        console.log("Image chargée !");
        GoCoco();
        };


        preview.src = imageUrl;
        preview.style.display = "block";
      }
    });
    
function GoCoco(){
 // Load the model.
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(preview).then(predictions => {
      console.log('Predictions: ', predictions);
    });
  });
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
