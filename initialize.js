import { CreateTaskDetails } from "./task.js";
// import { myTasksDetailsLibrary } from "./index.js";

export function initializeFunction() {
    const myStarterTasks = [
        {
            myTaskName: "Go shopping",
            taskDescription: "Buy some clothes",
            taskCategory: "shopping",
            taskPriority: "medium",
            myStartDate: new Date("2025-02-12T23:00:00.000Z"),
            myDueDate: new Date("2025-02-13T23:00:00.000Z"),
        },
        {
            myTaskName: "Write a novel",
            taskDescription: "Start my novel about a fuji musician",
            taskCategory: "personal",
            taskPriority: "medium",
            myStartDate: new Date("2025-02-19T23:00:00.000Z"),
            myDueDate: new Date("2025-02-20T23:00:00.000Z"),
        },
        {
            myTaskName: "Go on a trip",
            taskDescription: "Visit some northern states in Nigeria",
            taskCategory: "travel",
            taskPriority: "medium",
            myStartDate: new Date("2025-02-12T23:18:00.000Z"),
            myDueDate: new Date("2025-02-19T02:22:00.000Z"),
        },
        {
            myTaskName: "Do Dishes",
            taskDescription: "And clean the kitchen.",
            taskCategory: "family",
            taskPriority: "medium",
            myStartDate: new Date("2025-02-13T11:06:00.000Z"),
            myDueDate: new Date("2025-02-20T01:10:00.000Z"),
        },
        {
            myTaskName: "Take a flight",
            taskDescription: "From Bangkok to Lisbon",
            taskCategory: "travel",
            taskPriority: "medium",
            myStartDate: new Date("2025-02-21T12:42:00.000Z"),
            myDueDate: new Date("2025-02-27T14:44:00.000Z"),
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
