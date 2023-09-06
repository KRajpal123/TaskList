const addBtn = document.getElementById("addTaskButton");
const TaskCompleted = document.querySelector(".completedList");
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
  checkBox.className = "check";

  // checkBox.addEventListener("click", function () {
  //   createList.classList.toggle("completedList");

  //   if (createList.classList.contains("completedList")) {
  //     TaskCompleted.appendChild(createList.cloneNode(true)); // Moving to task completed container
  //     createList.remove(); // removing elem from task list.
  //   } else {
  //     TaskList.appendChild(createList.cloneNode(true));
  //     createList.remove();
  //   }
  //   Update();
  // });

  checkBox.addEventListener("click", function () {
    if (checkBox.checked) {
      createList.classList.add("completedList");
      TaskCompleted.appendChild(createList.cloneNode(true));
    } else {
      createList.classList.remove("completedList");
      TaskList.appendChild(createList.cloneNode(true));
    }
    createList.remove(); // Remove the task after moving it
    Update();
  });
  
  TaskCompleted.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("fa-trash")) {
      e.target.parentElement.remove();
      Update();
    }
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

  document.getElementById("userInputs").value = "";

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
