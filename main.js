
// Takes information from the form, checking validation, save it to local storage
function getInfoTask(){
    try{
        const taskBox = document.getElementById("task");
        const dateBox = document.getElementById("date");
        const timeBox = document.getElementById("time");

        const taskValue = taskBox.value;
        const dateValue = dateBox.value;
        const timeValue = timeBox.value;
        taskBox.style.backgroundColor = "";
        dateBox.style.backgroundColor = "";
        timeBox.style.backgroundColor = "";

        //validation of the information entered
        if(taskValue === ""){
            alert("The Task Cannot Be Empty.");
            taskBox.style.backgroundColor = "red";
            taskBox.focus();
            event.preventDefault();
            return;
        }
        if(!isNaN(taskValue) ){
            alert("The Task Cannot be just numbers.");
            taskBox.style.backgroundColor = "red";
            taskBox.focus();
            event.preventDefault();
            return;
        }
        if(dateValue === ""){
            alert("The Date Cannot Be Empty.");
            dateBox.style.backgroundColor = "red";
            dateBox.focus();
            event.preventDefault();
            return;
        }
        //check if the date greater than the current date
        if(checkIfDateIsfutureDate(dateValue)){
            alert('you insert date Smaller than the current date')
            dateBox.style.backgroundColor = "red";
            dateBox.focus();
            event.preventDefault();
            return;
        }
        //Create an object from the information Task
        const taskObj = {task: taskValue,date:dateValue, time:timeValue };
        saveToLocalStorage(taskObj);
        clearForm();
    }
    catch(err) {
        alert("There is an error in your Task:\n" + err.message + "<br>");
    }
}


// save the info task to local storage
function saveToLocalStorage(taskObj){

    // Read current array from local storage: 
    const currentJsonArray = localStorage.getItem("AllTasks");

    // Convert to javascript array: 
    let arr = JSON.parse(currentJsonArray);
    if (arr === null) { 
        arr = []; // Only on first time
    }

    // Add the new book: 
    arr.push(taskObj);

    // Create a new json array containing the new book: 
    const newJsonArray = JSON.stringify(arr);

    // Save the new array to local storage:
    localStorage.setItem("AllTasks", newJsonArray);

    //Update Ui of BordTasks: 
   loadNotes();
}


// Load all Tasks Notes in LocalStorage to Ui
//And add a button with Glyph Icon
function loadNotes(){
    
    // Read current array from local storage: 
    const currentJsonArray = localStorage.getItem("AllTasks");
    // Convert to javascript array: 
    const arr = JSON.parse(currentJsonArray);
    
    if (arr === null) {
        return;
    }

    let allTasks = ``;  
    for (let i=0; i<arr.length; i++){
        let div=``;
        let btn = `<button id="btn_${i}" type="button" onclick="deleteNote(this);"
        class="btn btn-default btn-sm">
        <span class="glyphicon glyphicon-remove"></span></button>`

        div += `<div id="newNote_${i}" class="newNote" >
        ${btn}
        <span id="spanTask_${i}" class="spanTask">${arr[i].task}</span>
        <span id="spanDate_${i}" class="spanDate">${arr[i].date}</span><br>
        <span id="spanTime_${i}" class="spanTime">${arr[i].time}</span></div>` 
        
        allTasks+=div;
    }
        const divGeneral = document.getElementById("divGeneral");
        divGeneral.innerHTML = allTasks;
}


function deleteNote(note){
    //All the elements in the div Note have the same number id (different name)
    //get the number of id 
    const id=note.id;
    const index = id.substring(id.indexOf('_')+1)
    
    // Read current array from local storage: 
    const currentJsonArray = localStorage.getItem("AllTasks");

    // Convert to javascript array: 
    let arr = JSON.parse(currentJsonArray);

    for (let i=0; i<arr.length; i++){
        if (i == index){
            // Splice the array at the index of object
            arr.splice(index, 1)
            // Save back to localStorage
            localStorage.setItem("AllTasks", JSON.stringify(arr))
        }
    }
    //Remove the taskNote from Ui
    return note.parentNode.remove();
}


//clear all the form 
function clearForm(){
    document.getElementById("myForm").reset();
}


//validation to input type date, check If Date Is future Date
function checkIfDateIsfutureDate(dateValue){

    const currentDate = new Date();
    let givenDate = new Date(dateValue);
    return givenDate < currentDate? true: false
}
