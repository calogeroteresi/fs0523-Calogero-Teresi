const caricamento = document.getElementById('caricamento');
caricamento.classList.remove('d-none');

fetch('https://striveschool-api.herokuapp.com/api/product/', {
    headers: {
        'Authorization': ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZmY5OTk1ZDRmNjAwMTg1NjI1ODUiLCJpYXQiOjE2OTk2MTA1MjEsImV4cCI6MTcwMDgyMDEyMX0.hYEPcn-L76CabFGLhU-LRslE1QDW2-r9ghqRqDHQot4',
    },
})
    .then(response => response.json())
    .then(data => {
        caricamento.classList.add('d-none');
        console.log('Prodotti:', data);

        // Verifica se l'array dei prodotti è vuoto
        if (data != [] && data.length > 0) {
            // Creazione delle carte dopo aver ottenuto i dati
            data.forEach(product => {
                const nuovaCard = new Card(
                    product.name,
                    product.description,
                    product.brand,
                    product.imageUrl,
                    product.price,
                    product._id
                );
                return nuovaCard;
            });
        } else {
            // Mostra un messaggio o esegui altre azioni quando l'array è vuoto
            let cards = document.getElementById('cards');
            console.log('Nessun prodotto disponibile');
        }
    })
    .catch(error => {
        console.error('Errore durante il caricamento delle risorse:', error);
        // Mostra un messaggio di errore all'utente con Bootstrap
        showAlert('Si è verificato un errore durante il caricamento delle risorse', 'danger');
        // Nascondi l'indicatore di caricamento
        document.getElementById('loadingIndicator').classList.add('d-none');
    });

function editProductFromHomepage(productId) {
    // Reindirizza l'utente alla pagina di back-office in modalità di modifica per il prodotto specificato
    window.location.href = `/back-office.html?edit=${productId}`;
}

function showAlert(message, type) {
    // Inserisci il messaggio di errore nell'elemento con l'id 'errorAlert'
    const alertElement = document.getElementById('errorAlert');
    alertElement.innerHTML = `
     <div class="alert alert-${type}" role="alert">
       ${message}
     </div>
   `;

    // Aggiungi la classe 'd-none' per nascondere l'elemento
    alertElement.classList.remove('d-none');

    // Nascondi l'elemento dopo un certo periodo di tempo (ad esempio, 5 secondi)
    setTimeout(() => {
        alertElement.classList.add('d-none');
    }, 5000);
}

class Card {
    constructor(namee, description, brand, imageUrl, price, _id) {
        this.cardsContainer = document.getElementById('cards');
        this.card = this.createCard(namee, description, brand, imageUrl, price, _id);
        this.cardsContainer.appendChild(this.card);
    }

    createCard(namee, description, brand, imageUrl, price, _id) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.appendChild(this.createElement('h4', 'title-card', namee));
        card.appendChild(this.createElement('img', 'card-img-top', 'img-card')).src = imageUrl;
        const cardBody = card.appendChild(this.createElement('div', 'card-body', ''));
        cardBody.appendChild(this.createElement('p', 'card-text', description));

        let ul = this.createElement('ul', 'list-group', 'list-group-flush', '');
        ul.appendChild(this.createElement('li', 'list-group-item', `Marchio:  ${brand}`));
        ul.appendChild(this.createElement('li', 'list-group-item', `Prezzo:  €${price}`));
        card.appendChild(ul);

        let cardLinks = this.createElement('div', 'card-body', '');
        let link1 = this.createLink('a', 'card-link', 'Link1');
        let link2 = this.createLink('a', 'card-link', 'Link2');
        link1.textContent = 'Dettagli';
        link2.textContent = 'Modifica';

        // Imposta l'attributo href dinamicamente
        link1.href = `details.html?id=${_id}`;
        link2.href = `index-0.html`;
        link2.addEventListener('click', () => {
            let conferma = confirm("Sei sicuro di volere modificare il prodotto?");
            if (conferma) {
                link2.href = `back-office.html?id=${_id}`;
            } else {
                alert("Azione annullata.")
            }
        });

        cardLinks.appendChild(link1);
        cardLinks.appendChild(link2);
        card.appendChild(cardLinks);

        return card;
    }

    createElement(tag, ...classNames) {
        const element = document.createElement(tag);
        element.classList.add(...classNames.slice(0, -1));
        if (classNames.length > 0) {
            element.textContent = classNames[classNames.length - 1];
        }
        return element;
    }

    createLink(tag, ...classNames) {
        const link = this.createElement(tag, ...classNames);
        link.textContent = 'Link';
        return link;
    }
}


