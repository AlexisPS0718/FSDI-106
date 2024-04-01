let tasks = [];
let inputTitle;
let inputDescription;
let inputColor;
let inputDate;
let inputStatus;
let inputBudget;

window.onload = init;

function Task(title, description, color, date, status, budget) {
  this.title = title;
  this.description = description;
  this.color = color;
  this.date = date;
  this.status = status;
  this.budget = budget;
}

function init() {
  let task1 = new Task("Code", "Write a small program", "#76ABAE", "31/03/2014 07:38 p. m.", "New", 150);

  tasks.push(task1);

  inputTitle = document.getElementById("inputTitle");
  inputDescription = document.getElementById("inputDescription");
  inputColor = document.getElementById("inputColor");
  inputDate = document.getElementById("inputDate");
  inputStatus = document.getElementById("inputStatus");
  inputBudget = document.getElementById("inputBudget");

  displayTasks();
}

function register() {
  let newTask = new Task(inputTitle.value, inputDescription.value, inputColor.value, inputDate.value, inputStatus.value, Number(inputBudget.value));

  if (isValid(newTask)) {
    tasks.push(newTask);
    clearForm();
    displayTasks();
  }
}

function isValid(task) {
  if (!task.title || !task.description || !task.color || !task.date || !task.status || !task.budget) {
    return false;
  }

  return true;
}

function clearForm() {
  inputTitle.value = '';
  inputDescription.value = '';
  inputColor.value = '#76ABAE';
  inputDate.value = '';
  inputStatus.selectedIndex = '0';
  inputBudget.value = '';
}

function displayTasks() {
  const TASK_LIST = document.getElementById('list');
  let taskStatus = '';
  card = '';

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    switch (task.status) {
      case "New":
        taskStatus = '✨ New';
        break;
      case "In progress":
        taskStatus = '⏳ In progress';
        break;
      case "Completed":
        taskStatus = '✔️ Completed';
        break;
      case "Cancelled":
        taskStatus = '❌ Cancelled';
        break;
      default:
        break;
    }

    card += `
      <div class="card" style="background-color: ${task.color};">
        <p class="fw-bold">${taskStatus}</p>
        <p class="fw-bold">${task.title}</p>
        <p><span class="fw-bold">Description: </span>${task.description}</p>
        <p><span class="fw-bold">Date: </span>${task.date}</p>
        <p><span class="fw-bold">Budget: </span>$${task.budget}</p>
      </div>
    `;
  }

  TASK_LIST.innerHTML = card;
}

function hideForm() {
  const TASK_LIST = document.getElementById('list');
  const FORM = document.getElementById('form');

  const newButton = document.createElement('button');
  newButton.setAttribute('id', 'show-form');
  newButton.setAttribute('onclick', 'showForm()');
  newButton.innerHTML = `Show form`;

  FORM.style.display = 'none';
  TASK_LIST.appendChild(newButton);
}

function showForm() {
  const FORM = document.getElementById('form');

  document.getElementById('show-form').remove();

  FORM.style.display = 'block';
}
