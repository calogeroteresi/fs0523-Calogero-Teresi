// Selezione degli elementi del DOM
let nome = document.querySelector("#nome");
let brand = document.querySelector("#brand");
let description = document.querySelector("#description");
let imgUrl = document.querySelector("#imgUrl");
let price = document.querySelector("#price");
let btnCreate = document.querySelector("#btnCreate");
let btnReset = document.querySelector("#btnReset");
let btnDelete = document.querySelector("#btnDelete");
let form = document.querySelector("form");
let imgRappresent = document.querySelector(".img-form");

// Array dei campi richiesti
let campiRichiesti = [nome, brand, description, imgUrl, price];

// Funzione per gestire l'evento di input su tutti i campi richiesti
let trigger = () => {
    campiRichiesti.forEach(input => {
        input.addEventListener("input", () => messageValidation());
        console.log(input);
    });
};

// Inizializzazione dell'evento di input
trigger();

// Funzione per la validazione dei campi e la gestione dei messaggi
let messageValidation = () => {
    let requiredFields = [nome, brand, description, imgUrl, price];

    requiredFields.forEach(field => {
        let invalidFeedback = field.nextElementSibling;

        if (field.value === "") {
            invalidFeedback.classList.remove("d-none");
            invalidFeedback.classList.add("d-block");
        } else {
            invalidFeedback.classList.remove("d-block");
            invalidFeedback.classList.add("d-none");
        }
    });
};

// ID del prodotto dall'URL
let id = new URLSearchParams(window.location.search).get("id");

// URL e metodo per la richiesta API
const url = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";

// Evento al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {
    // Modifica dell'interfaccia utente se l'ID è presente
    if (id) {
        document.querySelector("#title").innerText = " Modifica Prodotto";
        btnCreate.innerText = "Modifica";
        btnDelete.classList.remove("d-none");

        // Richiesta API per ottenere i dettagli del prodotto
        fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
            headers: {
                'Authorization': ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZmY5OTk1ZDRmNjAwMTg1NjI1ODUiLCJpYXQiOjE2OTk2MTA1MjEsImV4cCI6MTcwMDgyMDEyMX0.hYEPcn-L76CabFGLhU-LRslE1QDW2-r9ghqRqDHQot4',
            },
        })
        .then(res => res.json())
        .then(product => {
            // Popolamento dei campi con i dettagli del prodotto
            nome.value = product.name
            description.value = product.description
            price.value = product.price
            brand.value = product.brand
            imgUrl.value = product.imageUrl
            imgRappresent.src = product.imageUrl;
        })
    } else {
        // Interfaccia utente per la creazione di un nuovo prodotto
        document.querySelector("#title").innerText = " Crea Prodotto";
        btnCreate.innerText = "Crea";
        btnDelete.classList.add("d-none");
        nome.value = ""
        description.value = ""
        price.value = ""
        brand.value = ""
        imgUrl.value = ""
    }
    cambiaImmagine();
});

// Evento di eliminazione del prodotto
btnDelete.addEventListener('click', async () => {
    let conferma = confirm("Sei sicuro di volere modificare il prodotto?");
    if (conferma) {
        alert("Prodotto cancellato con successo.");
        try {
            // Richiesta API per eliminare il prodotto
            const resp = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZmY5OTk1ZDRmNjAwMTg1NjI1ODUiLCJpYXQiOjE2OTk2MTA1MjEsImV4cCI6MTcwMDgyMDEyMX0.hYEPcn-L76CabFGLhU-LRslE1QDW2-r9ghqRqDHQot4"
                }
            })
            const deletedObj = await resp.json()
            window.location.assign("./index-0.html")
        } catch (error) {
            console.log(error)
        }
    } else {
        alert("Azione annullata.");
    }
});

// Evento di reset dei campi del form
btnReset.addEventListener('click', async () => {
    let conferma = confirm("Sei sicuro di volere modificare il prodotto?");
    if (conferma) {
        // Reset dei valori dei campi
        nome.value = ""
        description.value = ""
        price.value = ""
        brand.value = ""
        imgUrl.value = ""
    } else {
        // Azione annullata
    }
});

// Evento di invio del form
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newProduct = {
        "name": nome.value,
        "description": description.value,
        "brand": brand.value,
        "imageUrl": imgUrl.value,
        "price": price.value
    };

    try {
        // Richiesta API per creare/modificare il prodotto
        const resp = await fetch(url, {
            method,
            body: JSON.stringify(newProduct),
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZmY5OTk1ZDRmNjAwMTg1NjI1ODUiLCJpYXQiOjE2OTk2MTA1MjEsImV4cCI6MTcwMDgyMDEyMX0.hYEPcn-L76CabFGLhU-LRslE1QDW2-r9ghqRqDHQot4",
                "Content-Type": "application/json"
            }
        })
        window.location.assign("./index-0.html")
        console.log(resp)
    } catch (error) {
        console.log(error)
    }
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

// Evento di input sul campo del prezzo per cambiare l'immagine in anteprima
price.addEventListener("input", () => {
    cambiaImmagine();
});
