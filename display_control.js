
// import { myTasksDetailsLibrary } from "./index.js";
import { format } from "https://cdn.jsdelivr.net/npm/date-fns/format.mjs";
import { sub } from "https://cdn.jsdelivr.net/npm/date-fns/sub.mjs";
import { isWithinInterval } from "https://cdn.jsdelivr.net/npm/date-fns/isWithinInterval.mjs";
import { add, addDays, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear, isPast, isToday, isTomorrow, isYesterday, startOfDay, endOfDay } from 'https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm';
import { formatDistanceToNow } from "https://cdn.jsdelivr.net/npm/date-fns/formatDistanceToNow.mjs";
// import { projectInputHandling } from "./index.js";
import { taskProjectsInnerHTML, addCheckItemDiv, projectCategoryCounts } from "./index.js";

// projectInputHandling();
let myTasksDetailsLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];

console.log({myTasksDetailsLibrary});


export function displayAllTasks() {
    // displayTasks(myTasksDetailsLibrary);

    removeHighlight();
    document.getElementById('todayDiv').classList.add('highlight');

    const todayDiv = document.getElementById("todayDiv");
    // let libraryArray = JSON.parse(localStorage.getItem('tasksLibrary'));
    const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
    const todayDate = new Date();
    let todayTasks = [];

    //Populate Today's task Library
    for(let i = 0; i < tasksLibrary.length; i++){
        const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
        const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
        const checkDate = isWithinInterval(todayDate, {
            start: uniqueStartDate,
            end: uniqueDueDate
        });
        if(isToday(uniqueStartDate) || isToday(uniqueDueDate) || checkDate){
            todayTasks.push(tasksLibrary[i]);
        };
    };

    displayTasks(todayTasks);
    controlAllTaskBlocks();

};

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function controlEditButton(){
    // taskProjectsInnerHTML();
    const edit_task_button = document.getElementById('edit_task_details_button');
    // const TASKDETAILS = document.getElementById('task_details_child');
    edit_task_button.onclick = function(){
        editTaskActivity(edit_task_button);
    };
    
    // edit_task_button.onclick = function(){
    //     console.log('Button Index: ');
    //     const button_task_id = edit_task_button.dataset.buttonIndex;
    //     console.log(button_task_id);
    //     let button_task_object = '';

    //     const libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];

    //     for(let i = 0; i < libraryArray.length; i++) {
    //         if(libraryArray[i].uniqueTaskId === button_task_id) {
    //             button_task_object = libraryArray[i];
    //             break;
    //         }
    //     }

    //     console.log(button_task_object);



    //     document.getElementById('task_details_creation_form').style.display = 'block';
    //     TASKDETAILS.style.display = 'none';
    //     document.getElementById('form_status').value = 'modify';
    //     document.getElementById('task_entry_id').value = button_task_id;

    //     document.getElementById('task_name').value = button_task_object.myTaskName;
    //     document.getElementById('task_description').value = button_task_object.taskDescription;
    //     document.getElementById('task_category').value = button_task_object.taskCategory;
    //     document.getElementById('task_priority').value = button_task_object.taskPriority;
    //     const uniqueRawStartDate = add(new Date(button_task_object.myStartDate), {hours: 2});
    //     const uniqueRawDueDate = add(new Date(button_task_object.myDueDate), {hours: 2});

    //     // const uniqueStartDate = uniqueRawStartDate.toISOString().split("T")[0];
    //     const uniqueStartDate = format(uniqueRawStartDate, 'yyyy-MM-d');
    //     // const uniqueDueDate = uniqueRawDueDate.toISOString().split("T")[0];
    //     const uniqueDueDate = format(uniqueRawDueDate, 'yyyy-MM-d');
    //     console.log(uniqueStartDate);
    //     console.log(uniqueDueDate);
    //     let uniqueStartTime = null;
    //     let uniqueDueTime = null;
    //     if(button_task_object.myStartDate){
    //         uniqueStartTime = format(button_task_object.myStartDate, 'HH:mm');
    //     };

    //     if(button_task_object.myDueDate){
    //         uniqueDueTime = format(button_task_object.myDueDate, 'HH:mm');
    //     };
        
    //     console.log(uniqueStartTime);
    //     console.log(uniqueDueTime);

    //     document.getElementById('start_date').value = uniqueStartDate;
    //     document.getElementById('start_time').value = uniqueStartTime;
    //     document.getElementById('due_time').value = uniqueDueTime;
    //     document.getElementById('due_date').value = uniqueDueDate;


    //     const myCheckListArray = button_task_object.taskChecklist;
    //     if(myCheckListArray){
    //         if(myCheckListArray.length > 1){
    //             for(let i = 0; i < myCheckListArray.length - 1; i++){
    //                 addCheckItemDiv();
    //             }
    //         }

    //         const allItemsInput = document.querySelectorAll('#check_item_group input');
    //         allItemsInput.forEach((inputBox, index) => {
    //             inputBox.value = myCheckListArray[index];
    //         });
    //     }
    // };

}

