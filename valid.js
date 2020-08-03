const form = document.querySelector("#task-form");
const taskNameInput = document.querySelector("#taskName");
const descriptionInput = document.querySelector("#description");
const assignedInput = document.querySelector("#assigned");
const dateInput = document.querySelector("#date");
const statusInput = document.querySelector("#status");


window.addEventListener("load" , disableSubmit);
taskNameInput.addEventListener("blur" ,validate);
descriptionInput.addEventListener("blur" ,validate);
assignedInput.addEventListener("blur" ,validate);
dateInput.addEventListener("blur" ,checkDate);

function disableSubmit(){
  
    document.querySelector("#task-modal-save").disabled = true;
  }


//    ============================ Validate from===============================
  function validate() {
  
    const taskName = taskNameInput.value.trim();
    const description = descriptionInput.value.trim();
    const assigne = assignedInput.value.trim();

// =============================Task name validation========================  
    if (taskName == "" ||
    taskName.length <8) 
      {
        error(taskNameInput , 'Enter a task name with 8 or more char');
      }
     else{
     submit(taskNameInput);
   };

   // =============================Description validation========================
   if (description == "" ||
   description.length <15) 
      {
        error(descriptionInput , 'Enter task description with 15 or more char');
      }
     else{
     submit(descriptionInput);
   };

   // =============================Assignee validation========================
   if (assigne == "" ||
   assigne.length <4) 
      {
        error(assignedInput , 'Enter assignee name with more than 4 cha');
      }
     else{
     submit(assignedInput);
   };

   // =============================Date validation========================
  };


  function checkDate(){
 
    const date = dateInput.value;
    var todayDate = new Date().toISOString().slice(0,10);
    
    console.log(date);
    if (date == null || date == ''){
        error(dateInput , 'Task must have a due date');
      }
   else if(date < todayDate){
    error(dateInput , 'Task cannot be created in past date');
    }
   
  else{
    submit(dateInput);
    }
  };
    // if(isFutureDate(date.value)){
    //     resultDiv.innerHTML = "Entered date is a future date";
    //     resultDiv.style.color = "red";
    // } else {
    //     resultDiv.innerHTML = "It's a valid date";
    //     resultDiv.style.color = "green";
    // }


  function error(input, message){
    const formgroup = input.parentElement;
    const err = formgroup.querySelector('#err');
    err.innerText = message;
    err.style.color = "red";
    formgroup.className = 'form-group error';
    document.querySelector("#task-modal-save").disabled = true;
    
  
  };
  
  function submit(input){
    const formgroup = input.parentElement;
    const err = formgroup.querySelector('#err');
    err.innerText = 'Looks good!';
    err.style.color = "green";
    formgroup.className = 'form-group success';
    document.querySelector("#task-modal-save").disabled = false;};


// taskNameInput.addEventListener("input", function(event){
//     if(event.target.value && event.target.value.length >=8){
//         event.target.classList.remove("is-invalid");
//         event.target.classList.add("is-valid");
//     }else{
//         event.target.classList.remove("is-valid");
//         event.target.classList.add("is-invalid");
//     }

// });

// descriptionInput.addEventListener("input", function(event){
//     if(event.target.value && event.target.value.length >=15){
//         event.target.classList.remove("is-invalid");
//         event.target.classList.add("is-valid");
//     }else{
//         event.target.classList.remove("is-valid");
//         event.target.classList.add("is-invalid");
//     }

// });

// assignedInput.addEventListener("input", function(event){
//     if(event.target.value && event.target.value.length >=8){
//         event.target.classList.remove("is-invalid");
//         event.target.classList.add("is-valid");
//     }else{
//         event.target.classList.remove("is-valid");
//         event.target.classList.add("is-invalid");
//     }

// });

// dateInput.addEventListener("input", function(event){
//     if(event.target.value && event.target.value.length >=8){
//         event.target.classList.remove("is-invalid");
//         event.target.classList.add("is-valid");
//     }else{
//         event.target.classList.remove("is-valid");
//         event.target.classList.add("is-invalid");
//     }

// });

// statusInput.addEventListener("input", function(event){
//     if(event.target.value && event.target.value.length >=8){
//         event.target.classList.remove("is-invalid");
//         event.target.classList.add("is-valid");
//     }else{
//         event.target.classList.remove("is-valid");
//         event.target.classList.add("is-invalid");
//     }

// });


  


