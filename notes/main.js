var allNotes = [];
var index = 1;

// Validation- checking if task (userTaskBox) and Date (deadlineDateBox) are filled:
function noteValidation() {
    var userTasksBox = document.getElementById("userTasksBox");
    var deadlineDateBox = document.getElementById("deadlineDateBox");
    var msg = "";
    var emptyDetails = 0;

    // Removes background colors from input boxes:
    removeColor(userTasksBox);
    removeColor(deadlineDateBox);

    // Checks if task box is empty:
    if (userTasksBox.value == "") {
        msg += "Task \n";
        paintRed(userTasksBox);
        emptyDetails++;
    }
    // Checks if date box is empty:
    if (deadlineDateBox.value == "") {
        msg += "Date \n";
        paintRed(deadlineDateBox);
        emptyDetails++;
    }
    // If nothing is empty - continues to createObject function:
    if (emptyDetails == 0) {
        createObject();
    }
    // If something is empty, it pops a message, letting the user know what is missing:
    else {
        alert("Missing: \n" + msg);
    }
}

// Paints background red:
function paintRed(element) {
    element.style.backgroundColor = "red";
}

// Removes color from background:
function removeColor(element) {
    element.style.backgroundColor = "";
}

// Creates obajects, gives each an id:
function createObject() {
    var userTasksBox = document.getElementById("userTasksBox");
    var deadlineDateBox = document.getElementById("deadlineDateBox");
    var deadlineTimeBox = document.getElementById("deadlineTimeBox");
    var noteObj = {
        id: index,
        task: userTasksBox.value,
        date: deadlineDateBox.value,
        time: deadlineTimeBox.value
    };
    index++;
    // Adds object to array:
    pushIntoArray(noteObj);
    // Prints the note:
    printTask(noteObj);
    // Save allNotes array and index to local storage:
    saveToLocalStorage("savedArray", allNotes);
    saveToLocalStorage("savedIndex", index);
}

// Prints the task, date and time (if there is any) on a note. Creates the note in DOM:
function printTask(noteObj) {
    var noteHolder = document.getElementById("noteHolder");
    var noteMaster = document.createElement('div');
    var glyphIcon = document.createElement('span');
    noteMaster.addEventListener("mouseover", function () { showButton(glyphIcon) });
    noteMaster.addEventListener("mouseout", function () { hideButton(glyphIcon) });
    noteMaster.className = "noteMasterClass";
    noteMaster.id = noteObj.id;
    var notePrintArea = document.createElement('div');
    notePrintArea.className = "notePrintAreaClass";
    noteMaster.appendChild(notePrintArea);
    glyphIcon.addEventListener("click", function () { deleteNote(noteObj.id) });
    glyphIcon.className = "glyphicon glyphicon-remove-sign";
    notePrintArea.appendChild(glyphIcon);
    var printedTaskDiv = document.createElement('div');
    printedTaskDiv.className = "printedTaskDivClass";
    notePrintArea.appendChild(printedTaskDiv);
    var printedTask = document.createElement('p');
    printedTask.id = "printedTask";
    printedTask.className = "printedTaskClass";
    printedTask.innerHTML = noteObj.task;
    printedTaskDiv.appendChild(printedTask);
    var printedDate = document.createElement('p');
    printedDate.id = "printedDate";
    printedDate.className = "printedDateClass";
    printedDate.innerHTML = noteObj.date;
    notePrintArea.appendChild(printedDate);
    var printedTime = document.createElement('p');
    printedTime.id = "printedTime";
    printedTime.className = "printedTimeClass";
    printedTime.innerHTML = noteObj.time;
    notePrintArea.appendChild(printedTime);
    noteHolder.appendChild(noteMaster);
    // Clear form after creating the note:
    clearFormBox();
}

// Showes glyph icon when hovering on the note:
function showButton(object) {
    object.style.visibility = "visible";
}

// Hides glyph icon when mouse is not over the note:
function hideButton(object) {
    object.style.visibility = "hidden";
}

// Adds objects to array:
function pushIntoArray(object) {
    allNotes.push(object);
}

// After clicking on the "Clear" button, it clears the form itself:
function clearFormBox() {
    var userTasksBox = document.getElementById("userTasksBox");
    var deadlineDateBox = document.getElementById("deadlineDateBox");
    var deadlineTimeBox = document.getElementById("deadlineTimeBox");
    userTasksBox.value = "";
    deadlineDateBox.value = "";
    deadlineTimeBox.value = "";
}

// Saves to local storage:
function saveToLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

// Validation to check if there is anything to load from local storage:
function validateLocalStorage() {
    if ((localStorage.getItem("savedArray")) !== null) {
        loadFromLocalStorage("savedArray");
    }
    if ((localStorage.getItem("savedIndex")) !== null) {
        loadIndexFromLocalStorage("savedIndex");
    }
}

// Loads index from local storage:
function loadIndexFromLocalStorage(key) {
    var str = localStorage.getItem(key);
    index = JSON.parse(str);
}

// Loads the data from local storage:
function loadFromLocalStorage(key) {
    var str = localStorage.getItem(key);
    var array2 = JSON.parse(str);
    for (var item of array2) {
        pushIntoArray(item);
        printTask(item);
    }
}

// Delete note from DOM and from allNotes array, and save current array to local storage:
function deleteNote(id) {
    //Remove specific object from allNotes array:
    for (var i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id == id) {
            allNotes.splice(i, 1);
        }
    }
    //Remove specific note from DOM:
    var noteHolder = document.getElementById("noteHolder");
    var noteMaster = document.getElementById(id);
    noteHolder.removeChild(noteMaster);
    
    //Save current array to local storage:
    saveToLocalStorage("savedArray", allNotes);
}