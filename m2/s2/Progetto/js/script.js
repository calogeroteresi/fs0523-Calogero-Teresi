
  const dropdown = document.getElementById('custom-dropdown');
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');

  dropdownToggle.addEventListener('mouseenter', function () {
    dropdownMenu.style.display = 'block';
  });

  dropdownToggle.addEventListener('mouseleave', function () {
    dropdownMenu.style.display = 'none';
  });

  dropdownMenu.addEventListener('mouseenter', function () {
    dropdownMenu.style.display = 'block';
  });

  dropdownMenu.addEventListener('mouseleave', function () {
    dropdownMenu.style.display = 'none';
  });


document.querySelector('.searchTab').addEventListener('click', function(e) {
     e.preventDefault();
     const input = document.getElementById('search-input');
     this.style.display = 'none';
     input.style.display = 'block';
     input.style.width = '200px';
     document.querySelector('.bell-container').classList.add('offset-2')
   });

   const heroImage = document.querySelector('.heroImage');
   const heroHeight = heroImage.clientHeight;
   const sectionType = document.querySelector('.section-type');
   const headerFixed = document.querySelector('.header-fixed');

window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight - 400) {
        headerFixed.style.backgroundColor = 'rgba(20,20,20,255)';
    } else {
        headerFixed.style.backgroundColor = '';
       
    }
});


let marginMain = heroHeight + 20;
const testoSuccessivo = document.querySelector('.testo-successivo');
testoSuccessivo.style.marginTop = `${marginMain}px`;

let immagini = [
  'Netflix-assets/assets/media/media0.webp',
  'Netflix-assets/assets/media/media1.jpg',
  'Netflix-assets/assets/media/media2.webp',
  'Netflix-assets/assets/media/media3.webp',
  'Netflix-assets/assets/media/media4.jpg',
  'Netflix-assets/assets/media/media5.webp',
  'Netflix-assets/assets/media/media6.jpg',
  'Netflix-assets/assets/media/media7.webp',
  'Netflix-assets/assets/media/media8.webp',
  'Netflix-assets/assets/media/media9.jpg',
  'Netflix-assets/assets/media/media10.jpg',
  'Netflix-assets/assets/media/media11.jpg',
  'Netflix-assets/assets/media/media12.jpg',
  'Netflix-assets/assets/media/media13.jpg',
  'Netflix-assets/assets/media/media14.webp',
  'Netflix-assets/assets/media/media15.jpg',
  'Netflix-assets/assets/media/media16.webp',
  'Netflix-assets/assets/media/media17.jpg',
  'Netflix-assets/assets/media/media18.jpg',
  'Netflix-assets/assets/media/media19.webp',
  'Netflix-assets/assets/media/media20.jpg',
  'Netflix-assets/assets/media/media21.webp',
  'Netflix-assets/assets/media/media22.webp',
  'Netflix-assets/assets/media/media23.webp',
  'Netflix-assets/assets/media/media24.jpg',
  'Netflix-assets/assets/media/media25.webp',
  'Netflix-assets/assets/media/media26.webp',
  'Netflix-assets/assets/media/media27.jpg',
  'Netflix-assets/assets/media/media28.jpg',
  'Netflix-assets/assets/media/media29.jpg',
  'Netflix-assets/assets/media/media30.jpg',
  'Netflix-assets/assets/media/media31.webp',
  'Netflix-assets/assets/media/media32.jpg',
]
// Numero di film da visualizzare inizialmente

// Shuffla l'array delle immagini in modo casuale
const filmList = document.querySelector('.film-list');
const filmList2 = document.querySelector('.film-list2');
const filmList3 = document.querySelector('.film-list3');
let numeroFilmIniziali = 6;
let numeroFilmIniziali2 = 6;
let numeroFilmIniziali3 = 6;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(immagini);
const indiceCasuale = Math.floor(Math.random() * immagini.length);
const immagineCasuale = document.createElement('img');
immagineCasuale.src = immagini[indiceCasuale];
immagineCasuale.alt = 'Immagine casuale';
immagineCasuale.classList.add('hero', 'static-image', 'image-layer');
heroImage.appendChild(immagineCasuale);


function appendChildFilm(lista, codiceSlide) {
  shuffleArray(immagini);
for (let i = 0; i < immagini.length; i++) {
  const image = document.createElement('img');
  image.src = immagini[i];
  image.alt = 'Film';
  image.classList.add(codiceSlide, 'img-fluid');
  lista.appendChild(image);
}}

appendChildFilm(filmList,'slide-img' );
appendChildFilm(filmList2,'slide-img2' );
appendChildFilm(filmList3, 'slide-img3' );



