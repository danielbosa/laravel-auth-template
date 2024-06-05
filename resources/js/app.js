import "./bootstrap";
import "~resources/scss/app.scss";
import * as bootstrap from "bootstrap";
import.meta.glob(["../img/**", "../fonts/**"]);

/*SCRIPT x Preview di immagine caricata da utente
    //prendo la casella di input file
    const image = document.getElementById("uploadImage");

    //se esiste nella pagina
    if (image) {
        image.addEventListener("change", () => {
            //console.log(image.files[0]);
            //prendo l'elemento html img dove voglio la preview
            const preview = document.getElementById("uploadPreview");

            //creo nuovo oggetto file reader
            const objFileReader = new FileReader();

            //uso il metodo readAsDataURL dell'oggetto creato per leggere il file e gli passo url del mio file
            objFileReader.readAsDataURL(image.files[0]);

            //al termine dell'evento di lettura del file (onload)
            objFileReader.onload = function (event) {
                //metto nel src della preview l'immagine
                preview.src = event.target.result;
            };
        });
*/
