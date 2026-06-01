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
        GoCoco();
        };


        image.src = imageUrl;
        image.style.display = "block";
      }
    });
    
function GoCoco(){
 // Load the model.
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(image).then(predictions => {
      console.log('Predictions: ', predictions);
    });
  });
}