function editTaskActivity(editButton){
    const TASKDETAILS = document.getElementById('task_details_child');
    document.getElementById('task_details_creation_form').style.display = 'block';
    TASKDETAILS.style.display = 'none';
    
    // console.log('Button Index: ');
    const button_task_id = editButton.dataset.buttonIndex;
    // console.log({button_task_id});
    let button_task_object = '';

    const libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];

    for(let i = 0; i < libraryArray.length; i++) {
        if(libraryArray[i].uniqueTaskId === button_task_id) {
            button_task_object = libraryArray[i];
            break;
        }
    }

    // console.log(button_task_object);




    document.getElementById('form_status').value = 'modify';
    document.getElementById('task_entry_id').value = button_task_id;

    document.getElementById('task_name').value = button_task_object.myTaskName;
    document.getElementById('task_description').value = button_task_object.taskDescription;
    document.getElementById('task_category').value = button_task_object.taskCategory;
    document.getElementById('task_priority').value = button_task_object.taskPriority;
    const uniqueRawStartDate = add(new Date(button_task_object.myStartDate), {hours: 2});
    const uniqueRawDueDate = add(new Date(button_task_object.myDueDate), {hours: 2});

    // const uniqueStartDate = uniqueRawStartDate.toISOString().split("T")[0];
    const uniqueStartDate = format(uniqueRawStartDate, 'yyyy-MM-dd');
    // const uniqueDueDate = uniqueRawDueDate.toISOString().split("T")[0];
    const uniqueDueDate = format(uniqueRawDueDate, 'yyyy-MM-dd');
    console.log(uniqueStartDate);
    console.log(uniqueDueDate);
    let uniqueStartTime = null;
    let uniqueDueTime = null;
    if(button_task_object.myStartDate){
        uniqueStartTime = format(button_task_object.myStartDate, 'HH:mm');
    };

    if(button_task_object.myDueDate){
        uniqueDueTime = format(button_task_object.myDueDate, 'HH:mm');
    };
    
    console.log(uniqueStartTime);
    console.log(uniqueDueTime);

    document.getElementById('start_date').value = uniqueStartDate;
    document.getElementById('start_time').value = uniqueStartTime;
    document.getElementById('due_time').value = uniqueDueTime;
    document.getElementById('due_date').value = uniqueDueDate;


    const myCheckListArray = button_task_object.taskChecklist;
    if(myCheckListArray){
        if(myCheckListArray.length > 1){
            for(let i = 0; i < myCheckListArray.length - 1; i++){
                addCheckItemDiv();
            }
        }

        const allItemsInput = document.querySelectorAll('#check_item_group input');
        allItemsInput.forEach((inputBox, index) => {
            inputBox.value = myCheckListArray[index];
        });
    }
}






