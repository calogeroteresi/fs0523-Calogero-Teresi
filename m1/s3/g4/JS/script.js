const generaNumeri = function (){
     let banco = document.getElementById("banco")
     for(let i = 1; i <= 90; i++){
          let numeriTabellone = document.createElement("div");
          numeriTabellone.textContent = i;
          banco.appendChild(numeriTabellone);
          numeriTabellone.classList.add("numeriTabellone")

     }
}
generaNumeri()

function generaNumeroCasuale(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
}



     let extract = document.querySelector('.extract');
     extract.addEventListener('click',function(){
     let banco = document.getElementById("banco")
     if (banco.childElementCount >= 90){
          alert("Tombola completata");
          return
     } for(let i = 1; i)
     })
