let initialArray = [];
let initialObject = CreateTaskDetails('Breathe');
console.log({initialObject})
initialArray.push(initialObject);
console.log({initialArray});


let storedData = localStorage.getItem('tasksLibrary');
console.log("Raw localStorage data:", storedData); // Debugging

let myTasksDetailsLibrary = JSON.parse(storedData);

console.log("myTasksDetailsLibrary before validation:", myTasksDetailsLibrary);

import {initializeFunction} from './initialize.js';

if (!myTasksDetailsLibrary || !Array.isArray(myTasksDetailsLibrary) || myTasksDetailsLibrary.length === 0) {
    console.log('Empty Library')
    localStorage.removeItem('tasksLibrary');
    localStorage.setItem('tasksLibrary', []);
    initializeFunction();
}

myTasksDetailsLibrary = JSON.parse(localStorage.getItem('tasksLibrary'));

console.log("Final myTasksDetailsLibrary:", myTasksDetailsLibrary);

localStorage.setItem('tasksLibrary', JSON.stringify(myTasksDetailsLibrary));





// import { newTaskFormHandling } from "./form.js";
import { format, addDays, startOfDay, endOfDay, formatISO, add} from 'https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm';
import { capitalizeFirstLetter, displayAllTasks} from './display_control.js';
import { displayYesterdayTask } from './display_control.js';
import { displayTodayTasks } from './display_control.js';
import { displayTomorrowTasks } from './display_control.js';
import { displayNext7Days } from './display_control.js';
import { displaythisMonthTasks } from './display_control.js';
import { displayThisQuarterDiv } from './display_control.js';
import { displayThisYearTasks } from './display_control.js';
import { generateProjectNames } from './display_control.js';
import { displayCurrentArray } from './display_control.js';
import { CreateTaskDetails, getHoursAndMinutes, ModifyTaskDetails } from "./task.js";



// initializeFunction();






// export let allTasks = myTasks.map(CreateTask.fromJSON) || [];
// generateProjectNames();


displayAllTasks();


displayYesterdayTask();
displayTodayTasks();
displayTomorrowTasks();
displayNext7Days();
displaythisMonthTasks();
displayThisQuarterDiv();
displayThisYearTasks();
generateProjectNames();
displayCurrentArray();




function newTaskFormHandling() {
    projectInputHandling();
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents the form from submitting the traditional way
        // console.log("Form submission prevented!");
        const taskName = document.getElementById('new_task').value;
        // console.log(taskName);
        let new_task_entry_id = null;
        let new_task_entry_startDate = null;
        if(taskName.trim() !== ''){
            const myTask = new CreateTaskDetails(taskName);
            new_task_entry_id = myTask.uniqueTaskId;
            new_task_entry_startDate = myTask.myStartDate;
            myTasksDetailsLibrary.push(myTask);
            localStorage.setItem('tasksLibrary', JSON.stringify(myTasksDetailsLibrary));
            console.log(myTasksDetailsLibrary[myTasksDetailsLibrary.length - 1]);
       
        } else {
            try {
                throw new Error('Invalid task name');
            } catch (err) {
                console.error('Caught an error:', err.message);
            }
        };
        // displayCurrentArray();
        taskProjectsInnerHTML();
        removeAllCheckItemDiv();
        // displayAllTasks();
        
        displayCurrentArray();
        // generateProjectNames();
        // displayControlSystem();
        document.getElementById('new_task').value = '';
        document.getElementById('task_details_child').style.display = 'none';
        document.getElementById('task_details_creation_form').style.display = 'block';
        document.getElementById('form_status').value = 'modify';
        document.getElementById('task_entry_id').value = new_task_entry_id;
        document.getElementById('task_name').value = taskName;
        const raw_start_date = new Date(new_task_entry_startDate);
        // const start_date_value = formatISO(raw_start_date, { representation: 'date' });
        const start_date_value = format(raw_start_date, 'yyyy-MM-dd');
        console.log(start_date_value);
        document.getElementById('start_date').value = start_date_value;
        // console.log(formatISO(raw_start_date, { representation: 'date' }));
        document.getElementById('start_time').value = format(raw_start_date, 'HH:mm');

    });
}