export function controlAllTaskBlocks() {
    const allTaskBlocks = document.querySelectorAll('.taskBlock');
    allTaskBlocks.forEach(function (this_Block) {
        this_Block.onclick = function (event) {
            console.log(event.target);
            // console.log('TASK ITEM DIV CLICKED!');
            // console.log(document.getElementById('task_details_child'));

            const TASKDETAILS = document.getElementById('task_details_child');
            TASKDETAILS.innerHTML = '';
            TASKDETAILS.style.display = 'block';
            document.getElementById('task_details_creation_form').style.display = 'none';
            const taskDetailsItem = document.createElement('div');
            taskDetailsItem.id = `item-${this_Block.id}`;
            taskDetailsItem.classList.add('taskDetailsItem');
            const itemIndexArray = this_Block.id.split('-');
            ///////
            const this_task_unique_id = itemIndexArray[1];
            let this_task_object = '';

            const libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];

            for(let i = 0; i < libraryArray.length; i++) {
                if(libraryArray[i].uniqueTaskId === this_task_unique_id) {
                    this_task_object = libraryArray[i];
                    break;
                }
            }
            

            if(this_task_object){
                const taskStartDate = new Date(this_task_object.myStartDate);
                // console.log({taskStartDate});
                const taskDueDate = new Date(this_task_object.myDueDate);
                // console.log({taskDueDate});
                const displayStartDate = format(taskStartDate, 'iiii, do MMMM yyyy');
                const displayStartTime = format(taskStartDate, 'HH:mm OOOO');
                const displayDueDate = format(taskDueDate, 'iiii, do MMMM yyyy');
                const displayDueTime = format(taskDueDate, 'HH:mm OOOO');

                const taskNameDiv = document.createElement('div');
                const taskDescriptionDiv = document.createElement('div');
                const taskStartDateDiv = document.createElement('div');
                const taskStartTimeDiv = document.createElement('div');
                const taskDueDateDiv = document.createElement('div');
                const taskDueTimeDiv = document.createElement('div');
                const taskCategoryDiv = document.createElement('div');
                const taskPriorityDiv = document.createElement('div');
                const taskEditButton = document.createElement('button');

                taskNameDiv.textContent = this_task_object.myTaskName;
                taskDescriptionDiv.textContent = this_task_object.taskDescription;
                taskStartDateDiv.textContent = displayStartDate;
                taskStartTimeDiv.textContent = displayStartTime;
                taskDueDateDiv.textContent = displayDueDate;
                taskDueTimeDiv.textContent = displayDueTime;
                taskCategoryDiv.textContent = this_task_object.taskCategory;
                taskPriorityDiv.textContent = this_task_object.taskPriority;
                taskEditButton.id = 'edit_task_details_button';
                taskEditButton.textContent = 'Edit Task Details';
                taskEditButton.dataset.buttonIndex = this_task_unique_id;

                taskDetailsItem.appendChild(taskNameDiv);
                taskDetailsItem.appendChild(taskDescriptionDiv);
                taskDetailsItem.appendChild(taskStartDateDiv);
                taskDetailsItem.appendChild(taskStartTimeDiv);
                taskDetailsItem.appendChild(taskDueDateDiv);
                taskDetailsItem.appendChild(taskDueTimeDiv);
                taskDetailsItem.appendChild(taskCategoryDiv);
                taskDetailsItem.appendChild(taskPriorityDiv);
                taskDetailsItem.appendChild(taskEditButton);

            };

            TASKDETAILS.appendChild(taskDetailsItem);
            if(this_task_object){
                controlEditButton();
            }
            


        };
    });

}


export function displayYesterdayTask(){
    const yesterdayDiv = document.getElementById("yesterdayDiv");
    yesterdayDiv.onclick = function(){ 
        // const tasksLibrary = myTasksDetailsLibrary;
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
        const yesterdaysDate = sub(new Date(), {
            days: 1,
        });
        let yesterdayTasks = [];
        //Populate Yesterday's Task Library
        for(let i = 0; i < tasksLibrary.length; i++){
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);

            const checkDate = isWithinInterval(yesterdaysDate, {
                start: uniqueStartDate,
                end: uniqueDueDate
            });
            if(isYesterday(uniqueStartDate) || isYesterday(uniqueDueDate) || checkDate){
                yesterdayTasks.push(tasksLibrary[i]);
            }
        };



    
        console.log({yesterdaysDate});
        console.log({yesterdayTasks});
        removeHighlight();
        yesterdayDiv.classList.add('highlight');
        displayTasks(yesterdayTasks);
        controlAllTaskBlocks();
    }
}


export function displayTodayTasks(){
    const todayDiv = document.getElementById("todayDiv");

    todayDiv.onclick =  function(){
        // const tasksLibrary = myTasksDetailsLibrary;
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary'));
        const todayDate = new Date();
        let todayTasks = [];

        //Populate Today's task Library
        for(let i = 0; i < tasksLibrary.length; i++){
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
            const checkDate = isWithinInterval(todayDate, {
                start: uniqueStartDate,
                end: uniqueDueDate
            });
            if(isToday(uniqueStartDate) || isToday(uniqueDueDate) || checkDate){
                todayTasks.push(tasksLibrary[i]);
            };
        };

        // Populate DOM with task names that are still active today
        console.log({todayDate});
        console.log({todayTasks});
        removeHighlight();
        todayDiv.classList.add('highlight');
        displayTasks(todayTasks);
        // deleteTask();
        controlAllTaskBlocks();
    };

}


