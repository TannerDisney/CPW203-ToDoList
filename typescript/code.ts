/**
 * Represents a single task in a Todo List
 */
class ToDoItem
{
    title:string;
    description:string;
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
    urgency:string;
}
/*
    let testItem = new ToDoItem();
    testItem.title = "Teach CPW 203";
    testItem.description = "Lecture Advanced Javascript."
    testItem.startDate = new Date("April 30, 2019");
    testItem.endDate = new Date("May 1, 2019");
    testItem.isComplete = true;
*/

//When Add Item is clicked
    //Get data off the page and wrap in ToDo object
    //Notify user and clear form
    //Save ToDo object

    window.onload = function()
    {
        let addBtn = <HTMLButtonElement>
            document.querySelector("#create-item > button");
        addBtn.onclick = processNewItem;
    
        let readItemBtn = <HTMLElement>
            document.getElementById("read-button");
        readItemBtn.onclick = readItem;
    }
    
    const itemKey:string = "todo";
    
    function readItem()
    {
        //get item from storage
        let item:ToDoItem = 
            JSON.parse(localStorage.getItem(itemKey));
    
        alert(item.title);
        alert(item.description);
    }
    
    function processNewItem()
    {
        let item:ToDoItem = getItemFromForm();
        saveItem(item);
        notifyUser();
        clearForm();
        displayToDo(item);
    }

    function displayToDo(item:ToDoItem)
    {
        let todoList = document.getElementById("todo-list");
        let itemPara = document.createElement("p");
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

    function toggleItemComplete()
    {
        let currItem:HTMLElement = this;
        currItem.classList.toggle("completed");
        let title = currItem.innerText;
        let desc = currItem.getAttribute("data-desc");
        alert("--Completed ToDo-- " + "\n" + title);
    }
    
    function clearForm()
    {
        //We could alternatively, wrap all inputs in
        //a <form> and reset the form
    
        //clear all textboxes and textarea
        let textElements =
            document.querySelectorAll("input[type=text], textarea");
        for(let i = 0; i < textElements.length; i++)
        {
            (<HTMLInputElement>textElements[i]).value = "";
        }
    
        //uncheck is complete
        let isCompleteBox = <HTMLInputElement>
                    document.querySelector("#is-complete");
        isCompleteBox.checked = false;
    
        //reset select list
        let urgencyList = <HTMLSelectElement>
            document.querySelector("#urgency");
        urgencyList.selectedIndex = 0;
    }
    
    function notifyUser()
    {
        alert("Todo Item was saved successfully.");
        console.log("ToDo Item was saved to local storage successfully.");
    }
    
    function saveItem(item:ToDoItem):void
    {
    
        let data:string = JSON.stringify(item);
        console.log("Converting todoitem into JSON string...");
        console.log(data);
    
        //ensure user can use localStorage
        if(typeof(Storage) != "undefined")
        {
            localStorage.setItem(itemKey, data);
        }
    }
    
    /**
     * Get all user input from Form
     * and wrap it in a ToDoItem
     */
    function getItemFromForm():ToDoItem
    {
        let item = new ToDoItem();
    
        item.title = 
            (<HTMLInputElement>document.getElementById("title")).value;
        item.description = 
            (<HTMLTextAreaElement>document.getElementById("description")).value;
    
        let itemStartDate:string = 
            (<HTMLInputElement>document.getElementById("due-date")).value;
        item.startDate = new Date(itemStartDate);
    
        let itemEndDate:string = 
            (<HTMLInputElement>document.getElementById("due-date2")).value;
        item.endDate = new Date(itemEndDate);
    
        let urgencyElem = <HTMLSelectElement>document.getElementById("urgency");
        item.urgency = urgencyElem.options[urgencyElem.selectedIndex].text;
    
        return item;
    }