function taskDetailsFormHandling() {
    projectInputHandling();
    document.getElementById("task_details_creation").addEventListener('submit', function(event) {
        event.preventDefault();
        const formStatus = document.getElementById('form_status').value;
        const taskEntryId = document.getElementById('task_entry_id').value;
        console.log({taskEntryId});
        const taskName = document.getElementById('task_name').value;
        const taskDescription = document.getElementById('task_description').value;
        const startDate = document.getElementById('start_date').value;
        const startTime = document.getElementById('start_time').value;
        const dueTime = document.getElementById('due_time').value;
        const parsedStartDate = startOfDay(new Date(startDate));
        const dueDate = document.getElementById('due_date').value;
        const parsedDueDate = startOfDay(new Date(dueDate));
        const startTimeVariables = getHoursAndMinutes(startTime);
        const dueTimeVariables = getHoursAndMinutes(dueTime);
        parsedStartDate.setHours(parseInt(startTimeVariables.uniqueHours), parseInt(startTimeVariables.uniqueMinutes));
        parsedDueDate.setHours(parseInt(dueTimeVariables.uniqueHours), parseInt(dueTimeVariables.uniqueMinutes));
        console.log({parsedStartDate, parsedDueDate});

        let taskCategory = null;
        
        if(document.getElementById('task_category').value === 'new_project') {
            // document.getElementById('extra_project').disabled = false;
            taskCategory = document.getElementById('extra_project').value.toLowerCase();
            // taskCategory = taskCategory.trim();
        }else if (document.getElementById('task_category').value != 'new_project'){
            taskCategory = document.getElementById('task_category').value.toLowerCase();
            // taskCategory = taskCategory.trim();
        }
        // const taskCategory = document.getElementById('task_category').value;
        const taskPriority = document.getElementById('task_priority').value;
        let checklistArray = [];
        const checklistItemsObject = document.querySelectorAll('#check_item_group input');
        checklistItemsObject.forEach(function(checkItem) {
            const checkItemValue = checkItem.value;
            if(checkItemValue && checkItemValue.length > 0) {
                checklistArray.push(checkItemValue);
            };
        });
        console.log({checklistArray});
        if(formStatus === 'modify'){
            console.log('Form Status - modify Block');
            console.log({taskEntryId});
            let taskCompletionStatus = false;
            myTasksDetailsLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
            console.log({taskEntryId, taskName, taskDescription, parsedStartDate, parsedDueDate, taskCategory, taskPriority, checklistArray, taskCompletionStatus});
            ModifyTaskDetails(taskEntryId, taskName, taskDescription, parsedStartDate, parsedDueDate, taskCategory, taskPriority, checklistArray, taskCompletionStatus);
            
            // localStorage.setItem('tasksLibrary', JSON.stringify(libraryArray));
        }else{
            myTasksDetailsLibrary = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
            const myTaskDetails = CreateTaskDetails(taskName, taskDescription, parsedStartDate, parsedDueDate, taskCategory, taskPriority, checklistArray);
            myTasksDetailsLibrary.push(myTaskDetails);
            console.log(myTaskDetails);
            localStorage.setItem('tasksLibrary', JSON.stringify(myTasksDetailsLibrary));
            console.log(myTasksDetailsLibrary[myTasksDetailsLibrary.length - 1]);
        }

        document.querySelectorAll('#task_details_creation input').forEach(function(item){
            item.value = '';
        })

        document.querySelectorAll('#task_details_creation select').forEach(function(item){
            item.value = '';
        })
        
        taskProjectsInnerHTML();
        removeAllCheckItemDiv()
        // displayAllTasks();
        // displayControlSystem();
        
        displayCurrentArray();
        // generateProjectNames();


    });
}