export function displayTomorrowTasks(){
    const tomorrowDiv = document.getElementById("tomorrowDiv");
    tomorrowDiv.onclick = () => {
        // const tasksLibrary = myTasksDetailsLibrary;
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
        const tomorrowDate = add(new Date(), {
            days: 1,
        });

        let tomorrowTasks = [];

        //Populate tomorrow's task Library
        for(let i = 0; i < tasksLibrary.length; i++){
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
            const checkDate = isWithinInterval(tomorrowDate, {
                start: uniqueStartDate,
                end: uniqueDueDate
            });
            if(isTomorrow(uniqueStartDate) || isTomorrow(uniqueDueDate) || checkDate){
                tomorrowTasks.push(tasksLibrary[i]);
            };
        };
        
        console.log({tomorrowDate});
        console.log({tomorrowTasks});
        removeHighlight();
        tomorrowDiv.classList.add('highlight');
        displayTasks(tomorrowTasks);
        controlAllTaskBlocks();
    };
}


export function displayNext7Days(){
    const next7DaysDiv = document.getElementById("next7DaysDiv");
    next7DaysDiv.onclick = () => {
        // const tasksLibrary = myTasksDetailsLibrary;
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
        const todayDate = startOfDay(new Date());
        const dayPlus7 = add(new Date(), {
            days: 7,
        });
        const seventhDay = endOfDay(dayPlus7);

        let next7DaysTasks = [];

        //Populate the task array for the next 7 days
        for(let i = 0; i < tasksLibrary.length; i++) {
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
            const checkStartDate = isWithinInterval(uniqueStartDate, {
                start: todayDate,
                end: seventhDay
            });
            const checkDueDate = isWithinInterval(uniqueDueDate, {
                start: todayDate,
                end: seventhDay
            });
            if (checkStartDate || checkDueDate){
                next7DaysTasks.push(tasksLibrary[i]);
            };
        }

        //Manipulate DOM by populating with next 7 days tasks
    
        const sidebarChildren = document.querySelectorAll('#sidebar > div');
        sidebarChildren.forEach( div => {
            div.classList.remove('highlight');
        });
        next7DaysDiv.classList.add('highlight');
        console.log({todayDate, seventhDay});
        console.log({next7DaysTasks});
        displayTasks(next7DaysTasks);
        controlAllTaskBlocks();
    };
};



export function displaythisMonthTasks() {
    const thisMonthDiv = document.getElementById("thisMonthDiv");
    thisMonthDiv.onclick = () => {
        // const tasksLibrary = myTasksDetailsLibrary;
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
        const thisstartOfMonth = startOfMonth(new Date());
        const thisendOfMonth = endOfMonth(new Date());
        let thisMonthTasks = [];

        //Populate the array for this month's tasks
        for (let i = 0; i < tasksLibrary.length; i++) {
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
            const checkStartDate = isWithinInterval(uniqueStartDate, {
                start: thisstartOfMonth,
                end: thisendOfMonth
            });
            const checkDueDate = isWithinInterval(uniqueDueDate, {
                start: thisstartOfMonth,
                end: thisendOfMonth
            });
            if (checkStartDate || checkDueDate) {
                thisMonthTasks.push(tasksLibrary[i]);
            };
        };

        //Populate DOM With all tasks starting or ending this month
    
        console.log({ thisstartOfMonth, thisendOfMonth });
        console.log({ thisMonthTasks });
        removeHighlight();
        thisMonthDiv.classList.add('highlight');
        displayTasks(thisMonthTasks);
        controlAllTaskBlocks();
    };

}


