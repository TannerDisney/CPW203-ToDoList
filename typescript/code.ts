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