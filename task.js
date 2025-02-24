import { addDays } from 'https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm';

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

    if (verifyDate(dueDate) && (myDueDate > myStartDate)) {
        myDueDate = dueDate;
    } else {
        myDueDate = addDays(new Date(), 1);
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
    let task_index = -1;
    // console.log(taskId);

    console.log({task_index});
    for(let i = 0; i < libraryArray.length; i++) {
        // console.log({taskId});
        // console.log(libraryArray[i].uniqueTaskId);
        if(libraryArray[i].uniqueTaskId === taskId) {
            task_index = i;
            console.log({task_index});
            if(i === 0){
                let keySubject = libraryArray[i];
                console.log('Before Modification', {keySubject});
            }
            // break;
        }
    }
    console.log({task_index});

    if(task_index >= 0){
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

    if(task_index === 0){
        let keySubject = libraryArray[0];
        console.log('After Modification', {keySubject});
    }

    console.log({libraryArray});
    // myTasksDetailsLibrary = libraryArray;
    localStorage.setItem('tasksLibrary', JSON.stringify(libraryArray));


};