export function displayThisQuarterDiv() {
    const thisQuarterDiv = document.getElementById("thisQuarterDiv");
    thisQuarterDiv.onclick = () => {
        // const tasksLibrary = myTasksDetailsLibrary;
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
        const thisstartOfQuarter = startOfQuarter(new Date());
        const thisendOfQuarter = endOfQuarter(new Date());
        let thisQuarterTasks = [];

        //Populate the tasks for this Quarter to the appropriate arrays.
        for (let i = 0; i < tasksLibrary.length; i++) {
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
            const checkStartDate = isWithinInterval(uniqueStartDate, {
                start: thisstartOfQuarter,
                end: thisendOfQuarter
            });
            const checkDueDate = isWithinInterval(uniqueDueDate, {
                start: thisstartOfQuarter,
                end: thisendOfQuarter
            });
            if (checkStartDate || checkDueDate) {
                thisQuarterTasks.push(tasksLibrary[i]);
            };
        };


        
        console.log({thisstartOfQuarter, thisendOfQuarter});
        console.log({thisQuarterTasks});
        const sidebarChildren = document.querySelectorAll('#sidebar > div');
        sidebarChildren.forEach( div => {
            div.classList.remove('highlight');
        });
        thisQuarterDiv.classList.add('highlight');
        displayTasks(thisQuarterTasks);
        controlAllTaskBlocks();

    }
}

export function displayThisYearTasks() {
    const thisYearDiv = document.getElementById("thisYearDiv");
    // const tasksLibrary = myTasksDetailsLibrary;
    thisYearDiv.onclick = () => {
        const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
        const thisStartOfYear = startOfYear(new Date());
        const thisEndOfYear= endOfYear(new Date());
        let thisYearTasks = [];

        //Populate the tasks for this Year to the appropriate arrays.
        for (let i = 0; i < tasksLibrary.length; i++) {
            const uniqueStartDate = new Date(tasksLibrary[i].myStartDate);
            const uniqueDueDate = new Date(tasksLibrary[i].myDueDate);
            const checkStartDate = isWithinInterval(uniqueStartDate, {
                start: thisStartOfYear,
                end: thisEndOfYear
            });
            const checkDueDate = isWithinInterval(uniqueDueDate, {
                start: thisStartOfYear,
                end: thisEndOfYear
            });
            if (checkStartDate || checkDueDate) {
                thisYearTasks.push(tasksLibrary[i]);
            };
        };

    
        console.log({thisStartOfYear, thisEndOfYear});
        console.log({thisYearTasks});
        const sidebarChildren = document.querySelectorAll('#sidebar > div');
        sidebarChildren.forEach( div => {
            div.classList.remove('highlight');
        });
        thisYearDiv.classList.add('highlight');
        displayTasks(thisYearTasks);
        controlAllTaskBlocks();

    }
    
}

function removeHighlight(){
    const sidebarChildren = document.querySelectorAll('#sidebar > div');
    sidebarChildren.forEach( div => {
        div.classList.remove('highlight');
    });
}


