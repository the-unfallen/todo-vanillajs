import { myTasksDetailsLibrary } from "./index.js";

export class CreateTask {
    #name;

    constructor(name) {
        this.setName(name);
    };

    //Secure setter for name
    setName(newName) {
        if (typeof newName === 'string' && newName.trim() !== '') {
            this.#name = newName;
        } else {
            throw new Error('Invalid name');
        }
    }

    getName() {
        return this.#name;
    }

    // Convert to a JSON-friendly format
    toJSON() {
        return {
            name: this.#name, // Store private value as a normal property
        };
    }

    // Method to reconstruct an object from JSON
    static fromJSON(obj) {
        return new CreateTask(obj.name);
    }
}





export function CreateTaskDetails(taskName, initialTaskDescription, startDate, dueDate, initialTaskCategory, initialTaskPriority, initialTaskChecklist=[], initialTaskCompletionStatus = false) {
    if (typeof taskName !== 'string' || taskName.trim() === '') {
        throw new Error('Task name is required and must be a non-empty string');
    }

    let myTaskName = taskName.trim();
    let myStartDate = null;
    let myDueDate = null;

    function verifyDate(dateInfo) {
        return dateInfo instanceof Date && !isNaN(dateInfo);
    }

    
    if (verifyDate(startDate)) {
        myStartDate = startDate;
    }

    if (verifyDate(dueDate)) {
        myDueDate = dueDate;
    }


    if (myDueDate < myStartDate) {
        myDueDate = null;
    }
    // let taskCompletionStatus = false;
    const createdAt = new Date();
    const modifiedAt = null;

    // const libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
    const uniqueTaskId = Date.now() + Math.random().toString(36).substr(2, 9);

    if (!myStartDate){
        myStartDate = createdAt;
    };


    //declare default values for 
    //taskDescription
    let taskDescription = '';
    if(initialTaskDescription){
        taskDescription = initialTaskDescription;
    }
    //taskCategory
    let taskCategory = 'personal';
    if(initialTaskCategory){
        taskCategory = initialTaskCategory;
    }

    //taskPriority
    let taskPriority = 'low';
    if(initialTaskPriority){
        taskPriority = initialTaskPriority;
    }
    //taskChecklist
    let taskChecklist = [];
    if(initialTaskChecklist){
        taskChecklist = initialTaskChecklist;
    }

    //taskCompletionStatus
    let taskCompletionStatus = false;
    if(initialTaskCompletionStatus){
        taskCompletionStatus = initialTaskCompletionStatus;
    }


    return {
        myTaskName, 
        taskDescription, 
        myStartDate, 
        myDueDate, 
        taskCategory, 
        taskPriority,
        taskChecklist,
        taskCompletionStatus,
        createdAt,
        uniqueTaskId,
        modifiedAt
    };
};



export function getHoursAndMinutes(uniqueTime) {
    let uniqueHours = 0;
    let uniqueMinutes = 0
    if(uniqueTime){
        [uniqueHours, uniqueMinutes] = uniqueTime.split(':');
    }
    return{uniqueHours, uniqueMinutes};
}


export function ModifyTaskDetails(taskId, taskName, taskDescription, startDate, dueDate, taskCategory, taskPriority, taskChecklist=[], taskCompletionStatus = false) {
    if (typeof taskName !== 'string' || taskName.trim() === '') {
        throw new Error('Task name is required and must be a non-empty string');
    }



    let myTaskName = taskName.trim();
    let myDueDate = null;
    let myStartDate = startDate;

    

    function verifyDate(dateInfo) {
        return dateInfo instanceof Date && !isNaN(dateInfo);
    }

    

    if (verifyDate(dueDate)) {
        myDueDate = dueDate;
    }


    if (myDueDate < myStartDate) {
        myDueDate = null;
    }

    const modifiedAt = new Date();
    


    const taskCompletion = false;

    let libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
    let task_index = null;
    console.log(taskId);


    for(let i = 0; i < libraryArray.length; i++) {
        // console.log({taskId});
        // console.log(libraryArray[i].uniqueTaskId);
        if(libraryArray[i].uniqueTaskId === taskId) {
            task_index = i;
            console.log({task_index});
            break;
        }
    }

    if(task_index){
        libraryArray[task_index].myTaskName = myTaskName;
        libraryArray[task_index].taskDescription = taskDescription;
        libraryArray[task_index].myStartDate = myStartDate;
        libraryArray[task_index].myDueDate = myDueDate;
        libraryArray[task_index].taskCategory = taskCategory;
        libraryArray[task_index].taskPriority = taskPriority;
        libraryArray[task_index].taskChecklist = taskChecklist;
        libraryArray[task_index].taskCompletionStatus = taskCompletion;
        libraryArray[task_index].modifiedAt = modifiedAt;
    };
    console.log({libraryArray});
    // myTasksDetailsLibrary = libraryArray;
    localStorage.setItem('tasksLibrary', JSON.stringify(libraryArray));


};
