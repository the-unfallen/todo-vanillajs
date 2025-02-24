import { CreateTaskDetails } from "./task.js";

export function initializeFunction() {
    const myStarterTasks = [
        {
            myTaskName: "Task 1",
            taskDescription: "Something interesting",
            taskCategory: "shopping",
            taskPriority: "medium",
            myStartDate: new Date(),
            myDueDate: null
        },
        {
            myTaskName: "Task 2",
            taskDescription: "Something nice",
            taskCategory: "personal",
            taskPriority: "high",
            myStartDate: new Date(),
            myDueDate: null
        }
    ];


    let starterLibrary = [];

    for (let i = 0; i < myStarterTasks.length; i++) {
        let taskName = myStarterTasks[i].myTaskName;
        let taskDescription = myStarterTasks[i].taskDescription;
        let taskCategory = myStarterTasks[i].taskCategory;
        let taskPriority = myStarterTasks[i].taskPriority;
        let startDate = myStarterTasks[i].myStartDate;
        let dueDate = myStarterTasks[i].myDueDate;

        let thisTaskDetail = CreateTaskDetails(taskName, taskDescription, startDate, dueDate, taskCategory, taskPriority);
        starterLibrary.push(thisTaskDetail);
        localStorage.setItem('tasksLibrary', JSON.stringify(starterLibrary));
    }


}