function displayTasks(subjectArray) {
    const taskArray = subjectArray;
    
    if (taskArray) {
        //Sort array by StartDate
        taskArray.sort((a, b) => new Date(a.myStartDate) - new Date(b.myStartDate));
        const displayBoard = document.getElementById('tasks_display');
        displayBoard.style.display = 'flex';
        displayBoard.innerHTML = '';
        for (let i = 0; i < taskArray.length; i++) {
            const this_task = taskArray[i];
            const taskBlock = document.createElement('div');
            taskBlock.id = `task-${this_task.uniqueTaskId}`
            taskBlock.classList.add('taskBlock');

            //create contents of task Block

            // create contents of the child div that contains details of task creation and modification.
            const taskBlockCreateAndModifyDiv = document.createElement('div');
            taskBlockCreateAndModifyDiv.classList.add('createAndModify');

            const taskCreationDateSpan = document.createElement('span');
            taskCreationDateSpan.classList.add('taskCreationDate');
            const taskCreationDateSpanText = formatDistanceToNow(
                new Date(this_task.createdAt),
                { addSuffix: true }
            );

            taskCreationDateSpan.textContent = `created: ${taskCreationDateSpanText}`;

            const taskModificationDateSpan = document.createElement('span');
            taskModificationDateSpan.classList.add('taskModificationDate');
            if (this_task.modifiedAt) {
                const taskModificationDateSpanText = formatDistanceToNow(new Date(this_task.modifiedAt), { addSuffix: true });
                taskModificationDateSpan.textContent = `modified: ${taskModificationDateSpanText}`;
            };

            taskBlockCreateAndModifyDiv.appendChild(taskCreationDateSpan);
            taskBlockCreateAndModifyDiv.appendChild(taskModificationDateSpan);
            taskBlock.appendChild(taskBlockCreateAndModifyDiv);

            //create and append task Name
            const taskBlockNameDiv = document.createElement('div');
            taskBlockNameDiv.textContent = this_task.myTaskName;
            taskBlock.appendChild(taskBlockNameDiv);


            //create and append task Description
            const taskBlockDescriptionParagraph = document.createElement('p');
            taskBlockDescriptionParagraph.classList.add('taskDescriptionParagraph');
            if (this_task.taskDescription) {
                taskBlockDescriptionParagraph.textContent = capitalizeFirstLetter(this_task.taskDescription);
            }

            taskBlock.appendChild(taskBlockDescriptionParagraph);

            //create and append task Checklist
            const unorderedChecklist = document.createElement('ul');
            unorderedChecklist.classList.add('checkListUl');
            let myCheckList = this_task.taskChecklist;
            if(myCheckList){
                for(let i = 0; i < myCheckList.length; i++){
                    let check_li = document.createElement('li');
                    check_li.textContent = myCheckList[i];
                    unorderedChecklist.appendChild(check_li);
                }
            }
            unorderedChecklist.style.listStyleType = "square";
            taskBlock.appendChild(unorderedChecklist);

            // Task Start Date and Due Date
            const taskDurationDiv = document.createElement('div');
            taskDurationDiv.classList.add('taskDurationDiv');
            const taskStartSpan = document.createElement('span');
            const taskDueSpan = document.createElement('span');
            
            if (this_task.myStartDate) {
                let textComp1 = '';
                if (isPast(this_task.myStartDate)) {
                    textComp1 = 'Started: ';
                } else {
                    textComp1 = 'starts: ';
                };
                const textComp2 = format(this_task.myStartDate, 'hh:mm aaa do MMM yyyy');
                taskStartSpan.textContent = textComp1 + textComp2;
            }

            if (this_task.myDueDate) {
                let textComp1 = '';
                if (isPast(this_task.myDueDate)) {
                    textComp1 = 'Ended: ';
                } else {
                    textComp1 = 'Ends: ';
                };
                const textComp2 = format(this_task.myDueDate, 'hh:mm aaa do MMM yyyy');
                taskDueSpan.textContent = textComp1 + textComp2;
            }

            taskDurationDiv.appendChild(taskStartSpan);
            taskDurationDiv.appendChild(taskDueSpan);
            taskBlock.appendChild(taskDurationDiv);


            // Task Category and Priority
            const taskCategoryAndPriorityDiv = document.createElement('div');
            taskCategoryAndPriorityDiv.classList.add('taskCategoryAndPriorityDiv');

            const taskCategorySpan = document.createElement('span');
            const taskPrioritySpan = document.createElement('span');
            taskPrioritySpan.classList.add('taskPrioritySpan');

            if (this_task.taskCategory) {
                taskCategorySpan.textContent = capitalizeFirstLetter(this_task.taskCategory);
            };

            // taskPrioritySpan.textContent = this_task.taskPriority;

            if (this_task.taskPriority) {
                const priorityText = document.createElement('div');
                const lowPriority = document.createElement('div');
                const mediumPriority = document.createElement('div');
                const highPriority = document.createElement('div');

                lowPriority.style.height = '12px';
                mediumPriority.style.height = '12px';
                highPriority.style.height = '12px';
                lowPriority.style.width = '12px';
                mediumPriority.style.width = '12px';
                highPriority.style.width = '12px';

                lowPriority.style.border = '1px solid green';
                mediumPriority.style.border = '1px solid blue';
                highPriority.style.border = '1px solid red';

                lowPriority.style.borderRadius = '6px';
                mediumPriority.style.borderRadius = '6px';
                highPriority.style.borderRadius = '6px';
                priorityText.textContent = 'Priority: ';

                taskPrioritySpan.appendChild(priorityText);
                taskPrioritySpan.appendChild(lowPriority);
                taskPrioritySpan.appendChild(mediumPriority);
                taskPrioritySpan.appendChild(highPriority);


                if (this_task.taskPriority === 'medium') {
                    mediumPriority.style.backgroundColor = 'blue';
                };


                if (this_task.taskPriority === 'low') {
                    lowPriority.style.backgroundColor = 'green';
                };

                if (this_task.taskPriority === 'high') {
                    highPriority.style.backgroundColor = 'red';
                };


            }


            const editAndDeleteButtons = document.createElement('div');
            editAndDeleteButtons.classList.add('editAndDelete');
            
            const editButton = document.createElement('button');
            editButton.id = `editButton-${this_task.uniqueTaskId}`;
            editButton.classList.add('editButton');
            editButton.textContent = 'Edit Task';
            editButton.dataset.buttonIndex = this_task.uniqueTaskId;


            const deleteButton = document.createElement('button');
            deleteButton.id = `deleteButton-${this_task.uniqueTaskId}`;
            deleteButton.classList.add('deleteButton');
            deleteButton.dataset.deletebuttonindex = this_task.uniqueTaskId;
            deleteButton.textContent = 'Delete Task';

            editAndDeleteButtons.appendChild(editButton);
            editAndDeleteButtons.appendChild(deleteButton);



            taskCategoryAndPriorityDiv.appendChild(taskCategorySpan);
            taskCategoryAndPriorityDiv.appendChild(editAndDeleteButtons)
            taskCategoryAndPriorityDiv.appendChild(taskPrioritySpan);
            
            taskBlock.appendChild(taskCategoryAndPriorityDiv);


            //const displayStartDate = format(taskStartDate, 'iiii, do MMMM yyyy');
            //const displayStartTime = format(taskStartDate, 'HH:mm OOOO');

            displayBoard.appendChild(taskBlock);


        }
        deleteTask();
        editTask();
    }

}


