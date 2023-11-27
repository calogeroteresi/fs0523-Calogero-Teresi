let taskInput = document.getElementById("task-input")
let addTask = document.querySelector("#add-task")
let lista = document.getElementById("lista")

addTask.addEventListener("click", function () {
     let taskTesto = taskInput.value.trim();
     if (taskTesto !== '') {
          let puntiLista = document.createElement('li');
          puntiLista.innerHTML = `
     <span>${taskTesto}</span>
     <button class="elimina">Elimina</button>`;

          lista.appendChild(puntiLista);
          taskInput.value = '';

          let elimina = puntiLista.querySelector('.elimina');
          elimina.addEventListener('click', function () {
               lista.removeChild(puntiLista);
          
          });
          puntiLista.addEventListener('click',function(){
               puntiLista.classList.toggle('completo');
          });
     } else {
          taskInput.placeholder = 'Compila';
     }
})

taskInput.addEventListener('input',function(){
     if (taskInput.value.trim() !== ''){
          taskInput.placeholder = 'Aggiungi una nuova attività';
     } else {
          taskInput.placeholder = 'Compila';
     }
})









/* taskInput.style.border = "1px solid red";
 taskInput.placeholder= "Compila";
 valid = false;
}else{
 taskInput.style.border = "";
 taskInput.placeholder= '';
}
})


*/