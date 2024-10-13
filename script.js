const headerButton = document.querySelector("#buttonHeader");
const containerHeader = document.querySelector(".header_home");
const iconIndex = document.querySelector(".header_home--link");

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
        headerButton.textContent = "Create new Task'/";
    } else {
        // Mostrar o sidebar/ Form "LOCAL STORAGE"
        formTask.style.width = "100vw";
        headerButton.textContent = "My Tasks/";
    }
});


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
        div.innerHTML = `
            <span>${task.title}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delet-button" onclick="removendoTask(${index})">Delete</button>`;

        taskList.appendChild(div);
    });
}
exibeDataInformation();