function deleteTask(){
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(function(this_delete_button){
        this_delete_button.onclick = (event) => {
            event.stopPropagation();
            console.log('Delete Button is Clicked');
            const this_task_id = this_delete_button.dataset.deletebuttonindex;
            console.log('Delete Button is Clicked, Index - ');

            let libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
            for(let i = 0; i < libraryArray.length; i++){
                if(libraryArray[i].uniqueTaskId === this_task_id){
                    libraryArray.splice(i, 1);
                    localStorage.setItem('tasksLibrary', JSON.stringify(libraryArray));
                    break;
                }
            }

            const greatGrandParent = this_delete_button.parentElement.parentElement.parentElement;
            console.log(greatGrandParent);
            greatGrandParent.remove();


        };
    });
};


function editTask(){
    const editButtons = document.querySelectorAll('.editButton');
    // console.log(editButtons);
    editButtons.forEach(function(this_edit_button){
        this_edit_button.addEventListener('click', (event) => {
            event.stopPropagation();
            // console.log(event.target);
            editTaskActivity(this_edit_button);

        })

    })
}


export function generateProjectNames() {
    const projectCounts = projectCategoryCounts();
    if (projectCounts){
        const projectTitle = document.createElement('div');
        projectTitle.textContent = 'Projects';
        projectTitle.classList.add('projectTitle');
        document.getElementById('sidebar').appendChild(projectTitle);
        for(let i = 0; i < projectCounts.length; i++) {
            if(projectCounts[i].frequency > 0){
                const projectItem = document.createElement('div');
                projectItem.textContent = `${capitalizeFirstLetter(projectCounts[i].project_category)} (${projectCounts[i].frequency})`;
                projectItem.id = projectCounts[i].project_category;
                projectItem.classList.add('projectItem');
                document.getElementById('sidebar').appendChild(projectItem);
            };
        };
        displayProjectGroupTasks();
    };
    
}


function displayProjectGroupTasks() {
    console.log('Where am I?');
    const allProjectItems = document.querySelectorAll('.projectItem');
    allProjectItems.forEach(function(this_project_group){
        this_project_group.onclick = () => {
            // event.stopPropagation();
            console.log(`${this_project_group.id} is clicked.`)
            const this_project_text = this_project_group.id;
            const tasksLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
            let this_project_array = [];
            if(this_project_text === 'others'){
                this_project_array = tasksLibrary.filter(task => task.taskCategory === '' || task.taskCategory === null || task.taskCategory === undefined);
            } else {
                this_project_array = tasksLibrary.filter(task => task.taskCategory === this_project_text);
            }

            displayTasks(this_project_array);
            const sidebarChildren = document.querySelectorAll('#sidebar > div');
            sidebarChildren.forEach( div => {
                div.classList.remove('highlight');
            });
            this_project_group.classList.add('highlight');
            controlAllTaskBlocks();

        }
    });
}



export function displayControlSystem(){
    displayYesterdayTask();
    displayTodayTasks();
    displayTomorrowTasks();
    displayNext7Days();
    displaythisMonthTasks();
    displayThisQuarterDiv();
    displayThisYearTasks();
    generateProjectNames();
}