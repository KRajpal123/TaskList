const addBtn = document.getElementById("addTaskButton");
const TaskCompleted = document.getElementById("completedList");
const TaskList = document.getElementById("taskList");

// Loading task list when page reloads

window.addEventListener("load", function () {
  const stortask = JSON.parse(localStorage.getItem("tasks"));
  if (stortask) {
    stortask.forEach((element) => {
      const ListItem = createElement(element); //function called
      TaskList.appendChild(ListItem);
    });
  }
});

// event listner each btn click
addBtn.addEventListener("click", function () {
  const listItems = createElement(); // function calling
  if (listItems) {
    TaskList.appendChild(listItems);
    SaveTaskLocalStorage(listItems.textContent); // fn call passing arg.
  }
});

function createElement(userInputs = "") {
  // if user click btn without value. userInputs value is default to string
  if (userInputs === "") {
    userInputs = document.getElementById("userInputs").value;
  }

  if (userInputs === "") {
    return null; // if userInputs is empty string. It returns nothing.
  }
  const createList = document.createElement("li");

  // create checkBox
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("click", function () {
    createList.classList.toggle("completedList");

    if (createList.classList.toggle("completedList")) {
      completedList.appendChild(createList.cloneNode(true)); // Moving to task completed container
      createList.remove(); // removing elem from task list.
    } else {
      TaskList.appendChild(createList.cloneNode(true));
      createList.remove();
    }
    Update();
  });

  //create delete icon

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash";
  deleteIcon.addEventListener("click", function () {
    createList.remove();
    Update();
  });
  createList.appendChild(checkBox);
  createList.appendChild(document.createTextNode(userInputs));
  createList.appendChild(deleteIcon);
  return createList;
}

// saveTask fn
function SaveTaskLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Update Local storage.
function Update() {
  const tasks = Array.from(TaskList.children).map((task) =>
    task.textContent.trim()
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
