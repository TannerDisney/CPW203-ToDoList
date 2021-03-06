var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addBtn = document.querySelector("#create-item > button");
    addBtn.onclick = processNewItem;
    var readItemBtn = document.getElementById("read-button");
    readItemBtn.onclick = readItem;
};
var itemKey = "todo";
function readItem() {
    var item = JSON.parse(localStorage.getItem(itemKey));
    alert(item.title);
    alert(item.description);
}
function processNewItem() {
    var item = getItemFromForm();
    saveItem(item);
    notifyUser();
    clearForm();
    displayToDo(item);
}
function displayToDo(item) {
    var todoList = document.getElementById("todo-list");
    var itemPara = document.createElement("p");
    itemPara.innerText =
        "Title: " + item.title + "\n" +
            "Description: " + item.description + "\n" +
            "Start Date: " + item.startDate + "\n" +
            "End Date: " + item.endDate + "\n" +
            "Urgency: " + item.urgency;
    itemPara.setAttribute("data-desc", item.description);
    itemPara.onclick = toggleItemComplete;
    todoList.appendChild(itemPara);
}
function toggleItemComplete() {
    var currItem = this;
    currItem.classList.toggle("completed");
    var title = currItem.innerText;
    var desc = currItem.getAttribute("data-desc");
    // alert("--Completed ToDo-- " + "\n" + title);
}
function clearForm() {
    var textElements = document.querySelectorAll("input[type=text], textarea");
    for (var i = 0; i < textElements.length; i++) {
        textElements[i].value = "";
    }
    var urgencyList = document.querySelector("#urgency");
    urgencyList.selectedIndex = 0;
}
function notifyUser() {
    //alert("Todo Item was saved successfully.");
    console.log("ToDo Item was saved to local storage successfully.");
}
function saveItem(item) {
    var data = JSON.stringify(item);
    console.log("Converting todoitem into JSON string...");
    console.log(data);
    if (typeof (Storage) != "undefined") {
        localStorage.setItem(itemKey, data);
    }
}
function getItemFromForm() {
    var item = new ToDoItem();
    item.title =
        document.getElementById("title").value;
    item.description =
        document.getElementById("description").value;
    var itemStartDate = document.getElementById("due-date").value;
    item.startDate = new Date(itemStartDate);
    var itemEndDate = document.getElementById("due-date2").value;
    item.endDate = new Date(itemEndDate);
    var urgencyElem = document.getElementById("urgency");
    item.urgency = urgencyElem.options[urgencyElem.selectedIndex].text;
    return item;
}
