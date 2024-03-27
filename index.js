let todoListContainer = document.getElementById("todoListContainer");
let saveBtn = document.getElementById("saveBtn");
let addTodoBtn = document.getElementById("addTodoBtn");
let userInput = document.getElementById("userInput");
let clearBtn = document.getElementById("clearBtn");

function getTodoItemFromLocalStorage() {
  let stringifyTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifyTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoItemFromLocalStorage();

clearBtn.onclick = function () {
  todoListContainer.textContent = "";
  localStorage.removeItem("todoList");
};

saveBtn.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onTodoStatusCheck(checkboxEl, labelId, todoId) {
  let labelEl = document.getElementById(labelId);
  labelEl.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(function (eachItem) {
    let eachTodoId = "todo" + eachItem.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];
  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function deleteTodoFromContainer(todoId) {
  let todoItem = document.getElementById(todoId);
  todoListContainer.removeChild(todoItem);

  let todoObjectIndex = todoList.findIndex(function (eachItem) {
    let eachTodoId = "todo" + eachItem.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(todoObjectIndex, 1);
}

function createAndAppendChild(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let todoListItem = document.createElement("li");
  todoListItem.classList.add("d-flex", "flex-row", "mt-3");
  todoListItem.id = todoId;
  todoListContainer.appendChild(todoListItem);

  let checkboxEl = document.createElement("input");
  checkboxEl.id = checkboxId;
  checkboxEl.type = "checkbox";
  checkboxEl.checked = todo.isChecked;
  checkboxEl.classList.add("checkbox");
  todoListItem.appendChild(checkboxEl);

  checkboxEl.onclick = function () {
    onTodoStatusCheck(checkboxEl, labelId, todoId);
  };

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoListItem.appendChild(labelContainer);

  let labelEl = document.createElement("label");
  labelEl.setAttribute("for", checkboxId);
  labelEl.id = labelId;
  labelEl.textContent = todo.text;
  labelEl.classList.add("label-el");

  if (todo.isChecked === true) {
    labelEl.classList.add("checked");
  } else {
    labelEl.classList.remove("checked");
  }

  labelContainer.appendChild(labelEl);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);

  deleteIcon.onclick = function () {
    deleteTodoFromContainer(todoId);
  };
}

let todoCount = todoList.length;

function onAddTodo() {
  todoCount += 1;
  let userInputVal = userInput.value;
  if (userInputVal === "") {
    alert("Enter Your Task");
    return;
  }

  let newTodo = {
    text: userInputVal,
    uniqueNo: todoCount,
    isChecked: false,
  };

  createAndAppendChild(newTodo);
  todoList.push(newTodo);
  userInput.value = "";
}

addTodoBtn.onclick = function () {
  onAddTodo();
};

for (let eachItem of todoList) {
  createAndAppendChild(eachItem);
}
