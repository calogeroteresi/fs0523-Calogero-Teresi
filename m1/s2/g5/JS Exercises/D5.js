/*
REGOLE
- Tutte le risposte devono essere scritte in JavaScript
- Puoi usare Google / StackOverflow ma solo quanto ritieni di aver bisogno di qualcosa che non è stato spiegato a lezione
- Puoi testare il tuo codice in un file separato, o de-commentando un esercizio alla volta
- Per visualizzare l'output, lancia il file HTML a cui è collegato e apri la console dagli strumenti di sviluppo del browser. 
- Utilizza dei console.log() per testare le tue variabili e/o i risultati delle espressioni che stai creando.
*/

/* ESERCIZIO 1
    Dato il seguente array, scrivi del codice per stampare ogni elemento dell'array in console.
*/
const pets = ['dog', 'cat', 'hamster', 'redfish']
for  (let x = 0 ; x < pets.length; x++){
  console.log(pets[x])
}

/* ESERCIZIO 2
    Scrivi del codice per ordinare alfabeticamente gli elementi dell'array "pets".
*/
pets.sort();
console.log(pets)
/* ESERCIZIO 3
    Scrivi del codice per stampare nuovamente in console gli elementi dell'array "pets", questa volta in ordine invertito.
*/

pets.reverse()
console.log(pets);

/* ESERCIZIO 4
    Scrivi del codice per spostare il primo elemento dall'array "pets" in ultima posizione.
*/
firstPet= pets[0]
pets[0] = pets[pets.length-1]
pets[pets.length-1] = firstPet


/* ESERCIZIO 5
    Dato il seguente array di oggetti, scrivi del codice per aggiungere ad ognuno di essi una proprietà "licensePlate" con valore a tua scelta.
*/
const cars = [
  {
    brand: 'Ford',
    model: 'Fiesta',
    color: 'red',
    trims: ['titanium', 'st', 'active'],
  },
  {
    brand: 'Peugeot',
    model: '208',
    color: 'blue',
    trims: ['allure', 'GT'],
  },
  {
    brand: 'Volkswagen',
    model: 'Polo',
    color: 'black',
    trims: ['life', 'style', 'r-line'],
  },
]



let plate= 'XY783HD'
 for  (let x = 0 ; x < cars.length; x++){
  cars[x].licensePlate = "XY783HD"
 }
console.log(cars)

/* ESERCIZIO 6
    Scrivi del codice per aggiungere un nuovo oggetto in ultima posizione nell'array "cars", rispettando la struttura degli altri elementi.
    Successivamente, rimuovi l'ultimo elemento della proprietà "trims" da ogni auto.
*/

let fiat = {
  brand:'Fiat',
  model:'Punto',
  color:'gray',
  trims:['allure', 'GT']
}
cars.push(fiat)
console.log(cars[3])


  for  (let x = 0 ; x < cars.length; x++){
      let index = cars[x]
      let indice = index.trims
      delete indice[indice.length - 1]
       }

console.log(cars)


/* ESERCIZIO 7
    Scrivi del codice per salvare il primo elemento della proprietà "trims" di ogni auto nel nuovo array "justTrims", sotto definito.
*/
const justTrims = []

for  (let x = 0 ; x < cars.length; x++){
  let index = cars[x]
  let indice = index.trims
  justTrims.push(indice[0])
}
console.log(justTrims)

/* ESERCIZIO 8
    Cicla l'array "cars" e costruisci un if/else statament per mostrare due diversi messaggi in console. Se la prima lettera della proprietà
    "color" ha valore "b", mostra in console "Fizz". Altrimenti, mostra in console "Buzz".
*/



for  (let x = 0 ; x < cars.length; x++){
  let indice = cars[x]
  let firstLetter = indice.color[0]
  if (firstLetter = 'b'){
    console.log("Fizz")
  }else console.log("Buzz")
}





/* ESERCIZIO 9
    Utilizza un ciclo while per stampare in console i valori del seguente array numerico fino al raggiungimento del numero 32.
*/
const numericArray = [
  6, 90, 45, 75, 84, 98, 35, 74, 31, 2, 8, 23, 100, 32, 66, 313, 321, 105,
]

let x = 0
while (x < numericArray.length){
  let numero = numericArray[x];
  console.log(numero);
  if (numero === 32) {
    break;
  }
  x++;
}


/* ESERCIZIO 10
    Partendo dall'array fornito e utilizzando un costrutto switch, genera un nuovo array composto dalle posizioni di ogni carattere all'interno
    dell'alfabeto italiano.
    es. [f, b, e] --> [6, 2, 5]
*/
const charactersArray = ['g', 'n', 'u', 'z', 'd']
let number = []

for  (let x = 0 ; x < charactersArray.length; x++){
  let lettera = charactersArray[x]
  let number = [];
  switch (lettera){
    case'a' :
      number.push(1);
      break;
    case'b' :
      number.push(2);
      break;
    case'c' :
      number.push(3);
      break;
    case'd' :
      number.push(4);
      break;
    case'e' :
      number.push(5);
      break;
    case'f' :
      number.push(6);
      break;
    case'g' :
      number.push(7);
      break;
    case'h' :
      number.push(8);
      break;
    case'i' :
      number.push(9);
      break;
    case'l' :
      number.push(10);
      break;
    case'm' :
      number.push(11);
      break;
    case'n' :
      number.push(12);
      break;
    case'o' :
      number.push(13);
      break;
    case'p' :
      number.push(14);
      break;
    case'q' :
      number.push(15);
      break;
    case'r' :
      number.push(16);
      break;
    case's' :
      number.push(17);
      break;
    case't' :
      number.push(18);
      break;
    case'u' :
      number.push(19);
      break;
    case'v' :
      number.push(20);
      break;
    case'z' :
      number.push(21);
      break;
      default:
      number.push(0);
  }
}
console.log(number)


