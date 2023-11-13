// Selezione degli elementi del DOM
let nome = document.querySelector("#nome");
let brand = document.querySelector("#brand");
let description = document.querySelector("#description");
let imgUrl = document.querySelector("#imgUrl");
let price = document.querySelector("#price");
let btnChange = document.querySelector("#btnChange");
let imgRappresent = document.querySelector(".img-form");

// Ottenere l'ID dal parametro di query dell'URL
let idd = new URLSearchParams(window.location.search).get("id");

// Evento al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {
    // Verifica se l'ID è presente nella query dell'URL
    if (idd) {
        // Richiesta API per ottenere i dettagli del prodotto
        fetch('https://striveschool-api.herokuapp.com/api/product/' + idd, {
            headers: {
                'Authorization': ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZmY5OTk1ZDRmNjAwMTg1NjI1ODUiLCJpYXQiOjE2OTk2MTA1MjEsImV4cCI6MTcwMDgyMDEyMX0.hYEPcn-L76CabFGLhU-LRslE1QDW2-r9ghqRqDHQot4',
            },
        })
        .then(res => res.json())
        .then(product => {
            // Popolamento dei campi con i dettagli del prodotto
            nome.value = product.name;
            document.querySelector("#title").innerText = ` Dettagli Prodotto: ${product.name}`;
            description.value = product.description;
            price.value = product.price;
            brand.value = product.brand;
            imgUrl.value = product.imageUrl;
            imgRappresent.src = product.imageUrl;
        });

        // Abilita o disabilita i campi del modulo in base al parametro vF
        elaboraDati(true, nome, description, price, brand, imgUrl);
    }

    // Cambia l'immagine in anteprima
    cambiaImmagine();
});

// Funzione per cambiare l'immagine in anteprima in base all'URL inserito
function cambiaImmagine() {
    let imgUrlValue = document.querySelector("#imgUrl").value;
    let imgRappresent = document.querySelector(".img-form");

    imgRappresent.setAttribute("src", imgUrlValue);

    imgRappresent.onerror = function () {
        imgRappresent.setAttribute("src", "assets/img/Error.svg.png");
    };
}

// Funzione per abilitare o disabilitare i campi del modulo
function elaboraDati(vF, ...parametro) {
    parametro.forEach(input => {
        input.disabled = vF;
    });
}

// Evento al clic sul pulsante di modifica
btnChange.addEventListener("click", function () {
    chiediConferma();
});

// Funzione per chiedere conferma all'utente prima di reindirizzare
function chiediConferma() {
    var conferma = confirm("Sei sicuro di volere modificare il prodotto?");
    if (conferma) {
        window.location.href = `back-office.html?id=${idd}`;
    } else {
        alert("Azione annullata.");
    }
}
