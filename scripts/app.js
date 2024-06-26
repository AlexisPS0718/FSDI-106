let tasks = [];

window.onload = init;

function init() {
  const inputTitle = $("#inputTitle");
  const inputDescription = $("#inputDescription");
  const inputColor = $("#inputColor");
  const inputDate = $("#inputDate");
  const inputStatus = $("#inputStatus");
  const inputBudget = $("#inputBudget");

  let task1 = new Task("Code", "Write a small program", "#76ABAE", "31/03/2014 07:38 p. m.", "New", 150);

  tasks.push(task1);

  $("#register").click(register);
  $("#hide").click(hideForm);
  $("#search").click(search);
  $("#delete").click(deleteAll);
  $("#showAll").click(loadTasks);

  displayTasks();
  loadTasks();
}

function testRequest() {
  $.ajax({
    type: "DELETE",
    url: "http://fsdiapi.azurewebsites.net",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      alert("An error has occured: " + error);
    }
  })
}

function register() {
  let newTask = new Task(inputTitle.value, inputDescription.value, inputColor.value, inputDate.value, inputStatus.value, Number(inputBudget.value));

  if (isValid(newTask)) {
    tasks.push(newTask);
    clearForm();

    $.ajax({
      type: "POST",
      url: "http://fsdiapi.azurewebsites.net/api/tasks/",
      data: JSON.stringify(newTask),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      }
    });

    loadTasks();
    displayTask(newTask);
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
  let taskStatus = '';
  cards = '';

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

    cards += `
      <div class="card" style="background-color: ${task.color};">
        <p class="fw-bold">${taskStatus}</p>
        <p class="fw-bold">${task.title}</p>
        <p><span class="fw-bold">Description: </span>${task.description}</p>
        <p><span class="fw-bold">Starting date: </span>${task.date}</p>
        <p><span class="fw-bold">Budget: </span>$${task.budget}</p>
      </div>
    `;
  }

  $("#list").html(cards);
}

function displayTask(task) {
  let taskStatus = '';
  card = '';

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

  card = `
      <div class="card" style="background-color: ${task.color};">
        <p class="fw-bold">${taskStatus}</p>
        <p class="fw-bold">${task.title}</p>
        <p><span class="fw-bold">Description: </span>${task.description}</p>
        <p><span class="fw-bold">Starting date: </span>${task.date}</p>
        <p><span class="fw-bold">Budget: </span>$${task.budget}</p>
      </div>
    `;

  $("#list").append(card);
}

function hideForm() {
  const newButton = document.createElement('button');

  newButton.setAttribute('id', 'show-form');
  newButton.setAttribute('onclick', 'showForm()');
  newButton.innerHTML = `Show form`;

  $("#form").css("display", "none");
  $("#list").append(newButton);
}

function showForm() {
  $("#show-form").remove();
  $("#form").css("display", "block");
  $("html, body").scrollTop(0);
}

function loadTasks() {
  deleteAll();

  $.ajax({
    type: "GET",
    url: "http://fsdiapi.azurewebsites.net/api/tasks",
    success: function (response) {
      let data = JSON.parse(response);

      for (let i = 0; i < data.length; i++) {
        displayTask(data[i]);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function searchTask(name) {
  $.ajax({
    type: "GET",
    url: "http://fsdiapi.azurewebsites.net/api/tasks",
    success: function (response) {
      let data = JSON.parse(response);
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === name) {
          displayTask(data[i]);
        }
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function search() {
  deleteAll();
  let name = $("#inputSearch").val();
  searchTask(name);
}

function deleteAll() {
  $("#list").html("");
}