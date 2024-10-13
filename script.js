const headerButton = document.querySelector("#buttonHeader");
const containerHeader = document.querySelector(".header_home");

const taskTitle = document.getElementById("inpKey");
const taskInput = document.getElementById("inpValue");
const taskList = document.getElementById("taskList");
let tasks = [];
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (e) {
    console.error("Error parsing tasks from localStorage", e);
    localStorage.removeItem("tasks");  // Clear invalid data
}
window.onload = exibeDataInformation();

headerButton.addEventListener('click', () => {
    const formTask = document.getElementById("sidebar");

    if (formTask.style.width === "100vw") {
        // Ocultar o sidebar/ Form "LOCAL STORAGE"
        formTask.style.width = "0";
    } else {
        // Mostrar o sidebar/ Form "LOCAL STORAGE"
        formTask.style.width = "100vw";
    }
}, 20000);




function verificacaoPrompt() {
    const taskMain = taskTitle.value.trim();
    const taskText = taskInput.value.trim();

    if (taskMain === "") {
        alert("O campo de título está vazio");
        return false;
    }

    if (taskText === "") {
        alert("O campo de valor está vazio");
        return false;
    }
    return true;
}

const sendValues = document.querySelector("#btnInsert"); 
sendValues.addEventListener('click', ()=>{
    const title = taskTitle.value;
    const value = taskInput.value;
    if (verificacaoPrompt() === true) {
        tasks.push({
            title: title,
            text: value,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    exibeDataInformation()
    }
    document.getElementById("inpKey").value = "";
    document.getElementById("inpValue").value = "";
});

function removendoTask(index) {
    const result = prompt('voce tem certeza, excluir?\n\nSe não desejar apagar escreva "N", não use ascentos para responder');
    result.toLowerCase();
    if(result !== 'n') {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    
        exibeDataInformation();
    }
}

function editTask(index) {
    const newTextTask = prompt("Edit the Text: ", tasks[index].text);

    if (newTextTask !== null) {
        tasks[index].text = newTextTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        exibeDataInformation();
    }
}

function exibeDataInformation() { 
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.classList.add("container_Task");
        div.setAttribute('data-index', index);  
        div.innerHTML = `
            <span>${task.title}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delet-button" onclick="removendoTask(${index})">Delete</button>`;
        taskList.appendChild(div);

        div.addEventListener('click', function(event) {
            const el = event.target;  // Elemento que foi clicado
            
            if (el.tagName === 'DIV') {  // Verifica se o elemento clicado é uma <DIV>
                const index = el.getAttribute('data-index');  // Pega o índice do data-index
                
                // Busca o item do localStorage pelo índice 
                const selectedItem = tasks[index];  

                if (selectedItem) {  // Se existir um item com esse índice
                    const listingReceita = document.getElementById('taskListAll');
                    listingReceita.innerHTML = ""; 
                    
                    const div = document.createElement("div");
                    div.innerHTML = `
                        <header>
                            <a href="home.html">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="img">
                                    <path fill="#000000" d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                                </svg>
                                <a href="home.html" class="home--link"><span>// My Tasks///</span></a>
                            </a>
                        </header>
                        <section class="section_receitas--open">
                            <div class="section_receitas--title">
                                <span>${selectedItem.title}</span>
                            </div>
                            <div class="section_receitas--edit">
                                <button class="edit_button--open" onclick="editTask(${index})">Edit</button>
                            </div>
                        </section>
                        <br>
                        <br>
                        <span class="task_text--open">${selectedItem.text}</span>`;
                    listingReceita.appendChild(div);
                    listingReceita.classList.add('active');
                }
            }
        }); 
    });   
};


exibeDataInformation();