export function projectInputHandling() {
    const task_project = document.getElementById('task_category');
    task_project.addEventListener('change', function(){
        console.log(task_project.value);
        if(task_project.value === 'new_project'){
            document.getElementById('extra_project').disabled = false;
            document.getElementById('extra_project').focus();
        }else{
            document.getElementById('extra_project').disabled = true;
        };
    });
}


export function taskProjectsInnerHTML(){
    let defaultProjects = ["work", "personal", "shopping", "fitness", "family", "business", "travel"];
    let libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
    let activeProjects = [...new Set(libraryArray.map(task => task.taskCategory))];

    const mergedProjects = [...new Set([...defaultProjects, ...activeProjects])];
    console.log({mergedProjects});
    const selectProject = document.getElementById('task_category');
    selectProject.innerHTML = '';
    const firstOption = document.createElement('option');
    // console.log(firstOption)
    firstOption.value = '';
    firstOption.textContent = '--Select Project--';
    selectProject.appendChild(firstOption);

    for(let i = 0; i < mergedProjects.length; i++) {
        if(mergedProjects[i] && mergedProjects[i].length > 0) {
            const this_project = mergedProjects[i];
            const this_option = document.createElement('option');
            this_option.value = this_project.toLowerCase();
            this_option.textContent = capitalizeFirstLetter(this_project);
            selectProject.appendChild(this_option);
        }
    }
    const lastOption = document.createElement('option');
    lastOption.value = "new_project";
    lastOption.textContent = '**Add a new Project**';
    selectProject.appendChild(lastOption);

    
}

function checklistAddANewItem() {
    const check_item_group = document.getElementById('check_item_group');
    const add_a_new_check_item = document.getElementById("add_check_item");
    const fieldsetRemoveButton = document.getElementById("fieldset_remove_button");
    add_a_new_check_item.addEventListener('click', function(event){
        event.preventDefault(); // Prevents the form from submitting the traditional way
        console.log('Yes!');
        const checkItemDiv = document.createElement('div');
        checkItemDiv.classList.add('check_item_div');
        checkItemDiv.classList.add('new_task_form_child');
        checkItemDiv.classList.add('fieldset_child');
        const checkItemLabel = document.createElement('label');
        const siblings = document.querySelectorAll('.check_item_div')
        console.log(siblings);
        const numberOfSiblings = siblings.length;
        const last_sibling_id_text = siblings[siblings.length - 1].id;
        console.log(last_sibling_id_text);
        const last_sibling_id = parseInt(last_sibling_id_text.split('-')[1]);
        console.log(last_sibling_id);
        const nthSibling = parseInt(last_sibling_id) + 1;
        checkItemLabel.textContent = `Item ${nthSibling}: `;
        const checkItemInput = document.createElement('input');
        checkItemInput.id = `check_item_${nthSibling}`;
        checkItemDiv.id = `checkitem-${nthSibling}`;
        checkItemInput.classList.add('check_item');
        const checkItemButton = document.createElement('button');
        checkItemButton.classList.add('fieldset_remove_button');
        checkItemButton.innerHTML = fieldsetRemoveButton.innerHTML;

        checkItemDiv.appendChild(checkItemLabel);
        checkItemDiv.appendChild(checkItemInput);
        checkItemDiv.appendChild(checkItemButton);

        check_item_group.appendChild(checkItemDiv);
        removeCheckItem();
    })
    
}

