"use strict";
function gioco(giocatore1, giocatore2) {
    const numberRandom = document.querySelector('.numberRandom');
    const testo = document.querySelector('.testo');
    if (numberRandom && testo) {
        const numeroCasuale = Math.floor(Math.random() * 100) + 1;
        numberRandom.textContent = `Il numero casuale è ${numeroCasuale.toString()}`;
        const distanzaGiocatore1 = Math.abs(numeroCasuale - giocatore1);
        const distanzaGiocatore2 = Math.abs(numeroCasuale - giocatore2);
        if (giocatore1 === numeroCasuale && giocatore2 === numeroCasuale) {
            testo.textContent = "Entrambi i giocatori hanno azzeccato il numero casuale!";
        }
        else if (giocatore1 === numeroCasuale) {
            testo.textContent = "Il giocatore 1 ha indovinato il numero casuale!";
        }
        else if (giocatore2 === numeroCasuale) {
            testo.textContent = "Il giocatore 2 ha indovinato il numero casuale!";
        }
        else if (distanzaGiocatore1 < distanzaGiocatore2) {
            testo.textContent = "Nessuno ha indovinato, ma il giocatore 1 è più vicino al numero casuale!";
        }
        else if (distanzaGiocatore2 < distanzaGiocatore1) {
            testo.textContent = "Nessuno ha indovinato, ma il giocatore 2 è più vicino al numero casuale!";
        }
        else if (distanzaGiocatore1 === distanzaGiocatore2) {
            testo.textContent = "Nessuno ha indovinato, entrambi i giocatori sono alla stessa distanza dal numero casuale!";
        }
    }
    else {
        console.log("Elementi non trovati.");
    }
}
const gameForm = document.getElementById('gameForm');
if (gameForm) {
    gameForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Previeni il comportamento predefinito del form
        const inputGiocatore1 = document.getElementById('player1');
        const inputGiocatore2 = document.getElementById('player2');
        if (inputGiocatore1 && inputGiocatore2) {
            inputGiocatore1.min = '1';
            inputGiocatore1.max = '100';
            inputGiocatore2.min = '1';
            inputGiocatore2.max = '100';
            const valoreGiocatore1 = parseInt(inputGiocatore1.value);
            const valoreGiocatore2 = parseInt(inputGiocatore2.value);
            gioco(valoreGiocatore1, valoreGiocatore2);
        }
    });
}