const scrollLeft = document.querySelector('.scroll-left');
const scrollRight = document.querySelector('.scroll-right');
const larghezzaFilm = 220; // Larghezza di ciascun film in pixel (assicurati che corrisponda al valore SCSS)
let filmAttuali = 0;
const filmTotali = document.querySelectorAll('.slide-img').length;

scrollLeft.addEventListener('click', () => {
  if (filmAttuali > 0) {
    filmAttuali--;
    updateCarousel();
    
    console.log('filmAttuali:', filmAttuali);
  }else {
    // Se siamo già all'inizio, torna alla fine del carousel
    filmAttuali = filmTotali - numeroFilmIniziali;
  }
});

scrollRight.addEventListener('click', () => {
  if (filmAttuali < filmTotali - numeroFilmIniziali) {
    filmAttuali++;
    updateCarousel();
    console.log('filmAttuali:', filmAttuali);
  }else{
    filmAttuali = 0;
    updateCarousel();
  }
});

function updateCarousel() {
  const offset = filmAttuali * larghezzaFilm;
  filmList.style.transform = `translateX(-${offset}px)`;
}

// Assicurati di eseguire questa funzione all'avvio per inizializzare il carousel
updateCarousel();

const overlay = document.querySelector('.overlay');

overlay.addEventListener('mousedown', (event) => {
  event.preventDefault(); // Evita il comportamento predefinito, ad esempio la selezione di testo
  return false; // Evita la propagazione dell'evento
});


console.log('filmAttuali:', filmAttuali);
















//ho provato diversi modi ma per non perdere tempo ho risolto cosi, con maggiore calma avrei creato una funzione carousel per gestirli in un'unica volta


















const scrollLeft2 = document.querySelector('.scroll-left2');
const scrollRight2 = document.querySelector('.scroll-right2');
const larghezzaFilm2 = 220; // Larghezza di ciascun film in pixel (assicurati che corrisponda al valore SCSS)
let filmAttuali2 = 0;

const filmTotali2 = document.querySelectorAll('.slide-img2').length;

scrollLeft2.addEventListener('click', () => {
  if (filmAttuali2 > 0) {
    filmAttuali2--;
    updateCarousel2();
    console.log('filmAttuali:', filmAttuali);
  }else {
    // Se siamo già all'inizio, torna alla fine del carousel
    filmAttuali2 = filmTotali2 - numeroFilmIniziali2;
  }
});

scrollRight2.addEventListener('click', () => {
  if (filmAttuali2 < filmTotali2 - numeroFilmIniziali2) {
    filmAttuali2++;
    updateCarousel2();
    console.log('filmAttuali:', filmAttuali2);

  }else{
    filmAttuali2 = 0;
    updateCarousel2();
  }
});

function updateCarousel2() {
  const offset2 = filmAttuali2 * larghezzaFilm2;
  filmList2.style.transform = `translateX(-${offset2}px)`;
}

// Assicurati di eseguire questa funzione all'avvio per inizializzare il carousel
updateCarousel2();3
const overlay2 = document.querySelector('.overlay');

overlay2.addEventListener('mousedown', (e) => {
  e.preventDefault(); // Evita il comportamento predefinito, ad esempio la selezione di testo
  return false; // Evita la propagazione dell'evento
});


console.log('filmAttuali:', filmAttuali2);




const scrollLeft3 = document.querySelector('.scroll-left3');
const scrollRight3 = document.querySelector('.scroll-right3');
const larghezzaFilm3 = 220; // Larghezza di ciascun film in pixel (assicurati che corrisponda al valore SCSS)
let filmAttuali3 = 0;
const filmTotali3 = document.querySelectorAll('.slide-img3').length;

scrollLeft3.addEventListener('click', () => {
  if (filmAttuali3 > 0) {
    filmAttuali3--;
    updateCarousel3();
    console.log('filmAttuali:', filmAttuali3);
  }else {
    // Se siamo già all'inizio, torna alla fine del carousel
    filmAttuali3 = filmTotali3 - numeroFilmIniziali3;
  }
});

scrollRight3.addEventListener('click', () => {
  if (filmAttuali3 < filmTotali3 - numeroFilmIniziali3) {
    filmAttuali3++;
    updateCarousel3();
    console.log('filmAttuali:', filmAttuali3);
    
  }else{
    filmAttuali3 = 0;
    updateCarousel3();
  }
});

function updateCarousel3() {
  const offset3 = filmAttuali3 * larghezzaFilm3;
  filmList3.style.transform = `translateX(-${offset3}px)`;
}

// Assicurati di eseguire questa funzione all'avvio per inizializzare il carousel
updateCarousel3();

const overlay3 = document.querySelector('.overlay');

overlay3.addEventListener('mousedown', (e) => {
  e.preventDefault(); // Evita il comportamento predefinito, ad esempio la selezione di testo
  return false; // Evita la propagazione dell'evento
});


console.log('filmAttuali:', filmAttuali3);





