/* ESERCIZIO 1
 Scrivi una funzione di nome "area", che riceve due parametri (l1, l2) e calcola l'area del rettangolo associato..
*/

function area (l1,l2){
     return l1*l2
}

console.log(area(10,20))



/* ESERCIZIO 2
 Scrivi una funzione di nome "crazySum", che riceve due numeri interi come parametri.
 La funzione deve ritornare la somma dei due parametri, ma se il valore dei due parametri è il medesimo deve invece tornare
 la loro somma moltiplicata per tre.
*/
function crazySum2(x,y){
     if (x === y) {
          return (x + y)*3;
     } else {
          return x + y
     }
}
console.log(crazySum2(20,20))


//operatore ternario
function crazySum(x,y){
     return x === y ? (x+y) * 3 : x + y;
}

console.log(crazySum(20,20))


/* ESERCIZIO 3
 Scrivi una funzione di nome "crazyDiff" che calcola la differenza assoluta tra un numero fornito come parametro e 19.
 Deve inoltre tornare la differenza assoluta moltiplicata per tre qualora il numero fornito sia maggiore di 19.
*/

function crazyDiff(x,){
     return x < 19 ? Math.abs(x-19) :  Math.abs(x-19)*3
}

console.log(crazyDiff(10))


/* ESERCIZIO 4
 Scrivi una funzione di nome "boundary" che accetta un numero intero n come parametro, e ritorna true se n è compreso tra 20 e 100 (incluso) oppure
 se n è uguale a 400.
*/


function boundary (n) {
     return (n >= 20 && n <= 100) || (n == 400)
}
console.log(boundary(10))


/* ESERCIZIO 5
 Scrivi una funzione di nome "epify" che accetta una stringa come parametro.
 La funzione deve aggiungere la parola "EPICODE" all'inizio della stringa fornita, ma se la stringa fornita comincia già con "EPICODE" allora deve
 ritornare la stringa originale senza alterarla.
*/

function epify(x){
     let parola = x.split("")
     let parola2 = y.split("")
     if (parola[0] === parola2[0]){
      return x
     } else {
     return (x + y)
}}

let y = " : Testo da aggiungere"

console.log(epify("Epicode"))




/* ESERCIZIO 6
 Scrivi una funzione di nome "check3and7" che accetta un numero positivo come parametro. La funzione deve controllare che il parametro sia un multiplo
 di 3 o di 7. (Suggerimento: usa l'operatore modulo)
*/


function check3and7 (x){
     if (x > 0){
     return  x % 3 === 0 || x % 7 === 0
} else {
     return "Il numero è minore di 0"
}}

console.log (check3and7(21))


/* ESERCIZIO 7
 Scrivi una funzione di nome "reverseString", il cui scopo è invertire una stringa fornita come parametro (es. "EPICODE" --> "EDOCIPE")
*/


function reverseString (x) {
     let parola = x.split("");
     parola = parola.reverse()
     return parola.join("")
}

console.log(reverseString("Ciao"))

/* ESERCIZIO 8
 Scrivi una funzione di nome "upperFirst", che riceve come parametro una stringa formata da diverse parole.
 La funzione deve rendere maiuscola la prima lettera di ogni parola contenuta nella stringa.
*/


function upperFirst(x){
     let arrayParole = x.split (" ")
     for (let y = 0; y < arrayParole.length; y++){
          let parola = arrayParole[y];
          arrayParole[y] = parola.charAt(0).toUpperCase() + parola.slice(1)}
          return arrayParole.join(" ")
     }
    
     console.log(upperFirst("La funzione deve rendere maiuscola la prima lettera di ogni parola contenuta nella stringa."))


/* ESERCIZIO 9
 Scrivi una funzione di nome "cutString", che riceve come parametro una stringa. La funzione deve creare una nuova stringa senza il primo e l'ultimo carattere
 della stringa originale.
*/

/*
function cutString (x){
     let arrayParole = x.split(" ")
     for(let y = ){
          let parola = arrayParole[y]
      parola.charAt(0).pop() }
      return arrayParole.join(" ")
}

console.log(cutString("La funzione deve rendere maiuscola la prima lettera di ogni parola contenuta nella stringa."))

*/


/* ESERCIZIO 10
 Scrivi una funzione di nome "giveMeRandom", che accetta come parametro un numero n e ritorna un'array contenente n numeri casuali inclusi tra 0 e 10.
*/



function giveMeRandom (n){
     let arraytipo = [];
     for (let y = 0; y < n; y++){
          let numberRandom = Math.floor(Math.random()*11);
          arraytipo.push(numberRandom);
      }
      return arraytipo;
}

let arrayNrandom = giveMeRandom(4)

console.log(giveMeRandom(4))


export{giveMeRandom};
