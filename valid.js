const form = document.querySelector("#task-form");
const name = document.querySelector("#taskName");
const description = document.querySelector("#description");
const assignee = document.querySelector("#assigned");
const date = document.querySelector("#date");
const statusInput = document.querySelector("#status");


window.addEventListener("load" , disableSubmit);
name.addEventListener("focus" ,validate);
description.addEventListener("focus" ,validate);
assignee.addEventListener("focus" ,validate);
date.addEventListener("focus" ,validate);

function disableSubmit(){
  
    document.querySelector("#task-modal-save").disabled = true;
  }

//    ============================ Validate from===============================
  function validate() {
  
    const taskName = name.value.trim();
    const descriptionInput = description.value.trim();
    const assigne = assignee.value.trim();

// =============================Task name validation========================  
    if (taskName == "" ||
    taskName.length <8) 
      {
        error(name , 'Enter a task name with 8 or more char');
      }
     else{
     submit(name);
   };

   // =============================Description validation========================
   if (descriptionInput == "" ||
   description.length <15) 
      {
        error(description , 'Enter task description with 15 or more char');
      }
     else{
     submit(description);
   };

   // =============================Assignee validation========================
   if (assigne == "" ||
   assigne.length <4) 
      {
        error(assignee , 'Enter assignee name with more than 4 cha');
      }
     else{
     submit(assignee);
   };

   // =============================Date validation========================
   const dateInpute = date.value;
    var currentDate = new Date().toISOString().slice(0,10);
    
    // console.log(date);
    if (dateInpute == null || dateInpute == ''){
        error(date , 'Task must have a due date');
      }
   else if(dateInpute < currentDate){
    error(date , 'Task cannot be created in past date');
    }
   
  else{
    submit(date);
    }
  };


  // function checkDate(){
 
    
  // };
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


// name.addEventListener("input", function(event){
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

// assignee.addEventListener("input", function(event){
//     if(event.target.value && event.target.value.length >=8){
//         event.target.classList.remove("is-invalid");
//         event.target.classList.add("is-valid");
//     }else{
//         event.target.classList.remove("is-valid");
//         event.target.classList.add("is-invalid");
//     }

// });

// date.addEventListener("input", function(event){
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


  