//For adding checklistdiv without clicking.
export function addCheckItemDiv() {
    const check_item_group = document.getElementById('check_item_group');
    const add_a_new_check_item = document.getElementById("add_check_item");
    const fieldsetRemoveButton = document.getElementById("fieldset_remove_button");

    const checkItemDiv = document.createElement('div');
    checkItemDiv.classList.add('check_item_div');
    checkItemDiv.classList.add('new_task_form_child');
    checkItemDiv.classList.add('fieldset_child');

    const checkItemLabel = document.createElement('label');

    const siblings = document.querySelectorAll('.check_item_div')
    // console.log(siblings);
    const numberOfSiblings = siblings.length;
    const last_sibling_id_text = siblings[siblings.length - 1].id;
    console.log(last_sibling_id_text);
    const last_sibling_id = parseInt(last_sibling_id_text.split('-')[1]);
    console.log(last_sibling_id);
    const nthSibling = parseInt(last_sibling_id) + 1;
    checkItemLabel.textContent = `Item ${nthSibling}: `;

    const checkItemInput = document.createElement('input');
    checkItemInput.id = `check_item_${nthSibling}`;
    checkItemDiv.id = `checkitem-${nthSibling}`;
    checkItemInput.classList.add('check_item');

    const checkItemButton = document.createElement('button');
    checkItemButton.classList.add('fieldset_remove_button');
    checkItemButton.innerHTML = fieldsetRemoveButton.innerHTML;

    checkItemDiv.appendChild(checkItemLabel);
    checkItemDiv.appendChild(checkItemInput);
    checkItemDiv.appendChild(checkItemButton);

    check_item_group.appendChild(checkItemDiv);
    removeCheckItem();
}


function removeCheckItem(){
    const check_item_group = document.getElementById('check_item_group');
    const allRemoveButtons = document.querySelectorAll('.fieldset_remove_button');
    allRemoveButtons.forEach(function(removeButton){
        removeButton.addEventListener('click', function(event){
            event.preventDefault();
            console.log('remove item');
            
            console.log(removeButton);
            
            const removeButtonParent = removeButton.parentElement;
            console.log(removeButtonParent);
            if(removeButtonParent.id === "checkitem-1"){
                document.getElementById('check_item_1').value = '';
            }else{
                removeButtonParent.remove();
            }
        });
    }
    );
}

export function removeAllCheckItemDiv(){
    const check_item_group = document.getElementById('check_item_group');
    const checkItemChildDivs = document.querySelectorAll('#check_item_group div');
    checkItemChildDivs.forEach(function(childDiv){
        if(childDiv.id != 'checkitem-1') {
            childDiv.remove();
        }
    })
}



export function projectCategoryCounts(){
    let defaultProjects = ["work", "personal", "shopping", "fitness", "family", "business", "travel"];
    let libraryArray = JSON.parse(localStorage.getItem('tasksLibrary')) || [];
    let activeProjects = [...new Set(libraryArray.map(task => task.taskCategory))];
    const mergedProjects = [...new Set([...defaultProjects, ...activeProjects])];
    let projectCategoryObject = {};
    let projectCategoryArray = [];
    //Initialize project category array
    for(let i = 0; i < mergedProjects.length; i++){
        if(mergedProjects[i] && mergedProjects[i].length > 1){
            projectCategoryArray.push({'project_category' : mergedProjects[i], 'frequency' : 0});
            let this_task_project = mergedProjects[i];
            // projectCategoryArray.push({ [this_task_project] : 0});
        }
    }
    projectCategoryArray.push({'project_category' : 'others', 'frequency' : 0});
    // projectCategoryArray.push({'others' : 0});

    console.log({projectCategoryArray});

    const onlyProjectCategoryNames = libraryArray.map(task => task.taskCategory);

    for(let i = 0; i < libraryArray.length; i++){
        const this_task = libraryArray[i].taskCategory;
        if(onlyProjectCategoryNames.includes(this_task)){
            for(let j = 0; j < projectCategoryArray.length; j++){
                if(projectCategoryArray[j].project_category === this_task){
                    projectCategoryArray[j].frequency += 1;
                    // break;
                }
            }
        };
        
        if(this_task === '' || this_task === undefined || this_task === null || this_task.length === 0){
            const lengthOfCategory = projectCategoryArray.length;
            projectCategoryArray[lengthOfCategory - 1].frequency += 1;
        };
        
    }

    return projectCategoryArray;


}



projectCategoryCounts();
removeCheckItem();
taskProjectsInnerHTML();
projectInputHandling();
newTaskFormHandling();
taskDetailsFormHandling();
checklistAddANewItem();


