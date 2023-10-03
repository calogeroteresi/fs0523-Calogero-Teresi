/* ESERCIZIO 1
 Scrivi un algoritmo per trovare il più grande tra due numeri interi.
*/
{
  function esercizio1(numero1, numero2) {
    if (numero1 > numero2) {
      return numero1;
    } else if (numero2 > numero1) {
      return numero2;
    } else {
      return "I due numeri sono uguali";
    }
  }
  //Si può creare un'altra funzione che riporti e che si ricolleghi alla funzione qui sopra senza dover richiamare l'esercizio1 per modificarlo e il consolelog
  let numero1 = 15;
  let numero2 = 15;
  let piùgrande = esercizio1(numero1, numero2);
  console.log("Il numero maggiore è:" + piùgrande);

  numero1 = 40;
  piùgrande = esercizio1(numero1, numero2);
  console.log("Il numero maggiore è:" + piùgrande);
}

/* ESERCIZIO 2
  Scrivi un algoritmo che mostri "not equal" in console se un numero intero fornito è diverso da 5.
*/

{
  function esercizio2(numero) {
    if (numero !== 5) {
      console.log("not equal");
      } else {
      console.log("equal")}
      }
    

  let confronto = 10;
  esercizio2(confronto);
  confronto = 5;
  esercizio2(confronto);
}



/* ESERCIZIO 3
  Scrivi un algoritmo che mostri "divisibile per 5" in console se un numero fornito è perfettamente divisibile per 5 (suggerimento: cerca l'operatore modulo su un motore di ricerca)
*/

{
  function esercizio3(numero){
  if (numero % 5 === 0 ){
    console.log(numero + " è un numero divisibile per 5")
  } else {
    console.log(numero + " è un numero divisibile per 5")
  }
}

let confronto = 10
esercizio3(confronto)


}

/* ESERCIZIO 4
  Scrivi un algoritmo per verificare che, dati due numeri interi, il valore di uno di essi sia 8 oppure se la loro addizione/sottrazione sia uguale a 8.
*/
{
let numero1 = 30;
let numero2 = 22;
console.log(numero1 === 8 || numero2 === 8 || numero1 + numero2 === 8 || numero1 - numero2 === 8 || numero2 - numero1 === 8)
}


/* ESERCIZIO 5
  Stai lavorando su un sito di e-commerce. Stai salvando il saldo totale del carrello dell'utente in una variabile "totalShoppingCart".
  C'è una promozione in corso: se il totale del carrello supera 50, l'utente ha diritto alla spedizione gratuita (altrimenti la spedizione ha un costo fisso pari a 10).
  Crea un algoritmo che determini l'ammontare totale che deve essere addebitato all'utente per il checkout.
*/

{
function esercizio5(numero1){
  if (numero1 <= 50) {
      console.log ("Non supera l'ammontare minimo di 50$ per la spedizione gratuita, perciò all'ammontare totale venfono applicati 10$ di spedizione. Totale di:"+ (numero1 + 10)+"$");
  } else (numero1 > 50); {
    console.log ("Lei ha superato l'ammontare minimo di 50$ per la spedizione gratuita. Totale di:"+ numero1 +"$")
  }
  }


let carrello = 60
esercizio5(carrello)
}



/* ESERCIZIO 6
  Stai lavorando su un sito di e-commerce. Oggi è il Black Friday e viene applicato il 20% su ogni prodotto.
  Modifica la risposta precedente includendo questa nuova promozione nell'algoritmo, determinando come prima se le spedizioni sono gratuite oppure no e e calcolando il totale.
*/
{
  function esercizio5(prezzoOriginale){
    let sconto = 0.20;
    let prezzoScontato= prezzoOriginale - (prezzoOriginale * sconto);

    if (prezzoScontato <= 50) {
        console.log ("Non supera l'ammontare minimo di 50$ per la spedizione gratuita, perciò all'ammontare totale vengono applicati 10$ di spedizione e uno sconto del 20% per il Black Friday. Totale di:"+ (prezzoScontato + 10) + "$");
    } else
      console.log ("Lei ha superato l'ammontare minimo di 50$ per la spedizione gratuita ed anche uno sconto del 20% per il Black Friday. Totale di:"+ prezzoScontato +"$")
    }
  
  let prezzoOriginale = 24
  esercizio5(prezzoOriginale)
}


/* ESERCIZIO 7
  Crea tre variabili, e assegna un valore numerico a ciascuna di esse.
  Utilizzando un blocco condizionale, crea un algoritmo per ordinarle secondo il loro valore, dal più alto al più basso.
  Alla fine mostra il risultato in console.
*/
{
let numero1 = 10;
let numero2 = 40;
let numero3 = 50;

if (numero1 >= numero2 && numero1 >= numero3){
  if (numero2 >= numero3){
    console.log("Ordine decrescente:" + numero1 +","+ numero2 +","+ numero3);
  } else{
  console.log("Ordine decrescente:" + numero1 +","+ numero3 +","+ numero2);
}
} else if (numero2 >= numero1 && numero2 >= numero3){
  if (numero3 >= numero2){
    console.log("Ordine decrescente:" + numero1 +","+ numero2 +","+ numero3);
  } else{
  console.log("Ordine decrescente:" + numero1 +","+ numero3 +","+ numero2);
}
}


/* ESERCIZIO 8
  Crea un algoritmo per verificare che un valore fornito sia un numero oppure no (suggerimento: cerca su un motore di ricerca "typeof").
*/
{
let numero1= 40
console.log(typeof numero1)



}
/* ESERCIZIO 9
  Crea un algoritmo per controllare se un numero fornito sia pari o dispari (suggerimento: cerca l'operatore modulo su un motore di ricerca)
*/








/* ESERCIZIO 10
  Modifica la logica del seguente algoritmo in modo che mostri in console il messaggio corretto in ogni circostanza.
  let val = 7
  if (val < 10) {
      console.log("Meno di 10");
    } else if (val < 5) {
      console.log("Meno di 5");
    } else {
      console.log("Uguale a 10 o maggiore");
    }
*/

/* ESERCIZIO 11
  Fornito il seguente oggetto, scrivi del codice per aggiungere una proprietà "city", il cui valore sarà "Toronto".
*/

/*const me = {
  name: 'John',
  lastName: 'Doe',
  skills: ['javascript', 'html', 'css'],
}
/*


/* ESERCIZIO 12
  Lavorando sempre sull'oggetto precedentemente fornito, scrivi del codice per rimuovere la proprietà "lastName".
*/

/* ESERCIZIO 13
  Lavorando sempre sull'oggetto precedentemente fornito, scrivi del codice per rimuovere l'ultimo elemento della proprietà "skills".
*/

/* ESERCIZIO 14
  Scrivi del codice per creare un array inizialmente vuoto. Riempilo successivamente con i numeri da 1 a 10.
*/

/* ESERCIZIO 15
  Scrivi del codice per sostituire l'ultimo elemento dell'array, ovvero il valore 10, con il valore 100.
*/
